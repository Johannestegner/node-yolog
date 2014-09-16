/**
 * @description A logging tool for node js.
 * @file main.js
 * @author Johannes Tegnér
 * @contributors Henrik Myntti
 */

module.exports = (function(){

  var colors = require('./colors.js');
  var util = require('util');

  var shouldPrintFunctionName = true;

  var tags = {
      trace:    true
    , debug:    true
    , error:    true
    , warning:  true
    , info:     true
    , todo:     true
  };

  var tagcolors = {
      trace:    colors.textnormal.cyan
    , debug:    colors.textnormal.blue
    , error:    colors.textnormal.red
    , warning:  colors.textnormal.yellow
    , info:     colors.textnormal.white
    , todo:     colors.textnormal.green
  };

 /**
   * Print a debug string formatted as "(date) tag: string with %s|d|j values" where % values will be replaced with passed arguments.
   * @param {string} tag Tag to use.
   * @param {string} string String to print.
   * @param {string} color Color code.
   * @param {null|undefined|Array} args Arguments.
   */
  var print = function(tag, string, color, args, toStdErr) {
    if(args !== undefined && args !== null) {
      for(var i=0; i<args.length; i++){
        string = util.format(string, args[i]);
      }
    }
    // [TagColor]Tag[/TagColor][Cyan]\tDate[/Cyan]Text\n
    var out = util.format("%s%s%s%s\t(%s)%s: %s%s", color, tag, colors.reset, colors.textnormal.cyan, (new Date()).toLocaleTimeString(), getCaller(3),  colors.reset, string);
    if(toStdErr){
      console.error(out);
    } else {
      console.log(out);
    }
  };

  var getCaller = function(depth) {
    if(!shouldPrintFunctionName) {
      return "";
    }
    depth = depth === undefined ? 0 : depth;
    var funcName = "global/anonymous";
    var caller = arguments.callee.caller;
    for(var i=1;i<depth;i++) {
      if(caller.caller) {
        caller = caller.caller;
      }
    }
    if(caller.name !== "") {
      funcName = caller.name;
    }
    return "[" + funcName + "]";
  };


  return {
    /**
     * Depth to use when iterating objects.
     */
    depth: 3,
    /**
     * If function names should be printed in the output, this should be set to true.
     * Default is true.
     * @param {boolean} state State to set it to.
     */
    showFunctionName: function(state) {
      shouldPrintFunctionName = state;
    },
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
      tagcolors[tag] = colors.textnormal[color];
    },
    /**
     * Set one or many tags to active or inactive.
     * @param {boolean} value True if active, false if inactive.
     * @param {...} args Argument list, one or many string of which to set to given value.
     */
    set: function(value, args) {
      for(var i=1;i<arguments.length;i++) {
        var tag = arguments[i].toLowerCase();
        if(tag in tags) {
          tags[tag] = value;
        } else {
          print("error", "Failed to set tag " + tag + " to " + (value ? "Active" : "Inactive") + ", tag do not exist.", colors.textnormal.red, null);
        }
      }
    },
    /**
     * Get current state of given tag, or the whole tags object.
     * @param {undefined|string} tag Tag as string or omitted for whole tags object.
     * @return {object|boolean} If tag is active, true, else false. Or whole tags object if tag is omitted.
     */
    get: function(tag) {
      if(tag === undefined){
        return tags;
      } else {
        tag = tag.toLowerCase();
        if(tag in tags) {
          return tags[tag];
        }
      }
      print("error", "Failed to get tag " + tag + ", tag do not exist.", colors.textnormal.red, null);
      return false;
    },
    /**
     * Output arguments to trace log.
     * @param {...} args Argument list.
     */
    trace: function(args) {
      if(tags.trace) {
        var reg = new RegExp('\r?\n','g');
        var out = tagcolors.trace + "trace\t(" + (new Date()).toLocaleTimeString() + ")" + getCaller(2) + ": " + colors.reset + tagcolors.trace + " [ length: " + arguments.length + " ] " + colors.reset + "\n";
        for (var i = 0, il = arguments.length; i < il; i++) {
          out += tagcolors.trace + "["+ i + "]\t" + colors.reset;
          var text = util.inspect(arguments[i], { showHidden: true, depth: this.depth });
          out += text.replace(reg, tagcolors.trace + "\n *\t" + colors.reset) + colors.reset;
          out += "\n";
        }
        out += tagcolors.trace + "end trace" + colors.reset;
        console.log(out);
      }
    },
    /**
     * Prints a debug string to stdout.
     * The string uses % placeholders and replaces them with arguments passed.
     * Possible placeholders: %s - string, %d - number, %j json.
     * @param {string} str String to print.
     * @param {...} args Argument list.
     */
    debug: function(str, args) {
      if(tags.debug) {
        print("Debug", str, tagcolors.debug, (args !== undefined ? Array.prototype.slice.call(arguments, 1) : []));
      }
    },
    /**
     * Prints a error string to stdout.
     * The string uses % placeholders and replaces them with arguments passed.
     * Possible placeholders: %s - string, %d - number, %j json.
     * @param {string} str String to print.
     * @param {...} args Argument list.
     */
    error: function(str, args) {
      if(tags.error) {
         print("Error", str, tagcolors.error, (args !== undefined ? Array.prototype.slice.call(arguments, 1) : []), true);
      }
    },
    /**
     * Prints a warning string to stdout.
     * The string uses % placeholders and replaces them with arguments passed.
     * Possible placeholders: %s - string, %d - number, %j json.
     * @param {string} str String to print.
     * @param {...} args Argument list.
     */
    warning: function(str, args) {
      if(tags.warning) {
        print("Warning", str, tagcolors.warning, (args !== undefined ? Array.prototype.slice.call(arguments, 1) : []));
      }
    },
    /**
     * Prints a info string to stdout.
     * The string uses % placeholders and replaces them with arguments passed.
     * Possible placeholders: %s - string, %d - number, %j json.
     * @param {string} str String to print.
     * @param {...} args Argument list.
     */
    info: function(str, args) {
      if(tags.info) {
        print("Info", str, tagcolors.info, (args !== undefined ? Array.prototype.slice.call(arguments, 1) : []));
      }
    },
    todo: function(str, args) {
      if(tags.todo){
        print("Todo", str, tagcolors.todo, (args !== undefined ? Array.prototype.slice.call(arguments,1) : []));
      }
    }
  };
})();
