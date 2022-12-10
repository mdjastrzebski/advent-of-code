import * as fs from "node:fs";
import _ from "lodash";
import { exit } from "node:process";

function readLines() {
  return fs.readFileSync("input.txt", "utf-8").split(/\n/);
}

const lines = readLines().map((line) => line.split(" "));

console.log("INPUT:", lines);

const screen = [
  new Array(40).fill("."),
  new Array(40).fill("."),
  new Array(40).fill("."),
  new Array(40).fill("."),
  new Array(40).fill("."),
  new Array(40).fill("."),
];

function printScreen() {
  console.log("SCREEN:");
  for (let y = 0; y < screen.length; y++) {
    console.log(screen[y].join(""));
  }
}

let register = 1;
let cycle = 0;

function processCycle(cycle) {
  const row = Math.floor(cycle / 40);
  const col = cycle % 40;

  if (col === register || col === register - 1 || col === register + 1) {
    screen[row][col] = "#";
    console.log("  draw", cycle, row, col, register);
  } else {
    //console.log("  ignore", cycle, row, col, register);
  }
}

lines.forEach(([op, value]) => {
  console.log("Line", op, value);
  if (op === "noop") {
    processCycle(cycle);
    cycle += 1;
  } else if (op === "addx") {
    processCycle(cycle);
    cycle += 1;
    processCycle(cycle);
    cycle += 1;
    register += parseInt(value, 10);
  } else {
    throw new Error("Unknown op: " + op);
  }
});

printScreen();
