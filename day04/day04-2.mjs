import * as fs from "node:fs";
import _ from "lodash";

function parseLines() {
  return fs.readFileSync("input.txt", "utf-8").split(/\n/);
}

function parseLineGroups() {
  const groups = fs.readFileSync("input.txt", "utf-8").split(/\n\s*\n/);
  return groups.map((input) => input.split(/\n/));
}

const lines = parseLines().map((line) => {
  const parts = line.split(/\s+/);
  const result = parts[0];

  console.log("DEBUG", result, parts);
  return result;
});

console.log("RESULT:", _.sum(lines));
