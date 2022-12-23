import * as fs from "node:fs";

function readInputLines() {
  return fs.readFileSync("input.txt", "utf-8").split(/\n/);
}

function sum(array) {
  return array.reduce((total, value) => total + value, 0);
}

function getWinPoints(line) {
  switch (line) {
    case "A X":
      return 3;
    case "A Y":
      return 6;
    case "A Z":
      return 0;
    case "B X":
      return 0;
    case "B Y":
      return 3;
    case "B Z":
      return 6;
    case "C X":
      return 6;
    case "C Y":
      return 0;
    case "C Z":
      return 3;
  }
}

const points = {
  X: 1,
  Y: 2,
  Z: 3,
};

const lines = readInputLines().map((line) => {
  console.log("DEBUG lines:", lines);
  return getWinPoints(line) + points[line[2]];
});

console.log("DEBUG lines:", lines);
console.log("RESULT:", sum(lines));
