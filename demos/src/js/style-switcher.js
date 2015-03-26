/*global $*/
/*jshint devel:true, freeze:false*/
'use strict';

var almostEqual = require('./almost-equal');
var getCurrentLayout = require('../../../main').getCurrentLayout;
var local = true;
var defaultGutter = 10;
var resizedOuterMarginWidth = 5; // Same as $o-grid-gutter in resized.scss

// ============================================================================
// Polyfills

// https://cdn.polyfill.io/v1/polyfill.js?features=String.prototype.contains
String.prototype.includes = function (string, index) {
	if (typeof string === 'object' && string instanceof RegExp) throw new TypeError("First argument to String.prototype.includes must not be a regular expression");
	return this.indexOf(string, index) !== -1;
};

if (![].includes) {
	Array.prototype.includes = function(searchElement /*, fromIndex*/ ) {
		var O = Object(this);
		var len = parseInt(O.length) || 0;
		if (len === 0) {
			return false;
		}
		var n = parseInt(arguments[1]) || 0;
		var k;
		if (n >= 0) {
			k = n;
		} else {
			k = len + n;
			if (k < 0) {k = 0;}
		}
		var currentElement;
		while (k < len) {
			currentElement = O[k];
			if (searchElement === currentElement || (searchElement !== searchElement && currentElement !== currentElement)) {
				return true;
			}
			k++;
		}
		return false;
	};
}

// ============================================================================
// Self-contained stylesheet switcher
(function styleSwitcher() {
	var demoTypes = require('../configurations.json');
	var stylesheet = document.querySelector("link[rel='stylesheet']");
	var html = document.documentElement;
	var buttonContainer = document.getElementById("styleSwitcher");
	var tmp = document.createDocumentFragment();
	var subheading = document.getElementById("subheading");

	Object.keys(demoTypes).forEach(function (type) {
		var button  = document.createElement('button');
		var stylePath = local ? type + '.css' : 'scss/' + type + '.scss';
		button.innerHTML = type;
		button.title = demoTypes[type];
		button.addEventListener('click', function () {
			stylesheet.href = stylePath;
			var prev = document.querySelector('.selected-stylesheet');
			if (prev) {
				prev.className = '';
			}
			this.className = 'selected-stylesheet';

			subheading && (subheading.innerHTML = this.title);
			html.className = html.className.replace(/\sstylesheet-(\w|-)+/, '') + ' stylesheet-' + type;

			runTests();
		});
		if (!tmp.childNodes.length) {
			stylesheet.href = stylePath;
			button.className = 'selected-stylesheet';
			html.className += ' stylesheet-' + type;
			subheading && (subheading.innerHTML = button.title);
		}
		tmp.appendChild(button);

	});

	buttonContainer.appendChild(tmp);
}());

function convertKeywordsToSpans(keyword) {
	// If it's a number, return it directly
	if (keyword * 1 >= 0) {
		return keyword * 1;
	}

	switch (keyword) {
		case 'hide':
			return 0;
		case 'one-half':
			return 6;
		case 'one-third':
			return 4;
		case 'two-thirds':
			return 8;
		case 'one-quarter':
			return 3;
		case 'three-quarters':
			return 9;
		case 'full-width':
			return 12;
	}
}

function getExpectedSpans(el) {
	var span = null;
	var layout = getCurrentLayout();

	var rules = el.dataset.oGridColspan;

	var layoutAndKeyword = new RegExp('\\b' + layout + '(1[0-2]|[0-9]|hide|one-half|one-third|two-thirds|one-quarter|three-quarters|full-width)\\b');
	span = rules.match(layoutAndKeyword);

	if (span === null) {
		var numberOfColumns = new RegExp('\\b(1[0-2]|[0-9]|hide|one-half|one-third|two-thirds|one-quarter|three-quarters|full-width)\\b');
		span = rules.match(numberOfColumns);
	}

	if (span === null) {
		return 12;
	}

	return convertKeywordsToSpans(span[1]);
}

// Get offset, pull, push
function getExpectedModifier(el, modifier) {
	var rules = el.dataset.oGridColspan;
	var re = new RegExp(modifier, "g");

	if (!re.test(rules)) {
		return 0;
	}

	var layout = getCurrentLayout();

	var modifiedBy;
	rules.replace(new RegExp('(?:^|\\s)' + layout + modifier + '(\\d{1,2})', 'g'), function($0, $1) {
		modifiedBy = $1;
	});

	if (typeof modifiedBy === 'undefined') {
		rules.replace(new RegExp('(?:^|\\s)' + modifier + '(\\d{1,2})', 'g'), function($0, $1) {
			modifiedBy = $1;
		});
	}

	if (typeof modifiedBy === 'undefined') {
		return 0;
	}

	return modifiedBy / 12 * (parseInt(getComputedStyle(el.parentNode, null).getPropertyValue('width'), 10) - defaultGutter);
}

function getExpectedGutter(el, side) {
	var layout = getCurrentLayout();

	var gutterClassName = 'o-grid-remove-gutters';
	var specificGutterClassName = gutterClassName + '--' + side + '--' + layout;
	var layoutGutterClassName = gutterClassName + '--' + layout;
	var sideGutterClassName = gutterClassName + '--' + side;
	var compactClassName = 'o-grid-row--compact';

	if (el.classList.contains(gutterClassName) ||
		el.classList.contains(specificGutterClassName) ||
		el.classList.contains(layoutGutterClassName) ||
		el.classList.contains(sideGutterClassName) ||
		el.parentNode.classList.contains(compactClassName)) {
		return false;
	}

	return true;
}

