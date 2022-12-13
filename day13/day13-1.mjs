import * as fs from "node:fs";
import _ from "lodash";

function readLineGroups() {
  const groups = fs.readFileSync("input.txt", "utf-8").split(/\n\s*\n/);
  return groups.map((input) => input.split(/\n/));
}

const groups = readLineGroups().map((group) => {
  return group.map((line) => JSON.parse(line));
});

console.log("INPUT:", groups);

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

let result = 0;
groups.forEach((group, index) => {
  console.log("Group", group);
  const hasCorrect = hasCorrectOrder(group[0], group[1]);
  console.log("  Has correct order", hasCorrect);
  if (hasCorrect) {
    result += index + 1;
  }
});

console.log("RESULT:", result);
