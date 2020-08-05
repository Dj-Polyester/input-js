const readline = require("readline");

process.stdin.pause();
async function input(keyvalue) {
  return new Promise((resolve, reject) => {
    var lines = keyvalue["lines"];
    var hidden = keyvalue["hidden"];
    var child = keyvalue["child"];
    if (child) hidden = true;

    if (!lines) lines = 1;
    else if (lines === "inf") lines = -1;
    const prompt = keyvalue["prompt"];
    var data = "";
    if (prompt) process.stdin.write(prompt);

    process.stdin.resume();

    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);

    process.stdin.on("keypress", function (chunk, key) {
      if (!hidden) process.stdout.write(key.sequence);

      if (key && key.ctrl) {
        const ctrlkey = keyvalue["ctrl-" + key.name];
        if (ctrlkey) ctrlkey();
      } else if (key) {
        if (key.name !== "return") data += key.sequence;

        const tmpkey = keyvalue[key.name];
        //all keys on the keyboard
        if (tmpkey) tmpkey();
        //backspace if not specified
        else if (!tmpkey && key.name === "backspace") {
          process.stdin.write("\b \b");
          data = data.slice(0, -1);
        }
        //response if return not specified
        else if (!tmpkey && key.name === "return") {
          --lines;
          if (!lines) process.stdin.pause();
          if (!hidden) process.stdout.write("\n");
          const reskey = keyvalue["response"];
          if (reskey) reskey({ data, prompt, lines, hidden, child });
          else resolve({ data, prompt, lines, hidden, child });
          data = "";
        } else {
        }
      }
    });
  });
}

module.exports = input;
