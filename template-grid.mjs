import * as fs from "node:fs";
import _ from "lodash";

function readLines() {
  return fs.readFileSync("input.txt", "utf-8").split(/\n/);
}

const grid = readLines().map((line) =>
  line.split("").map((c) => parseInt(c, 10))
);

console.log("INPUT:", grid);

let result = 0;
for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[0].length; x++) {
    console.log("Item", grid[y][x], "-", x, y);
    result += 0;
    console.log("  result", result);
  }
}

console.log("RESULT:", result);
