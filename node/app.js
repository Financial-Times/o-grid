var pkg = require("../package.json"),
    connect = require("connect"),
    express = require("express"),
	mu = require('mu2'),
	mousetacheInit = require("./moustache-init.js");

var app   = express(),
	port  = process.env.PORT || 3000;

mousetacheInit.init(app, mu);

app.use(connect.compress());

app.use('/', express.static('build'));

app.get('/', function (req, res) {
	"use strict";

	res.render("index", {
		title: "Index page"
	});

});

app.get('/grid-*', function (req, res) {
	"use strict";

	var pageProps = {
		version: pkg.version
	};

	pageProps[req.url.substr(6)] = true;

	res.render('grid', pageProps);
});


app.listen(port);
console.log('Listening on port', port);