## Migration Guide

### Migrating from v4 to v5

### Sass

IE8 is no longer supported, remove uses of:
- `$o-grid-ie8-rules`
- `oGridTargetIE8`
- `oGridTargetModernBrowsers`

The following Sass mixins and variables have been removed. Replace them with a single call to `oGrid` with the relevant options. See [the README](./README.md) for more details:
- `oGridGenerate`
- `oGridSurfaceLayoutSizes`
- `$o-grid-shuffle-selectors`
- `$o-grid-human-friendly-selectors`

```diff
-$o-grid-human-friendly-selectors: true;
-$o-grid-shuffle-selectors: true;
-@include oGridSurfaceLayoutSizes();
-@include oGridGenerate();
+@include oGrid($opts: (
+	'bleed': true,
+	'shuffle-selectors': true,
+	'friendly-selectors': true,
+	'surface': ('current-layout', 'layout-sizes'),
+	'rows': ('compact')
+));
```

The variable `$o-grid-debug-mode` has also been removed. Include the mixin `oGridDebugInfo` to output debug styles instead.

### JavaScript

- As IE8 is no longer supported and the method `setMinSupportedIeVersion` has been removed.

### Migrating from v3 to v4

#### Important Changes

- Layout sizes have slightly changed (M, L and XL are 10px wider).
- Gutter widths vary between layouts (default: 10px, M and above: 20px)

#### Markup/Sass changes

- Wrap top-level `<div class="o-grid-row">` into `<div class="o-grid-container">`.
- Search `oGridColumn` and replace with `oGridColspan`.
- The mixin `oGridColspan` from v3 outputs a bit more code. Use `oGridColspan($span, $width-only: true)` to only outputs widths. Note that with gzip this should not have any impact.
- `$o-grid-gutter` becomes `$o-grid-gutters` (plural) and now contains a map
- Change all `$o-grid-gutter` to `oGridGutter()`. e.g. `margin-left: $o-grid-gutter` becomes `margin-left: oGridGutter()`
- A few helpers have been removed because they weren't used.
