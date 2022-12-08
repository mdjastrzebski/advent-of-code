import * as fs from "node:fs";

function readLines() {
  return fs.readFileSync("input0.txt", "utf-8").split(/\n/);
}

const grid = readLines().map((line) =>
  line.split("").map((c) => parseInt(c, 10))
);

console.log("INPUT:", grid);

function isVisible(grid, x, y) {
  if (x === 0 || y === 0 || x === grid[0].length - 1 || y === grid.length - 1) {
    console.log("  edge", x, y);
    return true;
  }

  const tree = grid[y][x];

  let vis = true;
  for (let ix = x + 1; ix < grid[0].length; ix++) {
    if (grid[y][ix] >= tree) {
      console.log("  right NO", ix, y);
      vis = false;
      break;
    }
  }

  if (vis) {
    console.log("  rigth YES", tree, x, y);
    return true;
  }
  vis = true;

  for (let ix = x - 1; ix >= 0; ix--) {
    if (grid[y][ix] >= tree) {
      console.log("  left NO", ix, y);
      vis = false;
      break;
    }
  }
  if (vis) {
    console.log("  left YES", tree, x, y);
    return true;
  }
  vis = true;

  for (let iy = y + 1; iy < grid.length; iy++) {
    if (grid[iy][x] >= tree) {
      console.log("  down NO", x, iy);
      vis = false;
      break;
    }
  }
  if (vis) {
    console.log("  down YES", tree, x, y);
    return true;
  }

  for (let iy = y - 1; iy >= 0; iy--) {
    if (grid[iy][x] >= tree) {
      console.log("  up NO", x, iy);
      return false;
    }
  }

  console.log("  up YES", tree, x, y);
  return true;
}

let result = 0;
for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[0].length; x++) {
    console.log("Tree", grid[y][x], "-", x, y);
    const vis = isVisible(grid, x, y);
    result += vis ? 1 : 0;
  }
}

console.log("RESULT:", result);
