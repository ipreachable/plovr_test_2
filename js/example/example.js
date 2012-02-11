goog.provide('example');

goog.require('goog.asserts');
goog.require('goog.dom');
goog.require('goog.module.ModuleManager');
goog.require('goog.module.ModuleLoader');
goog.require('goog.object');

/**
 * @type {string}
 * @const
 */
example.STATE_ID = 'state';

/**
 * @enum {string}
 */
example.Modules = {
    APP: 'app',
    SUB: 'sub',
    YET_ANOTHER_SUB: 'yasub'
};

/**
 * Updates state for debug
 * @param {string} id
 */
example.updateState = function(id) {
    goog.module.ModuleManager.getInstance().setLoaded(id);

    // for debug
    var el = goog.dom.getElement(example.STATE_ID);
    if (el) {
        var lineEl = goog.dom.createDom(goog.dom.TagName.SPAN, {}, id + ' loaded.',
            goog.dom.createDom(goog.dom.TagName.BR));
        el.appendChild(lineEl);
    }
};

/**
 * Initializes
 */
example.init = function() {
    // asserts example.Modules definition matches plovr_config.json
    goog.object.forEach(example.Modules, function(module) {
        goog.asserts.assert(goog.object.containsKey(goog.global['PLOVR_MODULE_INFO'], module));
    });

    var moduleManager = goog.module.ModuleManager.getInstance();
    var moduleLoader = new goog.module.ModuleLoader();

    moduleLoader.setDebugMode(!!goog.global['PLOVR_MODULE_USE_DEBUG_MODE']);
    moduleManager.setLoader(moduleLoader);
    moduleManager.setAllModuleInfo(goog.global['PLOVR_MODULE_INFO']);
    moduleManager.setModuleUris(goog.global['PLOVR_MODULE_URIS']);
};

/**
 * Loads a module
 * @param {string} id The id of the module
 * @param {Function} func The funciton to execute
 * @param {Object=} opt_obj The "this" object for func.
 */
example.require = function(id, func, opt_obj) {
    var manager = goog.module.ModuleManager.getInstance();
    var info = manager.getModuleInfo(id);
    if (info && info.isLoaded()) {
        func.call(opt_obj);
    } else {
        manager.execOnLoad(id, func, opt_obj);
    }
};
