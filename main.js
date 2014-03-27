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
  var colors = {
    textnormal: {
      black   : "\033[0;30m",
      red     : "\033[0;31m",
      green   : "\033[0;32m",
      yellow  : "\033[0;33m",
      blue    : "\033[0;34m",
      purple  : "\033[0;35m",
      cyan    : "\033[0;36m",
      white   : "\033[0;37m"
    },
    textbold: {
      black   : "\033[1;30m",
      red     : "\033[1;31m",
      green   : "\033[1;32m",
      yellow  : "\033[1;33m",
      blue    : "\033[1;34m",
      purple  : "\033[1;35m",
      cyan    : "\033[1;36m",
      white   : "\0331;37m"
    },
    textunderline: {
      black   : "\033[4;30m",
      red     : "\033[4;31m",
      green   : "\033[4;32m",
      yellow  : "\033[4;33m",
      blue    : "\033[4;34m",
      purple  : "\033[4;35m",
      cyan    : "\033[4;36m",
      white   : "\033[4;37m"
    },
    background: {
      black   : "\033[40m",
      red     : "\033[41m",
      green   : "\033[42m",
      yellow  : "\033[43m",
      blue    : "\033[44m",
      purple  : "\033[45m",
      cyan    : "\033[46m",
      white   : "\033[47m"
    },
    reset     : "\033[0m"
  };
  var util = require('util');

 /**
   * Print a debug string formatted as "(date) tag: string with %s values" where % values will be replaced with passed arguments.
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
    util.print(color + tag + colors.reset + colors.textnormal.cyan + "\t(" + (new Date()).toLocaleTimeString() + "): " + color + string + colors.reset + "\n");
  };

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

  /**
   * Logger object, contains all the logging functions.
   */
  return {
    /**
     * Depth to use when iterating objects.
     */
    depth: 3,
    /**
     * Set one or many tags to active or inactive.
     * @param {boolean} value True if active, false if inactive.
     * @param {...} args Argument list, one or many string of which to set to given value.
     */
    set: function(value, args) {
      for(var i=1;i<arguments.length;i++){
        if(tags[arguments[i]] !== undefined){
          tags[arguments[i]] = value;
        } else {
          print("error", "Failed to set tag " + arguments[i] + " to " + (value ? "Active" : "Inactive") + ", tag do not exist.", colors.textnormal.red, null);
        }
      }
    },
    /**
     * Get current state of given tag.
     * @param {string} tag Tag as string.
     * @return {boolean} If tag is active, true, else false.
     */
    get: function(tag) {
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
      util.print(colors.textnormal.cyan + "trace" + colors.reset + colors.textnormal.cyan + "\t(" + (new Date()).toLocaleTimeString() + "): " + colors.reset + "\n");
      for (var i = 0, il = arguments.length; i < il; i++) {
        util.print(colors.textnormal.cyan + "*\t" + colors.reset);
        util.print(colors.textnormal.white + util.inspect(arguments[i], { showHidden: true, depth: logger.depth }) + colors.reset);
        util.print("\n");
      }
      util.print(colors.textnormal.cyan + "end trace" + colors.reset + "\n");
      return "trace";
    },
    /**
     * Prints a debug string to stdout.
     * @param {string} str String to print (formatted with % as the node util.format takes them).
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
      print("Debug", str,colors.textnormal.cyan, argList);
      return "debug";
    },
    /**
     * Prints a error string to stdout.
     * @param {string} str String to print (formatted with % as the node util.format takes them).
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
      print("Error", str, colors.textnormal.red, argList);
      return "error";
    },
    /**
     * Prints a warning string to stdout.
     * @param {string} str String to print (formatted with % as the node util.format takes them).
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
      print("Warning", str, colors.textnormal.yellow, argList);
      return "warning";
    },
    /**
     * Prints a info string to stdout.
     * @param {string} str String to print (formatted with % as the node util.format takes them).
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
      print("Info", str, colors.textnormal.white, argList);
      return "info";
    }
  };
})();
