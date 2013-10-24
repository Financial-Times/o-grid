#grid-module development and testing guide

*[Development](#development)
*[Testing](#testing)

##Development<a id="development" style="visibility:hidden">&nbsp;</a>

###BDD/TDD
The demo pages (docs/grid-{grid-type}.html) are intended to perform a similar role to unit tests i.e. they contain examples which cover all significant variants of applying the grid's classes. Therefore a TDD/BDD approach can be taken to fixing bugs/adding functionality by first adding a representative failing example to these pages and afterwards writing the code to fix it.

####Adding an example to all demo pages
Add a new object literal to ``docs-generator/examples.json`` with the following properties

* columns: A (possibly nested) array of objects each of which is either  
	* An object of the form ``{"tagname": "class"}``
	* An object of the form ``{"columns": [An array of the same format as this one]}``
* description: Description of how the elemnts in this grid should behave at various screen sizes 
* title: Short description of what this example is intended to illustrate,
* wrapper *[optional]*: Object defining the html to wrap the columsn in (defaults to ``<div class="ft-grid-row">{columns}</div>``)
	* start: html to insert before the columns (opening tags)
	* end: html to insert after the columns (closing tags)

Then in terminal run ``grunt``
    
####Adding a new demo page
1. Choose a one word name for your new demo page (let's call it 'spiffing' in this example)
2. Create a new file ``src/scss/bundles/spiffing.scss``
3. Edit the contents of ``spiffing.scss`` to include the styles you need. You'll probably want to start it off with the content

		@import "default.scss";
		@import "../components/grid-responsive.scss";
		@import "../components/grid-fixed.scss"; 

4. Edit docs-generator/partials/head.hbs to include the correct stylesheet & classes when the variable ``spiffing`` is truthy (i.e wrap in ``{{#spiffing}}{{\spiffing}}``) 
5. In Gruntfile.js append ``spiffing`` to `` demoPageTypes``
6. In terminal run the command ``grunt``


###Pre-release steps
* Comment any new mixins/functions in the sass
* Re-write ``README.md`` and ``CONTRIBUTING.md`` to reflect your changes
* Run grunt (to republish the docs)
* After commiting add a tag as follows and push (TODO - needs reviewing)
	* incrementing the patch version for bug fixes
	* incrementing the minor version for changes to the grid's appearance
	* incrementing the major version for changes to how modules should implement the grid


##Testing<a id="testing" style="visibility:hidden">&nbsp;</a>

###Running the module locally

You must already have [git](http://git-scm.com/downloads) and [python](http://www.python.org/download/) installed to run grid-module's test pages locally (OSX normally have these installed by default)

1. Open an instance of terminal
2. ``cd /the/directory/you/want/to/install/in``
3. ``git clone http://git.svc.ft.com:9080/git/origami/grid-module.git``
4. ``cd grid-module/docs``
5. ``python -m SimpleHTTPServer``

Then the docs (with links to each of the demo pages) should be available in your browser on http://localhost:8000

The main test page is http://localhost:8000/grid-responsive.html and it should be tested across all available devices and browsers (resizing the window to test responsive behaviour). 

The other demo pages are to demonstrate other possible configurations and need only be checked on desktop.