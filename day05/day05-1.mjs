import * as fs from "node:fs";
import _ from "lodash";

function readLines() {
  return fs.readFileSync("input.txt", "utf-8").split(/\n/);
}

function readLineGroups() {
  const groups = fs.readFileSync("input.txt", "utf-8").split(/\n\s*\n/);
  return groups.map((input) => input.split(/\n/));
}

const inputs = readLines().map((line) => line.split(/\s+/));

let result = 0;
inputs.forEach((line) => {
  result += line[0];
  console.log("DEBUG step", result, line);
});

console.log("RESULT:", result);
