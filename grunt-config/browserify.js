module.exports = {
    test: {
      files: {
        './docs/js/test.js': ['./docs-generator/js/test.js'],
      },
      options: {
        transform: ['debowerify']
      }
    }
};
