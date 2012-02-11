/**
 * @fileoverview initializes app.
 */
goog.require('example');
goog.require('example.App');

example.init();
example.updateState(example.Modules.APP);

var app = new example.App();
app.render(goog.dom.getElement('app'));