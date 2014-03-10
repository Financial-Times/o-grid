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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvdXNyL2xvY2FsL2xpYi9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL3JoeXMuZXZhbnMvU2l0ZXMvby1tb2R1bGVzL28tZ3JpZC9kZW1vLXNyYy9jb25maWd1cmF0aW9ucy5qcyIsIi9Vc2Vycy9yaHlzLmV2YW5zL1NpdGVzL28tbW9kdWxlcy9vLWdyaWQvZGVtby1zcmMvanMvc3R5bGUtc3dpdGNoZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIm1vZHVsZS5leHBvcnRzID0ge1xuXHRcInNpbGVudFwiOiBcIkJ5IGRlZmF1bHQgdGhlIGdyaWQgc2hvdWxkIG91dHB1dCBubyBzdHlsZXMgYW5kIGFsbCBibG9ja3MgZXh0ZW5kIHRvIGZ1bGwgcGFnZSB3aWR0aFwiLFxuXHRcImRlZmF1bHRcIjogXCJGbHVpZCBncmlkIHdpdGggbWF4IHdpZHRoIG9mIDYwMHB4IC0gbW9ja3MgYmVoYXZpb3VyIGlmIG1lZGlhIHF1ZXJpZXMgbm90IHN1cHBvcnRlZFwiLFxuXHRcImRldmljZS13aWR0aC1tcVwiOiBcIkRlbW9uc3RyYXRlcyB0aGUgYmVoYXZpb3VyIG9mIGEgcGFnZSB1c2luZyB0aGUgZGVmYXVsdCBpbnN0YWxsYXRpb24gb2Ygby1ncmlkIChyZXNwb25kaW5nIHRvIGRldmljZSwgbm90IHdpbmRvdywgd2lkdGhcIixcblx0XCJ3aWR0aC1tcVwiOiBcIlJlc3BvbnNpdmUgZ3JpZCB0aGF0IHJlc3BvbmRzIHRvIHdpbmRvdyByYXRoZXIgdGhhbiBkZXZpY2Ugd2lkdGggKG1haW5seSB0byBtYWtlIGRldmVsb3BtZW50IGVhc2llcilcIixcblx0XCJub24tZmx1aWRcIjogXCJEZW1vbnN0cmF0ZXMgdGhlIGJlaGF2aW91ciBvZiBhIHBhZ2UgdXNpbmcgYSBub24tZmx1aWQgdmVyc2lvbiBvZiB0aGUgcmVzcG9uc2l2ZSBncmlkXCIsXG5cdFwicmVzaXplZFwiOiBcIlJlc3BvbnNpdmUgZ3JpZCB3aXRoIGJyZWFrcG9pbnRzIHJlYWxsb2NhdGVkIHRvIDQwMHB4LCA4MDBweCBhbmQgMTIwMHB4IGFuZCBndXR0ZXJzIGhhbHZlZFwiLFxuXHRcImRpc2FibGVkXCI6IFwiUmVzcG9uc2l2ZSBncmlkIHdpdGggdGhlIGV4dHJhIGxhcmdlIGxheW91dCBkaXNhYmxlZFwiLFxuXHRcImFsd2F5cy1maXhlZFwiOiBcIkZpeGVkIGdyaWQgYXQgOTYwcHggYWNyb3NzIGFsbCBicm93c2VycyBhbmQgZGV2aWNlc1wiXG59OyIsInZhciBkZW1vVHlwZXMgPSByZXF1aXJlKCcuLi9jb25maWd1cmF0aW9ucy5qcycpO1xuXG52YXIgYnJlYWtwb2ludHMgPSBbNjAwLCAxMDAwLCAxNDAwXTtcblxuZnVuY3Rpb24gZ2V0TGF5b3V0ICgpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50Lm9mZnNldFdpZHRoIDwgNjAwID8gJ1MnIDpcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50Lm9mZnNldFdpZHRoIDwgMTAwMCA/ICdNJyA6XG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5vZmZzZXRXaWR0aCA8IDE0MDAgPyAnTCcgOiAnWEwnO1xufVxuXG5mdW5jdGlvbiBzdHlsZVN3aXRjaGVyICgpIHtcbiAgICB2YXIgc3R5bGVzaGVldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJsaW5rW3JlbD0nc3R5bGVzaGVldCddXCIpLFxuICAgICAgICBodG1sID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LFxuICAgICAgICBidXR0b25Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0eWxlU3dpdGNoZXJcIiksXG4gICAgICAgIHRtcCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKSxcbiAgICAgICAgc3ViaGVhZGluZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3ViaGVhZGluZ1wiKTtcblxuICAgIE9iamVjdC5rZXlzKGRlbW9UeXBlcykuZm9yRWFjaChmdW5jdGlvbiAodHlwZSkge1xuICAgICAgICB2YXIgYnV0dG9uICA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICBidXR0b24uaW5uZXJIVE1MID0gdHlwZTtcbiAgICAgICAgYnV0dG9uLnRpdGxlID0gZGVtb1R5cGVzW3R5cGVdO1xuICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzdHlsZXNoZWV0LmhyZWYgPSAnY3NzL2dyaWQtJyArIHR5cGUgKyAnLmNzcyc7XG4gICAgICAgICAgICB2YXIgcHJldiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWxlY3RlZC1zdHlsZXNoZWV0Jyk7XG4gICAgICAgICAgICBpZiAocHJldikge1xuICAgICAgICAgICAgICAgIHByZXYuY2xhc3NOYW1lID0gJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNsYXNzTmFtZSA9ICdzZWxlY3RlZC1zdHlsZXNoZWV0JztcblxuICAgICAgICAgICAgc3ViaGVhZGluZyAmJiAoc3ViaGVhZGluZy5pbm5lckhUTUwgPSB0aGlzLnRpdGxlKTtcbiAgICAgICAgICAgIGh0bWwuY2xhc3NOYW1lID0gaHRtbC5jbGFzc05hbWUucmVwbGFjZSgvc3R5bGVzaGVldC0oXFx3fC0pKy8sICcnKSArICcgc3R5bGVzaGVldC0nICsgdHlwZTtcblxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCF0bXAuY2hpbGROb2Rlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHN0eWxlc2hlZXQuaHJlZiA9ICdjc3MvZ3JpZC0nICsgdHlwZSArICcuY3NzJztcbiAgICAgICAgICAgIGJ1dHRvbi5jbGFzc05hbWUgPSAnc2VsZWN0ZWQtc3R5bGVzaGVldCc7XG4gICAgICAgICAgICBodG1sLmNsYXNzTmFtZSArPSAnIHN0eWxlc2hlZXQtJyArIHR5cGU7XG4gICAgICAgICAgICBzdWJoZWFkaW5nICYmIChzdWJoZWFkaW5nLmlubmVySFRNTCA9IGJ1dHRvbi50aXRsZSk7XG4gICAgICAgIH1cbiAgICAgICAgdG1wLmFwcGVuZENoaWxkKGJ1dHRvbik7XG4gICAgICAgIFxuICAgIH0pO1xuXG4gICAgYnV0dG9uQ29udGFpbmVyLmFwcGVuZENoaWxkKHRtcCk7XG59XG5cbmZ1bmN0aW9uIGdldEV4cGVjdGVkU3BhbnMgKGVsKSB7XG4gICAgdmFyIGxheW91dCA9IGdldExheW91dCgpO1xuXG4gICAgdmFyIHJ1bGVzID0gZWwuZGF0YXNldC5vR3JpZENvbHNwYW4sXG4gICAgICAgIHNwYW5zO1xuICAgIHJ1bGVzLnJlcGxhY2UobmV3IFJlZ0V4cCgnKD86XnxcXFxcXFxzKScgKyBsYXlvdXQgKyAnKFxcXFxcXGR7MSwyfSknLCAnZycpLCBmdW5jdGlvbiAoJDAsICQxKSB7XG4gICAgICAgIHNwYW5zID0gJDE7XG4gICAgfSk7XG5cbiAgICBpZiAodHlwZW9mIHNwYW5zID09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJ1bGVzLnJlcGxhY2UoLyg/Ol58XFxzKShcXGR7MSwyfSkvZywgZnVuY3Rpb24gKCQwLCAkMSkge1xuICAgICAgICAgICAgc3BhbnMgPSAkMTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBzcGFucztcbn1cblxuZnVuY3Rpb24gZ2V0RXhwZWN0ZWRHdXR0ZXIgKGVsLCBzaWRlKSB7XG4gICAgdmFyIGxheW91dCA9IGdldExheW91dCgpO1xuXG4gICAgdmFyIHJ1bGVzID0gZWwuY2xhc3NOYW1lLFxuICAgICAgICBndXR0ZXIgPSAhKG5ldyBSZWdFeHAoJyhefFxcXFxcXHMpZ3V0KC0nICsgc2lkZSArICd8LScgKyBsYXlvdXQgKyAnfC0nICsgc2lkZSArICctJyArIGxheW91dCArICd8JHxcXFxcXFxzKScsICdnJykudGVzdChydWxlcykpO1xuXG4gICAgaWYgKGd1dHRlcikge1xuICAgICAgICBndXR0ZXIgPSAhL28tZ3JpZC1yb3ctY29tcGFjdC8udGVzdChlbC5wYXJlbnROb2RlLmNsYXNzTmFtZSk7XG4gICAgfSBcblxuICAgIHJldHVybiBndXR0ZXI7XG59XG5cbmZ1bmN0aW9uIGhpZ2hsaWdodE5vdEV4cGVjdGVkR3V0dGVyIChlbCkge1xuICAgIHZhciBleHBlY3RlZExlZnQgPSBnZXRFeHBlY3RlZEd1dHRlcihlbCwgJ2wnKSxcbiAgICAgICAgZXhwZWN0ZWRSaWdodCA9IGdldEV4cGVjdGVkR3V0dGVyKGVsLCAncicpLFxuICAgICAgICBhY3R1YWxSaWdodCA9IHBhcnNlSW50KGdldENvbXB1dGVkU3R5bGUoZWwsIG51bGwpLmdldFByb3BlcnR5VmFsdWUoJ3BhZGRpbmctcmlnaHQnKSwgMTApID4gMCxcbiAgICAgICAgYWN0dWFsTGVmdCA9IHBhcnNlSW50KGdldENvbXB1dGVkU3R5bGUoZWwsIG51bGwpLmdldFByb3BlcnR5VmFsdWUoJ3BhZGRpbmctbGVmdCcpLCAxMCkgPiAwO1xuICBcbiAgICBpZiAoZXhwZWN0ZWRMZWZ0ICE9IGFjdHVhbExlZnQgfHwgZXhwZWN0ZWRSaWdodCAhPSBhY3R1YWxSaWdodCkge1xuICAgICAgICAvXFxiZXJyb3ItZ3V0dGVyXFxiLy50ZXN0KGVsLmNsYXNzTmFtZSkgfHwgKGVsLmNsYXNzTmFtZSArPSAnIGVycm9yLWd1dHRlcicpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGVsLmNsYXNzTmFtZSA9IGVsLmNsYXNzTmFtZS5yZXBsYWNlKC9cXGJlcnJvci1ndXR0ZXJcXGIvZywgJycpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gaGlnaGxpZ2h0Tm90RXhwZWN0ZWRXaWR0aCAoZWwpIHtcbiAgICB2YXIgZXhwZWN0ZWRQZXJjZW50YWdlID0gZ2V0RXhwZWN0ZWRTcGFucyhlbCkgKiAxMDAvMTIsXG4gICAgICAgIGFjdHVhbFBlcmNlbnRhZ2UgPSBlbC5vZmZzZXRXaWR0aCAqIDEwMCAvIGVsLnBhcmVudE5vZGUub2Zmc2V0V2lkdGg7XG4gIFxuICAgIGlmIChleHBlY3RlZFBlcmNlbnRhZ2UgLSBhY3R1YWxQZXJjZW50YWdlID4gMSB8fCBleHBlY3RlZFBlcmNlbnRhZ2UgLSBhY3R1YWxQZXJjZW50YWdlIDwgLTEpIHtcbiAgICAgICAgIC9cXGJlcnJvci13aWR0aFxcYi8udGVzdChlbC5jbGFzc05hbWUpIHx8IChlbC5jbGFzc05hbWUgKz0gJyBlcnJvci13aWR0aCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGVsLmNsYXNzTmFtZSA9IGVsLmNsYXNzTmFtZS5yZXBsYWNlKC9cXGJlcnJvci13aWR0aFxcYi9nLCAnJyk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiB0ZXN0ICgpIHtcbiAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tjbGFzcyo9XCJndXRcIl0nKSwgaGlnaGxpZ2h0Tm90RXhwZWN0ZWRHdXR0ZXIpO1xuICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtby1ncmlkLWNvbHNwYW5dJyksIGhpZ2hsaWdodE5vdEV4cGVjdGVkV2lkdGgpO1xufVxuXG52YXIgcnVuVGVzdHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgc2V0VGltZW91dCh0ZXN0LCAxKTtcbiAgICB3aW5kb3cub25yZXNpemUgPSB0ZXN0O1xufTtcblxuaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2gxJykudGV4dENvbnRlbnQuaW5kZXhPZignVGVzdCcpID09PSAwKSB7XG4gICAgcnVuVGVzdHMoKTtcbn1cbnN0eWxlU3dpdGNoZXIoKTsiXX0=
