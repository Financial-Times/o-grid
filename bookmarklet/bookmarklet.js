// Thanks to Antoine Lefeuvre for the base of this bookmarklet
// Modified for o-grid by the Financial Times
// http://alefeuvre.github.io/foundation-grid-displayer/
(function() {
	const startBookmarklet = function($) {

		// Set bookmarklet framework
		const scriptSrc = $("script[src*='bookmarklet.js']").attr("src");
		const framework = scriptSrc.split("?");
		let gdFramework;

		if (framework.length > 1) {
			gdFramework = framework[1];
		} else {
			gdFramework = "o3";
		}

		// Close grid displayer
		const removeGridDisplayer = function() {
			$("#grid-displayer-tools").remove();
			$("#grid-displayer").remove();
		};

		// Build grid displayer
		let gdIsBuilt = false;
		const buildGridDisplayer = function(gridFramework) {

			const $gdContainer = $("#grid-displayer .gd-container");
			const $gdRow = $("#grid-displayer .gd-row");
			const $gdTools = $("#grid-displayer-tools");
			let colsHtml = "";
			const gridNbcols = parseInt($gdTools.find("#gdt-nbcols").val());

			if (gdIsBuilt) {
				$gdContainer.removeClass().addClass("gd-container");
				$gdRow.removeClass().addClass("gd-row").css("border-right", 0).empty();
				$gdTools.find(".framework-specific").hide();
			}

			for(let i = 0; i < gridNbcols; i++) {
				colsHtml += "<div class=\"gd-column\">&nbsp;</div>";
			}
			$gdRow.append(colsHtml);
			const $gdColumn = $gdRow.find(".gd-column");

			switch(gridFramework) {
				case 'o3':
					$gdContainer.addClass("o-grid");
					$gdRow.addClass("o-grid-row");
					$gdColumn.attr("data-o-grid-colspan", "1");
				break;
				case 'so3':
					$gdContainer.addClass("o-grid o-grid-snappy");
					$gdRow.addClass("o-grid-row");
					$gdColumn.attr("data-o-grid-colspan", "1");
				break;
			}

			$gdTools.css("display", "inline-block");
			setGridGutters($gdTools.find("#gdt-gutterwidth").val());

			setGridColor($gdTools.find("#gdt-color").val(), true);
			setGridOpacity($gdTools.find("#gdt-opacity").val());

			if (!gdIsBuilt) {
				$gdTools.find("#gdt-options").css("display", "block"); // as the CSS is loaded after the JS, show() is overwritten by display: none
				$gdTools.find("#gdt-ok").css("display", "block");
				setGridZindex($gdTools.find("#gdt-zindex").val());
				$("#grid-displayer").show();
				gdIsBuilt = true;
			}
		};

		// Setters
		const setGridColor = function(gridColor, gutterless) {
			$("#grid-displayer .gd-column").css("background-color", gridColor);
			if (gutterless) {
				$("#grid-displayer .gd-column").css("outline", "1px solid " + gridColor);
			}
		};
		const setGridOpacity = function(gridOpacity) {
			$("#grid-displayer .gd-column").css("opacity", gridOpacity);
		};
		const setGridGutters = function(gridGutterwidth) {
			const borderWidth = parseInt(gridGutterwidth.replace( /^\D+/g, '')) / 2;
			const unit = gridGutterwidth.substr(gridGutterwidth.length - 2, 2);
			$("#grid-displayer .gd-column").css({"border-width": "0 " + borderWidth + unit, "border-style": "solid", "border-color": "#FFF", "padding": 0}); // Remove padding for small 12 column view - fluid display forces padded columns down
		};
		const setGridZindex = function(gridZindex) {
			$("#grid-displayer").css("z-index", gridZindex);
		};

		if ($("#grid-displayer").length) { // Close grid displayer when the bookmarklet is clicked for a second time
			removeGridDisplayer();
		} else {
			// Default parameters
			const gdNbcols = 12;
			const gdGutterwidth = "10px";
			const gdColor = "black";
			const gdOpacity = "0.3";
			const gdZindex = "999";

			// Frameworks list
			const origamis = [["o3", "Origami Grid v3"], ["so3", "Origami Grid v3 (snappy)"]];
			const frameworks = origamis;

			// HTML
			const gridHtml = "<div id=\"grid-displayer\" style=\"display: none;\"><div class=\"gd-container\"><div class=\"gd-row\"></div></div></div>";
			let gridToolsHtml = "<div id=\"grid-displayer-tools\">";
			gridToolsHtml += "	<div class=\"gdt-field\"><select id=\"gdt-framework\">";
			gridToolsHtml += "		<option>&darr; Choose your framework</option>";
			$.each(frameworks, function(index, value) {
				gridToolsHtml += "<option value=\"" + value[0] + "\"";
				gridToolsHtml += (value[0] === gdFramework) ? " selected" : "";
				gridToolsHtml += ">" + value[1] + "</option>";
			});
			gridToolsHtml += "";
			gridToolsHtml += "	</select></div>";
			gridToolsHtml += "	<div id=\"gdt-options\" class=\"gdt-field\">";
			gridToolsHtml += "	  <div><label for=\"gdt-color\">Columns colour</label><input type=\"text\" id=\"gdt-color\" value=\"" + gdColor + "\" /></div>";
			gridToolsHtml += "		<div><label for=\"gdt-opacity\">Opacity</label><input type=\"text\" id=\"gdt-opacity\" value=\"" + gdOpacity + "\" /></div>";
			gridToolsHtml += "		<div class=\"framework-specific gutterless\"><label for=\"gdt-gutterwidth\">Gutter width</label><input type=\"text\" id=\"gdt-gutterwidth\" value=\"" + gdGutterwidth + "\" /></div>";
			gridToolsHtml += "		<div class=\"framework-specific twb\"><label for=\"gdt-nbcols\">Nb cols</label><input type=\"text\" id=\"gdt-nbcols\" value=\"" + gdNbcols + "\" /></div>";
			gridToolsHtml += "		<div><label for=\"gdt-zindex\">z-index</label><input type=\"text\" id=\"gdt-zindex\" value=\"" + gdZindex + "\" /></div>";
			gridToolsHtml += "	</div>";
			gridToolsHtml += "	<div class=\"gdt-button\" id=\"gdt-ok\"><a href=\"javascript:;\">OK</a></div>";
			gridToolsHtml += "	<div class=\"gdt-button\"><a href=\"#null\" id=\"gdt-close\">Close</a></div>";
			gridToolsHtml += "</div>";

			$("head").append("<link rel='stylesheet' href='https://rawgit.com/Financial-Times/o-grid/master/bookmarklet/bookmarklet.css' />");

			// A version of the grid might already be loaded, so we load it only if needed
			if ($('.o-grid-row').length === 0) {
				$("head").append("<link rel='stylesheet' href='http://build.origami.ft.com/bundles/css?modules=o-grid@^3.0.3' />");
			}

			$("body").prepend(gridHtml).prepend(gridToolsHtml);
			$("#grid-displayer-tools").delay(1200).fadeTo("slow",0.1);

			if (gdFramework !== "") {
				buildGridDisplayer(gdFramework);
			}

			// Actions
			$("#grid-displayer-tools #gdt-framework").change(function() {
				gdFramework = $(this).val();
				$("#grid-displayer-tools #gdt-nbcols").val(12);
				buildGridDisplayer(gdFramework);
			});
			$("#grid-displayer-tools #gdt-nbcols").change(function() {
				buildGridDisplayer(gdFramework);
			});
			$("#grid-displayer-tools #gdt-color").change(function() {
				setGridColor($(this).val(), true);
			});
			$("#grid-displayer-tools #gdt-opacity").change(function() {
				setGridOpacity($(this).val());
			});
			$("#grid-displayer-tools #gdt-gutterwidth").change(function() {
				setGridGutters($(this).val());
			});
			$("#grid-displayer-tools #gdt-zindex").change(function() {
				setGridZindex($(this).val());
			});

			$("#grid-displayer-tools #gdt-close").click(function() {
				removeGridDisplayer();
			});
		}
	};

	// Load jQuery from CDN if needed
	if (!window.jQuery) {
		const head = document.getElementsByTagName("head")[0];
		const jQueryScript = document.createElement("script");
		jQueryScript.src = "http://code.jquery.com/jquery-1.10.0.min.js";
		jQueryScript.onload = function() { startBookmarklet(window.jQuery); };
		head.appendChild(jQueryScript);
	} else {
		startBookmarklet(window.jQuery);
	}
}());
