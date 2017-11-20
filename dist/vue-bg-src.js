/*!
 * vue-bg-src v1.0.0
 * https://github.com/quantity-digital/vue-bg-src.git
 * Released under the MIT License.
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.VueBgSrc = factory());
}(this, (function () { 'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// Global defaults
var defaults = {
	mediaQueries: {},
	attributePrefix: 'data-bg-src'
};

// Vue plugin install function
function install(Vue, options) {

	// Merge settings with defaults
	var globalSettings = _extends({}, defaults, options);

	// Register a global custom directive called
	Vue.directive('bg-set', {

		inserted: function inserted(el) {
			var mediaQueries = globalSettings.mediaQueries;
			var attributePrefix = globalSettings.attributePrefix;
			var attributes = getAttributesWithPrefix(attributePrefix, el.attributes);

			var bgOverride = getBgOverride({ attributes: attributes, mediaQueries: mediaQueries, attributePrefix: attributePrefix });

			if (bgOverride) {
				// peload image
				preloadImage(bgOverride, function () {
					el.style.backgroundImage = 'url("' + bgOverride + '")';
				});
			}
		}

	});
}

function getBgOverride(_ref) {
	var attributes = _ref.attributes,
	    mediaQueries = _ref.mediaQueries,
	    attributePrefix = _ref.attributePrefix;

	// Abort if no window or matchMedia support
	if (!(window && window.matchMedia)) {
		return null;
	}

	var matched = attributes.reduce(function (found, attr) {
		var name = attr.name.replace(attributePrefix + '-', '');

		if (name in mediaQueries && window.matchMedia(mediaQueries[name]).matches) {
			return attr.value;
		}

		return found;
	}, null);

	return matched;
}

function getAttributesWithPrefix(prefix, attributes) {
	var foundAttributes = [];

	for (var i = 0; i < attributes.length; i++) {
		var attr = attributes[i];
		var reg = new RegExp('^' + prefix);
		if (reg.test(attr.name)) {
			foundAttributes.push({
				name: attr.name,
				value: attr.value
			});
		}
	}

	return foundAttributes;
}

function preloadImage(src, cb) {
	var image = new Image();
	image.onload = cb;
	image.src = src;
}

var VueBgSrc$1 = { install: install };

return VueBgSrc$1;

})));
