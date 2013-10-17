#ft-grid-module

##About

ft-grid-module defines a 12 column responsive, nestable grid system for laying out html pages and modules.
It supports all ['html5' browsers](link to ref), with a fixed-width fallback for browsers which don't support media queries

###Demos

* [Responsive grid](demos/grid-responsive.html)  
    Demonstrates the behaviour of a page using the recommended installation of ft-grid-module

* [Default grid](demos/grid-default.html)  
    Fluid grid with max width of 600px - mocks behaviour if media queries not supported

* [Legacy grid](demos/grid-legacy.html)  
	Fixed grid with width of 960px - typically loaded if browser/feature detection suggest user is on ie7


##Installation

###Add as a dependency using Bower

Write this once we've defined where it sits etc.

###Include in your app

In your app's core stylesheet 

    @include /path/to/bower/ft-grid-module/bundles/responsive.scss

And in your app's ie7 stylesheet

	@include /path/to/bower/ft-grid-module/bundles/legacy.scss


Alternatively include the responsive grid and (optionally) the legacy grid css file in the html head directly (it's recommended a conditional comment is used to include for ie7 and below)


	<link rel='stylesheet' href='/deps-directory/module-grid/css/grid-responsive.css' /> 
	<!--[if lt IE 8]><link rel='stylesheet' href='/deps-directory/module-grid/css/grid-legacy.css' /><![endif]-->


**What to do about boxsizing.htc ???**

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


##Basic implementation
Grid styles are applied to page elements using two types of class declaration:

* A ``grid-row`` class, added to the container element.  
It forces that element to extend to the maximum width available (either the maximum width defined by the grid, or the parent element's width if using a nested grid)

* A ``grid-col`` class, added to the element intended to have a width conforming to the grid.  
``grid-col`` by itself does virtually nothing and needs to have specific width rules appended to it e.g. ``grid-col-d6-s12`` (see below for more details)  

