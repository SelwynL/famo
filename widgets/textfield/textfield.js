Widget.register('textfield', {

    defaultConfig: {
        text: 'This is a text field'
    },
    
    getDOM: function () {
        return '<span>stufffff</span>';
//        var content = document.createElement("span");
//        content.innerHTML = this.config.text;
//        return content;
    }
});