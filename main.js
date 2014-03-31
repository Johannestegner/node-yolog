/**
 * @description A logging tool for node js.
 * @file main.js
 * @author Johannes Tegnér
 * @contributors Henrik Myntti
 */

module.exports = (function(){

  /**
   * Color codes for console output.
   */
  var colors = require('./colors.js');

  /**
   * Tag list and status.
   */
  var tags = {
      trace:    true
    , debug:    true
    , error:    true
    , warning:  true
    , info:     true
  };

  var tagcolors = {
      trace:    colors.textnormal.cyan
    , debug:    colors.textnormal.blue
    , error:    colors.textnormal.red
    , warning:  colors.textnormal.yellow
    , info:     colors.textnormal.white
  };

  var util = require('util');

 /**
   * Print a debug string formatted as "(date) tag: string with %s|d|j values" where % values will be replaced with passed arguments.
   * @param {string} tag Tag to use.
   * @param {string} string String to print.
   * @param {string} color Color code.
   * @param {null|undefined|Array} args Arguments.
   */
  var print = function(tag, string, color, args) {
    if(args !== undefined && args !== null) {
      for(var i=0; i<args.length; i++){
        string = util.format(string, args[i]);
      }
    }
    util.print(util.format("%s%s%s%s\t(%s): %s%s%s\n", color, tag, colors.reset, colors.textnormal.cyan, (new Date()).toLocaleTimeString(), color, string, colors.reset));
  };

  return {
    /**
     * Depth to use when iterating objects.
     */
    depth: 3,
    /**
     * Set color of a tag.
     * @param {string} tag Tag name (debug, trace, error, info or warning).
     * @param {string} color Color as string (black, red, green, yellow, blue, purple, cyan, white).
     */
    setcolor: function(tag, color) {
      color = color.toLowerCase();
      tag = tag.toLowerCase();
      if(colors.textnormal[color] === undefined) {
        print("error", "Failed to set color of tag with name %s. The color (%s) is not a valid color.", colors.textnormal.red, [tag, color]);
      } else if(tagcolors[tag] === undefined) {
        print("error", "Failed to set color of tag with name %s. The tag does not exist.", colors.textnormal.red, [tag]);
      }
      tagcolors[tag] = color;
    },
    /**
     * Set one or many tags to active or inactive.
     * @param {boolean} value True if active, false if inactive.
     * @param {...} args Argument list, one or many string of which to set to given value.
     */
    set: function(value, args) {
      for(var i=1;i<arguments.length;i++){
        var tag = arguments[i].toLowerCase();
        if(tags[tag] !== undefined){
          tags[tag] = value;
        } else {
          print("error", "Failed to set tag " + tag + " to " + (value ? "Active" : "Inactive") + ", tag do not exist.", colors.textnormal.red, null);
        }
      }
    },
    /**
     * Get current state of given tag.
     * @param {string} tag Tag as string.
     * @return {boolean} If tag is active, true, else false.
     */
    get: function(tag) {
      tag = tag.toLowerCase();
      if(tags[tag] !== undefined){
        return tags[tag];
      } else {
        print("error", "Failed to get tag " + tag + ", tag do not exist.", colors.textnormal.red, null);
      }
      return false;
    },
    /**
     * Output arguments to trace log.
     * @param {...} args Argument list.
     * @return {string} Tag name.
     */
    trace: function(args) {
      if(!tags.trace) {
        return "trace";
      }
      util.print(tagcolors.trace + "trace\t(" + (new Date()).toLocaleTimeString() + "): " + colors.reset + "\n");
      for (var i = 0, il = arguments.length; i < il; i++) {
        util.print(tagcolors.trace + "*\t" + colors.reset);
        util.print(colors.textnormal.white + util.inspect(arguments[i], { showHidden: true, depth: this.depth }) + colors.reset);
        util.print("\n");
      }
      util.print(tagcolors.trace + "end trace" + colors.reset + "\n");
      return "trace";
    },
    /**
     * Prints a debug string to stdout.
     * The string uses % placeholders and replaces them with arguments passed.
     * Possible placeholders: %s - string, %d - number, %j json.
     * @param {string} str String to print.
     * @param {...} args Argument list.
     * @return {string} Tag name.
     */
    debug: function(str, args) {
      if(!tags.debug) {
        return "debug";
      }
      var argList = [];
      if(args !== undefined) {
        argList = Array.prototype.slice.call(arguments, 1);
      }
      print("Debug", str, tagcolors.debug, argList);
      return "debug";
    },
    /**
     * Prints a error string to stdout.
     * The string uses % placeholders and replaces them with arguments passed.
     * Possible placeholders: %s - string, %d - number, %j json.
     * @param {string} str String to print.
     * @param {...} args Argument list.
     * @return {string} Tag name.
     */
    error: function(str, args) {
       if(!tags.error) {
        return "error";
      }
      var argList = [];
      if(args !== undefined) {
        argList = Array.prototype.slice.call(arguments, 1);
      }
      print("Error", str, tagcolors.error, argList);
      return "error";
    },
    /**
     * Prints a warning string to stdout.
     * The string uses % placeholders and replaces them with arguments passed.
     * Possible placeholders: %s - string, %d - number, %j json.
     * @param {string} str String to print.
     * @param {...} args Argument list.
     * @return {string} Tag name.
     */
    warning: function(str, args) {
       if(!tags.warning) {
        return "warning";
      }
      var argList = [];
      if(args !== undefined) {
        argList = Array.prototype.slice.call(arguments, 1);
      }
      print("Warning", str, tagcolors.warning, argList);
      return "warning";
    },
    /**
     * Prints a info string to stdout.
     * The string uses % placeholders and replaces them with arguments passed.
     * Possible placeholders: %s - string, %d - number, %j json.
     * @param {string} str String to print.
     * @param {...} args Argument list.
     * @return {string} Tag name.
     */
    info: function(str, args) {
       if(!tags.info) {
        return "info";
      }
      var argList = [];
      if(args !== undefined) {
        argList = Array.prototype.slice.call(arguments, 1);
      }
      print("Info", str, tagcolors.info, argList);
      return "info";
    }
  };
})();
