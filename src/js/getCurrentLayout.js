/**
 * Detect IE 8 through injected conditional comments:
 * no UA detection, no need for conditional compilation or JS check
 *
 * @returns {Boolean} true if the current browser is Internet Explorer 8
 */
const isIE8 = (function() {
	const b = document.createElement('B');
	const docElem = document.documentElement;
	let isIE;

	b.innerHTML = '<!--[if IE 8]><b id="ie8test"></b><![endif]-->';
	docElem.appendChild(b);
	isIE = !!document.getElementById('ie8test');
	docElem.removeChild(b);
	return isIE;
}());

/**
 * Get the currently displayed layout, from $o-grid-layouts in _variables.scss
 * works in tandem with the oGridSurfaceCurrentLayout mixin
 * In IE 8, always return the L layout
 *
 * @returns {String} One of $o-grid-layouts (default, S, M, L, XL)
 */
module.exports = function getCurrentLayout() {
	if (isIE8) {
		return 'L';
	}

	return window.getComputedStyle(document.documentElement, ':after').getPropertyValue('content').replace(/"/g, '').replace(/'/g, '');
};
