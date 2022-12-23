import * as fs from "node:fs";
import _ from "lodash";

function readLines() {
  return fs.readFileSync("input.txt", "utf-8").split(/\n/);
}

const input = readLines().map((line) =>
  line.split(",").map((c) => parseInt(c, 10))
);

const cubes = new Map();
input.forEach((cube) => cubes.set(encodeCube(...cube), cube));

console.log("INPUT:", cubes);

const maxX = _.maxBy(input, (c) => c[0])[0];
const maxY = _.maxBy(input, (c) => c[1])[1];
const maxZ = _.maxBy(input, (c) => c[2])[2];

const minX = _.minBy(input, (c) => c[0])[0];
const minY = _.minBy(input, (c) => c[1])[1];
const minZ = _.minBy(input, (c) => c[2])[2];

console.log(
  "INPUT RANGE",
  (maxX - minX + 1) * (maxY - minY + 1) * (maxZ - minZ + 1),
  maxX,
  maxY,
  maxZ,
  minX,
  minY,
  minZ
);

function encodeCube(x, y, z) {
  return `${x},${y},${z}`;
}

function getNeighbors([x, y, z]) {
  return [
    x > minX ? [x - 1, y, z] : null,
    y > minY ? [x, y - 1, z] : null,
    z > minZ ? [x, y, z - 1] : null,
    x < maxX ? [x + 1, y, z] : null,
    y < maxY ? [x, y + 1, z] : null,
    z < maxZ ? [x, y, z + 1] : null,
  ].filter((n) => n != null);
}

function getSurfacesCount(cubes) {
  const visited = new Set();
  let surfaces = 0;

  cubes.forEach(([x, y, z]) => {
    surfaces += 6;
    visited.add(encodeCube(x, y, z));

    if (visited.has(encodeCube(x - 1, y, z))) {
      surfaces -= 2;
    }
    if (visited.has(encodeCube(x + 1, y, z))) {
      surfaces -= 2;
    }
    if (visited.has(encodeCube(x, y - 1, z))) {
      surfaces -= 2;
    }
    if (visited.has(encodeCube(x, y + 1, z))) {
      surfaces -= 2;
    }
    if (visited.has(encodeCube(x, y, z - 1))) {
      surfaces -= 2;
    }
    if (visited.has(encodeCube(x, y, z + 1))) {
      surfaces -= 2;
    }
  });

  return surfaces;
}

function addOuterPosition(position) {
  const positionCode = encodeCube(...position);
  if (!cubes.has(positionCode)) {
    outerPositions.set(positionCode, position);
  }
}

const outerPositions = new Map();
for (let x = minX; x <= maxX; x += 1) {
  for (let y = minY; y <= maxY; y += 1) {
    addOuterPosition([x, y, minZ]);
    addOuterPosition([x, y, maxZ]);
  }
}
for (let x = minX; x <= maxX; x += 1) {
  for (let z = minZ; z <= maxZ; z += 1) {
    addOuterPosition([x, minY, z]);
    addOuterPosition([x, maxY, z]);
  }
}
for (let y = minY; y <= maxY; y += 1) {
  for (let z = minZ; z <= maxZ; z += 1) {
    addOuterPosition([minX, y, z]);
    addOuterPosition([maxX, y, z]);
  }
}

const visited = new Set();
function bfs(...start) {
  console.log("BFS", start);
  const queue = [...start];
  while (queue.length > 0) {
    const position = queue.shift();
    visited.add(encodeCube(...position));
    console.log("  BFS visit", position);
    const neighbors = getNeighbors(position);
    neighbors.forEach((next) => {
      if (
        !cubes.has(encodeCube(...next)) &&
        !visited.has(encodeCube(...next))
      ) {
        queue.push(next);
      }
    });
  }
}

function invert(positions) {
  let result = new Map();
  for (let x = minX; x <= maxX; x += 1) {
    for (let y = minY; y <= maxY; y += 1) {
      for (let z = minZ; z <= maxZ; z += 1) {
        if (!positions.has(encodeCube(x, y, z))) {
          result.set(encodeCube(x, y, z), [x, y, z]);
        }
      }
    }
  }
  return result;
}

console.log("OUTER INITIAL", outerPositions);
bfs(...outerPositions.values());
console.log("OUTER ALL", visited);
const inverted = invert(visited);
const result = getSurfacesCount(inverted);
console.log("RESULT:", result);
