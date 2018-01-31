let path = require('path');
let sassTrue = require('sass-true');

let sassFile = path.join(__dirname, 'index.test.scss');
sassTrue.runSass({file: sassFile}, describe, it);
