# input-js

Prompt for user input through terminal

In order to use the module

```
const input = require("./input")

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

`input` function takes a js object as parameter

## Options for the js object

`prompt`: A string printed on the terminal before the prompt

`response`: Runs a handler function when the enter key is pressed, with parameters `line` which is the string in the previous line typed by the user, and the `prompt`.

`lines`: How many lines user will be prompted to

`hidden`: Whether the input is hidden or not. Useful for passwords.

`key`: Any key, runs a handler function when the key is pressed

`ctrl-key`: Any key in conjuction with control key, runs a handler function when the key is pressed

`input` function returns a promise resolving the `line` parameter. When `response` option is not used, this can be used to chain input calls
to simulate loops

```
input({
  prompt: "Who are you?",
})
  .then((line) => {
    console.log(line);
    return input({
      prompt: "How old are you?",
      child: true,
    });
  })
  .then((line) => {
    console.log(line);
    return input({
      prompt: "What do you do?",
      child: true,
    });
  })
  .then((line) => {
    console.log(line);
  });

```

Beware that the next instances of the input call have `child: true`, in order to chain the calls.
