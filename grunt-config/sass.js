module.exports = function (grunt) {
  function constructDemoPagesSassConfig () {
    var output = {};
    Object.keys(require('../docs-generator/demo-types')).map(function (type) {
        output['./docs/css/grid-' + type + '.css'] = './docs-generator/scss/bundles/' + type + '.scss';
    });

    output['./docs/css/docs.css'] = ['./docs-generator/scss/docs.scss'];
    return output;
  }

  return {
    docs: {
      options: {
        style: 'expanded',
        loadPath: ['.', './bower_components/']
      },
      files: constructDemoPagesSassConfig()
    }
  };
};

