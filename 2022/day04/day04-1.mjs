import * as fs from "node:fs";
import _ from "lodash";

function parseLines() {
  return fs.readFileSync("input.txt", "utf-8").split(/\n/);
}

const pairs = parseLines().map((line) =>
  line.split(",").map((pair) => pair.split("-").map((n) => parseInt(n, 10)))
);

let count = 0;
pairs.forEach(([first, second]) => {
  const isFullyContained =
    (first[0] <= second[0] && second[1] <= first[1]) ||
    (second[0] <= first[0] && first[1] <= second[1]);

  console.log("DEBUG set", first, second, isFullyContained);

  if (isFullyContained) {
    count += 1;
  }
});

console.log("RESULT:", pairs, count);
