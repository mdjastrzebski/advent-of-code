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
  const isOverlapping = first[0] <= second[1] && second[0] <= first[1];

  console.log("DEBUG set", first, second, isOverlapping);

  if (isOverlapping) {
    count += 1;
  }
});

console.log("RESULT:", pairs, count);
