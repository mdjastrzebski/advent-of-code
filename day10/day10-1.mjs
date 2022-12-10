import * as fs from "node:fs";
import _ from "lodash";

function readLines() {
  return fs.readFileSync("input.txt", "utf-8").split(/\n/);
}

const lines = readLines().map((line) => line.split(" "));

console.log("INPUT:", lines);

const cycleCheckpoints = [20, 60, 100, 140, 180, 220];
let register = 1;
let cycle = 0;
let result = 0;

function processCycle(cycle) {
  if (cycleCheckpoints.includes(cycle)) {
    result += register * cycle;
    console.log("  cycle", cycle, "register", register, "result", result);
  } else {
    console.log("  cycle", cycle, "register", register);
  }
}

lines.forEach(([op, value]) => {
  console.log("Line", op, value);
  if (op === "noop") {
    processCycle((cycle += 1));
  } else if (op === "addx") {
    processCycle((cycle += 1));
    processCycle((cycle += 1));
    register += parseInt(value, 10);
  } else {
    throw new Error("Unknown op: " + op);
  }
});

console.log("RESULT:", result);
