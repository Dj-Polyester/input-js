const readline = require("readline");

process.stdin.pause();

function input(keyvalue) {
  var lines = keyvalue["lines"];
  if (!lines) lines = 1;
  else if (lines === "inf") lines = -1;
  const prompt = keyvalue["prompt"];
  var data = "";
  if (prompt) process.stdout.write(prompt);

  process.stdin.resume();

  readline.emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);

  process.stdin.on("keypress", function (chunk, key) {
    process.stdout.write(key.sequence);

    if (key && key.ctrl) {
      const ctrlkey = keyvalue["ctrl-" + key.name];
      if (ctrlkey) ctrlkey();
    } else if (key) {
      data += key.sequence;

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
        process.stdin.write("\n");
        const reskey = keyvalue["response"];
        if (reskey) reskey(data);
        data = "";
      }
    }
  });
}

module.exports = input;
