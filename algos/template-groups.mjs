import * as fs from "node:fs";
import _ from "lodash";

function readLineGroups() {
  const groups = fs.readFileSync("input.txt", "utf-8").split(/\n\s*\n/);
  return groups.map((input) => input.split(/\n/));
}

const groups = readLineGroups().map((group) => {
  return group.map((line) => {
    return parseInt(line, 10);
  });
});

console.log("INPUT:", groups);

let result = 0;
groups.forEach((group) => {
  console.log("Group", group);
  groups.forEach((line) => {
    result += 0;
    console.log("Item", result, line);
  });
});

console.log("RESULT:", result);
