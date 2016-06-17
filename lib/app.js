var Server = require(__dirname + '/server.js');
var Path = require('path');
var FS = require('fs');

var App = function() {
    
    var loadConfig = function(callback) {
		console.log('Loading config...');
		//var defaults = require('/defaults.js');
		var configFilename = Path.resolve(__dirname + '/../config/config.js');
		try {
			FS.accessSync(configFilename, FS.F_OK);
			var config = require(configFilename);
			//var config = Object.assign(defaults, c);
			callback(config);
		} catch (e) {
            console.error(e);
			console.error('WARNING! Could not find config...');
			//callback(defaults);
		}
	};
    
    
    this.start = function(callback) {
        //Load the configuration file
        loadConfig( function(config) {
            
            //Start the node server
            var server = new Server(config, function(app) {
                console.log('Application started...');
                if (typeof callback === 'function') {
					callback(config);
				}
            });
        });
    };
};

module.exports = new App();