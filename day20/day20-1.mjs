import * as fs from "node:fs";
import _ from "lodash";

function readLines() {
  return fs.readFileSync("input.txt", "utf-8").split(/\n/);
}

const rawValues = readLines().map((line) => parseInt(line, 10));
const count = rawValues.length;

const entries = rawValues.map((value, index) => ({ value }));

entries.forEach((entry, index) => {
  entry.previous = entries[(count + index - 1) % count];
  entry.next = entries[(index + 1) % count];
});

const zeroEntry = entries.find((v) => v.value === 0);

function printEntry(entry) {
  console.log(
    "  *",
    entry.value,
    [entry.previous.value, entry.next.previous.value],
    [entry.previous.next.value, entry.next.value]
  );
}

function printValues(label) {
  console.log(label, ":");
  let current = entries[0];
  for (let i = 0; i < count; i += 1) {
    if (i < 10 || i > count - 10 || current.value === 0) {
      printEntry(current);
    }
    if (i === 10 || i === count - 10) console.log("  ...");
    current = current.next;
  }
}

printValues("Input");

function removeEntry(entry) {
  const entryPrevious = entry.previous;
  const entryNext = entry.next;
  entryPrevious.next = entryNext;
  entryNext.previous = entryPrevious;
}

function insertEntryAfter(entry, toInsert) {
  const nextEntry = entry.next;
  entry.next = toInsert;
  toInsert.next = nextEntry;

  nextEntry.previous = toInsert;
  toInsert.previous = entry;
}

function insertEntryBefore(entry, toInsert) {
  const previousEntry = entry.previous;
  entry.previous = toInsert;
  toInsert.previous = previousEntry;

  previousEntry.next = toInsert;
  toInsert.next = entry;
}

function moveEntry(entry, steps) {
  if (steps === 0) {
    return;
  }

  let current = entry;
  removeEntry(entry);

  if (steps > 0) {
    for (let i = 0; i < steps; i += 1) {
      current = current.next;
    }
  } else {
    for (let i = 0; i > steps; i -= 1) {
      current = current.previous;
    }
  }

  // Add node at new place
  if (steps > 0) {
    insertEntryAfter(current, entry);
  } else {
    insertEntryBefore(current, entry);
  }
}

function mixEntries() {
  for (let i = 0; i < count; i += 1) {
    const node = entries[i];
    moveEntry(node, node.value);
    //printValues("processing " + node.value);
  }
}

function getEntryAtOffset(entry, offset) {
  let current = entry;
  for (let i = 0; i < offset; i += 1) {
    current = current.next;
  }
  return current;
}

mixEntries();
const node1k = getEntryAtOffset(zeroEntry, 1000);
const node2k = getEntryAtOffset(zeroEntry, 2000);
const node3k = getEntryAtOffset(zeroEntry, 3000);

console.log("Node 1k, 2k, 3k:");
printEntry(node1k);
printEntry(node2k);
printEntry(node3k);

const results = [node1k.value, node2k.value, node3k.value];
console.log("RESULTS", _.sum(results), results);
