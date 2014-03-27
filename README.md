node-yolog
==========

Simple logger for node js that color codes and formates output.  
  
#### Installation:
npm install git+ssh://git@github.com:Johannestegner/node-yolog.git [--save]
  
#### Initialization and usage:
```javascript
var logger = require('node-yolog');
// By default, all logging tags are set to active, IE all of them will output to console, this can be changed with the 'set' function as:
logger.set(false, "debug", "trace"); // Will disable output from debug and trace tagged output.
logger.set(true, "debug", "trace"); // Will enable output from debug and trace tagged output.

// Write debug type output:
logger.debug("some debug text you can %s also, all the types that the standard node util.format takes.", "add arguments"); // Check if a tag is active:
if(!logger.get("debug")) {
  logger.error("Oh no, debug tag was not active!");
}

```
