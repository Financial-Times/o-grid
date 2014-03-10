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
            stylesheet.href = 'css/grid-' + type + '.css';
            var prev = document.querySelector('.selected-stylesheet');
            if (prev) {
                prev.className = '';
            }
            this.className = 'selected-stylesheet';

            subheading && (subheading.innerHTML = this.title);
            html.className = html.className.replace(/stylesheet-(\w|-)+/, '') + ' stylesheet-' + type;

        });
        if (!tmp.childNodes.length) {
            stylesheet.href = 'css/grid-' + type + '.css';
            setTimeout(test, 1);
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