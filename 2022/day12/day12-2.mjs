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

function encodeNode(node) {
  const [x, y] = node;
  return `${x},${y}`;
}

function getNodeNeighbors(node) {
  const [x, y] = node;
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

function bfs(...startNodes) {
  const queue = [...startNodes];
  const nodeDistances = new Map();
  startNodes.forEach((node) => {
    nodeDistances.set(encodeNode(node), 0);
  });

  console.log("BFS Start", nodeDistances);

  while (queue.length > 0) {
    const head = queue.splice(0, 1)[0];
    const [x, y] = head;
    const distance = nodeDistances.get(encodeNode(head));
    console.log("Processing", head, distance);

    // Check for early return
    const shouldFinishEarly = _.isEqual(head, end);
    if (shouldFinishEarly) {
      console.log("BFS Finish (early)", head);
      return nodeDistances;
    }

    const neighbors = getNodeNeighbors(head);
    console.log("  Neighbors", neighbors);
    neighbors.forEach((neighbor) => {
      const neighborCode = encodeNode(neighbor);
      if (nodeDistances.get(neighborCode) != null) {
        console.log("  Skipping (already visited)", neighbor);
        return;
      }

      // Restrict neighbor visits
      const [nx, ny] = neighbor;
      const canVisit =
        getElevation(grid[ny][nx]) <= getElevation(grid[y][x]) + 1;
      if (canVisit) {
        queue.push(neighbor);
        nodeDistances.set(neighborCode, distance + 1);
        console.log("  Enqueue neighbor", neighbor, distance + 1);
      } else {
        console.log("  Skipping (cannot visit)", neighbor);
      }
    });
  }

  console.log("BFS Finish");
  return nodeDistances;
}

function getElevation(char) {
  if (char === "S") return 0;
  if (char === "E") return "z".charCodeAt(0) - "a".charCodeAt(0);
  else return char.charCodeAt(0) - "a".charCodeAt(0);
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

console.log("INPUT");
printGrid(grid);
console.log("INPUT", height, width, starts, end);

const dist = bfs(...starts);
console.log("OUTPUT", dist);
console.log("RESULT:", dist.get(encodeNode(end)));
