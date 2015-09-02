/*global module*/
'use strict';

/**
 * Detect IE 8 through injected conditional comments:
 * no UA detection, no need for conditional compilation or JS check
 * @return {Bool} true if the browser is IE 8
 */
var isIE8 = (function() {
	var b = document.createElement('B');
	var docElem = document.documentElement;
	var isIE;

	b.innerHTML = '<!--[if IE 8]><b id="ie8test"></b><![endif]-->';
	docElem.appendChild(b);
	isIE = !!document.getElementById('ie8test');
	docElem.removeChild(b);
	return isIE;
}());


/**
 * Grab grid properties surfaced in html:after's content
 * @return {Object} layout names and gutter widths
 */
function getGridProperties() {
	var gridProperties = window.getComputedStyle(document.documentElement, ':after').getPropertyValue('content');
	// Firefox computes: "{\"foo\": \"bar\"}"
	// We want readable JSON: {"foo": "bar"}
	gridProperties = gridProperties.replace(/'/g, '').replace(/\\/g, '').replace(/^"/, '').replace(/"$/, '');
	return JSON.parse(gridProperties);
}

/**
 * Grab the current layout
 * @return {String} Layout name
 */
function getCurrentLayout() {
	if (isIE8) {
		return 'L';
	}

	return getGridProperties().layout;
}

/**
 * Grab the current space between columns
 * @return {String} Gutter width in pixels
 */
function getCurrentGutter() {
	if (isIE8) {
		return '20px';
	}

	return getGridProperties().gutter;
}

module.exports = {
	getCurrentLayout: getCurrentLayout,
	getCurrentGutter: getCurrentGutter
};
