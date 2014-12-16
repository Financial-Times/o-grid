/*global $*/
/*jshint devel:true*/
'use strict';

var getCurrentLayout = require('../../../main').getCurrentLayout;
var local = true;
var resizedOuterMarginWidth = 5; // Same as $o-grid-gutter in resized.scss

// Self-contained stylesheet switcher
(function styleSwitcher () {
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

function getExpectedSpans (el) {
	if (document.documentElement.className.contains('core-experience')) {
		return 12;
	}

	var layout = getCurrentLayout();

	var rules = el.dataset.oGridColspan;
	var spans;
	rules.replace(new RegExp('(?:^|\\s)' + layout + '(\\d{1,2})', 'g'), function ($0, $1) {
		spans = $1;
	});

	if (typeof spans === 'undefined') {
		rules.replace(/(?:^|\s)(\d{1,2})/g, function ($0, $1) {
			spans = $1;
		});
	}

	return spans;
}

function getExpectedGutter (el, side) {
	if (document.documentElement.className.contains('core-experience')) {
		return true; // Core experience always has gutters
	}

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

function highlightNotExpectedGutter (el) {
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

function highlightNotExpectedWidth (el) {
	var outerMargins = 10;

	if (document.documentElement.className.contains('resized')) {
		outerMargins = resizedOuterMarginWidth;
	}

	if ($(el).parents('.o-grid-row--compact').length > 0) {
		outerMargins = 0;
	}

	if (document.documentElement.className.contains('core-experience')) {
		outerMargins = 10; // Restore default margins if column is in a compact row
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

function test () {
	Array.prototype.forEach.call(document.querySelectorAll('[class*="gutter"]'), highlightNotExpectedGutter);
	Array.prototype.forEach.call(document.querySelectorAll('[data-o-grid-colspan]'), highlightNotExpectedWidth);
}

var runTests = function () {
	setTimeout(test, 200);
	window.onresize = test;
};

if (document.querySelector('.demo-test')) runTests();
