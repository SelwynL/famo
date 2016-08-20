var Loader = (function () {
    
    var self = this;
    var loadedFiles = [];
    
    var loadConfig = function () {
        if (typeof config === 'undefined') {
			config = defaultConfig;
			return Q.reject('Config file is missing');
		}
		config = Object.assign(defaultConfig, config);
        return Q.resolve();
    };
        
    var getWidgets = function () {
        var widgets = [];
        var widgetsData = config.widgets;
        var rootWidgetFolder = config.paths.widgets + '/';
        
        for (var index in widgetsData) {
            var widgetData = widgetsData[index];
            var widgetName = widgetData.name;
            var widgetFolder = rootWidgetFolder + widgetName + '/';
            
            widgets.push({
                index: index,
                id: 'widget-' + index + '-' + widgetName,
                name: widgetName,
                file: widgetName + '.js',
                path: widgetFolder,
                position: widgetData.position,
                config: widgetData.config,
                classes: (typeof widgetData.classes !== 'undefined') ? widgetName + ' ' + widgetData.classes : widgetName
            });
        }
        return widgets;
    };
    
    var loadFile = function (fileUrl, filetype) {
        //console.log('Load file: [' + filetype + ' - ' + fileUrl + ']...');
        
        if (loadedFiles.indexOf(fileUrl) !== -1) {
            //console.log('File "' + fileUrl + '" already loaded...');
            return Q.resolve(fileUrl);
        }
        
        var deferred = Q.defer();
        switch (filetype) {
            case 'js':
                var script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = fileUrl;
                script.onload = function() {
                    deferred.resolve(fileUrl);
                };
                script.onerror = function() {
                    deferred.reject('Error with "' + fileUrl + '"');
                };
                document.getElementsByTagName('body')[0].appendChild(script);
                break;
            case 'css':
                var stylesheet = document.createElement('link');
                stylesheet.rel = 'stylesheet';
                stylesheet.type = 'text/css';
                stylesheet.href = fileUrl;
                stylesheet.onload = function() {
                    deferred.resolve(fileUrl);
                };
                stylesheet.onerror = function() {
                    deferred.reject('Error with "' + fileUrl + '"');
                };
                document.getElementsByTagName('head')[0].appendChild(stylesheet);
                break;
		}
        
        
        // Take note we have loaded this file, and no longer need to load it again
        loadedFiles.push(fileUrl);
        
        return deferred.promise;
    };
    
    var loadFiles = function (rootPath, fileUrls, filetype) {
        //console.log('Loading [' + filetype + '] files: ' + fileUrls);
        return Q.allSettled(fileUrls.map(function (url) {
            return loadFile(rootPath + url, filetype);
        }));
    };
    
    var loadScripts = function (widgetRootPath, scriptFileUrls) {
        //console.log('Loading scripts: ' + scriptFileUrls);
        return loadFiles(widgetRootPath, scriptFileUrls, 'js');
    };
    
    var loadCSS = function (widgetRootPath, cssFileUrls) {
        //console.log('Loading stylesheets: ' + cssFileUrls);
        return loadFiles(widgetRootPath, cssFileUrls, 'css');
    };
    
    var bootStrapWidget = function (widgetData) {
        //console.log('Bootstrapping: ' + widgetData.name + '...');
        
        var widgetObject = Widget.create(widgetData.name);
        widgetObject.setData(widgetData);
        
        var cssLoaded = loadScripts(widgetData.path, widgetObject.getScripts());
        var scriptsLoaded = loadCSS(widgetData.path, widgetObject.getStylesheets());
        
        return Q.allSettled([cssLoaded, scriptsLoaded]).then(function (response) {
            return widgetObject;
        });
    };
    
    var loadWidget = function (widget) {
        var mainWidgetUrl = widget.path + widget.file;
        console.log('Loading: ' + widget.name  + '...');
        
		return loadFile(mainWidgetUrl, 'js').then(function (url) {
            return bootStrapWidget(widget); 
        });
    };
    
    var loadWidgets = function () {    
        var loadedWidgetObjects = [];
        var widgetDataList = getWidgets();
        
        //console.log('Loading ' + widgetDataList.length + ' widgets...');
        
        return Q.allSettled(widgetDataList.map(function (widgetData) {
            return loadWidget(widgetData)
                .then(function (widgetObject) {
                    loadedWidgetObjects.push(widgetObject);
                });
        })).then(function () {
            return loadedWidgetObjects;
        });
    };
    
    return {
        /* Returns a promise when widgets are configured and loaded */
        load: function() {
            console.log('Executing Loader.load()');
            return loadConfig().then(function () { return loadWidgets(); });
        }
    };  

})();