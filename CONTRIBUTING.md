#grid-module development and testing guide


##Testing

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