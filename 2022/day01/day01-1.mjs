import * as fs from "node:fs";

const inputLines = fs.readFileSync("input.txt", "utf-8").split(/\r?\n/);

let maxValue = 0;
let currentValue = 0;
inputLines.forEach((line) => {
  if (!line.trim()) {
    console.log("Group value:", currentValue, maxValue);

    maxValue = Math.max(maxValue, currentValue);
    currentValue = 0;
    return;
  }

  currentValue += parseInt(line, 10);
});

console.log("Max value:", maxValue);
