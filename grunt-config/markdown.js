module.exports = {
  docs: {
    files: [
      {
        expand: true,
        src: './README.md',
        dest: './docs/',
        ext: '.html',
        rename: function () {
          return './docs/index.html';
        }
      }
    ],
    options: {
      template: './docs-generator/markdown-wrapper.jst',
      preCompile: function() {},
      postCompile: function() {},
      templateContext: {}
    }
  }
};