import * as fs from "node:fs";
import _ from "lodash";

function readLines() {
  return fs
    .readFileSync("input.txt", "utf-8")
    .split(/\n/)
    .filter((s) => s.trim());
}

const lines = readLines().map((line) => JSON.parse(line));
const packets = [[[2]], [[6]]];
lines.push(...packets);

console.log("INPUT:", lines);

function hasCorrectOrder(left, right) {
  if (typeof left === "number" && typeof right === "number") {
    if (left < right) return true;
    if (left > right) return false;
    return null;
  } else if (Array.isArray(left) && Array.isArray(right)) {
    for (let i = 0; i < left.length; i++) {
      if (i >= right.length) return false;
      const item = hasCorrectOrder(left[i], right[i]);
      if (item != null) return item;
    }

    if (left.length === right.length) return null;
    return left.length < right.length;
  } else if (Array.isArray(left) && typeof right === "number") {
    return hasCorrectOrder(left, [right]);
  } else if (typeof left === "number" && Array.isArray(right)) {
    return hasCorrectOrder([left], right);
  } else {
    throw new Error("Unknown types", left, right);
  }
}

lines.sort((a, b) => {
  const order = hasCorrectOrder(a, b);
  if (order === true) return -1;
  if (order === false) return 1;
  return 0;
});

const packetIndexes = [];
lines.forEach((line, index) => {
  if (_.isEqual(line, packets[0])) {
    packetIndexes.push(index + 1);
  }
  if (_.isEqual(line, packets[1])) {
    packetIndexes.push(index + 1);
  }
});

console.log("INDEXES:", packetIndexes[0], packetIndexes[1]);
console.log("RESULT:", packetIndexes[0] * packetIndexes[1]);
