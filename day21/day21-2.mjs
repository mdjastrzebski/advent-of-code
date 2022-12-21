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

function rootSolve() {
  const op = monkeys.get("root");
  const left = getResult(op[0]);
  const right = getResult(op[2]);

  if (left == null) {
    return solve(op[0], right);
  } else {
    return solve(op[2], left);
  }
}

function solve(name, value) {
  const op = monkeys.get(name);

  if (name === "humn") {
    return value;
  }

  const left = getResult(op[0]);
  const right = getResult(op[2]);

  if (left == null) {
    if (op[1] === "+") {
      return solve(op[0], value - right);
    }
    if (op[1] === "-") {
      return solve(op[0], value + right);
    }
    if (op[1] === "*") {
      return solve(op[0], value / right);
    }
    if (op[1] === "/") {
      return solve(op[0], value * right);
    }
  } else {
    if (op[1] === "+") {
      return solve(op[2], value - left);
    }
    if (op[1] === "-") {
      return solve(op[2], left - value);
    }
    if (op[1] === "*") {
      return solve(op[2], value / left);
    }
    if (op[1] === "/") {
      return solve(op[2], 1 / left / value);
    }
  }
}

function getResult(name, humnValue = null) {
  if (name === "humn") {
    return humnValue;
  }

  const op = monkeys.get(name);
  if (op.length === 1) {
    return parseInt(op[0], 10);
  }

  const left = getResult(op[0], humnValue);
  const right = getResult(op[2], humnValue);
  if (left == null || right == null) {
    return null;
  }

  if (op[1] === "+") {
    return left + right;
  }
  if (op[1] === "-") {
    return left - right;
  }
  if (op[1] === "*") {
    return left * right;
  }
  if (op[1] === "/") {
    return left / right;
  }
}

function validateResult(humnValue) {
  const op = monkeys.get("root");
  const left = getResult(op[0], humnValue);
  const right = getResult(op[2], humnValue);

  if (left === right) {
    console.log("SUCCESS", left, right);
    return true;
  } else {
    console.log("FAILURE", left, right);
    return false;
  }
}

const humnValue = Math.round(rootSolve());
const isValid = validateResult(humnValue);
console.log("RESULT:", humnValue, isValid);
