exports.init = function(app, mu) {
	"use strict";
	mu.clearCache();

	var mustacheEngine = function(path, options, fn) {
		var result = "";
		var view  = options || {};
		mu.compileAndRender(path, view).on('data', function (data) {
			result += data;
		}).on('end', function() {
			fn(null, result);
		}).on('error', function(e) {
			fn(e);
		});
	};

	app.engine('mustache', mustacheEngine);
	app.set('views', './views');
	app.set('view engine', 'mustache');

};