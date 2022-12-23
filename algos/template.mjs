import * as fs from "node:fs";
import _ from "lodash";

function readLines() {
  return fs.readFileSync("input.txt", "utf-8").split(/\n/);
}

const lines = readLines().map((line) =>
  line.split("").map((c) => parseInt(c, 10))
);

console.log("INPUT:", lines);

let result = 0;
lines.forEach((line) => {
  console.log("Line", line);
  result += 0;
  console.log("  result", result);
});

console.log("RESULT:", result);
