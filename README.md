# input-js

Prompt for user input through terminal

In order to use the module

```
const input = require("./input")

input({
  prompt: "Who are you?",
  response: (obj) => {
    console.log(obj);
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

`response`: Runs a handler function when the enter key is pressed, with a js object `obj`, which is as below.

```
obj {
  data: what is written in the previous line without newline character
  prompt: passed prompt value
  lines: passed lines value
  hidden: passed hidden value
  child: passed child value
}

```

`lines`: How many lines user will be prompted to

`hidden`: Whether the input is hidden or not. Useful for passwords.

`key`: Any key, runs a handler function when the key is pressed

`ctrl-key`: Any key in conjuction with control key, runs a handler function when the key is pressed

`input` function returns a promise resolving the `obj` parameter. When `response` option is not used, this can be used to chain input calls
to simulate loops

```
input({
  prompt: "Who are you?",
})
  .then((obj) => {
    console.log(obj);
    return input({
      prompt: "How old are you?",
      child: true,
    });
  })
  .then((obj) => {
    console.log(obj);
    return input({
      prompt: "What do you do?",
      child: true,
    });
  })
  .then((obj) => {
    console.log(obj);
  });

```

Beware that the next instances of the input call have `child: true`, in order to chain the calls.
