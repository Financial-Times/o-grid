"use strict";

/**
 * Detect IE 8 through injected conditional comments:
 * no UA detection, no need for conditional compilation or JS check
 */
function isIE8() {
	var b = document.createElement('B');
	var docElem = document.documentElement;
	var isIE;

	b.innerHTML = '<!--[if IE 8]><b id="ie8test"></b><![endif]-->';
	docElem.appendChild(b);
	isIE = !!document.getElementById('ie8test');
	docElem.removeChild(b);
	return isIE;
}

/**
 * Get the currently displayed layout, from $o-grid-layouts in _variables.scss
 * works in tandem with the oGridSurfaceCurrentLayout mixin
 * In IE 8, always return the L layout
 */
module.exports = function() {
	if (isIE8()) {
		return 'L';
	}

	return window.getComputedStyle(document.querySelector('head'), ':after').getPropertyValue('content');
};
