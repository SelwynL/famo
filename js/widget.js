var Widget = Class.extend({
    
    init: function () {},
    setData: function (data) {
        //console.log('Setting data for widget: ' + data.name);
        //console.log(data);
    
        this.data = data;
		this.name = data.name;
		this.id = data.id;
        this.position = data.position;
        this.classes = data.classes;
		this.hidden = false;
        this.setConfig(data.config);
    },
    setConfig: function (config) {
        this.config = Object.assign(this.defaultConfig, config);
    },
       
    /* Below can be overridden by widget implementations */
    defaultConfig: {},
    
    getScripts: function () {
        //console.log("getting scripts");
        return ['script.js'];  
    },
        
    getStylesheets: function () {
        //console.log("getting stylesheets");
        return ['style.css'];
    },
        
    getDOM: function () {
        return '<div>Default Widget DOM</div';
    },
    
    start: function () {
        //console.log('Starting widget: ' + this.data.name);
    },
    
    stop: function () {
        //console.log('Stoping widget: ' + this.data.name);
    },
    
    show: function () {
        //console.log('Showing widget: ' + this.data.name);
    },
    
    hide: function () {
        //console.log('Hiding widget: ' + this.data.name);
    },
    
    sendGlobalBroadcast: function (name, payload) {
        //console.log('Sending broadcast: ' + name + ' - ' + payload);
    },
    
    receiveGlobalBroadcast: function (name, payload) {
        //console.log('Receving broadcast: ' + name + ' - ' + payload);
    }
});

Widget.definitions = {};

Widget.create = function(name) {
    //console.log('Creating widget: ' + name);
    
	/* Recursive object clone */
	function cloneObject(obj) {
		if (obj === null || typeof obj !== 'object') {
			return obj;
		}

        /* Give temp the original constructor */
		var temp = obj.constructor();
		for (var key in obj) {
			temp[key] = cloneObject(obj[key]);
		}
		return temp;
	}

    console.log("Name: " + name);
    console.log("Definitions:");
    console.log(Widget.definitions);
    
	var widgetDefinition = Widget.definitions[name];
    console.log("Definition: ");
    console.log(widgetDefinition);
    
	var clonedDefinition = cloneObject(widgetDefinition);
    console.log("Cloned Definition: ");
    console.log(clonedDefinition);

	/* Note that we clone the definition. Otherwise the objects are shared, which gives problems. */
	var WidgetClass = Widget.extend(clonedDefinition);
    console.log("Class:");
    console.log(WidgetClass);
    
    return new WidgetClass();
};

Widget.register = function(name, widgetDefinition) {
	//console.log('Widget registered: ' + name);
	Widget.definitions[name] = widgetDefinition;
};
