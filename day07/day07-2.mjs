import * as fs from "node:fs";
import * as path from "node:path";
import _ from "lodash";

function readLines() {
  return fs.readFileSync("input.txt", "utf-8").split(/\n/);
}

const inputs = readLines();
console.log("DEBUG input", inputs);

function mapToFolder(name, inputs) {
  let size = 0;
  const sub = [];
  while (inputs.length > 0) {
    const line = inputs.splice(0, 1)[0];
    const tokens = line.split(/\s+/);
    console.log("STEP:", tokens);
    if (line === "$ cd ..") {
      console.log("STEP UP:", name, size);
      return { name, size, sub };
    } else if (line.startsWith("$ cd ")) {
      console.log("  STEP INTO:", name, tokens[2]);
      const folder = mapToFolder(tokens[2], inputs);
      sub.push(folder);
      console.log("  STEP RETURN:", name, folder);
      size += folder.size;
      continue;
    }

    const itemSize = parseInt(tokens[0]);
    if (!Number.isNaN(itemSize)) {
      size += itemSize;
      console.log("  STEP FILE:", name, itemSize);
      continue;
    }

    console.log("  STEP OTHER", name, line);
  }

  console.log("STEP END:", name, size);
  return { name, size, sub };
}

let root = mapToFolder("/", inputs);

let max = 70000000;
let min = 30000000;
const free = max - root.size;
console.log("STEP FREE:", free);

let smallest = Infinity;
function visit(node) {
  if (node.size + free >= min && node.size < smallest) {
    smallest = node.size;
  }
  node.sub.forEach((sub) => visit(sub));
}

visit(root);

console.log("RESULT:", smallest);
