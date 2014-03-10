require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = {
	"silent": "By default the grid should output no styles and all blocks extend to full page width",
	"default": "Fluid grid with max width of 600px - mocks behaviour if media queries not supported",
	"device-width-mq": "Demonstrates the behaviour of a page using the default installation of o-grid (responding to device, not window, width",
	"width-mq": "Responsive grid that responds to window rather than device width (mainly to make development easier)",
	"non-fluid": "Demonstrates the behaviour of a page using a non-fluid version of the responsive grid",
	"resized": "Responsive grid with breakpoints reallocated to 400px, 800px and 1200px and gutters halved",
	"disabled": "Responsive grid with the extra large layout disabled",
	"always-fixed": "Fixed grid at 960px across all browsers and devices"
};
},{}],"AwW+8k":[function(require,module,exports){
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
},{"../configurations.js":1}],"o-grid":[function(require,module,exports){
module.exports=require('AwW+8k');
},{}]},{},["AwW+8k"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvdXNyL2xvY2FsL2xpYi9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL3JoeXMuZXZhbnMvU2l0ZXMvby1tb2R1bGVzL28tZ3JpZC9kZW1vLXNyYy9jb25maWd1cmF0aW9ucy5qcyIsIi9Vc2Vycy9yaHlzLmV2YW5zL1NpdGVzL28tbW9kdWxlcy9vLWdyaWQvZGVtby1zcmMvanMvc3R5bGUtc3dpdGNoZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibW9kdWxlLmV4cG9ydHMgPSB7XG5cdFwic2lsZW50XCI6IFwiQnkgZGVmYXVsdCB0aGUgZ3JpZCBzaG91bGQgb3V0cHV0IG5vIHN0eWxlcyBhbmQgYWxsIGJsb2NrcyBleHRlbmQgdG8gZnVsbCBwYWdlIHdpZHRoXCIsXG5cdFwiZGVmYXVsdFwiOiBcIkZsdWlkIGdyaWQgd2l0aCBtYXggd2lkdGggb2YgNjAwcHggLSBtb2NrcyBiZWhhdmlvdXIgaWYgbWVkaWEgcXVlcmllcyBub3Qgc3VwcG9ydGVkXCIsXG5cdFwiZGV2aWNlLXdpZHRoLW1xXCI6IFwiRGVtb25zdHJhdGVzIHRoZSBiZWhhdmlvdXIgb2YgYSBwYWdlIHVzaW5nIHRoZSBkZWZhdWx0IGluc3RhbGxhdGlvbiBvZiBvLWdyaWQgKHJlc3BvbmRpbmcgdG8gZGV2aWNlLCBub3Qgd2luZG93LCB3aWR0aFwiLFxuXHRcIndpZHRoLW1xXCI6IFwiUmVzcG9uc2l2ZSBncmlkIHRoYXQgcmVzcG9uZHMgdG8gd2luZG93IHJhdGhlciB0aGFuIGRldmljZSB3aWR0aCAobWFpbmx5IHRvIG1ha2UgZGV2ZWxvcG1lbnQgZWFzaWVyKVwiLFxuXHRcIm5vbi1mbHVpZFwiOiBcIkRlbW9uc3RyYXRlcyB0aGUgYmVoYXZpb3VyIG9mIGEgcGFnZSB1c2luZyBhIG5vbi1mbHVpZCB2ZXJzaW9uIG9mIHRoZSByZXNwb25zaXZlIGdyaWRcIixcblx0XCJyZXNpemVkXCI6IFwiUmVzcG9uc2l2ZSBncmlkIHdpdGggYnJlYWtwb2ludHMgcmVhbGxvY2F0ZWQgdG8gNDAwcHgsIDgwMHB4IGFuZCAxMjAwcHggYW5kIGd1dHRlcnMgaGFsdmVkXCIsXG5cdFwiZGlzYWJsZWRcIjogXCJSZXNwb25zaXZlIGdyaWQgd2l0aCB0aGUgZXh0cmEgbGFyZ2UgbGF5b3V0IGRpc2FibGVkXCIsXG5cdFwiYWx3YXlzLWZpeGVkXCI6IFwiRml4ZWQgZ3JpZCBhdCA5NjBweCBhY3Jvc3MgYWxsIGJyb3dzZXJzIGFuZCBkZXZpY2VzXCJcbn07IiwidmFyIGRlbW9UeXBlcyA9IHJlcXVpcmUoJy4uL2NvbmZpZ3VyYXRpb25zLmpzJyk7XG5cbnZhciBicmVha3BvaW50cyA9IFs2MDAsIDEwMDAsIDE0MDBdO1xuXG5mdW5jdGlvbiBnZXRMYXlvdXQgKCkge1xuICAgIHJldHVybiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQub2Zmc2V0V2lkdGggPCA2MDAgPyAnUycgOlxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQub2Zmc2V0V2lkdGggPCAxMDAwID8gJ00nIDpcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50Lm9mZnNldFdpZHRoIDwgMTQwMCA/ICdMJyA6ICdYTCc7XG59XG5cbmZ1bmN0aW9uIHN0eWxlU3dpdGNoZXIgKCkge1xuICAgIHZhciBzdHlsZXNoZWV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImxpbmtbcmVsPSdzdHlsZXNoZWV0J11cIiksXG4gICAgICAgIGh0bWwgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsXG4gICAgICAgIGJ1dHRvbkNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3R5bGVTd2l0Y2hlclwiKSxcbiAgICAgICAgdG1wID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpLFxuICAgICAgICBzdWJoZWFkaW5nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdWJoZWFkaW5nXCIpO1xuXG4gICAgT2JqZWN0LmtleXMoZGVtb1R5cGVzKS5mb3JFYWNoKGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgICAgIHZhciBidXR0b24gID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIGJ1dHRvbi5pbm5lckhUTUwgPSB0eXBlO1xuICAgICAgICBidXR0b24udGl0bGUgPSBkZW1vVHlwZXNbdHlwZV07XG4gICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHN0eWxlc2hlZXQuaHJlZiA9ICdjc3MvZ3JpZC0nICsgdHlwZSArICcuY3NzJztcbiAgICAgICAgICAgIHZhciBwcmV2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlbGVjdGVkLXN0eWxlc2hlZXQnKTtcbiAgICAgICAgICAgIGlmIChwcmV2KSB7XG4gICAgICAgICAgICAgICAgcHJldi5jbGFzc05hbWUgPSAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY2xhc3NOYW1lID0gJ3NlbGVjdGVkLXN0eWxlc2hlZXQnO1xuXG4gICAgICAgICAgICBzdWJoZWFkaW5nICYmIChzdWJoZWFkaW5nLmlubmVySFRNTCA9IHRoaXMudGl0bGUpO1xuICAgICAgICAgICAgaHRtbC5jbGFzc05hbWUgPSBodG1sLmNsYXNzTmFtZS5yZXBsYWNlKC9zdHlsZXNoZWV0LShcXHd8LSkrLywgJycpICsgJyBzdHlsZXNoZWV0LScgKyB0eXBlO1xuXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIXRtcC5jaGlsZE5vZGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgc3R5bGVzaGVldC5ocmVmID0gJ2Nzcy9ncmlkLScgKyB0eXBlICsgJy5jc3MnO1xuICAgICAgICAgICAgc2V0VGltZW91dCh0ZXN0LCAxKTtcbiAgICAgICAgICAgIGJ1dHRvbi5jbGFzc05hbWUgPSAnc2VsZWN0ZWQtc3R5bGVzaGVldCc7XG4gICAgICAgICAgICBodG1sLmNsYXNzTmFtZSArPSAnIHN0eWxlc2hlZXQtJyArIHR5cGU7XG4gICAgICAgICAgICBzdWJoZWFkaW5nICYmIChzdWJoZWFkaW5nLmlubmVySFRNTCA9IGJ1dHRvbi50aXRsZSk7XG4gICAgICAgIH1cbiAgICAgICAgdG1wLmFwcGVuZENoaWxkKGJ1dHRvbik7XG4gICAgICAgIFxuICAgIH0pO1xuXG4gICAgYnV0dG9uQ29udGFpbmVyLmFwcGVuZENoaWxkKHRtcCk7XG59XG5cbmZ1bmN0aW9uIGdldEV4cGVjdGVkU3BhbnMgKGVsKSB7XG4gICAgdmFyIGxheW91dCA9IGdldExheW91dCgpO1xuXG4gICAgdmFyIHJ1bGVzID0gZWwuZGF0YXNldC5vR3JpZENvbHNwYW4sXG4gICAgICAgIHNwYW5zO1xuICAgIHJ1bGVzLnJlcGxhY2UobmV3IFJlZ0V4cCgnKD86XnxcXFxcXFxzKScgKyBsYXlvdXQgKyAnKFxcXFxcXGR7MSwyfSknLCAnZycpLCBmdW5jdGlvbiAoJDAsICQxKSB7XG4gICAgICAgIHNwYW5zID0gJDE7XG4gICAgfSk7XG5cbiAgICBpZiAodHlwZW9mIHNwYW5zID09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJ1bGVzLnJlcGxhY2UoLyg/Ol58XFxzKShcXGR7MSwyfSkvZywgZnVuY3Rpb24gKCQwLCAkMSkge1xuICAgICAgICAgICAgc3BhbnMgPSAkMTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBzcGFucztcbn1cblxuZnVuY3Rpb24gZ2V0RXhwZWN0ZWRHdXR0ZXIgKGVsLCBzaWRlKSB7XG4gICAgdmFyIGxheW91dCA9IGdldExheW91dCgpO1xuXG4gICAgdmFyIHJ1bGVzID0gZWwuY2xhc3NOYW1lLFxuICAgICAgICBndXR0ZXIgPSAhKG5ldyBSZWdFeHAoJyhefFxcXFxcXHMpZ3V0KC0nICsgc2lkZSArICd8LScgKyBsYXlvdXQgKyAnfC0nICsgc2lkZSArICctJyArIGxheW91dCArICd8JHxcXFxcXFxzKScsICdnJykudGVzdChydWxlcykpO1xuXG4gICAgaWYgKGd1dHRlcikge1xuICAgICAgICBndXR0ZXIgPSAhL28tZ3JpZC1yb3ctY29tcGFjdC8udGVzdChlbC5wYXJlbnROb2RlLmNsYXNzTmFtZSk7XG4gICAgfSBcblxuICAgIHJldHVybiBndXR0ZXI7XG59XG5cbmZ1bmN0aW9uIGhpZ2hsaWdodE5vdEV4cGVjdGVkR3V0dGVyIChlbCkge1xuICAgIHZhciBleHBlY3RlZExlZnQgPSBnZXRFeHBlY3RlZEd1dHRlcihlbCwgJ2wnKSxcbiAgICAgICAgZXhwZWN0ZWRSaWdodCA9IGdldEV4cGVjdGVkR3V0dGVyKGVsLCAncicpLFxuICAgICAgICBhY3R1YWxSaWdodCA9IHBhcnNlSW50KGdldENvbXB1dGVkU3R5bGUoZWwsIG51bGwpLmdldFByb3BlcnR5VmFsdWUoJ3BhZGRpbmctcmlnaHQnKSwgMTApID4gMCxcbiAgICAgICAgYWN0dWFsTGVmdCA9IHBhcnNlSW50KGdldENvbXB1dGVkU3R5bGUoZWwsIG51bGwpLmdldFByb3BlcnR5VmFsdWUoJ3BhZGRpbmctbGVmdCcpLCAxMCkgPiAwO1xuICBcbiAgICBpZiAoZXhwZWN0ZWRMZWZ0ICE9IGFjdHVhbExlZnQgfHwgZXhwZWN0ZWRSaWdodCAhPSBhY3R1YWxSaWdodCkge1xuICAgICAgICAvXFxiZXJyb3ItZ3V0dGVyXFxiLy50ZXN0KGVsLmNsYXNzTmFtZSkgfHwgKGVsLmNsYXNzTmFtZSArPSAnIGVycm9yLWd1dHRlcicpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGVsLmNsYXNzTmFtZSA9IGVsLmNsYXNzTmFtZS5yZXBsYWNlKC9cXGJlcnJvci1ndXR0ZXJcXGIvZywgJycpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gaGlnaGxpZ2h0Tm90RXhwZWN0ZWRXaWR0aCAoZWwpIHtcbiAgICB2YXIgZXhwZWN0ZWRQZXJjZW50YWdlID0gZ2V0RXhwZWN0ZWRTcGFucyhlbCkgKiAxMDAvMTIsXG4gICAgICAgIGFjdHVhbFBlcmNlbnRhZ2UgPSBlbC5vZmZzZXRXaWR0aCAqIDEwMCAvIGVsLnBhcmVudE5vZGUub2Zmc2V0V2lkdGg7XG4gIFxuICAgIGlmIChleHBlY3RlZFBlcmNlbnRhZ2UgLSBhY3R1YWxQZXJjZW50YWdlID4gMSB8fCBleHBlY3RlZFBlcmNlbnRhZ2UgLSBhY3R1YWxQZXJjZW50YWdlIDwgLTEpIHtcbiAgICAgICAgIC9cXGJlcnJvci13aWR0aFxcYi8udGVzdChlbC5jbGFzc05hbWUpIHx8IChlbC5jbGFzc05hbWUgKz0gJyBlcnJvci13aWR0aCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGVsLmNsYXNzTmFtZSA9IGVsLmNsYXNzTmFtZS5yZXBsYWNlKC9cXGJlcnJvci13aWR0aFxcYi9nLCAnJyk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiB0ZXN0ICgpIHtcbiAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tjbGFzcyo9XCJndXRcIl0nKSwgaGlnaGxpZ2h0Tm90RXhwZWN0ZWRHdXR0ZXIpO1xuICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtby1ncmlkLWNvbHNwYW5dJyksIGhpZ2hsaWdodE5vdEV4cGVjdGVkV2lkdGgpO1xufVxuXG52YXIgcnVuVGVzdHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgc2V0VGltZW91dCh0ZXN0LCAxKTtcbiAgICB3aW5kb3cub25yZXNpemUgPSB0ZXN0O1xufTtcblxuaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2gxJykudGV4dENvbnRlbnQuaW5kZXhPZignVGVzdCcpID09PSAwKSB7XG4gICAgcnVuVGVzdHMoKTtcbn1cbnN0eWxlU3dpdGNoZXIoKTsiXX0=
