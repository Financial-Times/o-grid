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
            setTimeout(test, 1);
            var prev = document.querySelector('.selected-stylesheet');
            if (prev) {
                prev.className = '';
            }
            this.className = 'selected-stylesheet';
            subheading.innerHTML = this.title;
            html.className = html.className.replace(/stylesheet-(\w|-)+/, '') + ' stylesheet-' + type;

        });
        if (!tmp.childNodes.length) {
            stylesheet.href = 'css/grid-' + type + '.css';
            setTimeout(test, 1);
            button.className = 'selected-stylesheet';
            html.className += ' stylesheet-' + type;
            subheading.innerHTML = button.title;
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
    window.onresize = test;
};


runTests();
styleSwitcher();
},{"../configurations.js":1}],"o-grid":[function(require,module,exports){
module.exports=require('AwW+8k');
},{}]},{},["AwW+8k"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvdXNyL2xvY2FsL2xpYi9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL3JoeXMuZXZhbnMvU2l0ZXMvby1tb2R1bGVzL28tZ3JpZC9kZW1vLXNyYy9jb25maWd1cmF0aW9ucy5qcyIsIi9Vc2Vycy9yaHlzLmV2YW5zL1NpdGVzL28tbW9kdWxlcy9vLWdyaWQvZGVtby1zcmMvanMvc3R5bGUtc3dpdGNoZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJtb2R1bGUuZXhwb3J0cyA9IHtcblx0XCJzaWxlbnRcIjogXCJCeSBkZWZhdWx0IHRoZSBncmlkIHNob3VsZCBvdXRwdXQgbm8gc3R5bGVzIGFuZCBhbGwgYmxvY2tzIGV4dGVuZCB0byBmdWxsIHBhZ2Ugd2lkdGhcIixcblx0XCJkZWZhdWx0XCI6IFwiRmx1aWQgZ3JpZCB3aXRoIG1heCB3aWR0aCBvZiA2MDBweCAtIG1vY2tzIGJlaGF2aW91ciBpZiBtZWRpYSBxdWVyaWVzIG5vdCBzdXBwb3J0ZWRcIixcblx0XCJkZXZpY2Utd2lkdGgtbXFcIjogXCJEZW1vbnN0cmF0ZXMgdGhlIGJlaGF2aW91ciBvZiBhIHBhZ2UgdXNpbmcgdGhlIGRlZmF1bHQgaW5zdGFsbGF0aW9uIG9mIG8tZ3JpZCAocmVzcG9uZGluZyB0byBkZXZpY2UsIG5vdCB3aW5kb3csIHdpZHRoXCIsXG5cdFwid2lkdGgtbXFcIjogXCJSZXNwb25zaXZlIGdyaWQgdGhhdCByZXNwb25kcyB0byB3aW5kb3cgcmF0aGVyIHRoYW4gZGV2aWNlIHdpZHRoIChtYWlubHkgdG8gbWFrZSBkZXZlbG9wbWVudCBlYXNpZXIpXCIsXG5cdFwibm9uLWZsdWlkXCI6IFwiRGVtb25zdHJhdGVzIHRoZSBiZWhhdmlvdXIgb2YgYSBwYWdlIHVzaW5nIGEgbm9uLWZsdWlkIHZlcnNpb24gb2YgdGhlIHJlc3BvbnNpdmUgZ3JpZFwiLFxuXHRcInJlc2l6ZWRcIjogXCJSZXNwb25zaXZlIGdyaWQgd2l0aCBicmVha3BvaW50cyByZWFsbG9jYXRlZCB0byA0MDBweCwgODAwcHggYW5kIDEyMDBweCBhbmQgZ3V0dGVycyBoYWx2ZWRcIixcblx0XCJkaXNhYmxlZFwiOiBcIlJlc3BvbnNpdmUgZ3JpZCB3aXRoIHRoZSBleHRyYSBsYXJnZSBsYXlvdXQgZGlzYWJsZWRcIixcblx0XCJhbHdheXMtZml4ZWRcIjogXCJGaXhlZCBncmlkIGF0IDk2MHB4IGFjcm9zcyBhbGwgYnJvd3NlcnMgYW5kIGRldmljZXNcIlxufTsiLCJ2YXIgZGVtb1R5cGVzID0gcmVxdWlyZSgnLi4vY29uZmlndXJhdGlvbnMuanMnKTtcblxudmFyIGJyZWFrcG9pbnRzID0gWzYwMCwgMTAwMCwgMTQwMF07XG5cbmZ1bmN0aW9uIGdldExheW91dCAoKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5vZmZzZXRXaWR0aCA8IDYwMCA/ICdTJyA6XG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5vZmZzZXRXaWR0aCA8IDEwMDAgPyAnTScgOlxuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQub2Zmc2V0V2lkdGggPCAxNDAwID8gJ0wnIDogJ1hMJztcbn1cblxuZnVuY3Rpb24gc3R5bGVTd2l0Y2hlciAoKSB7XG4gICAgdmFyIHN0eWxlc2hlZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwibGlua1tyZWw9J3N0eWxlc2hlZXQnXVwiKSxcbiAgICAgICAgaHRtbCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCxcbiAgICAgICAgYnV0dG9uQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdHlsZVN3aXRjaGVyXCIpLFxuICAgICAgICB0bXAgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCksXG4gICAgICAgIHN1YmhlYWRpbmcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN1YmhlYWRpbmdcIik7XG5cbiAgICBPYmplY3Qua2V5cyhkZW1vVHlwZXMpLmZvckVhY2goZnVuY3Rpb24gKHR5cGUpIHtcbiAgICAgICAgdmFyIGJ1dHRvbiAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgYnV0dG9uLmlubmVySFRNTCA9IHR5cGU7XG4gICAgICAgIGJ1dHRvbi50aXRsZSA9IGRlbW9UeXBlc1t0eXBlXTtcbiAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc3R5bGVzaGVldC5ocmVmID0gJ2Nzcy9ncmlkLScgKyB0eXBlICsgJy5jc3MnO1xuICAgICAgICAgICAgc2V0VGltZW91dCh0ZXN0LCAxKTtcbiAgICAgICAgICAgIHZhciBwcmV2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlbGVjdGVkLXN0eWxlc2hlZXQnKTtcbiAgICAgICAgICAgIGlmIChwcmV2KSB7XG4gICAgICAgICAgICAgICAgcHJldi5jbGFzc05hbWUgPSAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY2xhc3NOYW1lID0gJ3NlbGVjdGVkLXN0eWxlc2hlZXQnO1xuICAgICAgICAgICAgc3ViaGVhZGluZy5pbm5lckhUTUwgPSB0aGlzLnRpdGxlO1xuICAgICAgICAgICAgaHRtbC5jbGFzc05hbWUgPSBodG1sLmNsYXNzTmFtZS5yZXBsYWNlKC9zdHlsZXNoZWV0LShcXHd8LSkrLywgJycpICsgJyBzdHlsZXNoZWV0LScgKyB0eXBlO1xuXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIXRtcC5jaGlsZE5vZGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgc3R5bGVzaGVldC5ocmVmID0gJ2Nzcy9ncmlkLScgKyB0eXBlICsgJy5jc3MnO1xuICAgICAgICAgICAgc2V0VGltZW91dCh0ZXN0LCAxKTtcbiAgICAgICAgICAgIGJ1dHRvbi5jbGFzc05hbWUgPSAnc2VsZWN0ZWQtc3R5bGVzaGVldCc7XG4gICAgICAgICAgICBodG1sLmNsYXNzTmFtZSArPSAnIHN0eWxlc2hlZXQtJyArIHR5cGU7XG4gICAgICAgICAgICBzdWJoZWFkaW5nLmlubmVySFRNTCA9IGJ1dHRvbi50aXRsZTtcbiAgICAgICAgfVxuICAgICAgICB0bXAuYXBwZW5kQ2hpbGQoYnV0dG9uKTtcbiAgICAgICAgXG4gICAgfSk7XG5cbiAgICBidXR0b25Db250YWluZXIuYXBwZW5kQ2hpbGQodG1wKTtcbn1cblxuZnVuY3Rpb24gZ2V0RXhwZWN0ZWRTcGFucyAoZWwpIHtcbiAgICB2YXIgbGF5b3V0ID0gZ2V0TGF5b3V0KCk7XG5cbiAgICB2YXIgcnVsZXMgPSBlbC5kYXRhc2V0Lm9HcmlkQ29sc3BhbixcbiAgICAgICAgc3BhbnM7XG4gICAgcnVsZXMucmVwbGFjZShuZXcgUmVnRXhwKCcoPzpefFxcXFxcXHMpJyArIGxheW91dCArICcoXFxcXFxcZHsxLDJ9KScsICdnJyksIGZ1bmN0aW9uICgkMCwgJDEpIHtcbiAgICAgICAgc3BhbnMgPSAkMTtcbiAgICB9KTtcblxuICAgIGlmICh0eXBlb2Ygc3BhbnMgPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcnVsZXMucmVwbGFjZSgvKD86XnxcXHMpKFxcZHsxLDJ9KS9nLCBmdW5jdGlvbiAoJDAsICQxKSB7XG4gICAgICAgICAgICBzcGFucyA9ICQxO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHNwYW5zO1xufVxuXG5mdW5jdGlvbiBnZXRFeHBlY3RlZEd1dHRlciAoZWwsIHNpZGUpIHtcbiAgICB2YXIgbGF5b3V0ID0gZ2V0TGF5b3V0KCk7XG5cbiAgICB2YXIgcnVsZXMgPSBlbC5jbGFzc05hbWUsXG4gICAgICAgIGd1dHRlciA9ICEobmV3IFJlZ0V4cCgnKF58XFxcXFxccylndXQoLScgKyBzaWRlICsgJ3wtJyArIGxheW91dCArICd8LScgKyBzaWRlICsgJy0nICsgbGF5b3V0ICsgJ3wkfFxcXFxcXHMpJywgJ2cnKS50ZXN0KHJ1bGVzKSk7XG5cbiAgICBpZiAoZ3V0dGVyKSB7XG4gICAgICAgIGd1dHRlciA9ICEvby1ncmlkLXJvdy1jb21wYWN0Ly50ZXN0KGVsLnBhcmVudE5vZGUuY2xhc3NOYW1lKTtcbiAgICB9IFxuXG4gICAgcmV0dXJuIGd1dHRlcjtcbn1cblxuZnVuY3Rpb24gaGlnaGxpZ2h0Tm90RXhwZWN0ZWRHdXR0ZXIgKGVsKSB7XG4gICAgdmFyIGV4cGVjdGVkTGVmdCA9IGdldEV4cGVjdGVkR3V0dGVyKGVsLCAnbCcpLFxuICAgICAgICBleHBlY3RlZFJpZ2h0ID0gZ2V0RXhwZWN0ZWRHdXR0ZXIoZWwsICdyJyksXG4gICAgICAgIGFjdHVhbFJpZ2h0ID0gcGFyc2VJbnQoZ2V0Q29tcHV0ZWRTdHlsZShlbCwgbnVsbCkuZ2V0UHJvcGVydHlWYWx1ZSgncGFkZGluZy1yaWdodCcpLCAxMCkgPiAwLFxuICAgICAgICBhY3R1YWxMZWZ0ID0gcGFyc2VJbnQoZ2V0Q29tcHV0ZWRTdHlsZShlbCwgbnVsbCkuZ2V0UHJvcGVydHlWYWx1ZSgncGFkZGluZy1sZWZ0JyksIDEwKSA+IDA7XG4gIFxuICAgIGlmIChleHBlY3RlZExlZnQgIT0gYWN0dWFsTGVmdCB8fCBleHBlY3RlZFJpZ2h0ICE9IGFjdHVhbFJpZ2h0KSB7XG4gICAgICAgIC9cXGJlcnJvci1ndXR0ZXJcXGIvLnRlc3QoZWwuY2xhc3NOYW1lKSB8fCAoZWwuY2xhc3NOYW1lICs9ICcgZXJyb3ItZ3V0dGVyJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZWwuY2xhc3NOYW1lID0gZWwuY2xhc3NOYW1lLnJlcGxhY2UoL1xcYmVycm9yLWd1dHRlclxcYi9nLCAnJyk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBoaWdobGlnaHROb3RFeHBlY3RlZFdpZHRoIChlbCkge1xuICAgIHZhciBleHBlY3RlZFBlcmNlbnRhZ2UgPSBnZXRFeHBlY3RlZFNwYW5zKGVsKSAqIDEwMC8xMixcbiAgICAgICAgYWN0dWFsUGVyY2VudGFnZSA9IGVsLm9mZnNldFdpZHRoICogMTAwIC8gZWwucGFyZW50Tm9kZS5vZmZzZXRXaWR0aDtcbiAgXG4gICAgaWYgKGV4cGVjdGVkUGVyY2VudGFnZSAtIGFjdHVhbFBlcmNlbnRhZ2UgPiAxIHx8IGV4cGVjdGVkUGVyY2VudGFnZSAtIGFjdHVhbFBlcmNlbnRhZ2UgPCAtMSkge1xuICAgICAgICAgL1xcYmVycm9yLXdpZHRoXFxiLy50ZXN0KGVsLmNsYXNzTmFtZSkgfHwgKGVsLmNsYXNzTmFtZSArPSAnIGVycm9yLXdpZHRoJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZWwuY2xhc3NOYW1lID0gZWwuY2xhc3NOYW1lLnJlcGxhY2UoL1xcYmVycm9yLXdpZHRoXFxiL2csICcnKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHRlc3QgKCkge1xuICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2NsYXNzKj1cImd1dFwiXScpLCBoaWdobGlnaHROb3RFeHBlY3RlZEd1dHRlcik7XG4gICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1vLWdyaWQtY29sc3Bhbl0nKSwgaGlnaGxpZ2h0Tm90RXhwZWN0ZWRXaWR0aCk7XG59XG5cbnZhciBydW5UZXN0cyA9IGZ1bmN0aW9uICgpIHtcbiAgICB3aW5kb3cub25yZXNpemUgPSB0ZXN0O1xufTtcblxuXG5ydW5UZXN0cygpO1xuc3R5bGVTd2l0Y2hlcigpOyJdfQ==
