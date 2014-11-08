var local = false;

// Self-contained stylesheet switcher
(function styleSwitcher () {
    var demoTypes = require('../configurations.json'),
        stylesheet = document.querySelector("link[rel='stylesheet']"),
        html = document.documentElement,
        buttonContainer = document.getElementById("styleSwitcher"),
        tmp = document.createDocumentFragment(),
        subheading = document.getElementById("subheading");

    Object.keys(demoTypes).forEach(function (type) {
        var button  = document.createElement('button'),
            stylePath = local ? type + '.css' : 'scss/' + type + '.scss';
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


function getLayout () {
    return document.documentElement.offsetWidth < 600 ? 'S' :
        document.documentElement.offsetWidth < 1000 ? 'M' :
        document.documentElement.offsetWidth < 1400 ? 'L' : 'XL';
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

    var gutterClassName = 'o-grid-remove-gutters';
    var specificGutterClassName = gutterClassName + '--' + side + '--' + layout;
    var layoutGutterClassName = gutterClassName + '--' + layout;
    var sideGutterClassName = gutterClassName + '--' + side;
    var compactClassName = 'o-grid-row-compact';
    
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
    var expectedLeft = getExpectedGutter(el, 'left'),
        expectedRight = getExpectedGutter(el, 'right'),
        actualRight = parseInt(getComputedStyle(el, null).getPropertyValue('padding-right'), 10) > 0,
        actualLeft = parseInt(getComputedStyle(el, null).getPropertyValue('padding-left'), 10) > 0;

    if (expectedLeft != actualLeft || expectedRight != actualRight) {
        /\berror-gutter\b/.test(el.className) || (el.className += ' error-gutter');
        console.error('Gutter error', el, expectedLeft, actualLeft, expectedRight, actualRight);
    } else {
        el.className = el.className.replace(/\berror-gutter\b/g, '');
    }
}

function highlightNotExpectedWidth (el) {
    var expectedPercentage = getExpectedSpans(el) * 100/12,
        actualPercentage = el.offsetWidth * 100 / el.parentNode.offsetWidth;

    if (expectedPercentage - actualPercentage > 1 || expectedPercentage - actualPercentage < -1) {
         /\berror-width\b/.test(el.className) || (el.className += ' error-width');
        console.error('Width error', el, expectedPercentage, actualPercentage);
    } else {
        el.className = el.className.replace(/\berror-width\b/g, '');
    }
}

function test () {
    Array.prototype.forEach.call(document.querySelectorAll('[class*="gutter"]'), highlightNotExpectedGutter);
    Array.prototype.forEach.call(document.querySelectorAll('[data-o-grid-colspan]'), highlightNotExpectedWidth);
}

var runTests = function () {
    setTimeout(test, 1);
    window.onresize = test;
};

if (document.querySelector('.demo-test')) runTests();