function highlightUnexpectedGutter(el) {
	var expectedLeft = getExpectedGutter(el, 'left');
	var expectedRight = getExpectedGutter(el, 'right');
	var actualRight = parseInt(getComputedStyle(el, null).getPropertyValue('padding-right'), 10) > 0;
	var actualLeft = parseInt(getComputedStyle(el, null).getPropertyValue('padding-left'), 10) > 0;

	if (expectedLeft !== actualLeft || expectedRight !== actualRight) {
		/\berror-gutter\b/.test(el.className) || (el.className += ' error-gutter');
		console.error('Gutter error', el, 'Left: ' + expectedLeft + ' (expected) ' + actualLeft  + ' (actual) ',  'Right: ' + expectedRight + ' (expected) ' + actualRight  + ' (actual) ');
	} else {
		el.className = el.className.replace(/\berror-gutter\b/g, '');
	}
}


function getExpectedMargin(el, side) {
	var layout = getCurrentLayout();

	var centerModifier = 'center';
	var layoutCenterModifier = layout + 'center';
	var layoutUncenterModifier = layout + 'uncenter';
	var modifiers = el.dataset.oGridColspan.split(' ');

	if (el.dataset.oGridColspan.includes('offset')) {
		if (side === 'left') {
			return getExpectedModifier(el, 'offset');
		}
	}

	// Uncentered
	if (modifiers.includes(layoutUncenterModifier)) {
		return 0;
	}

	// Centered
	if (modifiers.includes(centerModifier) || modifiers.includes(layoutCenterModifier)) {
		// half of the remaining space left by the column
		return 0.5 * (parseInt(getComputedStyle(el.parentNode, null).getPropertyValue('width'), 10) - parseInt(getComputedStyle(el, null).getPropertyValue('width'), 10) - defaultGutter);
	}

	return 0;
}

function highlightUnexpectedMargin(el) {
	var expectedLeft = getExpectedMargin(el, 'left');
	var expectedRight = getExpectedMargin(el, 'right');
	var actualRight = parseInt(getComputedStyle(el, null).getPropertyValue('margin-right'), 10);
	var actualLeft = parseInt(getComputedStyle(el, null).getPropertyValue('margin-left'), 10);

	// We verify if margins are "almost equal" because of rounding errors
	if (almostEqual(expectedLeft, actualLeft, 1, 1) && almostEqual(expectedRight, actualRight, 1, 1)) {
		el.className = el.className.replace(/\berror-margin\b/g, '');
	} else {
		/\berror-margin\b/.test(el.className) || (el.className += ' error-margin');
		console.error('Margin error', el, 'Left: ' + expectedLeft + ' (expected) ' + actualLeft  + ' (actual) ',  'Right: ' + expectedRight + ' (expected) ' + actualRight  + ' (actual) ');
	}
}

function highlightUnexpectedPosition(el) {
	var expectedPush = getExpectedModifier(el, 'push');
	var expectedPull = getExpectedModifier(el, 'pull');
	var actualPush = getComputedStyle(el, null).getPropertyValue('left');
	var actualPull = getComputedStyle(el, null).getPropertyValue('right');
	actualPush = (actualPush === 'auto' ? 0 : parseInt(actualPush, 10));
	actualPull = (actualPull === 'auto' ? 0 : parseInt(actualPull, 10));


	// We verify if positions are "almost equal" because of rounding errors
	if (almostEqual(expectedPush, actualPush, 1, 1) && almostEqual(expectedPull, actualPull, 1, 1)) {
		el.className = el.className.replace(/\berror-position\b/g, '');
	} else {
		/\berror-position\b/.test(el.className) || (el.className += ' error-position');
		console.error('Position error', el, 'Push: ' + expectedPush + ' (expected) ' + actualPush  + ' (actual) ',  'Pull: ' + expectedPull + ' (expected) ' + actualPull  + ' (actual) ');
	}
}

function highlightUnexpectedWidth(el) {
	var outerMargins = 10;

	if (document.documentElement.classList.contains('stylesheet-resized')) {
		outerMargins = resizedOuterMarginWidth;
	}

	if ($(el).parents('.o-grid-row--compact').length > 0) {
		outerMargins = 0;
	}

	// If the element is in a nested row,
	// then there are no outer margins
	if ($(el).parents('.o-grid-row').parents('.o-grid-row').length > 0) {
		outerMargins = 0;
	}

	var expectedPercentage = getExpectedSpans(el) * 100/12;
	var actualPercentage = el.offsetWidth * 100 / (el.parentNode.offsetWidth - outerMargins);

	if (expectedPercentage - actualPercentage > 1 || expectedPercentage - actualPercentage < -1) {
		/\berror-width\b/.test(el.className) || (el.className += ' error-width');
		console.error('Width error', el.attributes['data-o-grid-colspan'], 'Expected: ' + expectedPercentage, 'Actual: ' + actualPercentage);
	} else {
		el.className = el.className.replace(/\berror-width\b/g, '');
	}
}



function tests() {
	console.log('Test suite: starting');
	Array.prototype.forEach.call(document.querySelectorAll('[class*="gutter"]'), highlightUnexpectedGutter);
	Array.prototype.forEach.call(document.querySelectorAll('[data-o-grid-colspan]'), highlightUnexpectedWidth);
	Array.prototype.forEach.call(document.querySelectorAll('[data-o-grid-colspan]'), highlightUnexpectedMargin);
	Array.prototype.forEach.call(document.querySelectorAll('[data-o-grid-colspan]'), highlightUnexpectedPosition);
	console.log('Test suite: finished');
}

var resizeTimer = null;

function runTests() {
	setTimeout(tests, 300);

	window.onresize = function(e) {
		if (resizeTimer !== null) {
			clearTimeout(resizeTimer);
		}

		resizeTimer = setTimeout(tests, 300);
	};
}

if (document.body.classList.contains('test')) {
	runTests();
}
