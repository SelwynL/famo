'use strict';

var App = require(__dirname + '/lib/app.js');
App.start(function (config) {
	console.log('');
	console.log('Ready to go! Please point your browser to: http://localhost:' + config.port);
});