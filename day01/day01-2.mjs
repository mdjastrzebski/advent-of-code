import * as fs from "node:fs";

const inputLines = fs.readFileSync("input.txt", "utf-8").split(/\r?\n/);

const values = [];

let currentValue = 0;
inputLines.forEach((line) => {
  if (!line.trim()) {
    console.log("Group value:", currentValue);

    values.push(currentValue);
    currentValue = 0;
    return;
  }

  currentValue += parseInt(line, 10);
});

values.sort((a, b) => b - a);

console.log("Group values:", values);
console.log("Top 3 value:", values[0] + values[1] + values[2]);
