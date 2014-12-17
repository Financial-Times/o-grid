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
 */
module.exports = function(IE8fixedLayout, element) {
	IE8fixedLayout = IE8fixedLayout || 'M';

	if (isIE8()) {
		return IE8fixedLayout;
	}

	element = element || 'head';
	return window.getComputedStyle(document.querySelector(element), ':after').getPropertyValue('content');
};
