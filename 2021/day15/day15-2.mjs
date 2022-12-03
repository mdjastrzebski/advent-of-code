import * as fs from "node:fs";
import _ from "lodash";
import { exit } from "node:process";

function parseLines() {
  return fs.readFileSync("input.txt", "utf-8").split(/\n/);
}

function encodeNode(x, y) {
  return `${x},${y}`;
}

function decodeNode(node) {
  const [x, y] = node.split(",");
  return [parseInt(x), parseInt(y)];
}

const nodes0 = parseLines().map((line) => {
  return line.split("").map((ch) => ch.charCodeAt(0) - "0".charCodeAt(0));
});

function generateMap(nodes0) {
  const nodes = [];
  for (let i = 0; i < 5; i++) {
    for (let y = 0; y < nodes0.length; y++) {
      nodes[i * nodes0.length + y] = [];
      for (let j = 0; j < 5; j++) {
        for (let x = 0; x < nodes0[y].length; x++) {
          nodes[i * nodes0.length + y][j * nodes0[y].length + x] =
            ((nodes0[y][x] + i + j - 1) % 9) + 1;
        }
      }
    }
  }

  return nodes;
}

const nodes = generateMap(nodes0);
// console.log("DEBUG", nodes);

// exit(0);

const height = nodes.length;
const width = nodes[0].length;

const dist = new Map();
dist.set(encodeNode(0, 0), 0);

const prev = new Map();
const queue = new Set();
for (let i = 0; i < nodes.length; i++) {
  for (let j = 0; j < nodes[i].length; j++) {
    queue.add(encodeNode(i, j));
  }
}

const currentDistKeys = new Set();
currentDistKeys.add(encodeNode(0, 0));

while (queue.size > 0) {
  const node = _.minBy([...currentDistKeys], (n) => dist.get(n) ?? Infinity);
  queue.delete(node);
  currentDistKeys.delete(node);

  const [x, y] = decodeNode(node);
  const neighbors = [
    [x - 1, y],
    [x + 1, y],
    [x, y - 1],
    [x, y + 1],
  ];

  if (x % 100 === 0 && y % 100 === 0) {
    console.log("DEBUG node", node, dist.get(node));
  }
  for (const [nx, ny] of neighbors) {
    const neighbor = encodeNode(nx, ny);
    if (queue.has(neighbor)) {
      const alt = (dist.get(node) ?? Infinity) + nodes[nx][ny];
      if (alt < (dist.get(neighbor) ?? Infinity)) {
        dist.set(neighbor, alt);
        currentDistKeys.add(neighbor);
        prev[neighbor] = node;
      }
    }
  }
}

console.log(
  "RESULT",
  encodeNode(height - 1, width - 1),
  dist.get(encodeNode(height - 1, width - 1))
);
