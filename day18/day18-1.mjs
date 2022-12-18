import * as fs from "node:fs";
import _ from "lodash";

function readLines() {
  return fs.readFileSync("input.txt", "utf-8").split(/\n/);
}

const cubes = readLines().map((line) =>
  line.split(",").map((c) => parseInt(c, 10))
);

console.log("INPUT:", cubes);

const maxX = _.maxBy(cubes, (c) => c[0])[0];
const maxY = _.maxBy(cubes, (c) => c[1])[1];
const maxZ = _.maxBy(cubes, (c) => c[2])[2];

const minX = _.minBy(cubes, (c) => c[0])[0];
const minY = _.minBy(cubes, (c) => c[1])[1];
const minZ = _.minBy(cubes, (c) => c[2])[2];

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
    x > 0 ? [x - 1, y, z] : null,
    y > 0 ? [x, y - 1, z] : null,
    z > 0 ? [x, y, z - 1] : null,
    x < maxX ? [x + 1, y, z] : null,
    y < maxY ? [x, y + 1, z] : null,
    z < maxZ ? [x, y, z + 1] : null,
  ].filter(n != null);
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

let result = getSurfacesCount(cubes);
console.log("RESULT:", result);
