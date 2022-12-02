import * as fs from "node:fs";

function parseLines() {
  return fs.readFileSync("input.txt", "utf-8").split(/\n/);
}

function parseLineGroups() {
  const groups = fs.readFileSync("input.txt", "utf-8").split(/\n\s*\n/);
  return groups.map((input) => input.split(/\n/));
}

function sum(array) {
  return array.reduce((total, value) => total + value, 0);
}

const lines = parseLines().map((line) => {
  const parts = line.split(/\s+/);
  console.log("DEBUG line", parts);
  return parts;
});

console.log("RESULT:", sum(lines));
