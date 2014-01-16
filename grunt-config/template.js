module.exports = function constructDemoPagesConfig (grunt) {
  var output = {};

  require('../docs-generator/demo-types').map(function (type) {
    var conf =  {
      src: './docs-generator/grid.hbs',
      engine: "handlebars",
      dest: './docs/grid-' + type + '.html',
      variables: {
        title: type.substr(0, 1).toUpperCase() + type.substr(1) + " grid examples",
        example: require('../docs-generator/examples.json')
      }
    };
    conf.variables[type] = true;
    if (!/default|legacy/.test(type)) {
      conf.variables.isResponsive = true;
    }
    output[type] = conf;

  });
  return output;
};