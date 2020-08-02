# input-js
prompt for user input through terminal

In order to use the module
```
const input = require("./input")

input(
input({
  prompt: "Who are you?",
  response: (line) => {
    console.log(line);
  },
  lines: 1,
  "ctrl-c": () => {
    console.log("c catch");
    process.exit(0);
  },
  "ctrl-d": () => {
    console.log("d catch");
    process.exit(0);
  },
});

)
```
Input takes a js object as parameter

#Options

`prompt`: A string printed on the terminal when user is prompted

`response`: Runs a handler function when the enter key is pressed, with a single parameter `line` which is the string in the previous line typed by the user.

`lines`: How many lines user will be prompted to

`key`: Any key, runs a handler function when the key is pressed

`ctrl-key`: Any key in conjuction with control key, runs a handler function when the key is pressed



