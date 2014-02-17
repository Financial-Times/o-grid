# Grid module <small>o-grid</small>

## About

o-grid defines a 12 column responsive, nestable grid system for laying out html pages and modules.
It supports all browsers with support for *css media queries*, with two sizes of fixed-width fallback for browsers that don't support them (specifically ie7/8).

> Living off the grid and being kind of an outlaw brings a dangerous reality.  
  *Ron Perlman*

[Report a bug](https://github.com/Financial-Times/o-grid/issues)

### Grid dimensions

Four layout sizes are defined:

* **Small**  
For screen widths less than 600px wide, including pretty much all mobiles  
Top level grid rows are fluid, ranging from 240px to 600px in width

* **Medium**  
For screen widths between 600px and 1000px, small tablets and tablets in portrait mode  
Top level grid rows are a fixed 780px width

* **Large**  
For screen widths between 1000px and 1400px, larger tablets and desktop  
Top level grid rows are a fixed 960px width

* **Extra Large**  
For screen widths above 1400px, large desktop  
Top level grid rows are a fixed 1360px width

For each of these the available horizontal width is separated into 12 columns. In addition, for nested grids the parent box's width is divided into 12 columns

### [Demos](demos.html)

In order to view the demos you will need to [install o-grid locally](#local-setup).

## Installation

### For developers

1. Run the following in your project's root directory
   
        bower install o-grid=https://github.com/Financial-Times/o-grid.git
    
    (If your project doesn't already contain a bower.json file you will need to create one first with the content `{"name": "your-project-name"}`)

2. Include the following in your app's styles

        // makes the grid respond to window rather than device width, so useful for development. 
        // For modules, and most products, this should be removed in production
        $o-grid-mq-type: width; 
        
        @import "o-grid/main";  
  Make sure that `o-grid` is in your sass include path (see the [origami docs](http://financial-times.github.io/ft-origami/docs/syntax/scss/) for more details). For products you can also simply use the [build service](http://financial-times.github.io/ft-origami/docs/developer-guide/build-service/)

For other steps only relevant to product/page development see the [Product developers guide](#product-developers-guide)

###For designers

Shortly the origami buildservice will come online, giving designers the ability to download o-grid (and other modules') styles. If you need to use o-grid before then ask a front-end developer if they can help get you set up. Or contact [Rhys Evans](mailto:rhys.evans@ft.com).


### For testers

You must already have [git](http://git-scm.com/downloads) and [python](http://www.python.org/download/) installed to run o-grid's test pages locally (OSX normally has these installed by default)

1. Open an instance of terminal
2. `cd /the/directory/you/want/to/install/in`
3. `git clone http://git.svc.ft.com:9080/git/origami/o-grid.git`
4. Do one of the following
    * `cd o-grid/docs; python -m SimpleHTTPServer` and go to http://localhost:8000 in your browser (necessary to access the demos over wifi)
    * in finder open /the/directory/you/want/to/install/in/docs/index.html


The main test page is /grid-responsive.html and it should be tested across all available devices and browsers (resizing the window to test responsive behaviour). 

The other demo pages are to demonstrate other possible configurations and need only be checked on desktop.


## General use

### Base classes
Grid styles are typically applied to the html using two types declaration:

* A `o-grid-row` class, added to the container element.  
It forces that element to extend to the maximum width available (either the maximum width defined by the grid, or the parent element's width if using a nested grid)

* A `data-o-grid-colspan` attribute, added to the element intended to conform to the grid's columns.  
`data-o-grid-colspan=""` by itself floats an element to the left. Specific widths are specified by setting the value of the attribute (see below for more details)  

So, for example

    <div class="o-grid-row">
        <div data-o-grid-colspan="6">A div spanning 6 grid columns</div>
    </div>

### Specifying column widths
The grid is divided into 12 columns and column instances can span any number of these 'grid-columns'. As the grid is responsive a different number of columns can be specified for each size of layout individually.
    
* {0-12} - specifies the number of columns to span by default
* S{0-12} - specifies the number of columns to span at the small layout
* M{0-12} - specifies the number of columns to span at the medium layout
* L{0-12} - specifies the number of columns to span at the large layout
* XL{0-12} - specifies the number of columns to span at the extra large layout

In general prefer to set the default for larger layouts and override for smaller ones as this means your module will probably display better if the grid is ever updated to allow additional larger layouts. If no default value is specified the element will simply take `width:auto` at any layout for which an explicit rule is not defined.

### Examples
    
A full width column for all sizes except large screens, where takes up 9 columns

    <div data-o-grid-colspan="12 XL9"></div>  
  
A half width column for all sizes except small screens, where takes up full width

    <div data-o-grid-colspan="6 S12"></div>  
  
A column which gradually takes up a greater portion of horizontal space as the screen gets smaller

    <div data-o-grid-colspan="S4 M3 L2 XL1"></div>  

A column which has width:auto except on small screens, where it takes up half the available width

    <div data-o-grid-colspan="S6"></div>  
  
### Utilities

#### Shorthand for single column layout
To avoid having to use the following inefficient markup

    <div class="o-grid-row">
       <div data-o-grid-colspan="12">
       </div>
    </div>

The following markup can be used instead

    <div class="o-grid-row" data-o-grid-colspan="12">
    </div>

#### Hiding elements

e.g. `data-o-grid-colspan="Mhide Shide"` will hide the given element for medium and small screen sizes even if the element isn't laid out as a column

#### Compact, gutterless rows
*(Note: unimplemented for the default media-queryless layout)*
To remove gutters from all columns in a row use the class `o-grid-row-compact`  e.g.

    <div class="o-grid-row o-grid-row-compact"></div>

#### Placeholder classes/`@extend`

[Placeholder classes](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#placeholders) can be extended in your sass and enable styling of elements according to the grid without having to add classes to the html. All class selectors have a placeholder class equivalent and these *must* always be used instead of classes when extending e.g. 
    
    .main {
        @extend %o-grid-row;
        // not @extend .o-grid-row
    }

Within modules favour applying the default classes to your html, and only use `@extend` for cases where significant simplification of code is achieved.

##### Placeholders for columns

Placeholders for column selectors are of the format `%o-grid-colspan-[{S|M|L|XL}]{0-12|hide}` e.g.
        
    .aside {
        @extend %o-grid-col !optional; // required in order to have the base column styles
        @extend %o-grid-colspan-4 !optional;
        @extend %o-grid-colspan-S12 !optional;
    }

There is no need to use these inside a media query - the placeholder classes are already included within the appropriate media query.

##### Fine-grained gutter removal
*(Note: unimplemented for the default media-queryless layout)*
To remove gutters from a specific column extend these placeholders which have the following structure (the parts in square brackets are optional).

    %o-grid-no[-{left|right}]-gutter[-{S|M|L|XL}]

e.g. 

        // no left gutter at large and extra large layouts. No gutter at all at small size
        .my-component {
            @extend %o-grid-no-left-gutter-L;
            @extend %o-grid-no-left-gutter-XL;
            @extend %o-grid-no-gutter-S;
        }

        //No gutter at any size
        .my-other-component {
            @extend %o-grid-no-gutter;
        }  



#### Mixins
* `oGridRespondTo($layoutSize)`  
To create styles that respond to the same breakpoints as the grid this sass mixin can be used to wrap the styles in the appropriate media query. It should be passed `S`, `M`, `L` or `XL` depending on which layout size the style should apply to e.g.

        @include oGridRespondTo(S) {
            .o-example-module .item-subheading {
                font-size: 0.5em
            }
        }
More than one layout can be passed in at once (enabling applying the same styles to e.g. both extra large and large layouts).
        
        @include oGridRespondTo(L XL) {
            .o-example-module .item-subheading {
                font-size: 0.5em
            }
        }

* `oGridTargetAtFixedLayout()`  
This applies styles only when the large screen fixed layout (typically used as the ie7/ie8 fallback) is active
        
        @include oGridTargetAtFixedLayout() {
            .o-header {
                position: static;
            }
        }

#### Variables
All the variables used by the grid (see src/scss/_variables.scss) can be used in your own sass stylesheets but *must not* be over-written at the component/module level.


### Gotchas

#### Fixed/Absolute positioning
Widths are specified in percentages, which will not work for fixed or absolute positioned elements (The grid can however be used to layout elements within an absolute/fixed position container). If you need to support fixed/absolutely position elements, or have developed yuor own solution, please leave a comment on the [github issue](https://github.com/Financial-Times/o-grid-issues/issues/9).

## Product developers guide<a id="product-developers-guide" style="visibility:hidden">&nbsp;</a>

### Laying out pages with the grid
If your entire page is to be laid out using the grid add the class `o-grid-page` to the `body`/ wrapper and then build up the layout using nested rows and columns. The html head *must* include the following metatag (or equivalent) to disable user scaling

    <meta name="viewport" content="width=device-width, initial-scale=1">

By default `o-grid` outputs no styles (unless fetched using the origami build service) and therefore your product will either have to
* set `$o-grid-is-silent: false;` to output the entire set of styles and selectors
* `@extend` the grid's placeholder classes to apply grid styles to yuour page

### Including grid-based components in an existing, non-grid page

1. Wrap the entire component in an element with the class `o-grid-box` to ensure the module is laid out correctly. 

2. See the section below on *Things you can do (but in most cases probably shouldn't)* to make the grid's behaviour conform to the behaviour of the rest of the page's styles e.g. if your page isn't at all responsive you'll want to set `$o-grid-is-responsive: false` to prevent the component behaving in a responsive manner

### Supporting legacy browsers
By default, any browser that doesn't support media queries will be served the small layout. This can be over-ridden so the large layout is shown instead. The default for triggering this large fixed layout is ie7/8 on desktop, but this is configurable using one of two variables

* `$o-grid-fixed-layout-useragents: ie7 ie8 !default` - useragent names compatible with [o-useragent](http://git.svc.ft.com/tree/origami%2Fo-useragent.git/HEAD)
* `$o-grid-fixed-layout-selector: null !default` - css selector. If specified will override the useragent targeting

For ie7 the `boxsizing.htc` polyfil provided by [o-useragent](http://git.svc.ft.com/tree/origami%2Fo-useragent.git/HEAD) is also needed. See [o-assets](http://git.svc.ft.com/tree/origami%2Fo-assets.git/HEAD) for details of how to configure the path to this file.

### Things you *can* do (but in most cases probably shouldn't)
The grid is easy to configure by overwriting the default values of many of the sass variables. To do so simply specify a value for the given variable before you include o-grid's main.scss file. A few notable uses are as follows:

#### Changing how responsive the grid is
The following flags can be used to change the responsive behaviour *\[defaults in square brackets\]*

* `$o-grid-is-responsive`: \[true\] If set to false only the default is used. This greatly reduces the stylesheet file size and should be used for mobile only products
* `$o-grid-is-fluid`: \[true\] Switches between fully fluid and snapped grid layouts
* `$o-grid-is-fixed-desktop`: \[false\] Forces the site to always use the large layout
* `$o-grid-fixed-layout-selector`: \[null\] Can be set to any class/selector so that the layout can be enabled for criteria other than the browser being ie7/8
* `$o-grid-mq-type` : \[device-width\] By default only responds to device rather than window width. To change this set this variable to `width`


#### Resizing the grid
By overwriting the values of any of the `$...width`, `$...break` or `$...gutter` variables the width and spacing of the grid at any of the layout sizes can be decreased or increased as required

#### Disabling larger layouts
By setting the value of a breakpoint (`$o-grid-small-to-medium-break`, `$o-grid-medium-to-large-break` or `$o-grid-large-to-extra-large-break`) to `false` the breakpoint is disabled, and its styles will not be included. *This only works when disabling a breakpoint **and** all those larger than it so, e.g. `$o-grid-medium-to-large-break: false;` will have unexpected efects on your layout unless you also specify `$o-grid-large-to-extra-large-break: false;`.*

## Developing o-grid

### TDD
The demo pages (docs/grid-{grid-type}.html) are intended to perform a similar role to unit tests i.e. they contain examples which cover all significant variants of applying the grid's classes. Therefore a TDD/BDD approach can be taken to fixing bugs/adding functionality by first adding a representative failing example to these pages and afterwards writing the code to fix it.

#### Adding an example to all demo pages
Add a new object literal to `docs-generator/examples.json` with the following properties

* description: Description of how the elemnts in this grid should behave at various screen sizes 
* title: Short description of what this example is intended to illustrate,
* wrapper *[optional]*: Object defining the html to wrap the columns in (defaults to `<div class="o-grid-page"><div class="o-grid-row">{columns}</div></div>`)
    * start: html to insert before the columns (opening tags)
    * end: html to insert after the columns (closing tags)

and one of the following:

* columns: A (possibly nested) array of objects each of which is either  
    * An object of the form `{"tagname": "class"}`
    * An object of the form `{"columns": [An array of the same format as this one]}`
* rows: An array of 'columns' arrays (as defined above)

Then in terminal run `grunt`
    
#### Adding a new demo page
1. Choose a one word name for your new demo page (let's call it 'widescreen' in this example)
2. Create a new file `src/scss/bundles/widescreen.scss`
3. Edit the contents of `widescreen.scss` to include the styles you need. You'll probably want to start it off with the content

        @import "default.scss";
        @import "../components/grid-responsive.scss";
        @import "../components/grid-fixed.scss";

4. Edit docs-generator/partials/head.hbs to include the correct stylesheet & classes when the variable `widescreen` is truthy (i.e wrap in `{{#widescreen}}{{\widescreen}}`)
5. In Gruntfile.js append `widescreen` to ` demoPageTypes`
6. Add a link to the demo page to the demos section of `README.md`
7. In terminal run the command `grunt`


### Pre-release steps
* Comment any new mixins/functions in the sass
* Re-write `README.md` to reflect your changes
* Run `grunt` (to republish the docs)
* After commiting add a tag as follows and push (TODO - needs reviewing)
    * increment the patch version for bug fixes
    * increment the minor version for changes to the grid's appearance
    * increment the major version for changes to how modules should implement the grid
