import * as fs from "node:fs";
import _ from "lodash";

function parseLines() {
  return _.chunk(fs.readFileSync("input.txt", "utf-8").split(/\n/), 3);
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
  const commonItem = _.intersection(
    lines[0].split(""),
    lines[1].split(""),
    lines[2].split("")
  )[0];

  const result = getPrio(commonItem);
  console.log("DEBUG", result, commonItem, lines);
  return result;
});

console.log("RESULT:", _.sum(values));
