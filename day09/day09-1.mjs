import * as fs from "node:fs";
import _ from "lodash";

function readLines() {
  return fs.readFileSync("input.txt", "utf-8").split(/\n/);
}

const lines = readLines().map((line) => line.split(" "));

console.log("INPUT:", lines);

let head = [0, 0];
let tail = [0, 0];
const tailVisited = new Set();
tailVisited.add(`0,0`);

function calcHeadMoves(head, dist, dir) {
  if (dir === "U") {
    const results = [];
    for (let i = 1; i <= dist; i++) {
      results.push([head[0], head[1] + i]);
    }
    return results;
  } else if (dir === "D") {
    const results = [];
    for (let i = 1; i <= dist; i++) {
      results.push([head[0], head[1] - i]);
    }
    return results;
  } else if (dir === "L") {
    const results = [];
    for (let i = 1; i <= dist; i++) {
      results.push([head[0] - i, head[1]]);
    }
    return results;
  } else if (dir === "R") {
    const results = [];
    for (let i = 1; i <= dist; i++) {
      results.push([head[0] + i, head[1]]);
    }
    return results;
  } else {
    throw new Error("Unknown direction: " + dir);
  }
}

function calcTailMove([hx, hy], [tx, ty]) {
  if (hx === tx && hy === ty) {
    return [tx, ty];
  }

  if (hx === tx) {
    if (hy >= ty + 2) {
      return [tx, ty + 1];
    } else if (hy <= ty - 2) {
      return [tx, ty - 1];
    }
    return [tx, ty];
  }

  if (hy === ty) {
    if (hx >= tx + 2) {
      return [tx + 1, ty];
    } else if (hx <= tx - 2) {
      return [tx - 1, ty];
    }
    return [tx, ty];
  }

  let [rx, ry] = [tx, ty];
  if (hx >= tx + 2) {
    rx = tx + 1;
    if (hy >= ty + 1) {
      ry = ty + 1;
    } else if (hy <= ty - 1) {
      ry = ty - 1;
    }
    return [rx, ry];
  } else if (hx <= tx - 2) {
    rx = tx - 1;
    if (hy >= ty + 1) {
      ry = ty + 1;
    } else if (hy <= ty - 1) {
      ry = ty - 1;
    }
    return [rx, ry];
  }

  if (hy >= ty + 2) {
    ry = ty + 1;
    if (hx >= tx + 1) {
      rx = tx + 1;
    } else if (hx <= tx - 1) {
      rx = tx - 1;
    }
    return [rx, ry];
  } else if (hy <= ty - 2) {
    ry = ty - 1;
    if (hx >= tx + 1) {
      rx = tx + 1;
    } else if (hx <= tx - 1) {
      rx = tx - 1;
    }
    return [rx, ry];
  }
  return [rx, ry];
}

lines.forEach((line) => {
  const dir = line[0];
  const dist = parseInt(line[1], 10);

  console.log("Line", dir, dist, ": ", head, tail);

  let newHeads = calcHeadMoves(head, dist, dir);
  newHeads.forEach((newHead) => {
    let newTail = calcTailMove(newHead, tail);

    console.log("  Move", head, "=>", newHead, tail, "=>", newTail);

    head = newHead;
    tail = newTail;
    tailVisited.add(`${tail[0]},${tail[1]}`);
  });
});

console.log("RESULT:", tailVisited);
console.log("RESULT:", tailVisited.size);
