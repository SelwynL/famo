var Express = require('express');
var Path = require('path');
var app = new Express();

var Server = function (config, callback) {
    
    var instance = app.listen(config.port, function () {
        console.log("Listening on port [%s]", instance.address().port);
    });

    app.use("/js", Express.static(Path.resolve(__dirname + "/../js")));
    app.use("/assets", Express.static(Path.resolve(__dirname + "/../assets")));
    app.use("/config", Express.static(Path.resolve(__dirname + "/../config")));
    app.use("/widgets", Express.static(Path.resolve(__dirname + "/../widgets")));
    app.use("/thirdparty", Express.static(Path.resolve(__dirname + "/../thirdparty")));
    
    app.get('/', function (req, res) {
        res.sendFile(Path.resolve(__dirname + '/../index.html'));
    });
    
    if (typeof callback === "function") {
		callback(app);
	}

};

module.exports = Server;