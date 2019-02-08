/*global module*/

let minSupportedIeVersion = 8;

/**
 * Detect IE 8 through injected conditional comments:
 * no UA detection, no need for conditional compilation or JS check
 * @return {Bool} true if the browser is IE 8
 */
function detectIE8() {
	const b = document.createElement('B');
	const docElem = document.documentElement;
	let isIE;

	b.innerHTML = '<!--[if IE 8]><b id="ie8test"></b><![endif]-->';
	docElem.appendChild(b);
	isIE = !!document.getElementById('ie8test');
	docElem.removeChild(b);
	return isIE;
}

const isIE8 = (function () {

	let result;
	return function () {
		if (minSupportedIeVersion > 8) {
			return false;
		}
		if (result === undefined) {
			result = detectIE8();
		}
		return result;
	};
}());

/**
 * Grab grid properties
 * @return {Object} layout names and gutter widths
 */
function getGridProperties() {
	return getGridFromDoc('after');
}

/**
 * Get all layout sizes
 * @return {Object} layout names and sizes
 */
function getGridBreakpoints() {
	return getGridFromDoc('before');
}

/**
 * Grab grid properties surfaced in html:after and html:before's content
 * @param {String} position Whether to get all properties in :before, or current properties in :after
 * @return {Object} layout names and gutter widths
 */
function getGridFromDoc(position) {
	// Contained in a try/catch as it should not error if o-grid styles are not (deliberately or accidentally) loaded
	// e.g. o-tracking will always try to read this property, but the page is not obliged to use o-grid for layout
	try {
		let gridProperties = window.getComputedStyle(document.documentElement, ':' + position).getPropertyValue('content');
		// Firefox computes: "{\"foo\": \"bar\"}"
		// We want readable JSON: {"foo": "bar"}
		gridProperties = gridProperties.replace(/'/g, '').replace(/\\/g, '').replace(/^"/, '').replace(/"$/, '');
		return JSON.parse(gridProperties);
	} catch (e) {
		return {};
	}
}

/**
 * Grab the current layout
 * @return {String} Layout name
 */
function getCurrentLayout() {
	if (isIE8()) {
		return 'L';
	}

	return getGridProperties().layout;
}

/**
 * Grab the current space between columns
 * @return {String} Gutter width in pixels
 */
function getCurrentGutter() {
	if (isIE8()) {
		return '20px';
	}

	return getGridProperties().gutter;
}

/**
 * This sets MediaQueryListeners on all the o-grid breakpoints
 * and fires a `o-grid.layoutChange` event on layout change.
 */
function enableLayoutChangeEvents() {
	// Create a map containing all breakpoints exposed via html:before
	const gridLayouts = getGridBreakpoints();
	if (gridLayouts.hasOwnProperty('layouts')) {
		const layouts = gridLayouts.layouts;
		const breakpoints = new Map([
			...Object.keys(layouts).map(key => [key, layouts[key]]),
			['default', '240px']
		]);
		const decr1 = val => `${Number(val.replace('px', '') - 1)}px`;

		const setupQuery = (query, size) => {
			// matchMedia listener handler: Dispatch `o-grid.layoutChange` event if a match
			const handleMQChange = mql => {
				if (mql.matches) {
					window.dispatchEvent(new CustomEvent('o-grid.layoutChange', {
						detail: {
							layout: size,
						}
					}));
				}
			};

			const mql = window.matchMedia(query);
			mql.addListener(handleMQChange);
			handleMQChange(mql);
		};

		// Generate media queries for each
		breakpoints.forEach((width, size) => {
			switch(size) {
				case 'S':
					setupQuery(`(min-width: ${ width }) and (max-width: ${ decr1(breakpoints.get('M')) })`, size);
					break;
				case 'M':
					setupQuery(`(min-width: ${ width }) and (max-width: ${ decr1(breakpoints.get('L')) })`, size);
					break;
				case 'L':
					setupQuery(`(min-width: ${ width }) and (max-width: ${ decr1(breakpoints.get('XL')) })`, size);
					break;
				case 'XL':
					setupQuery(`(min-width: ${ width })`, size);
					break;
				case 'default':
				default:
					setupQuery(`(max-width: ${ decr1(breakpoints.get('S')) })`, size);
					break;
			}
		});
	} else {
		console.error('To enable grid layout change events, include oGridSurfaceLayoutSizes in your Sass');
	}
}

const setMinSupportedIeVersion: version => {
	minSupportedIeVersion = version;
}

export {
	setMinSupportedIeVersion,
	getCurrentLayout,
	getCurrentGutter,
	getGridBreakpoints,
	enableLayoutChangeEvents
}
