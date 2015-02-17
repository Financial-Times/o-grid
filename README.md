# o-grid

## About

o-grid defines a 12 column responsive, nestable grid system for laying out HTML pages and modules.
It supports browsers with support for *CSS @media queries* and *box-sizing*.

> Living off the grid and being kind of an outlaw brings a dangerous reality.  
  *Ron Perlman*

[Report a bug](https://github.com/Financial-Times/o-grid/issues)

## Browser support
This module has been verified in Internet Explorer 8+, modern desktop browsers (Chrome, Safari, Firefox, …) and mobile browsers (Android browser, iOS safari, Chrome mobile).

Older browsers: you may use a [box-sizing polyfill](https://github.com/Schepp/box-sizing-polyfill) to support give better support to IE < 8.

### Grid dimensions

#### General settings

* Minimum width: 240px
* Maximum width: 1210px
* Gutter width: 10px
* Number of columns: 12

#### Layouts:

* **Extra small (no layout name)** 240px - 489px
* **Small (S)** 490px - 729px
* **Medium (M)** 730px - 969px
* **Large (L)** 970px to 1209px
* **Extra large (XL)** 1210px

## General use

### Base classes
Grid styles are typically applied to the html using two types declaration:

* A `o-grid-row` class, added to the container element.  
It forces that element to extend to the maximum width available (either the maximum width defined by the grid, or the parent element's width if using a nested grid)

* A `data-o-grid-colspan` attribute, added to the element intended to conform to the grid's columns.  
`data-o-grid-colspan=""` by itself floats an element to the left. Specific widths are specified by setting the value of the attribute (see below for more details)

So, for example

```html
<div class="o-grid-row">
	<div data-o-grid-colspan="6">A div spanning 6 grid columns</div>
</div>
```

### Specifying column widths

The grid is divided into 12 columns and column instances can span any number of these 'grid-columns'. As the grid is responsive a different number of columns can be specified for each size of layout individually.

```html
<div data-o-grid-colspan="{values}"></div>
```

#### Using numbers

* `{0-12}` - number of columns to span by default
* `S{0-12}` - number of columns to span at the small layout and up
* `M{0-12}` - number of columns to span at the medium layout and up
* `L{0-12}` - number of columns to span at the large layout and up
* `XL{0-12}` - number of columns to span at the extra large layout and up

e.g. `<div data-o-grid-colspan="6 L8"></div>`

#### Using keywords<a name="keywords"></a>

* `hide`
* `one-half`
* `one-third`, `two-thirds`
* `one-quarter`, `three-quarters`

e.g. `<div data-o-grid-colspan="one-half Ltwo-thirds"></div>`

### Examples

A full width column for all sizes except large screens and up, where it spans on 9 columns:

```html
<div data-o-grid-colspan="L9"></div>
```

A half width column that becomes full-width on medium screens and up

```html
<div data-o-grid-colspan="one-half M12"></div>
```

A column which gradually takes up a greater portion of horizontal space as the screen gets smaller

```html
<div data-o-grid-colspan="4 M3 L2 XL1"></div>
```

A column which has width: auto on extra-small screens, and then takes half the available space on medium screens and up

```html
<div data-o-grid-colspan="M6"></div>
```

### Utilities

#### Hiding elements

e.g. `data-o-grid-colspan="Mhide Shide"` will hide the given element for medium and small screen sizes even if the element isn't laid out as a column

#### Centering a column

e.g. `data-o-grid-colspan="center Luncenter"` will `center` the column and `uncenter` it at Large (L) layout size.

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

<div data-o-grid-colspan="L8 Lpush4"></div>
<div data-o-grid-colspan="L4 Lpull8"></div>
```

```scss

// Content is first in the source
.content {
	width: oGridColspan(8);
	@include oGridPush(4); // outputs left: -33.333333333%;
}

// Sidebar comes second in the source but appears first on the left
.sidebar {
	width: oGridColspan(4);
	@include oGridPull(8); // outputs right: -66.666666667%;
}
```

#### Add space before a column

```html
<div data-o-grid-colspan="8 offset4"></div>

<div data-o-grid-colspan="L8 Loffset4"></div>
```

```scss
.my-element {
	width: oGridColspan(8);
	@include oGridOffset(4); // outputs margin-left: 33.333333333%;
}
```

#### Snappy mode

In fluid mode (see `$o-grid-mode`), a set of rows may snap between fixed layouts as the viewport gets larger:

```html
<!-- Make one row snappy -->
<div class="o-grid-row o-grid-snappy"></div>

<!--Make multiple rows snappy -->
<div class="o-grid-snappy">
	<div class="o-grid-row"></div>
	<div class="o-grid-row"></div>
	<div class="o-grid-row"></div>
	<div class="o-grid-row"></div>
</div>
```

#### Compact, gutterless rows

To remove gutters from all columns in a row use the class `o-grid-row--compact`, e.g.

```html
<div class="o-grid-row o-grid-row--compact">
	<div data-o-grid-colspan="6">Look 'ma, no gutters</div>
	<div data-o-grid-colspan="6">Look 'pa, no gutters here either</div>
</div>
```

##### Fine-grained gutter removal

Remove gutters with these helper classes:

```html
<div class="o-grid-remove-gutters[--side][--layout]"></div>
<!-- Remove gutters -->
<div data-o-grid-colspan="one-half" class="o-grid-remove-gutters"></div>

<!-- Remove right gutters -->
<div class="o-grid-remove-gutters--right"></div>

<!-- Remove gutters for the small layout -->
<div data-o-grid-colspan="3" class="o-grid-remove-gutters--S"></div>

<!-- Remove left gutters for the large layout -->
<div class="o-grid-row o-grid-remove-gutters--left--L"></div>
```

```css
.o-grid-remove-gutters[--{left|right}][--{S|M|L|XL}]
```

Or, in Sass files, remove gutters on a row or a column using these helpers:

```scss
oGridRemoveGutters(); // Remove gutters on both sides
oGridRemoveGutters($side: 'left'); // Remove gutters on the left side
oGridRemoveGutters('right'); // Remove gutters on the right (`$side` is optional)
```

Example:

```scss
.my-component {
	// Remove gutters for all layouts
	@include oGridRemoveGutters();

	// Remove left gutter at Large layout size and up
	@include oGridRespondTo(L) {
		@include oGridRemoveGutters('left');
	}
	// Remove right gutter at eXtra Large layout size and up
	@include oGridRespondTo(XL) {
		@include oGridRemoveGutters('right');
	}
	// Remove left and right gutters until medium layout size
	@include oGridRespondTo($until: M) {
		@include oGridRemoveGutters();
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

All the variables used by the grid (see `src/scss/_variables.scss`) can be used in your own Sass stylesheets but *must not* be overwritten at the component/module level.

```scss
// ----------------------------------------------------------------------------
// Responsive behaviour configuration
// ----------------------------------------------------------------------------

/// Silent mode
///
/// @type Bool
///
/// @link http://origami.ft.com/docs/syntax/scss/#silent-styles “Silent” styles in Origami's documentation
$o-grid-is-silent: true !default;

/// Grid mode
/// - fluid: full width until $o-grid-max-width (default: 1210px)
/// - snappy: fluid width until the layout defined in $o-grid-start-snappy-mode-at (default: M),
///           and then snaps into a larger fixed layout at each breakpoint
/// - fixed: always fixed-width with the layout defined by $o-grid-fixed-layout (default: L)
///
/// @type String - one of fluid (default), snappy, fixed
$o-grid-mode: 'fluid' !default;

/// Layout to default to when the grid has a fixed width (not fluid)
///
/// @type String - One of $o-grid-layouts
$o-grid-fixed-layout: 'L' !default;

/// When the grid start snapping between fixed-width layouts
/// in the case where a row has the `o-grid-row--snappy` class
///
/// @type String
$o-grid-start-snappy-mode-at: 'M' !default;

/// Show the currently active breakpoint and output loaded settings
/// @link https://github.com/sass-mq/sass-mq#seeing-the-currently-active-breakpoint
///
/// @type Bool
$o-grid-debug-mode: false !default;

/// Output IE 8-specific rules?
/// - false: no IE8 support at all
/// - 'only': serve code compatible with IE8 only
/// - 'inline' (default): serve IE8 specific code alongside modern browsers code
///
/// @type Bool | String
$o-grid-ie8-rules: 'inline' !default;


// ----------------------------------------------------------------------------
// Grid settings and dimensions
// ----------------------------------------------------------------------------

/// Number of columns
///
/// @type Number (unitless)
$o-grid-columns: 12 !default;

/// Gutter size, in pixels
///
/// @type Number
$o-grid-gutter: 10px !default;

/// Minimum width, in pixels
///
/// @type Number
$o-grid-min-width: 240px !default;

/// Full width of the grid: combined width of columns, gutters and outer margins
/// for a specific column width
///
/// @access private
///
/// @param {Number} column-width - desired width of a grid column
///
/// @returns {Number} width of the grid, in pixels
@function _oGridWidth($column-width) {
	$gutters-combined-width: $o-grid-gutter * ($o-grid-columns - 1) + 0px;
	$outer-margins-combined-width: $o-grid-gutter * 2 + 0px;
	@return ($column-width * $o-grid-columns) + $gutters-combined-width + $outer-margins-combined-width;
}

/// Layouts
///
/// Each layout is calculated following a specific column width,
/// in order to base breakpoints on the structure of the grid itself
///
/// @type Map
$o-grid-layouts: (
	S:  _oGridWidth($column-width: 30px), // 490px
	M:  _oGridWidth($column-width: 50px), // 730px
	L:  _oGridWidth($column-width: 70px), // 970px
	XL: _oGridWidth($column-width: 90px)  // 1210px
) !default;

/// Layout names
///
/// @access private
/// @type List
$_o-grid-layout-names: map-keys($o-grid-layouts) !default;

// When snappy mode is enabled, force $o-grid-max-width to the largest layout width
// instead of the default $o-grid-max-width
@if $o-grid-mode == 'snappy' {
	$o-grid-max-width: map-get($o-grid-layouts, nth($_o-grid-layout-names, -1)) !global;
}

/// Maximum grid width
/// Defaults to the largest layout width
///
/// @access private
/// @type Number
$_o-grid-max-width: map-get($o-grid-layouts, nth($_o-grid-layout-names, -1));

/// Current scope
///
/// @access private
/// @type String
$_o-grid-scope: 'global';

```

### JavaScript Helper

#### `getCurrentLayout()`

Returns the name of the layout currently displayed.

```js
var oGrid = require('o-grid/main');

console.log(oGrid.getCurrentLayout());
// > XS, S, M, L, XL
```

### Gotchas

#### Fixed/Absolute positioning

Widths are specified in percentages, which will not work for fixed or absolute positioned elements (The grid can however be used to layout elements within an absolute/fixed position container). If you need to support fixed/absolutely position elements, or have developed your own solution, please leave a comment on the [GitHub issue](https://github.com/Financial-Times/o-grid-issues/issues/9).
