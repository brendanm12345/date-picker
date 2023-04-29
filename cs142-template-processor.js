"use strict";

function Cs142TemplateProcessor(template) {
    this.template = template;
}
Cs142TemplateProcessor.prototype.fillIn = function(dictionary) {
    // if we see text with {{X}} in this.template, search dictionary for X (AKA the property name)
    // If it's there, replace the whole {{X}} with the value of that property from the dict
    const filledInTemplate = this.template.replace(/\{\{(\w+)\}\}/g, function(match, propertyName) {
        return (propertyName in dictionary) ? dictionary[propertyName] : '';
    });
    return filledInTemplate;
        
};