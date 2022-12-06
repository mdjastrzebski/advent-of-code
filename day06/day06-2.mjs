import * as fs from "node:fs";
import _ from "lodash";

function readInput() {
  return fs.readFileSync("input.txt", "utf-8").split("");
}

const inputs = readInput();
const buffer = [];
let step = 0;

for (let char of inputs) {
  buffer.push(char);
  if (buffer.length > 14) {
    buffer.shift();
  }

  step += 1;

  if (_.uniq(buffer).length === 14) {
    break;
  }

  console.log("SETP:", step, buffer);
}

console.log("RESULT:", step, buffer);
