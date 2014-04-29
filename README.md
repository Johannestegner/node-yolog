node-yolog
==========
[![NPM](https://nodei.co/npm/node-yolog.png?downloads=true&stars=true)](https://nodei.co/npm/node-yolog/)


Simple logger for node js that color codes and formats output.
It was mainly written, and created as a module cause its possible to turn certain types
of log tags on and of in runtime, which is quite useful in a few projects that I'm working on.


### Installation:

`npm install node-yolog [--save]`  

### Usage.

##### Tags

yolog has the following logging tags/functions:
```javascript
debug (string, arguments);
info (string, arguments);
warning (string, arguments);
error (string, arguments);
todo (string arguments);
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

*The tag names are the same as the functions, so it should be quite easy to guess what to pass.*

There is also a `get(tag)` function, which takes a tag name in as parameter and returns `boolean` value,
where `true` indicates that the tag is `on` and `false` that its `off`.

All tags are active by default.
Disabling/Enabling a tag that do not exist will output a error message (even if errors are turned off).

##### Change color of tags.
Not all editors and consoles outputs the colors of the tags as neatly as others, and not all find the default colors to be the preffered ones.  
So naturally, its possible to change the colors.  
The following colors are available:  

  * black
  * red
  * green
  * yellow
  * blue
  * purple
  * cyan
  * white

Setting a specific color on a tag is done by the `setcolor` function.

```javascript
logger.setcolor("error", "cyan");
// Which will change the color for error tagged output to cyan instead of the default red.
```


### Example usage.
```javascript
var logger = require('node-yolog');
// By default, all logging tags are set to active, IE all of them will output to console, this can be changed with the 'set' function as:
if(app.get("env") !== "development") {
  // If get is called without an argument, it will return the full array as an object
  // {"tag": true ... }
  logger.set(false, "debug", "trace", "todo"); // Will disable output from debug and trace tagged output.
}
// Check if a tag is active:
if(!logger.get("debug")) {
  // But the debug tag is disabled, so we write an error instead!
  logger.info("Debug tag was not active!");
}
// Write debug type output:
logger.debug("some debug text you can %s also, all the types that the standard node util.format takes.", "add arguments");
// The output above will not be printed in this case.

```
