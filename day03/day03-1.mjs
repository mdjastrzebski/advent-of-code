import * as fs from "node:fs";

function parseLines() {
  return fs.readFileSync("input.txt", "utf-8").split(/\n/);
}

function sum(array) {
  return array.reduce((total, value) => total + value, 0);
}

function getPrio(char) {
  if (
    char.charCodeAt(0) >= "a".charCodeAt(0) &&
    char.charCodeAt(0) <= "z".charCodeAt(0)
  ) {
    return char.charCodeAt(0) - "a".charCodeAt(0) + 1;
  } else if (
    char.charCodeAt(0) >= "A".charCodeAt(0) &&
    char.charCodeAt(0) <= "Z".charCodeAt(0)
  ) {
    return char.charCodeAt(0) - "A".charCodeAt(0) + 27;
  } else {
    throw new Error("Invalid char: " + char);
  }
}

const lines = parseLines().map((line) => {
  const first = line.slice(0, line.length / 2);
  const second = line.slice(line.length / 2);
  const commonItem = first.split("").filter((char) => second.includes(char))[0];
  const result = getPrio(commonItem);
  console.log("DEBUG", result, commonItem, first, second);
  return result;
});

console.log("RESULT:", sum(lines));
