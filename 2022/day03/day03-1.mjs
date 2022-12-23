import * as fs from "node:fs";
import _ from "lodash";

function parseLines() {
  return fs.readFileSync("input.txt", "utf-8").split(/\n/);
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
  const commonItem = _.intersection(first.split(""), second.split(""))[0];
  const result = getPrio(commonItem);
  console.log("DEBUG", result, commonItem, first, second);
  return result;
});

console.log("RESULT:", _.sum(lines));
