module.exports = function (grunt) {
  function constructDemoPagesSassConfig () {
    var output = {};
    Object.keys(require('../demo-src/configurations')).map(function (type) {
        output['./demos/css/grid-' + type + '.css'] = './demo-src/scss/bundles/' + type + '.scss';
    });
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

