/*******************************************************************************
* Copyright (c) 2014 IBM Corporation and other Contributors.
*
* All rights reserved. This program and the accompanying materials
* are made available under the terms of the Eclipse Public License v1.0
* which accompanies this distribution, and is available at
* http://www.eclipse.org/legal/epl-v10.html
*
* Contributors:
* IBM - Initial Contribution
*******************************************************************************/

var express = require('express');
var router = express.Router();

var api_routes = require('./api');
var dashboard_routes = require('./dashboard');
var auth_routes = require('./auth');

//all requests come here to validate the if api key is present
//else redirect to login
router.use(function(req, res, next) {

	//set this header, so that there is no browser caching when destroying the session.
	res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
	
	//check to see if we are in Bluemix and if we are bound to IoT service		
	if (! req.session.api_key && process.env.VCAP_SERVICES && req.path.indexOf('login') === -1)
	{
		var keys = getAuthFromVCAP(process.env.VCAP_SERVICES);
		if( keys.api_key) {
			//found IoTF service, so set the api key and auth token
			req.session.api_key=keys.api_key;
			req.session.auth_token=keys.auth_token;
			req.session.isBluemix= true;
			res.redirect("/dashboard");
		} else {
			//no service found, so redirect to login page
			res.redirect("/login");
		}
	}
	// for api calls, send 401 code
	else if(! req.session.api_key && req.path.indexOf('api') != -1) {
		res.status(401).send({error: "Not authorized"});
	}
	// for all others, redirect to login page
	else if(! req.session.api_key && req.path.indexOf('login') === -1) {
		res.redirect("/login");
	} else {
		next();
	}
});

//manage login routes
router.use('/',auth_routes);
//dashboard routes
router.use('/dashboard', dashboard_routes);
//proxy api routes TODO: remove this after datapower handles the CORS requests
router.use('/api/v0002',api_routes);

function getAuthFromVCAP(VCAP_SERVICES) {

	var env = JSON.parse(VCAP_SERVICES);
	for (var service in env) {
		//find the IoT Service
		if(service === "iotf-service") {
			for (var i=0;i<env['iotf-service'].length;i++) {
				
				if (env['iotf-service'][i].credentials.iotCredentialsIdentifier) {
					//found an IoT service, return api_key and api_token session variables
					return { api_key : env['iotf-service'][i].credentials.apiKey,
							auth_token : env['iotf-service'][i].credentials.apiToken }
				}
			}
		}
	}
	return {};
}

module.exports = router;
