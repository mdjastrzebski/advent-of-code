import * as fs from "node:fs";

function readInputLines() {
  return fs.readFileSync("input.txt", "utf-8").split(/\n/);
}

function sum(array) {
  return array.reduce((total, value) => total + value, 0);
}

function getPoints(line) {
  switch (line) {
    case "A X": // Rock + Lose (Scissors)
      return 0 + 3;
    case "A Y": // Rock + Draw (Rock)
      return 3 + 1;
    case "A Z": // Rock + Win (Paper)
      return 6 + 2;
    case "B X": // Paper + Lose (Rock)
      return 0 + 1;
    case "B Y": // Paper + Draw (Paper)
      return 3 + 2;
    case "B Z": // Paper + Win (Scissors)
      return 6 + 3;
    case "C X": // Scissors + Lose (Paper)
      return 0 + 2;
    case "C Y": // Scissors + Draw (Scissors)
      return 3 + 3;
    case "C Z": // Scissors + Win (Rock)
      return 6 + 1;
  }
}

const lines = readInputLines().map((line) => {
  console.log("DEBUG lines:", line, getPoints(line));
  return getPoints(line);
});

console.log("DEBUG lines:", lines);
console.log("RESULT:", sum(lines));
