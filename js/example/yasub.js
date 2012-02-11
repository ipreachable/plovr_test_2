/**
 * @fileoverview yet another sumbodule
 */
goog.provide('example.YASub');

goog.require('goog.ui.Component');

/**
 * @constructor
 * @extends {goog.ui.Component}
 * @param {string} message
 * @param {goog.dom.DomHelper=} opt_domHelper
 */
example.YASub = function(message, opt_domHelper) {
    goog.base(this, opt_domHelper);

    /**
     * @type {string}
     * @private
     */
    this.message_ = message;
};
goog.inherits(example.YASub, goog.ui.Component);

/**
 * @override
 */
example.YASub.prototype.createDom = function() {
    var el = this.dom_.createDom(goog.dom.TagName.SPAN, ['label', 'label-warning'], this.message_);
    this.setElementInternal(el);
};

/**
 * @override
 */
example.YASub.prototype.enterDocument = function() {
    var el = this.getElement();
    this.getHandler().listen(el, goog.events.EventType.CLICK, function() {
        window.alert(this.message_);
    }, false ,this);
};