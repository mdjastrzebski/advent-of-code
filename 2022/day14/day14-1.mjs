import * as fs from "node:fs";
import { exit } from "node:process";
import _ from "lodash";

function readLines() {
  return fs.readFileSync("input1.txt", "utf-8").split(/\n/);
}

const lines = readLines().map((line) =>
  line.split(" -> ").map((c) => c.split(",").map((d) => parseInt(d, 10)))
);

function printBoard() {
  board.forEach((row) => console.log(row.join("")));
}

let xMax = 0;
let xMin = Infinity;
let yMax = 0;

lines.forEach((line) => {
  line.forEach((point) => {
    xMin = Math.min(xMin, point[0]);
    xMax = Math.max(xMax, point[0]);
    yMax = Math.max(yMax, point[1]);
  });
});

console.log("INPUT:", xMin, xMax, yMax, lines);

const xOffset = 400;

yMax += 2;
const board = _.range(yMax + 1).map((x) => _.range(xMax + 1).map((y) => "."));

// Draw board
let result = 0;
lines.forEach((line) => {
  console.log("Line", line);
  let previousPoint = null;
  line.forEach((point) => {
    if (previousPoint == null) {
      previousPoint = point;
      return;
    }

    const [x1, y1] = previousPoint;
    const [x2, y2] = point;

    if (x1 === x2) {
      console.log("x1 === x2", x1, x2, y1, y2);

      const yA = Math.min(y1, y2);
      const yB = Math.max(y1, y2);
      for (let y = yA; y <= yB; y++) {
        console.log("Drawing", x1, y);
        board[y][x1 - xOffset] = "#";
      }
    } else if (y1 === y2) {
      console.log("y1 === y2", x1, x2, y1, y2);
      const xA = Math.min(x1, x2);
      const xB = Math.max(x1, x2);
      for (let x = xA; x <= xB; x++) {
        console.log("Drawing", x, y1);
        board[y1][x - xOffset] = "#";
      }
    } else {
      throw new Error(`Invalid line ${x1},${y1} -> ${x2},${y2}`);
    }

    previousPoint = point;
  });
  result += 0;
  console.log("  result", result);
});

for (let x = 0; x < xMax; x++) {
  board[yMax][x] = "#";
}

printBoard();

// SIMULATE SAND
let unitsOfSand = 0;
while (true) {
  let x = 500;
  let y = 0;
  while (true) {
    if (y === yMax - 1) {
      console.log("RESULT:", unitsOfSand);
      printBoard();
      exit(0);
    }

    if (board[y + 1][x - xOffset] === ".") {
      y++;
    } else if (board[y + 1][x - 1 - xOffset] === ".") {
      y++;
      x--;
    } else if (board[y + 1][x + 1 - xOffset] === ".") {
      y++;
      x++;
    } else {
      // Stuck
      board[y][x - xOffset] = "o";
      break;
    }
  }

  unitsOfSand++;
}

console.log("RESULT:", unitsOfSand);
