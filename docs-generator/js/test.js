!function () {
	var breakpoints = [600, 1000, 1400];

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
	  console.log(rules, 'spans' + spans);
	  return spans;
	}

	function highlightNotExpectedWidth (el) {
	  var expectedPercentage = getExpectedSpans(el) * 100/12,
	    actualPercentage = el.offsetWidth * 100 / el.parentNode.offsetWidth;
	  
	  console.log(expectedPercentage, actualPercentage); 

	  if (expectedPercentage - actualPercentage > 1 || expectedPercentage - actualPercentage < -1) {
	    el.className += ' error';
	  } else {
	    el.className = el.className.replace(/\berror\b/, '');
	  }
	}

	window.testWidths = function () {
		Array.prototype.forEach.call(document.querySelectorAll('[data-o-grid-colspan]'), highlightNotExpectedWidth);
		window.onresize = function () {
		    Array.prototype.forEach.call(document.querySelectorAll('[data-o-grid-colspan]'), highlightNotExpectedWidth);
		}
	};
	
}();