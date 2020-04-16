const missingDataMessage = 'Could not find layout information. ' +
	'You may need to include o-grid css. See the README (https://registry.origami.ft.com/components/o-grid/readme) ' +
	'for more information.';

/**
 * Grab grid properties
 * @return {Object} layout names and gutter widths
 */
function getGridProperties() {
	const properties = getGridFromDoc('after');
	if (Object.keys(properties).length === 0) {
		console.warn(missingDataMessage);
	}
	return properties;
}

/**
 * Get all layout sizes.
 * CSS must be included so JavaScript can retrieve layout information.
 * See the README for more information.
 * @return {Object} layout names and sizes
 */
function getGridBreakpoints() {
	const breakpoints = getGridFromDoc('before');
	if (Object.keys(breakpoints).length === 0) {
		console.warn(missingDataMessage);
	}
	return breakpoints;
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
 * Grab the current layout.
 * CSS must be included so JavaScript can retrieve layout information.
 * See the README for more information.
 * @return {String} Layout name
 */
function getCurrentLayout() {
	return getGridProperties().layout;
}

/**
 * Grab the current space between columns.
 * CSS must be included so JavaScript can retrieve layout information.
 * See the README for more information.
 * @return {String} Gutter width in pixels
 */
function getCurrentGutter() {
	return getGridProperties().gutter;
}

/**
 * This sets MediaQueryListeners on all the o-grid breakpoints
 * and fires a `o-grid.layoutChange` event on layout change.
 * CSS must be included so JavaScript can retrieve layout information.
 * See the README for more information.
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
		console.error('Could not enable grid layout change events. Include o-grid css. See the README (https://registry.origami.ft.com/components/o-grid/readme) for more details.');
	}
}

export {
	getCurrentLayout,
	getCurrentGutter,
	getGridBreakpoints,
	enableLayoutChangeEvents
};

export default {
	getCurrentLayout,
	getCurrentGutter,
	getGridBreakpoints,
	enableLayoutChangeEvents
};
