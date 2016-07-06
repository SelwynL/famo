Widget.register('textfield', {

    defaultConfig: {
        text: 'This is a text field'
    },
    
    getDOM: function () {
     
        var content = document.createElement("span");
        content.innerHTML = this.config.text;
        return content;
    }
});