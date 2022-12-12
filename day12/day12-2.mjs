import * as fs from "node:fs";
import _ from "lodash";

function readLines() {
  return fs.readFileSync("input1.txt", "utf-8").split(/\n/);
}

function printGrid(grid) {
  grid.forEach((row) => {
    console.log(row.join(""));
  });
}

function encodeNode([x, y]) {
  return `${x},${y}`;
}

function getElevation(char) {
  if (char === "S") return 0;
  if (char === "E") return "z".charCodeAt(0) - "a".charCodeAt(0);
  else return char.charCodeAt(0) - "a".charCodeAt(0);
}

function getNeighbors([x, y]) {
  const neighbors = [
    [x - 1, y],
    [x + 1, y],
    [x, y - 1],
    [x, y + 1],
  ];
  return neighbors.filter(
    ([nx, ny]) => nx >= 0 && nx < width && ny >= 0 && ny < height
  );
}

const grid = readLines().map((line) => line.split(""));
const height = grid.length;
const width = grid[0].length;

let starts = [];
let end;
for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[0].length; x++) {
    if (grid[y][x] === "S" || grid[y][x] === "a") {
      starts.push([x, y]);
    } else if (grid[y][x] === "E") {
      end = [x, y];
    }
  }
}

const queue = [];
let dist = new Map();
starts.forEach((start) => {
  queue.push(start);
  dist.set(encodeNode(start), 0);
});

console.log("INPUT");
printGrid(grid);
console.log("INPUT", height, width, starts, end, queue, dist);

let result = 0;
while (queue.length > 0) {
  const head = queue.splice(0, 1)[0];
  const distHead = dist.get(encodeNode(head));
  console.log("HEAD", head, distHead);
  const [x, y] = head;

  if (head[0] === end[0] && head[1] === end[1]) {
    console.log("FOUND END", head, end);
    result = distHead;
    break;
  }

  const neighbors = getNeighbors(head);
  for (const [nx, ny] of neighbors) {
    const neighbor = encodeNode([nx, ny]);
    if (dist.get(neighbor) == null) {
      const isElevationOk =
        getElevation(grid[ny][nx]) <= getElevation(grid[y][x]) + 1;
      console.log(
        "  NEW NEIGHBOR",
        [nx, ny],
        grid[ny][nx],
        grid[y][x],
        isElevationOk
      );
      if (isElevationOk) {
        console.log("    TERRAIN OK", [nx, ny], distHead + 1);
        queue.push([nx, ny]);
        dist.set(neighbor, distHead + 1);
      }
    }
  }
}

console.log("RESULT:", result);
