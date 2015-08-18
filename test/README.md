# Testing the grid

## Unit tests

Unit tests check that the internals of o-grid work correctly.

For example:

- initialising the module
- adding a layout in different ways
- overriding gutter sizes

### Working locally

Run tests everytime a file changes:

```bash
$ gem install filewatcher
$ filewatcher '**/*.{scss,rb}' 'test/travis.rb' --dontwait
```

When tests fail, the CSS gets output in `test/error.css`.

## Visual tests

See `demos/src/test.mustache`.

A script goes through all columns and makes sure they are the correct size.

When a column has a wrong size, it is highlighted and the console shows an error.

Resizing the viewport triggers the tests. Resize the browser window to check
gutters and widths are correct at all viewport sizes (look for errors in the console).

Visual tests should pass in Chrome, but might have a few issues in other browsers.
