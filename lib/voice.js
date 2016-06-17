var Voice = (function () {

    return {
        init: function () {
            console.log('Initializing voice capabilites...');
            if (annyang) {
                
                var hello = function() {
                    console.log("Hello!!");
                };
                
                var openWidget = function (type) {
                    type = type.toLowerCase();
                    console.log('Expanding [' + type + '] widget...');
                    var $widget = $('#' + type);
                    
                    if (!$widget) {
                        console.error('Unable to locate widget with name [' + type + ']');
                    }
                    
                    Layout.openDetailView($widget);
                };

                var closeWidget = function () {
                    Layout.closeDetailView();
                };
                
                // Let's define our first command. First the text we expect, and then the function it should call
                var commands = {
                      'hello (there)':          hello,
                      'expand :type widget':    openWidget,
                      'close detail view':      closeWidget
                };

                // OPTIONAL: activate debug mode for detailed logging in the console
                annyang.debug();

                // Add voice commands to respond to
                annyang.addCommands(commands);

                // OPTIONAL: Set a language for speech recognition (defaults to English)
                annyang.setLanguage('en');

                // Start listening
                annyang.start();
            } else {
                console.log('Error - Voice not defined!');   
            }
        }
    };
})();

Voice.init();