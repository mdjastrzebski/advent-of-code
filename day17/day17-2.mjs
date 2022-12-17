import * as fs from "node:fs";
import _ from "lodash";

//const logVerbose = console.log;
const logVerbose = () => {};

function readLine() {
  return fs.readFileSync("input.txt", "utf-8").split("");
}

const wind = readLine();
const windCurrent = [...wind];
console.log("WIND", wind.length);

const board = _.range(0, 4000000).map(() => 0b0);

const shapes = [
  [0b1111],
  [0b010, 0b111, 0b010],
  [0b111, 0b100, 0b100],
  [0b1, 0b1, 0b1, 0b1],
  [0b11, 0b11],
];

shapes[0].name = "-";
shapes[1].name = "+";
shapes[2].name = "_|";
shapes[3].name = "|";
shapes[4].name = "[]";

function canFitShape([x, y], shape) {
  logVerbose("    CanFitShape", x, y, shape.name);
  return shape.every((bits, index) => {
    if (x < 0 || bits << x >= 128) return false;
    if (y + index < 0 || y + index >= board.length) return false;

    return (board[y + index] & (bits << x)) === 0;
  });
}

function addShape([x, y], shape) {
  logVerbose("  AddShape", x, y, shape.name);
  shape.forEach((bits, index) => {
    board[y + index] = board[y + index] | (bits << x);
  });
}

let topY = 0;

function dropShape(shapeNo, wind) {
  logVerbose("DropShape", shapeNo, wind[0], wind[1], wind[2], wind[3], wind[4]);
  const shape = shapes[shapeNo];
  const startY = topY + 3;
  const startX = 2;

  let x = startX;
  let y = startY;
  logVerbose("  Start pos", x, y);
  while (true) {
    // Move sideways
    const windDirection = wind.shift();
    if (windDirection === "<") {
      if (canFitShape([x - 1, y], shape)) {
        logVerbose("  Move left", x - 1, y);
        x -= 1;
      } else {
        logVerbose("  Move left (blocked)", x - 1, y);
      }
    } else if (windDirection === ">") {
      if (canFitShape([x + 1, y], shape)) {
        logVerbose("  Move right", x + 1, y);
        x += 1;
      } else {
        logVerbose("  Move right (blocked)", x + 1, y);
      }
    } else {
      throw new Error("  No wind", x, y, windDirection);
    }

    // Move down
    if (canFitShape([x, y - 1], shape)) {
      logVerbose("  Move down", x, y - 1);
      y -= 1;
    } else {
      logVerbose("  Settled", x, y);
      addShape([x, y], shape);
      topY = getTopY();
      return;
    }
  }
}

function getTopY() {
  let y = topY + 10;
  for (; y > 0; y -= 1) {
    if (board[y] !== 0b0) {
      break;
    }
  }

  logVerbose("  TopY", y + 1);
  return y + 1;
}

function getTopYOrig() {
  let y = board.length - 1;
  for (; y > 0; y -= 1) {
    if (board[y] !== 0b0) {
      break;
    }
  }

  logVerbose("  TopY", y + 1);
  return y + 1;
}

function printBoard() {
  let y = getTopY();
  console.log("Board starts at", y);
  for (; y >= 0; y -= 1) {
    console.log(rowBitsToLine(board[y]));
  }
}

function rowBitsToLine(row) {
  return row
    .toString(2)
    .padStart(7, ".")
    .replace(/0/g, ".")
    .replace(/1/g, "#")
    .split("")
    .reverse()
    .join("");
}

for (let i = 0; i < 2022; i += 1) {
  let shapeNo = i % 5;
  if (windCurrent.length < 100) {
    windCurrent.push(...wind);
  }

  dropShape(shapeNo, windCurrent);
  //printBoard();
}

console.log("RESULT", topY);
