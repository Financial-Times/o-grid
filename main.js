/* eslint-disable no-console */
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
 * @returns {void}
 */
function enableLayoutChangeEvents() {
	// Create a map containing all breakpoints exposed via html:before
	const gridLayouts = getGridBreakpoints();
	// eslint-disable-next-line no-prototype-builtins
	if (gridLayouts.hasOwnProperty('layouts')) {
		const layouts = gridLayouts.layouts;
		const breakpoints = [
			...Object.entries(layouts),
			['default', '240px']
		].sort((a, b) => parseFloat(a[1]) - parseFloat(b[1]));

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
		const decr1 = val => `${Number(val.replace('px', '') - 1)}px`;
		for (let index = 0; index < breakpoints.length; index++) {
			const [layoutName, layoutWidth] = breakpoints[index];
			const isLast = index === breakpoints.length - 1;
			if (isLast) {
				setupQuery(`(min-width: ${layoutWidth})`, layoutName);
				continue;
			}
			const [,nextLayoutWidth] = breakpoints[index + 1];
			setupQuery(`(min-width: ${layoutWidth}) and (max-width: ${decr1(nextLayoutWidth)})`, layoutName);
		}
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
