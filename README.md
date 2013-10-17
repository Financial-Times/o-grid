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