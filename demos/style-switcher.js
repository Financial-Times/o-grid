(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = {
	"silent": "By default the grid should output no styles and all blocks extend to full page width",
	"default": "Fluid grid with max width of 600px - mocks behaviour if media queries not supported",
	"device-width-mq": "Demonstrates the behaviour of a page using the default installation of o-grid (responding to device, not window, width",
	"width-mq": "Responsive grid that responds to window rather than device width (mainly to make development easier)",
	"non-fluid": "Demonstrates the behaviour of a page using a non-fluid version of the responsive grid",
	"resized": "Responsive grid with breakpoints reallocated to 400px, 800px and 1200px and gutters halved",
	"xl-disabled": "Responsive grid with the extra large layout disabled",
	"always-fixed": "Fixed grid at 960px across all browsers and devices"
};
},{}],2:[function(require,module,exports){
var demoTypes = require('../configurations.js');

var breakpoints = [600, 1000, 1400];

function getLayout () {
    return document.documentElement.offsetWidth < 600 ? 'S' :
        document.documentElement.offsetWidth < 1000 ? 'M' :
        document.documentElement.offsetWidth < 1400 ? 'L' : 'XL';
}

function styleSwitcher () {
    var stylesheet = document.querySelector("link[rel='stylesheet']"),
        html = document.documentElement,
        buttonContainer = document.getElementById("styleSwitcher"),
        tmp = document.createDocumentFragment(),
        subheading = document.getElementById("subheading");

    Object.keys(demoTypes).forEach(function (type) {
        var button  = document.createElement('button');
        button.innerHTML = type;
        button.title = demoTypes[type];
        button.addEventListener('click', function () {
            stylesheet.href = type + '.css';
            var prev = document.querySelector('.selected-stylesheet');
            if (prev) {
                prev.className = '';
            }
            this.className = 'selected-stylesheet';

            subheading && (subheading.innerHTML = this.title);
            html.className = html.className.replace(/stylesheet-(\w|-)+/, '') + ' stylesheet-' + type;

        });
        if (!tmp.childNodes.length) {
            stylesheet.href = type + '.css';
            button.className = 'selected-stylesheet';
            html.className += ' stylesheet-' + type;
            subheading && (subheading.innerHTML = button.title);
        }
        tmp.appendChild(button);
        
    });

    buttonContainer.appendChild(tmp);
}

function getExpectedSpans (el) {
    var layout = getLayout();

    var rules = el.dataset.oGridColspan,
        spans;
    rules.replace(new RegExp('(?:^|\\\s)' + layout + '(\\\d{1,2})', 'g'), function ($0, $1) {
        spans = $1;
    });

    if (typeof spans == 'undefined') {
        rules.replace(/(?:^|\s)(\d{1,2})/g, function ($0, $1) {
            spans = $1;
        });
    }
    return spans;
}

function getExpectedGutter (el, side) {
    var layout = getLayout();

    var rules = el.className,
        gutter = !(new RegExp('(^|\\\s)gut(-' + side + '|-' + layout + '|-' + side + '-' + layout + '|$|\\\s)', 'g').test(rules));

    if (gutter) {
        gutter = !/o-grid-row-compact/.test(el.parentNode.className);
    } 

    return gutter;
}

function highlightNotExpectedGutter (el) {
    var expectedLeft = getExpectedGutter(el, 'l'),
        expectedRight = getExpectedGutter(el, 'r'),
        actualRight = parseInt(getComputedStyle(el, null).getPropertyValue('padding-right'), 10) > 0,
        actualLeft = parseInt(getComputedStyle(el, null).getPropertyValue('padding-left'), 10) > 0;
  
    if (expectedLeft != actualLeft || expectedRight != actualRight) {
        /\berror-gutter\b/.test(el.className) || (el.className += ' error-gutter');
    } else {
        el.className = el.className.replace(/\berror-gutter\b/g, '');
    }
}

function highlightNotExpectedWidth (el) {
    var expectedPercentage = getExpectedSpans(el) * 100/12,
        actualPercentage = el.offsetWidth * 100 / el.parentNode.offsetWidth;
  
    if (expectedPercentage - actualPercentage > 1 || expectedPercentage - actualPercentage < -1) {
         /\berror-width\b/.test(el.className) || (el.className += ' error-width');
    } else {
        el.className = el.className.replace(/\berror-width\b/g, '');
    }
}

function test () {
    Array.prototype.forEach.call(document.querySelectorAll('[class*="gut"]'), highlightNotExpectedGutter);
    Array.prototype.forEach.call(document.querySelectorAll('[data-o-grid-colspan]'), highlightNotExpectedWidth);
}

var runTests = function () {
    setTimeout(test, 1);
    window.onresize = test;
};

if (document.querySelector('h1').textContent.indexOf('Test') === 0) {
    runTests();
}
styleSwitcher();
},{"../configurations.js":1}]},{},[2])