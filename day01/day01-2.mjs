import * as fs from "node:fs";

function readInputGroups() {
  const inputChunks = fs.readFileSync("input.txt", "utf-8").split(/\n{2,}/);
  return inputChunks.map((input) => input.split(/\n/));
}

function sum(array) {
  return array.reduce((total, value) => total + value, 0);
}

const totals = readInputGroups().map((group) => {
  const values = group.map((n) => parseInt(n, 10));
  return sum(values);
});

totals.sort((a, b) => b - a);

console.log("DEBUG totals:", totals);
console.log("RESULT:", sum(totals.slice(0, 3)));
