import * as fs from "node:fs";

function parseLines() {
  return group(fs.readFileSync("input.txt", "utf-8").split(/\n/), 3);
}

function sum(array) {
  return array.reduce((total, value) => total + value, 0);
}

function group(items, size) {
  const result = [];
  let runningItem = [];
  items.forEach((item) => {
    runningItem.push(item);
    if (runningItem.length === size) {
      result.push(runningItem);
      runningItem = [];
    }
  });

  return result;
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

const values = parseLines().map((lines) => {
  const commonItem = lines[0]
    .split("")
    .filter((char) => lines[1].includes(char) && lines[2].includes(char))[0];
  const result = getPrio(commonItem);
  console.log("DEBUG", result, commonItem, lines);
  return result;
});

console.log("RESULT:", sum(values));
