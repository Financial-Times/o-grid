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
# in percents (e.g. $o-grid-gutters: 1%;) should throw an error
stdout, stderr, status = Open3.capture3 "node-sass test/test.scss test/output/test.css --include-path bower_components"

puts "Test: layouts can be overriden…"
raise "Defined layout and sizes override the default ones" unless File.open("test/output/test.css").read.squish
  .include? "Initial layouts and sizes: (X: 800px, Z: 1200px)"
raise "The list of layout names is updated accordingly" unless File.open("test/output/test.css").read.squish
  .include? "Initial layout names: X, Z"
puts "\e[32mPassed\e[0m"

puts "Test: pruning non existant gutter widths, while keeping a default width…"
raise "Gutter for layout M should have been removed" unless File.open("test/output/test.css").read.squish
  .include? "Gutter M exists: false"
raise "There should be a default gutter" unless File.open("test/output/test.css").read.squish
  .include? "Default gutter exists: true"
puts "\e[32mPassed\e[0m"


puts "Test: adding layouts in multiple ways and ordering them properly…"
raise "All layouts should have been added in the correct order" unless File.open("test/output/test.css").read.squish
  .include? "A, B, C, X, Y, Z"
puts "\e[32mPassed\e[0m"

puts "Test: adding layouts in multiple ways with their max-width and gutter sizes…"
raise "Layout (A)'s max width should be X's layout width, and inherit the default gutter" unless File.open("test/output/test.css").read.squish
  .include? "
  A {
  	max-width: 800px;
  	gutter: 10px".squish
raise "Layout (B) should be added" unless File.open("test/output/test.css").read.squish
  .include? "B: 365px"
raise "Gutter for Layout B should be added" unless File.open("test/output/test.css").read.squish
  .include? "(default: 10px, B: 30px)"
raise "Layout (B) properties should compile" unless File.open("test/output/test.css").read.squish
  .include? "
  @media (min-width: 22.8125em) {
	  B {
	    max-width: 800px;
	    gutter: 30px;".squish
puts "\e[32mPassed\e[0m"

puts "Test: max-width of the widest layout…"
raise "Layout (Z) is the widest layout. It should have a max-width equivalent to its defined width" unless File.open("test/output/test.css").read.squish
  .include? "
	  Z {
	    max-width: 1200px;".squish
puts "\e[32mPassed\e[0m"

File.delete('test/output/test.css')

FileUtils.rmdir "test/output"
