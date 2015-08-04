#!/usr/bin/env ruby
# Encoding: utf-8
require 'fileutils'
require 'open3'

# squish method borrowed from Rails that removes newlines and extra spaces
class String
	def squish
		strip.gsub /\s+/, ' '
	end
end

# Prepare build test folder
FileUtils.mkdir_p "test/output"

# Attempting to add a Layout with a width when gutters are defined
# in percents (e.g. $o-grid-gutter: 1%;) should throw an error
stdout, stderr, status = Open3.capture3 "node-sass test/error.scss test/output/error.css --output-style compressed --include-path bower_components"
puts "Test: adding a layout with columns when gutters are in % should throw an error…"
raise "Adding a layout this way should fail to compile" if status.success?
raise "Adding a layout this way should throw a useful error message" unless (stderr.squish.include? "Layouts can only be defined using column widths")
puts "\e[32mPassed\e[0m"
stdout, stderr, status = Open3.capture3 "node-sass test/success.scss test/output/success.css --output-style compressed --include-path bower_components"
puts "Test: adding layouts in multiple ways and show their max-width…"
raise "Layout (A) should compile when added with a column width" unless File.open("test/output/success.css").read.squish.include? "@media (min-width: 23.125em){A{max-width:800px"
raise "Layout (B) should compile when added with a layout-width" unless File.open("test/output/success.css").read.squish.include? "@media (min-width: 22.8125em){B{max-width:370px"
raise "Layout (C) should compile when added with a layout-width and percentage-based gutters" unless File.open("test/output/success.css").read.squish.include? "@media (min-width: 23.25em){C{max-width:800px"
raise "Layout (Z) should compile when added as a default layout in $o-grid-layouts" unless File.open("test/output/success.css").read.squish.include? "@media (min-width: 75em){Z{max-width:1200px"
puts "\e[32mPassed\e[0m"

File.delete('test/output/success.css')

FileUtils.rmdir "test/output"
