/*globals Origami*/
// Thanks to Antoine Lefeuvre for the base of this bookmarklet
// Modified for o-grid by the Financial Times
// http://alefeuvre.github.io/foundation-grid-displayer/
(function() {
	"use strict";
	var startBookmarklet = function($) {

		// Set bookmarklet framework
		var scriptSrc  = $("script[src*='bookmarklet.js']").attr("src");
		var framework = scriptSrc.split("?");
		var gdFramework;

		if (framework.length > 1) {
			gdFramework = framework[1];
		} else {
			gdFramework = "o4";
		}

		$(window).on('resize', function() { setGridGutters(); });

		// Close grid displayer
		var removeGridDisplayer = function() {
			$("#grid-displayer-tools").remove();
			$("#grid-displayer").remove();
		},

		// Build grid displayer
		gdIsBuilt = false,
		buildGridDisplayer = function(gridFramework) {

			var $gdContainer = $("#grid-displayer .gd-container"),
			$gdRow           = $("#grid-displayer .gd-row"),
			$gdTools         = $("#grid-displayer-tools"),
			colsHtml         = "",
			gridNbcols       = parseInt($gdTools.find("#gdt-nbcols").val());

			if (gdIsBuilt) {
				$gdContainer.removeClass().addClass("gd-container");
				$gdRow.removeClass().addClass("gd-row").css("border-right", 0).empty();
				$gdTools.find(".framework-specific").hide();
			}

			for(var i = 0; i < gridNbcols; i++) {
				colsHtml += "<div class=\"gd-column\">&nbsp;</div>";
			}
			$gdRow.append(colsHtml);
			var $gdColumn = $gdRow.find(".gd-column");

			switch(gridFramework) {
				case 'o4':
					$gdContainer.addClass("o-grid-container");
					$gdRow.addClass("o-grid-row");
					$gdColumn.attr("data-o-grid-colspan", "1");
				break;
				case 'so4':
					$gdContainer.addClass("o-grid-container o-grid-container--snappy");
					$gdRow.addClass("o-grid-row");
					$gdColumn.attr("data-o-grid-colspan", "1");
				break;
			}

			$gdTools.css("display", "inline-block");
			setGridGutters();

			setGridColor($gdTools.find("#gdt-color").val(), true);
			setGridOpacity($gdTools.find("#gdt-opacity").val());

			if (!gdIsBuilt) {
				$gdTools.find("#gdt-options").css("display", "block"); // as the CSS is loaded after the JS, show() is overwritten by display: none
				$gdTools.find("#gdt-ok").css("display", "block");
				setGridZindex($gdTools.find("#gdt-zindex").val());
				$("#grid-displayer").show();
				gdIsBuilt = true;
			}
		},

		// Setters
		setGridColor = function(gridColor, gutterless) {
			$("#grid-displayer .gd-column").css("background-color", gridColor);
		},
		setGridOpacity = function(gridOpacity) {
			$("#grid-displayer .gd-column").css("opacity", gridOpacity);
		},
		setGridGutters = function() {
			var gutter = Origami['o-grid'].getCurrentGutter();
			$("#grid-displayer .gd-column").css({"border-width": "0 0 0 " + gutter, "border-style": "solid", "border-color": "#FFF", "padding": 0});
		},
		setGridZindex = function(gridZindex) {
			$("#grid-displayer").css("z-index", gridZindex);
		};

		if ($("#grid-displayer").length) { // Close grid displayer when the bookmarklet is clicked for a second time
			removeGridDisplayer();
		} else {

			// Default parameters
			var gdNbcols      = 12;
			var gdColor       = "black";
			var gdOpacity     = "0.3";
			var gdZindex      = "999";

			// Frameworks list
			var origamis = [["o4", "Origami Grid v4"], ["so4", "Origami Grid v4 (snappy)"]];
			var frameworks = origamis;

			// HTML
			var gridHtml = "<div id=\"grid-displayer\" style=\"display: none;\"><div class=\"gd-container\"><div class=\"gd-row\"></div></div></div>",
			gridToolsHtml = "<div id=\"grid-displayer-tools\">";
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
			gridToolsHtml += "		<div class=\"framework-specific twb\"><label for=\"gdt-nbcols\">Nb cols</label><input type=\"text\" id=\"gdt-nbcols\" value=\"" + gdNbcols + "\" /></div>";
			gridToolsHtml += "		<div><label for=\"gdt-zindex\">z-index</label><input type=\"text\" id=\"gdt-zindex\" value=\"" + gdZindex + "\" /></div>";
			gridToolsHtml += "	</div>";
			gridToolsHtml += "	<div class=\"gdt-button\" id=\"gdt-ok\"><a href=\"javascript:;\">OK</a></div>";
			gridToolsHtml += "	<div class=\"gdt-button\"><a href=\"#null\" id=\"gdt-close\">Close</a></div>";
			gridToolsHtml += "</div>";

			$("head").append("<link rel='stylesheet' href='https://rawgit.com/Financial-Times/o-grid/master/bookmarklet/bookmarklet.css' />");

			// A version of the grid might already be loaded, so we load it only if needed
			if ($('.o-grid-row').length === 0) {
				$("head").append("<link rel='stylesheet' href='http://build.origami.ft.com/v2/bundles/css?modules=o-grid@^5.0.0' />");
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
			$("#grid-displayer-tools #gdt-zindex").change(function() {
				setGridZindex($(this).val());
			});

			$("#grid-displayer-tools #gdt-close").click(function() {
				removeGridDisplayer();
			});
		}
	};

	var head = document.getElementsByTagName("head")[0];
	var gridScript = document.createElement("script");
	gridScript.src = "https://www.ft.com/__origami/service/build/v2/bundles/js?modules=o-grid@^5.0.0";
	gridScript.onload = init();
	head.appendChild(gridScript);

	// Load jQuery from CDN if needed
	function init() {
		if (!window.jQuery) {
			var jQueryScript = document.createElement("script");
			jQueryScript.src  = "https://code.jquery.com/jquery-3.3.0.min.js";
			jQueryScript.onload = function() { startBookmarklet(window.jQuery); };
			head.appendChild(jQueryScript);
		} else {
			startBookmarklet(window.jQuery);
		}
	}
}());
