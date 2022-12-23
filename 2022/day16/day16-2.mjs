import * as fs from "node:fs";
import _ from "lodash";

const nodes = {
  NQ: { rate: 0, outputs: ["SU", "XD"] },
  AB: { rate: 0, outputs: ["XD", "TE"] },
  IA: { rate: 0, outputs: ["CS", "WF"] },
  WD: { rate: 0, outputs: ["DW", "II"] },
  XD: { rate: 10, outputs: ["AB", "NQ", "VT", "SC", "MU"] },
  SL: { rate: 0, outputs: ["RP", "DS"] },
  FQ: { rate: 15, outputs: ["EI", "YC"] },
  KF: { rate: 0, outputs: ["FL", "QP"] },
  QP: { rate: 0, outputs: ["KF", "RP"] },
  DS: { rate: 0, outputs: ["SL", "AA"] },
  IK: { rate: 0, outputs: ["XC", "AA"] },
  HQ: { rate: 0, outputs: ["VM", "WV"] },
  WR: { rate: 0, outputs: ["WV", "HF"] },
  HH: { rate: 20, outputs: ["PI", "CF", "CN", "NF", "AR"] },
  DW: { rate: 19, outputs: ["KD", "WD", "HS"] },
  RP: { rate: 14, outputs: ["SL", "QP", "BH", "LI", "WP"] },
  EC: { rate: 0, outputs: ["NF", "XC"] },
  AA: { rate: 0, outputs: ["NH", "ES", "UC", "IK", "DS"] },
  VM: { rate: 18, outputs: ["HQ"] },
  NF: { rate: 0, outputs: ["HH", "EC"] },
  PS: { rate: 0, outputs: ["AR", "SU"] },
  IL: { rate: 0, outputs: ["XC", "KZ"] },
  WP: { rate: 0, outputs: ["CS", "RP"] },
  WF: { rate: 0, outputs: ["FL", "IA"] },
  XW: { rate: 0, outputs: ["OL", "NL"] },
  EH: { rate: 0, outputs: ["UK", "YR"] },
  UC: { rate: 0, outputs: ["AA", "FL"] },
  CS: { rate: 3, outputs: ["IA", "CN", "LD", "RJ", "WP"] },
  AR: { rate: 0, outputs: ["PS", "HH"] },
  CF: { rate: 0, outputs: ["HH", "FL"] },
  NH: { rate: 0, outputs: ["AA", "LD"] },
  RJ: { rate: 0, outputs: ["DJ", "CS"] },
  XC: { rate: 17, outputs: ["IL", "EC", "YR", "IK", "DJ"] },
  TE: { rate: 24, outputs: ["AB", "YA"] },
  CN: { rate: 0, outputs: ["HH", "CS"] },
  KD: { rate: 0, outputs: ["DW", "UK"] },
  SC: { rate: 0, outputs: ["EI", "XD"] },
  MU: { rate: 0, outputs: ["XD", "YP"] },
  SU: { rate: 22, outputs: ["PS", "LI", "II", "NQ"] },
  FL: { rate: 8, outputs: ["KF", "WF", "CF", "UC", "HS"] },
  OL: { rate: 4, outputs: ["KZ", "HF", "XW"] },
  EI: { rate: 0, outputs: ["FQ", "SC"] },
  NL: { rate: 0, outputs: ["XW", "UK"] },
  YP: { rate: 21, outputs: ["YA", "MU", "YC"] },
  BH: { rate: 0, outputs: ["VT", "RP"] },
  II: { rate: 0, outputs: ["SU", "WD"] },
  YA: { rate: 0, outputs: ["TE", "YP"] },
  HS: { rate: 0, outputs: ["FL", "DW"] },
  DJ: { rate: 0, outputs: ["RJ", "XC"] },
  KZ: { rate: 0, outputs: ["OL", "IL"] },
  YR: { rate: 0, outputs: ["EH", "XC"] },
  UK: { rate: 7, outputs: ["KD", "NL", "EH"] },
  YC: { rate: 0, outputs: ["FQ", "YP"] },
  ES: { rate: 0, outputs: ["PI", "AA"] },
  LI: { rate: 0, outputs: ["SU", "RP"] },
  LD: { rate: 0, outputs: ["NH", "CS"] },
  VT: { rate: 0, outputs: ["BH", "XD"] },
  PI: { rate: 0, outputs: ["ES", "HH"] },
  WV: { rate: 11, outputs: ["WR", "HQ"] },
  HF: { rate: 0, outputs: ["OL", "WR"] },
  // AA: { rate: 0, outputs: ["DD", "II", "BB"] },
  // BB: { rate: 13, outputs: ["CC", "AA"] },
  // CC: { rate: 2, outputs: ["DD", "BB"] },
  // DD: { rate: 20, outputs: ["CC", "AA", "EE"] },
  // EE: { rate: 3, outputs: ["FF", "DD"] },
  // FF: { rate: 0, outputs: ["EE", "GG"] },
  // GG: { rate: 0, outputs: ["FF", "HH"] },
  // HH: { rate: 22, outputs: ["GG"] },
  // II: { rate: 0, outputs: ["AA", "JJ"] },
  // JJ: { rate: 21, outputs: ["II"] },
};

