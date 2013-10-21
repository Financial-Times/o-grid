var connect = require("connect"),
    express = require("express"),
    hbs = require('hbs'),
    examples = require('./examples.json');

var app   = express(),
    port  = process.env.PORT || 3000;

app.set('view engine', 'hbs');
hbs.registerPartials('./views/partials');

app.use(connect.compress());

app.use(function(req, res, next) {
    "use strict";
    if(/^\/((css|js|behavior)\/|favicon)/.test(req.url)) {
        res.setHeader("Cache-Control", "public, max-age=15778500"); // 6 months
        res.setHeader("Expires", new Date(Date.now() + 1.57785e10).toUTCString()); // 6 months
    }
    return next();
});

app.use('/', express.static('build'));

app.get('/', function (req, res) {
    "use strict";

    res.render("index", {
        title: "Grid documentation",
        responsive: true
    });

});

app.get('/grid-:name', function (req, res) {
    "use strict";

    var pageProps = {
        title: "Grid example and demo",
        example: examples
    };

    pageProps[req.params.name] = true;

    res.render('grid', pageProps);
});


app.listen(port);
console.log('Listening on port', port);