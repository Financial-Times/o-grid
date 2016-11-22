# o-grid [![Build Status](https://circleci.com/gh/Financial-Times/o-grid.png?style=shield&circle-token=a0c7fe6f37aa937651724d1650814e45ab2662a5)](https://circleci.com/gh/Financial-Times/o-grid)

A 12 column responsive, flexbox-based grid system for laying out documents, templates and modules.

> Living off the grid and being kind of an outlaw brings a dangerous reality.  *Ron Perlman*

[![Grid system](https://raw.githubusercontent.com/Financial-Times/o-grid/master/img/grid-system.png)](https://raw.githubusercontent.com/Financial-Times/o-grid/master/img/grid-system.png)

## Quick Start

Using the [Origami Build Service](https://origami-build.ft.com/v2/):

```html
<head>
	…
	<link rel="stylesheet"
	      href="https://origami-build.ft.com/v2/bundles/css?modules=o-grid@^4.0.0" />
</head>
```

Or, to install it manually:

```sh
bower install o-grid --save
```

```scss
// your-app/main.scss
$o-grid-is-silent: false;
@import 'o-grid/main';
```

```js
// your-app/main.js

// Return the current layout (e.g. default, S, M, L, XL)
var getCurrentLayout = require('o-grid').getCurrentLayout;
console.log(getCurrentLayout());

// Return the current gutter (e.g. 10px, 20px)
var getCurrentGutter = require('o-grid').getCurrentGutter;
console.log(getCurrentGutter());
```

## Browser support

o-grid works in browsers that support *CSS @media queries* and *box-sizing*, as well as Internet Explorer 8.

Older browsers: you may use a [box-sizing polyfill](https://github.com/Schepp/box-sizing-polyfill) to support give better support to IE < 8.

## Grid dimensions

### General settings

* Minimum width: 240px
* Maximum width: 1220px
* Gutter widths (space between columns):
	* 10px on small screens
	* 20px on larger screens
* Number of columns: 12

### Layout sizes

* **Default** 240px - …
* **Small (S)** 490px - 739px
* **Medium (M)** 740px - 979px
* **Large (L)** 980px to 1219px
* **Extra large (XL)** 1220px

## Quick start

### Utility classes

```html
<div class="o-grid-container">
	<div class="o-grid-row">
		<!-- two divs, spanning a total of 12 columns -->
		<div data-o-grid-colspan="8">A div, 8 columns wide</div>
		<div data-o-grid-colspan="4">Another div, 4 columns wide</div>
	</div>
</div>
```

### Responsive columns

Set a number of columns per layout:

```html
<div class="o-grid-container">
	<div class="o-grid-row">
		<div data-o-grid-colspan="6 L8" class="first-column">
			Half by default, then 8 columns wide on Large layout and up
		</div>
		<div data-o-grid-colspan="6 L4" class="second-column">
			Half by default, then 4 columns wide on Large layout and up
		</div>
	</div>
</div>
```

```scss
div {
	@include oGridContainer();

	> div {
		@include oGridRow();
	}
}

.first-column {
	// Half by default, then 8 columns wide on Large layout and up
	@include oGridColspan((default: 6, L: 8));
}
.second-column {
	// Half by default, then 4 columns wide on Large layout and up
	@include oGridColspan((default: 6, L: 4));
}
```

#### Using numbers

* `{0-12}` - number of columns to span by default
* `S{0-12}` - number of columns to span at the small layout and up
* `M{0-12}` - number of columns to span at the medium layout and up
* `L{0-12}` - number of columns to span at the large layout and up
* `XL{0-12}` - number of columns to span at the extra large layout and up

```html
<div data-o-grid-colspan="6 L8"></div>
```

```scss
div { @include oGridColspan((default: 6, L: 8)); }
```

#### Using keywords<a name="keywords"></a>

* `hide`
* `one-half`
* `one-third`, `two-thirds`
* `one-quarter`, `three-quarters`

```html
<div data-o-grid-colspan="one-half Ltwo-thirds"></div>
```

```scss
div { @include oGridColspan((default: one-half, L: two-thirds)); }
```

### Examples

A full width column for all sizes except large screens and up, where it spans on 9 columns:

```html
<div data-o-grid-colspan="full-width L9"></div>
```

```scss
div { @include oGridColspan((default: full-width, L: 9)); }
```

A half width column that becomes full-width on medium screens and up:

```html
<div data-o-grid-colspan="one-half M12"></div>
```

```scss
div { @include oGridColspan((default: one-half, M: 12)); }
```

A column which gradually takes up a greater portion of horizontal space as the screen gets smaller:

```html
<div data-o-grid-colspan="4 M3 L2 XL1"></div>
```

```scss
div { @include oGridColspan((default: 4, M: 3, L: 2, XL: 1)); }
```

A column which has `width: auto` on small screens, and then takes half the available space on medium screens and up:

```html
<div data-o-grid-colspan="M6"></div>
```

```scss
div { @include oGridColspan((M: 6)); }
```

## Advanced usage

### Utilities

#### Hiding elements

`hide` the column, show it again at Large (`L`) layout size, and hide it at the largest (`XL`) layout size:

```html
<div data-o-grid-colspan="hide L12 XLhide"></div>
```

```scss
div { @include oGridColspan((default: hide, L: 12, XL: hide)); }
```

#### Centering a column

`center` the column and `uncenter` it at Large (`L`) layout size:

```html
<div data-o-grid-colspan="center Luncenter"></div>
```

```scss
.my-column {
	@include oGridCenter;

	@include oGridRespondTo(L) {
		@include oGridUncenter;
	}
}
```

#### Push and pull columns

```html
<div data-o-grid-colspan="8 push4"></div>
<div data-o-grid-colspan="4 pull8"></div>
```

```scss
// Content is first in the source
.content {
	@include oGridColspan(8);
	@include oGridPush(4); // outputs left: -33.333333333%;
}

// Sidebar comes second in the source but appears first on the left
.sidebar {
	@include oGridColspan(4);
	@include oGridPull(8); // outputs right: -66.666666667%;
}
```

Responsively:
```html
<div data-o-grid-colspan="L8 Lpush4"></div>
<div data-o-grid-colspan="L4 Lpull8"></div>
```

```scss
// Content is first in the source
.content {
	@include oGridColspan((L: 8));
	@include oGridRespondTo(L) {
		@include oGridPush(4); // outputs left: -33.333333333%;
	}
}

// Sidebar comes second in the source but appears first on the left
.sidebar {
	@include oGridColspan((L: 4));
	@include oGridRespondTo(L) {
		@include oGridPull(8); // outputs right: -66.666666667%;
	}
}
```



#### Add space before a column

```html
<div data-o-grid-colspan="8 offset4"></div>

<div data-o-grid-colspan="L8 Loffset4"></div>
```

```scss
div {
	@include oGridColspan(8);
	@include oGridOffset(4); // outputs margin-left: 33.333333333%;
}

div {
	@include oGridColspan((L: 8));

	@include oGridRespondTo(L) {
		@include oGridOffset(4); // outputs margin-left: 33.333333333%;
	}
}
```

#### Snappy mode

The container size can snap between fixed-widths as the viewport gets larger:

```html
<!-- Make the whole document snappy -->
<body class="o-grid-snappy">
	<div class="o-grid-container">
		<div class="o-grid-row">
			…
		</div>
	</div>
</body>

<!-- Make a container snappy -->
<div class="o-grid-container o-grid-container--snappy">
	<div class="o-grid-row">
		…
	</div>
</div>
```

#### Compact (gutterless) rows

To remove gutters from in between columns in a row, use the `o-grid-row--compact` class:

```html
<div class="o-grid-row o-grid-row--compact">
	<div data-o-grid-colspan="6">Look 'ma, no gutters</div>
	<div data-o-grid-colspan="6">Look 'pa, no gutters here either</div>
</div>
```

#### Full bleed container

To remove gutters from the left and right sides of the grid container, use the `o-grid-container--bleed` class.  Note that it is not possible to remove the outer gutters for an individual row, instead you need to start a new container.

```html
<div class="o-grid-container o-grid-container--bleed">
	<div class="o-grid-row o-grid-row--compact">
		<div data-o-grid-colspan="6">Look 'ma, no gutters</div>
		<div data-o-grid-colspan="6">Look 'pa, no gutters here either</div>
	</div>
</div>
```

#### Responsive column helper

For simplicity, examples below don't show the output code that brings support for Internet Explorer.

##### Give column properties to an element

```scss
el { @include oGridColspan(); }
```

Outputs:

```css
// Fallbacks for Internet Explorer omitted in this example
el {
  position: relative;
  float: left;
  box-sizing: border-box;
  flex: 1 1 0%;
  padding-left: 10px;
}
@media (min-width: 46.25em) {
  el {
    padding-left: 20px;
  }
}
```

##### Give a width to an element

```scss
el { @include oGridColspan($span: 4); }
```

Outputs:

```css
el {
  position: relative;
  float: left;
  box-sizing: border-box;
  flex: 1 1 0%;
  padding-left: 10px;
  display: block;
  flex-basis: 33.33333%;
  min-width: 33.33333%;
  max-width: 33.33333%;
  width: 33.33333%;
}
@media (min-width: 46.25em) {
  el {
    padding-left: 20px;
  }
}
```

##### Responsive width for different layouts

```scss
el {
	@include oGridColspan((
		default: full-width,
		M: 6
	));
}
```

Outputs:

```css
el {
  position: relative;
  float: left;
  box-sizing: border-box;
  flex: 1 1 0%;
  padding-left: 10px;
  display: block;
  flex-basis: 100%;
  min-width: 100%;
  max-width: 100%;
  width: 100%;
}
@media (min-width: 46.25em) {
  el {
    display: block;
    flex-basis: 50%;
    min-width: 50%;
    max-width: 50%;
    padding-left: 20px;
  }
}
```

#### Responsive layout helper

```scss
@include oGridRespondTo($from, $until) {
	// Styles
}
```

To create styles that respond to the same breakpoints as the grid, this Sass mixin can be used to wrap the styles in the appropriate media query. It should be passed `S`, `M`, `L` or `XL` depending on which layout size the style should apply to e.g.

```scss
@include oGridRespondTo(S) {
	.o-example-module .item-subheading {
		font-size: 0.5em;
	}
}
.o-example-module .item-subheading {
	@include oGridRespondTo(XL) {
		color: red;
	}
}
.o-example-module .item-subheading {
	@include oGridRespondTo($until: L) {
		width: auto;
	}
}
```

It relies on [Sass MQ](http://git.io/sass-mq) to output mobile-first @media queries.

`$from` is inclusive but `$until` is *exclusive* – e.g. `@include oGridRespondTo(S, L)` matches the breakpoints `S` and `M`, but not `L`.

#### Gutters

```scss
el {
	margin-left: oGridGutter();

	@include oGridRespondTo(L) {
		margin-left: oGridGutter(L);
	}
}
```

Outputs:

```css
el {
  margin-left: 10px;
}

@media (min-width: 61.25em) {
  el {
    margin-left: 20px;
  }
}
```

#### *Unstyle* a row or a column

```scss
.un-rowify {
	@include oGridResetRow;
}

.de-columnify {
	@include oGridResetColumn;
}
```

#### Variables

Some of the variables used by the grid (see [_variables.scss](https://github.com/Financial-Times/o-grid/blob/master/src/scss/_variables.scss)) can be used to customise the grid system.

Here are the most useful ones:

```scss
// Switch Silent mode off
$o-grid-is-silent: false;

// Disable outputting offset, push and pull selectors
$o-grid-shuffle-selectors: true;

// Disable outputting human-friendly selectors
$o-grid-human-friendly-selectors: true;

// Show the currently active breakpoint and output loaded settings
$o-grid-debug-mode: true;

// Gutters (distance between 2 columns), in pixels
$o-grid-gutters: (default: 10px, M: 20px);

// Grid mode
// - fluid: full width up to the largest layout's width
// - snappy: fluid width until the layout defined in $o-grid-start-snappy-mode-at (default: M),
//           and then snaps into a larger fixed layout at each breakpoint
//           (used by Next FT)
// - fixed: always fixed-width with the layout defined by
//          $o-grid-fixed-layout (default: L)
$o-grid-mode: fluid (default) | snappy | fixed;

// Grid ie8 rules
// - inline: output ie8 selectors alongside modern browser selectors in the same stylesheet
// - only: only output ie8 selectors
// - none: output no ie8 selectors
$o-grid-ie8-rules: inline (default) | only | none;

// Default layouts
$o-grid-layouts: (
	S:  490px,
	M:  740px,
	L:  980px,
	XL: 1220px,
);
```

#### Adding a layout

Products who need to add other breakpoints/layouts should use the helper `oGridAddLayout()`:

```scss
@import 'o-grid/main';

// Add various layouts
@include oGridAddLayout(
	$layout-name: XS,
	$layout-width: 360px
);
@include oGridAddLayout(
	$layout-name: P,
	$layout-width: 600px,
	$gutter-width: 24px
);

// Layouts are now:
//   XS: 360px,
//   S: 490px,
//   P: 600px,
//   M: 740px,
//   L: 980px,
//   XL: 1220px

// Surface the layout currently displayed to make it readable in JS
@include oGridSurfaceCurrentLayout;

// Generate grid helpers classes and data attributes
@include oGridGenerate;
```

#### Debug mode

Enable debug mode to see the currently active breakpoint in the top-right corner of the page (based on [sass-mq's show-breakpoints](https://github.com/sass-mq/sass-mq#seeing-the-currently-active-breakpoint) feature).

```scss
$o-grid-debug-mode: true;
```

![show-breakpoints demo](https://raw.githubusercontent.com/sass-mq/sass-mq/65b00c7be6dba7de24173cc445eec7aaca036ceb/show-breakpoints.gif)

## JavaScript Helpers

### `getCurrentLayout()`

Returns the name of the layout currently displayed.

```js
var oGrid = require('o-grid');

console.log(oGrid.getCurrentLayout());
// > default | S | M | L | XL
```

### `getCurrentGutter()`

Returns the width of the gutter currently displayed.

```js
var oGrid = require('o-grid');

console.log(oGrid.getCurrentGutter());
// > 10px | 20px
```

When using o-grid silent mode, make sure to surface the grid
information to make it readable by the JavaScript Helper
by adding `@include oGridSurfaceCurrentLayout();` to your Sass file.

### `getGridBreakpoints()`

Returns the sizes of all grid breakpoints available.

```js
var oGrid = require('o-grid');

console.log(oGrid.getGridBreakpoints());
// > { "layouts": { "S": "490px", "M": "740px", "L": "980px", "XL": "1220px" } }
```

When using o-grid silent mode, make sure to surface the grid
information to make it readable by the JavaScript Helper
by adding `@include oGridSurfaceLayoutSizes;` to your Sass file.

### `enableLayoutChangeEvents()`

Enable matchMedia queries that fire an `o-grid.layoutChange` event upon layout change.

```js
var oGrid = require('o-grid');

oGrid.addBreakpointListeners();
```

When using o-grid silent mode, make sure to surface the grid
information to make it readable by the JavaScript Helper
by adding `@include oGridSurfaceLayoutSizes;` to your Sass file.

## Grid Bookmarklet

1. Create a new Bookmark with this URL:
	```js
	javascript:(function(){var s=document.createElement("script");s.src="https://rawgit.com/Financial-Times/o-grid/master/bookmarklet/bookmarklet.js";document.head.appendChild(s);}());
	```

2. Load a website
3. Click the bookmarklet (the overlay should appear)
4. Check the alignment of the layout on the grid

![ ](https://cloud.githubusercontent.com/assets/85783/6125746/732fe9c0-b111-11e4-88d2-5031493cfec0.png)

----

## How to upgrade from v3.x.x to v4.x.x?

### Important Changes

- Layout sizes have slightly changed (M, L and XL are 10px wider).
- Gutter widths vary between layouts (default: 10px, M and above: 20px)

### Markup/Sass changes

- Wrap top-level `<div class="o-grid-row">` into `<div class="o-grid-container">`.
- Search `oGridColumn` and replace with `oGridColspan`.
- The mixin `oGridColspan` from v3 outputs a bit more code. Use `oGridColspan($span, $width-only: true)` to only outputs widths. Note that with gzip this should not have any impact.
- `$o-grid-gutter` becomes `$o-grid-gutters` (plural) and now contains a map
- Change all `$o-grid-gutter` to `oGridGutter()`. e.g. `margin-left: $o-grid-gutter` becomes `margin-left: oGridGutter()`
- A few helpers have been removed because they weren't used.

----

## License

Copyright (c) 2016 Financial Times Ltd. All rights reserved.

This software is published under the [MIT licence](http://opensource.org/licenses/MIT).
