import * as fs from "node:fs";

function readLines() {
  return fs.readFileSync("input.txt", "utf-8").split(/\n/);
}

const grid = readLines().map((line) =>
  line.split("").map((c) => parseInt(c, 10))
);
console.log("INPUT:", grid);

function getRightScore(x, y) {
  const tree = grid[y][x];
  let result = 0;
  for (let ix = x + 1; ix < grid[0].length; ix++) {
    result += 1;
    if (grid[y][ix] >= tree) {
      break;
    }
  }

  return result;
}

function getLeftScore(x, y) {
  const tree = grid[y][x];
  let result = 0;
  for (let ix = x - 1; ix >= 0; ix--) {
    result += 1;
    if (grid[y][ix] >= tree) {
      break;
    }
  }

  return result;
}

function getUpScore(x, y) {
  const tree = grid[y][x];
  let result = 0;
  for (let iy = y - 1; iy >= 0; iy--) {
    result += 1;
    if (grid[iy][x] >= tree) {
      break;
    }
  }

  return result;
}

function getDownScore(x, y) {
  const tree = grid[y][x];
  let result = 0;
  for (let iy = y + 1; iy < grid.length; iy++) {
    result += 1;
    if (grid[iy][x] >= tree) {
      break;
    }
  }

  return result;
}

function getScore(x, y) {
  const left = getLeftScore(x, y);
  const right = getRightScore(x, y);
  const up = getUpScore(x, y);
  const down = getDownScore(x, y);
  const result = left * right * up * down;
  console.log("  DEBUG score", left, right, up, down, result);
  return result;
}

let max = 0;
for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[0].length; x++) {
    const score = getScore(x, y);
    console.log("DEBUG score", score, "-", grid[y][x], "-", x, y);
    if (score > max) {
      max = score;
    }
  }
}

console.log("RESULT:", max);
