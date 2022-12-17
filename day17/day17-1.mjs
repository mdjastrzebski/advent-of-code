import * as fs from "node:fs";
import _ from "lodash";

// const logVerbose = console.log;
const logVerbose = () => {};

function readLine() {
  return fs.readFileSync("input.txt", "utf-8").split("");
}

const wind = readLine();
const windCurrent = [...wind];
console.log("WIND", wind);

const board = _.range(0, 5000).map(() => _.range(0, 7).map(() => "."));

const shapes = [
  [
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
  ],
  [
    [1, 0],
    [0, 1],
    [1, 1],
    [2, 1],
    [1, 2],
  ],
  [
    [0, 0],
    [1, 0],
    [2, 0],
    [2, 1],
    [2, 2],
  ],
  [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
  ],
  [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1],
  ],
];

function canFitShape([x, y], shape) {
  logVerbose("    CanFitShape", x, y, shape);
  return shape.every(([dx, dy]) => {
    if (y + dy < 0 || y + dy >= board.length) return false;
    if (x + dx < 0 || x + dx >= board[0].length) return false;

    return board[y + dy][x + dx] === ".";
  });
}

function addShape([x, y], shape) {
  logVerbose("  AddShape", x, y, shape);
  shape.forEach(([dx, dy]) => (board[y + dy][x + dx] = "#"));
}

let topY = 0;

function dropShape(shapeNo, wind) {
  logVerbose("DropShape", shapeNo, wind);
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
  let y = board.length - 1;
  for (; y > 0; y -= 1) {
    if (board[y].some((cell) => cell === "#")) {
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
    console.log(board[y].join(""));
  }
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
