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

/* GET realtime page. */
router.get('/', function(req, res) {

	res.render('dashboard', { title: 'IBM Internet of Things Foundation' });
});


module.exports = router;