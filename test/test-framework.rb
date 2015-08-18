#!/usr/bin/env ruby
# Encoding: utf-8
# Inspired from http://www.skorks.com/2011/02/a-unit-testing-framework-in-44-lines-of-ruby/
require 'open3'

$cssoutput = Open3.capture3("node-sass test/test.scss --include-path bower_components --stdout")[0]

module Kernel
  def describe(description, &block)
    tests = Dsl.new.parse(description, block)
    tests.execute
  end
end
class Object
  def should
    self
  end
end
class Dsl
  def initialize
    @tests = {}
  end
  def parse(description, block)
    self.instance_eval(&block)
    Executor.new(description, @tests)
  end
  def it(description, &block)
    @tests[description] = block
  end
end
class Executor
  def initialize(description, tests)
    @description = description
    @tests = tests
    @success_count = 0
    @failure_count = 0
  end
  def execute
    puts "\n#{@description}"
    @tests.each_pair do |name, block|
      result = self.instance_eval(&block)
      puts result ? "\e[32m✓ #{name} \e[0m" : "\e[31m✖ #{name} \e[0m"
      result ? @success_count += 1 : @failure_count += 1
    end
    summary
  end
  def summary
    puts "\n#{@tests.keys.size} tests, #{@success_count} success, #{@failure_count} failure"

    if @failure_count > 0
      stdout, stderr, status = Open3.capture3 "node-sass test/test.scss test/error.css --include-path bower_components"
    end
  end
end

class String
  # squish method borrowed from Rails that removes newlines and extra spaces
  def squish
    strip.gsub /\s+/, ' '
  end
  # Load the grid and compile to CSS
  def sass_to_css
    Open3.pipeline_r(['echo', ["@import 'main';", self].join], ['node-sass --include-path bower_components']) do |output|
      output.read
    end
  end
end

# Test if a string appears in a multi-line output
def find(needle, haystack = $cssoutput)
  haystack.squish.include? needle.squish
end
