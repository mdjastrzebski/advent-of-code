import * as fs from "node:fs";

function parseLineGroups() {
  const groups = fs.readFileSync("input.txt", "utf-8").split(/\n\s*\n/);
  return groups.map((input) => input.split(/\n/));
}
function sum(array) {
  return array.reduce((total, value) => total + value, 0);
}

const totals = parseLineGroups().map((group) => {
  const values = group.map((line) => parseInt(line, 10));
  return sum(values);
});

totals.sort((a, b) => b - a);

console.log("DEBUG totals:", totals);
console.log("RESULT:", sum(totals.slice(0, 3)));
