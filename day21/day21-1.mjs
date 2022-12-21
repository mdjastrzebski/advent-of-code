import * as fs from "node:fs";
import _ from "lodash";

function readLines() {
  return fs.readFileSync("input.txt", "utf-8").split(/\n/);
}

const monkeys = new Map();
readLines().forEach((line) => {
  const [name, rest] = line.split(": ");
  const args = rest.split(" ");
  monkeys.set(name, args);
});

console.log("INPUT:", monkeys);

function getResult(name) {
  const op = monkeys.get(name);
  if (op.length === 1) {
    return parseInt(op[0], 10);
  }

  if (op[1] === "+") {
    return getResult(op[0]) + getResult(op[2]);
  }
  if (op[1] === "-") {
    return getResult(op[0]) - getResult(op[2]);
  }
  if (op[1] === "*") {
    return getResult(op[0]) * getResult(op[2]);
  }
  if (op[1] === "/") {
    return getResult(op[0]) / getResult(op[2]);
  }
}

const result = getResult("root");
console.log("RESULT:", result);
