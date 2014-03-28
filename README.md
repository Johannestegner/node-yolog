node-yolog
==========

Simple logger for node js that color codes and formats output.
It was mainly written, and created as a module cause its possible to turn certain types
of log tags on and of in runtime, which is quite useful in a few* projects that I'm working on.

(* all! :P )

### Installation:

`npm install git+ssh://git@github.com:Johannestegner/node-yolog.git [--save]`
Require the module with a standard: `var logger = require('node-yolog');`.

### Functions.

##### Tags

yolog has the following logging tags/functions:
```javascript
debug (string, arguments);
info (string, arguments);
warning (string, arguments);
error (string, arguments);
trace (arguments);
```
All (but trace) strings uses % placeholders which are replaced with the args passed, accepted placeholders are:

  * `%s` - string
  * `%d` - number
  * `%j` - json

The `trace` function takes a number of arguments and prints them in a list.
Also worth mentioning is that the trace function will print objects, but it will only go to the depth defined by the
`depth` variable in the `yolog` object.
It defaults to 3, but can be set to whatever you want or need (`null` means no limit, but this can crash the application if the object is circular).

##### Enable and Disable tags.
To enable or disable any tags, the `set(boolean, args);` function is used.
First arg is if the tags you want to change should be **on** or **off** (`boolean` value),
the args after first should be string representations of the tags.

*The tag names are the same as the functions, so it should be quite easy to guess what to pass.
But if you really need to know them, all logging functions you call will return their tag name as a string.*

There is also a `get(tag)` function, which takes a tag name in as parameter and returns `boolean` value,
where `true` indicates that the tag is `on` and `false` that its `off`.

All tags are active by default.
Disabling/Enabling a tag that do not exist will output a error message (even if errors are turned off).

### Example usage.
```javascript
var logger = require('node-yolog');
// By default, all logging tags are set to active, IE all of them will output to console, this can be changed with the 'set' function as:
logger.set(false, "debug", "trace"); // Will disable output from debug and trace tagged output.

// Write debug type output:
logger.debug("some debug text you can %s also, all the types that the standard node util.format takes.", "add arguments"); // Check if a tag is active:
if(!logger.get("debug")) {
  // But the debug tag is disabled, so we write an error instead!
  logger.error("Oh no, debug tag was not active!");
}

```
