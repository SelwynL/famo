var config = {
    
	port: 4589,
    
    layout: {
        margin: 4, /* pixels of padding around each widget */
        units: 24, /* divide width of page by this to determine number of units to cover the page height (also applied to width to get a 1 unit square) */
        
        summary: {      /* summary view specs */
            width: 7,   /* widget with in terms of units */
            height: 4   /* widget height in terms of units */
        },
        detail: {       /* detail view specs */
            width: 14,
            height: 14,
            row: 2,
            offset: 3
        }
    },
    
    widgets: [
        {
            name: 'textfield',
            position: 1,
            classes: 'bold',
            config: {
                text: 'This is my first widget!!'
            }
        },
        {
            name: 'clock',
            position: 2,
            classes: 'bold',
            config: {
                timeFormat: 12,
                showPeriod: false,  /* Shows AM/PM */
                digital: false      /* Digital or Analog clock face */
            }
        }
    ],
    
    paths: {
		widgets: "widgets",
		thirdparty: "thirdparty"
	}
};

if (typeof module !== 'undefined') { module.exports = config; }