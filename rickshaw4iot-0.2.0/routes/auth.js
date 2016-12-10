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

// Login page
router.get('/login', function(req, res) {
  res.render('login', { title: 'IBM Internet of Things Foundation' });
});

//login page after a login failure
router.get('/loginfail', function(req, res) {
  res.render('loginfail', { title: 'IBM Internet of Things Foundation' });
});

router.post('/login', function(req, res) {
  console.log("Logged in using api key : "+req.body.api_key);

  req.session.api_key = req.body.api_key;
  req.session.auth_token = req.body.auth_token;

  res.redirect("/dashboard");
});

// Logout the user, then redirect to the home page.
router.post('/logout', function(req, res) {
  req.session.destroy();
  res.redirect('/login');
});

router.get('/logout', function(req, res) {
  req.session.destroy();
  res.redirect('/login');
});

module.exports = router;