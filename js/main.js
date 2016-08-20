/** 
 ** Main javascript file - loads all modules and main widget configurations. 
 ** Config is global (loaded via separate file in /config/config.js) 
 **/

var Famo = (function () {
    
    var startWidgets = function (widgetObjects) {
        console.log('Starting [' + widgetObjects.length + '] loaded widgets...');
        
        return Q.allSettled(widgetObjects.map(function (widget) {
            return widget.start();
        })).then(function () {
            return widgetObjects;
        });
    };
    
    var renderWidgets = function (widgetObjects) {
        console.log('Rendering widgets...');
        /*
        {
            id: 'weather',
            col: 1,
            row: 1,
            size_x: config.layout.summary.width,
            size_y: config.layout.summary.height
        },
        {
            id: 'clock',
            col: 1,
            row: 2,
            size_x: config.layout.summary.width,
            size_y: config.layout.summary.height
        }
        */
        
        /* Serialize the layout for consumption by the renderer */
        var layoutSerialization = widgetObjects.map(function (widget) {
            console.log("dom-" + widget.id + " " + widget.getDOM());
            return {
                dom: widget.getDOM(),
                id: widget.id,
                classes: widget.classes,
                col: 1,
                row: widget.position,
                size_x: config.layout.summary.width,
                size_y: config.layout.summary.height
            };
        });
        
        //return Q.resolve(layoutSerialization);
        /* Insert DOM into correct place */
        return Layout.render(layoutSerialization);
        
//            
    };
    
    return {
        
        /* Initialization of the framework */
        init: function () {
            
            /* Load widgets and their dependencies */
            Loader.load()
            .then(function (loadedWidgetObjects) {
                /* Start all loaded widgets */
                return startWidgets(loadedWidgetObjects);
            }, function (failure) {
                console.error('Unable to load: ' + failure);
            })
            .then(function (startedWidgetObjects) {
                /* Render all widgets in the DOM */
                console.log(">>> STARTED WIDGET OBJECTS");
                console.log(startedWidgetObjects);
                return renderWidgets(startedWidgetObjects);
            })
            .then(function (layoutSerialization) {
                console.log(">>> LAYOUT SERIALIZATION");
                //console.log(layoutSerialization);
            });
        }
    };
    
})();

/** 
 ** Add a polyfill for Object.assign
 ** https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
 **/
if (typeof Object.assign != 'function') {
	(function () {
		Object.assign = function (target) {
			'use strict';
			if (target === undefined || target === null) {
				throw new TypeError('Cannot convert undefined or null to object');
			}
			target = Object(target);
			for (var index = 1; index < arguments.length; index++) {
				var source = arguments[index];
				if (source !== undefined && source !== null) {
					for (var key in source) {
						if (Object.prototype.hasOwnProperty.call(source, key)) {
							target[key] = source[key];
						}
					}
				}
			}
			return target;
		};
	})();
}

Famo.init();