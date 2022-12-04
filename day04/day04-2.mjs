import * as fs from "node:fs";
import _ from "lodash";

function readLines() {
  return fs.readFileSync("input.txt", "utf-8").split(/\n/);
}

const pairs = readLines().map((line) =>
  line.split(",").map((pair) => pair.split("-").map((n) => parseInt(n, 10)))
);

let count = 0;
pairs.forEach(([first, second]) => {
  const isOverlapping = first[0] <= second[1] && second[0] <= first[1];
  count += isOverlapping ? 1 : 0;

  console.log("DEBUG set", first, second, isOverlapping);
});

console.log("RESULT:", pairs, count);
