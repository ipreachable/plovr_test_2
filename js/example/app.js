/**
 * @fileoverview application
 */
goog.provide('example.App');

goog.require('example');
goog.require('goog.dom.TagName');
goog.require('goog.events.EventType');
goog.require('goog.functions');
goog.require('goog.ui.Component');

/**
 * @constructor
 * @extends {goog.ui.Component}
 * @param {goog.dom.DomHelper=} opt_domHelper
 */
example.App = function(opt_domHelper) {
    goog.base(this, opt_domHelper);
};

goog.inherits(example.App, goog.ui.Component);


/**
 * @override
 */
example.App.prototype.createDom = function() {
    var el = this.dom_.createDom(goog.dom.TagName.DIV, {},
        this.dom_.createDom(goog.dom.TagName.DIV, {},
            this.dom_.createDom(goog.dom.TagName.A, {'id': this.makeId('sub'), 'className':'btn btn-primary'},
                'add sub module'),
            ' ',
            this.dom_.createDom(goog.dom.TagName.A, {'id': this.makeId('ya'), 'className':'btn btn-primary'},
                'add yet another submodule')));
    var content = this.dom_.createDom(goog.dom.TagName.DIV);
    el.appendChild(content);
    this.setElementInternal(el);

    this.getContentElement = goog.functions.constant(content);
};

/**
 * @override
 */
example.App.prototype.enterDocument = function() {
    var subEl = this.dom_.getElement(this.makeId('sub'));
    this.getHandler().listen(subEl, goog.events.EventType.CLICK, function() {
        this.addSub();
    }, false, this);

    var yaEl = this.dom_.getElement(this.makeId('ya'));
    this.getHandler().listen(yaEl, goog.events.EventType.CLICK, function() {
        this.addYASub();
    }, false, this);
};

/**
 * Outpus message to console
 */
example.App.prototype.addSub = function() {
    example.require(example.Modules.SUB, function() {
        var sub = new example.Sub('sub');
        this.addChild(sub, true);
    }, this);
};

/**
 * Outpus message to console
 */
example.App.prototype.addYASub = function() {
    example.require(example.Modules.YET_ANOTHER_SUB, function() {
        var yasub = new example.YASub('yasub');
        this.addChild(yasub, true);
    }, this);
};