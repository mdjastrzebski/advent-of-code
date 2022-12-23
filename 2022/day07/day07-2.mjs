import * as fs from "node:fs";
import _ from "lodash";

function readLines() {
  return fs.readFileSync("input.txt", "utf-8").split(/\n/);
}

const inputs = readLines();
console.log("DEBUG input", inputs);

function mapToFolder(name, inputs) {
  let size = 0;
  const children = [];
  while (inputs.length > 0) {
    const line = inputs.splice(0, 1)[0];
    const tokens = line.split(/\s+/);
    console.log("STEP line:", tokens);

    if (line === "$ cd ..") {
      console.log("  STEP up:", name, size);
      return { name, size, children };
    } else if (line.startsWith("$ cd ")) {
      console.log("  STEP into:", tokens[2]);
      const folder = mapToFolder(tokens[2], inputs);
      children.push(folder);
      console.log("  STEP return:", tokens[2], folder);
      size += folder.size;
      continue;
    }

    const itemSize = parseInt(tokens[0]);
    if (!Number.isNaN(itemSize)) {
      size += itemSize;
      console.log("  STEP file:", itemSize, tokens[1]);
      continue;
    }

    console.log("  STEP other:", line);
  }

  console.log("STEP END:", name, size);
  return { name, size, children };
}

let root = mapToFolder("", inputs);
// console.log("DEBUG tree:", JSON.stringify(root, null, 2));

function treeVisit(node, callback) {
  callback(node);
  node.children.forEach((child) => treeVisit(child, callback));
}

const total = 70000000;
const minFree = 30000000;
const currentFree = total - root.size;
const missing = minFree - currentFree;
console.log("DEBUG FREE:", missing, currentFree);

let min = Infinity;
treeVisit(root, (node) => {
  if (node.size >= missing && node.size < min) {
    min = node.size;
  }
});

console.log("RESULT:", min);
