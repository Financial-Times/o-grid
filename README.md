#grid-module

> Living off the grid and being kind of an outlaw brings a dangerous reality.  
  *Ron Perlman*

##About

grid-module defines a 12 column responsive, nestable grid system for laying out html pages and modules.
It supports all ['html5' browsers](http://responsivenews.co.uk/post/18948466399/cutting-the-mustard), with a [fixed-width fallback](https://docs.google.com/a/ft.com/drawings/d/14vmVJzuO8k3KxOwf19kWfd8mdKP1qVt8Wuqi-HvuioA/) for browsers that don't support media queries.

###Demos

* [Responsive grid](grid-responsive.html)  
    Demonstrates the behaviour of a page using the recommended installation of grid-module

* [Fluid grid](grid-fluid.html)  
    Demonstrates the behaviour of a page using a fully fluid version of the responsive grid

* [Default grid](grid-default.html)  
    Fluid grid with max width of 600px - mocks behaviour if media queries not supported

* [Legacy grid](grid-legacy.html)  
	Fixed grid with width of 960px. Should be loaded if media queries are not supported and the viewport is large enough.

##Installation

###For developers

[Skip to installation guide for designers](#designer-installation)

1. Add the following to your module's bower dependencies
   
   		"grid-module": "0.2.x"

2. Include the following in your app's styles 

    	@import '/path/to/bower/grid-module/main.scss';  
  Depending on whether you're developing a product or a component where exactly you put this will vary. For a product you can also simply use the [build service](http://financial-times.github.io/ft-origami/docs/build-service/)

3. Specify an absolute path pointing to ``/path/to/bower/grid-module/polyfills`` as a value for ``$pathToPolyfills`` in your sass

4. Ensure your product implements html5 boilerplate style classes for browser detection

###For designers

1. From terminal run the following commands (you will need to have [bower](http://bower.io/) already installed)

		cd /Users/{your username}/the/directory/your/protoype/is/in
		bower install http://git.svc.ft.com:9080/git/origami/grid-module.git

2. Include the responsive grid css file in your html prototype's ``<head>`` directly

		<link rel='stylesheet' href='bower_components/grid-module/docs/css/grid-responsive.css' /> 

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

In addition, for nested grids the parent box's width is divided into 12 columns


##Using the grid
Grid styles are typically applied to page elements using two types of class declaration:

* A ``ft-grid-row`` class, added to the container element.  
It forces that element to extend to the maximum width available (either the maximum width defined by the grid, or the parent element's width if using a nested grid)

* A ``ft-grid-col`` class, added to the element intended to have a width conforming to the grid.  
``ft-grid-col`` by itself does virtually nothing and needs to have specific width rules appended to it e.g. ``ft-grid-col-d6-s12`` (see below for more details)  


###Example

	<div class="ft-grid-row">
		<div class="ft-grid-col-d12">A full width column</div>
	</div>


##Column widths
The grid is divided into 12 columns and column instances can span any number of these 'ft-grid-columns'. As the grid is responsive a different number of columns can be specified for each size of layout individually, as well as a default number of ft-grid-columns. To do this append 'subclasses' to the ``ft-grid-col`` class in the following format: `` -{layout size identifier}{number of columns}`` e.g. ``ft-grid-col-s5``

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
	
	//A full width column for all sizes except large screens, where takes up 9 columns
	<div class="ft-grid-col-d12-xl9"></div>  
  
	//A half width column for all sizes except small screens, where takes up full width
	<div class="ft-grid-col-d6-s12"></div>  
  
	//A column which gradually takes up a greater portion of horizontal space as the screen gets smaller
	<div class="ft-grid-col-s4-m3-l2-xl1"></div>  
  
###Utilities
As well as the column and row classes a handful of utilities are also included in the grid styles

* **ft-grid-box**  
When using a grid-module based component in a product/page that isn't laid out using grid-module wrap the entire component in an element with the class ``ft-grid-box`` to ensure the module is laid out correctly using the grid

* **hide**  
e.g. ``grid-mhide-shide`` will hide the given element for medium and small screen sizes

* **respondTo($layoutSize)**  
To create styles that respond to the same breakpoints as the grid this sass mixin can be used to wrap the styles in the appropriate media query. It should be passed ``$small``, ``$medium``, ``$large`` or ``$extraLarge`` depending on which layout size the style should apply to e.g.

	    @include respondTo($small) {
	    	.ft-example-module .item-subheading {
	    		font-size: 0.5em
	    	}
	    }

* **sass variables**  
All the variables used by the grid are available in other stylesheets, and most of their default values can be overridden by defining different values for them *before* the grid-module ``main.scss`` file is included. **This must only be done on a page/product level and never at the component/module level.** 
    * **Dimensions** (default values in square brackets)

		* *Gutters* - defines the space between columns
			* $gridHalfGutter: \[10px\]
			* $defaultLayoutHalfGutter: \[1%\]
			* $fixedLayoutHalfGutter: \[5px\]

		* *Page widths* - defines the widths of layouts when fluid layouts aren't used
			* $globalMinWidth: \[240px\]
			* $smallMaxWidth: \[600px\]
			* $mediumMaxWidth: \[780px\]
			* $largeMaxWidth: \[960px\]
			* $extraLargeMaxWidth: \[1360px\]

		* *Breakpoints* - defines the screen widths at which layouts switch
			* $smallToMediumBreak: \[600px\]
			* $mediumToLargeBreak: \[1000px\]
			* $largeToXLBreak: \[1400px\]
	* **Flags**
		* $isResponsive: \[true\] If set to false only the default ('mobile') layout is used. This greatly reduces the stylesheet file size and shoudl be used for mobile only products
		* $isFluid: \[false\] Switches to fully fluid layouts
		* $isFixedDesktop: \[false\] Forces the site to always use the large layout (if $isResponsive is true then this value is ignored)
	* **Class names**
		* $fixedLayoutSelector: \['.lt-ie9'\] The typical use case for forcing use of the fixed large layout is on ie7/8, but to apply this style in more/other scenarios overwrite this variable with your own selector.


##Gotchas

* Using a different prefix instead of ``ft-grid-col``, e.g. ``not-really-d6-a-column`` will still apply the grid width so in general it's best to avoid classes which contain ``-{letter}{number}`` in your module's class names. Conversely, don't use this feature/bug deliberately by using e.g. ``ft-mymodule-d6`` to layout your module as this behaviour is just a side effect and not a supported feature
