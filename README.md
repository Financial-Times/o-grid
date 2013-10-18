#ft-grid-module

> Living off the grid and being kind of an outlaw brings a dangerous reality.  
  *Ron Perlman*

##About

ft-grid-module defines a 12 column responsive, nestable grid system for laying out html pages and modules.
It supports all ['html5' browsers](http://responsivenews.co.uk/post/18948466399/cutting-the-mustard), with a [fixed-width fallback](https://docs.google.com/a/ft.com/drawings/d/14vmVJzuO8k3KxOwf19kWfd8mdKP1qVt8Wuqi-HvuioA/) for browsers that don't support media queries.

###Demos

* [Responsive grid](demos/grid-responsive.html)  
    Demonstrates the behaviour of a page using the recommended installation of ft-grid-module

* [Default grid](demos/grid-default.html)  
    Fluid grid with max width of 600px - mocks behaviour if media queries not supported

* [Legacy grid](demos/grid-legacy.html)  
	Fixed grid with width of 960px - typically loaded if browser/feature detection suggest user is on ie7

##Installation

###For developers

[Skip to installation guide for designers](#designer-installation)

Add the following to your app's bower dependencies
   
   "ft-grid-module": "~0.1.0"

Then include in your app's styles

* core stylesheet  

    @import '/path/to/bower/ft-grid-module/bundles/responsive.scss';

* ie7 and ie8 stylesheets  

	@import '/path/to/bower/ft-grid-module/bundles/legacy.scss';

#####boxsizing.htc
In order for the grid to work in ie7 a .htc polyfill is used, referenced from the stylesheets using ``/behavior/boxsizing.htc``. The file ``/path/to/bower/ft-grid-module/dist/behavior/boxsizing.htc`` will either

* need to be copied (ideally by your build process) to ``/behavior/boxsizing.htc``
* be pointed to using a http rewrite or similar<a id="designer-installation">.</a>

###For designers

From terminal run the following command in your prototype's directory (you will need to have [bower](http://bower.io/) already installed)

	bower install ft-grid-module

Include the responsive grid css file in the html head directly

	<link rel='stylesheet' href='bower_components/ft-grid-module/dist/css/grid-responsive.css' /> 
	<!-- Optionally include the ie7/8 stylesheet too -->
	<!--[if lt IE 9]><link rel='stylesheet' href='bower_components/ft-grid-module/dist/css/grid-legacy.css' /><![endif]-->


##Grid dimensions

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

For each of these the available horizontal width is separated into 12 columns

In addition, for nested grids the parent element's width is divided into 12 columns


##Using the grid
Grid styles are applied to page elements using two types of class declaration:

* A ``grid-row`` class, added to the container element.  
It forces that element to extend to the maximum width available (either the maximum width defined by the grid, or the parent element's width if using a nested grid)

* A ``grid-col`` class, added to the element intended to have a width conforming to the grid.  
``grid-col`` by itself does virtually nothing and needs to have specific width rules appended to it e.g. ``grid-col-d6-s12`` (see below for more details)  


###Example

	<div class="grid-row">
		<div class="grid-col-d12">A full width column</div>
	</div>


##Column widths
The grid is divided into 12 columns and column instances can span any number of these 'grid-columns'. As the grid is responsive a different number of columns can be specified for each size of layout individually, as well as a default number of grid-columns. To do this append 'subclasses' to the ``grid-col`` class in the following format: `` -{layout size identifier}{number of columns}`` e.g. ``grid-col-s5``

###Layout size identifiers

 * **s**  
 *Small* layout

 * **m**  
 *Medium* layout

* **l**  
 *Large* layout

* **xl**  
 *Extra Large* layout

* **d** *[required unless all four of the above are specified]*  
 Default for all layouts not-having an explicit rule defined using one of the above 


###Examples

	<div class="grid-col-d12-xl9">A full width column for all sizes except large screens, where takes up 9 columns</div>
	<div class="grid-col-d6-s12">A half width column for all sizes except small screens, where takes up full width</div>
	<div class="grid-col-s4-m3-l2-xl1">A column which gradually takes up a greater portion of horizontal space as the screen gets smaller</div>

###Utilities
As well as the column and row classes a handful of utilities are also included in the grid styles

* **hide**  
e.g. ``grid-mhide-shide`` will hide the given element for medium and small screen sizes

##Gotchas

* Using a different prefix instead of ``grid-col``, e.g. ``not-really-d6-a-column`` will still apply the grid width so in general it's best to avoid classes which contain ``-{letter}{number}`` in your module's class names. Conversely, don't use this feature/bug deliberately by using e.g. ``ft-mymodule-d6`` to layout your module as this behaviour is just a side effect and not a supported feature
