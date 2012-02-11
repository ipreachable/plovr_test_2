/**
 * @fileoverview submodule
 */
goog.provide('example.Sub');

goog.require('example');
goog.require('goog.dom.TagName');
goog.require('goog.ui.Component');

/**
 * @constructor
 * @extends {goog.ui.Component}
 * @param {string} message
 * @param {goog.dom.DomHelper=} opt_domHelper
 */
example.Sub = function(message, opt_domHelper) {
    goog.base(this, opt_domHelper);
    /**
     * @type {string}
     * @private
     */
    this.message_ = message;
};
goog.inherits(example.Sub, goog.ui.Component);

/**
 * @override
 */
example.Sub.prototype.createDom = function() {
    var el = this.dom_.createDom(goog.dom.TagName.SPAN, ['label label-important'], this.message_);
    this.setElementInternal(el);
};

/**
 * @override
 */
example.Sub.prototype.disposeInternal = function() {
    goog.base(this, 'disposeInternal');
    delete this.message_;
};
