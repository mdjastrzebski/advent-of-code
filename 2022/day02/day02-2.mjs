import * as fs from "node:fs";

function parseLines() {
  return fs.readFileSync("input.txt", "utf-8").split(/\n/);
}

function sum(array) {
  return array.reduce((total, value) => total + value, 0);
}

function getSymbolPoints(line) {
  switch (line) {
    case "A Y": // Rock => Draw (Rock)
    case "B X": // Paper => Lose (Rock)
    case "C Z": // Scissors => Win (Rock)
      return 1;
    case "A Z": // Rock + Win (Paper)
    case "B Y": // Paper + Draw (Paper)
    case "C X": // Scissors + Lose (Paper)
      return 2;
    case "A X": // Rock => Lose (Scissors)
    case "B Z": // Paper => Win (Scissors)
    case "C Y": // Scissors => Draw (Scissors)
      return 3;
  }
}

function getWinPoints(result) {
  switch (result) {
    case "Z":
      return 6;
    case "Y":
      return 3;
    case "X":
      return 0;
  }
}

const points = parseLines().map((line) => {
  const parts = line.split(/\s+/);
  console.log(
    "DEBUG lines:",
    parts[1],
    getWinPoints(parts[1]),
    parts[0],
    getSymbolPoints(line)
  );
  return getWinPoints(parts[1]) + getSymbolPoints(line);
});

console.log("RESULT:", sum(points));
