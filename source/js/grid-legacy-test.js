var ft = ft || {};


ft.mustard = (function(){
	"use strict";

	function loadCSS(url) {
		var link = document.createElement("link");
		link.setAttribute("rel", "stylesheet");
		link.setAttribute("href", url);
		document.getElementsByTagName("head")[0].appendChild(link);
	}

	/**
	 * Simple feature check to see if Enhanced experience is supported.
	 * @return {Boolean}
	 */
	function supportsEnhanced() {
		return ('querySelector' in document && 'localStorage' in window && 'addEventListener' in window);
	}

	/**
	 * Simple feature check to see if Legacy experience is supported.
	 * @return {Boolean}
	 */
	function supportsLegacy() {
		return (navigator.appName === "Microsoft Internet Explorer");
	}

	/**
	 * Should the browser get the fixed layout3?
	 */
	function shouldGetFixedLayout3() {
		var w = window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
		return (typeof window.matchMedia !== 'function' && w >= 780);
	}

	return {
		supportsEnhanced: supportsEnhanced,
		supportsLegacy: supportsLegacy,
		shouldGetFixedLayout3: shouldGetFixedLayout3,
		loadCSS: loadCSS
	};

}());