const goodNodes = Object.keys(nodes).filter((node) => nodes[node].rate > 0);
if (!goodNodes.includes("AA")) {
  goodNodes.unshift("AA");
}
console.log("GOOD NODES", goodNodes);

function bfs(...startNodes) {
  const queue = [...startNodes];
  const nodeDistances = new Map();
  startNodes.forEach((node) => {
    nodeDistances.set(node, 0);
  });

  while (queue.length > 0) {
    const head = queue.splice(0, 1)[0];
    const distance = nodeDistances.get(head);

    // Check for early return
    const shouldFinishEarly = false;
    if (shouldFinishEarly) {
      return nodeDistances;
    }

    const neighbors = nodes[head].outputs;
    neighbors.forEach((neighbor) => {
      const neighborCode = neighbor;
      if (nodeDistances.get(neighborCode) != null) {
        return;
      }

      // Restrict neighbor visits
      const canVisit = true;
      if (canVisit) {
        queue.push(neighbor);
        nodeDistances.set(neighborCode, distance + 1);
      }
    });
  }

  console.log("BFS Finish");
  return { nodeDistances };
}

let nodeDistance = {};
let nodeRate = {};

goodNodes.forEach((node) => {
  const { nodeDistances } = bfs(node);
  nodeDistance[node] = {};
  nodeRate[node] = nodes[node].rate;
  goodNodes
    .filter((n) => n !== node)
    .forEach((next) => {
      nodeDistance[node][next] = nodeDistances.get(next);
    });
});

console.log("NODES DISTANCE", nodeDistance);
console.log("NODES RATE", nodeRate);

let totalScore = 0;
let bestPath = [];
let bestElephantPath = [];

function dfs(position, turns, visited, score, isElephant, path, elephanPath) {
  if (isElephant) {
    dfs("AA", 26, visited, score, false, path, elephanPath);
  }

  if (score > totalScore) {
    totalScore = score;
    bestPath = path;
    bestElephantPath = elephanPath;
  }

  if (turns > 12 && isElephant)
    console.log(
      "DFS",
      position,
      turns,
      [...visited].join(","),
      score,
      isElephant
    );

  if (turns <= 0) {
    return;
  }

  goodNodes.forEach((next) => {
    if (next === position || next == "AA") return;

    const distance = nodeDistance[position][next];
    const newTurns = turns - distance - 1;
    if (newTurns >= 0 && !visited.has(next)) {
      const newScore = nodeRate[next] * newTurns;
      //console.log("  next go", next, newTurns);
      dfs(
        next,
        newTurns,
        new Set([...visited, next]),
        score + newScore,
        isElephant,
        isElephant ? path : [...path, next],
        isElephant ? [...elephanPath, next] : elephanPath
      );
    }
  });
}

dfs("AA", 26, new Set(), 0, true, [], [], [], []);
console.log("RESULT", totalScore, bestPath, bestElephantPath);
