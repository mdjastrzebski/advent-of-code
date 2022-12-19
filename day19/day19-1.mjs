import * as fs from "node:fs";
import _ from "lodash";

function readLines() {
  return fs.readFileSync("input.txt", "utf-8").split(/\n/);
}

function plus(base, op) {
  return [base[0] + op[0], base[1] + op[1], base[2] + op[2], base[3] + op[3]];
}

function minus(base, op) {
  return [base[0] - op[0], base[1] - op[1], base[2] - op[2], base[3] - op[3]];
}

function greaterOrEqualThanAll(base, compare) {
  return (
    base[0] >= compare[0] && base[1] >= compare[1] && base[2] >= compare[2]
  );
}

function greaterOrEqualThan(base, compare) {
  return [base[0] >= compare[0], base[1] >= compare[1], base[2] >= compare[2]];
}

const blueprints = readLines().map((line) => {
  let number = parseInt(line.match(/Blueprint (\d+):/)[1], 10);
  let oreMatch = line.match(/Each ore robot costs (\d+) ore./);
  let clayMatch = line.match(/Each clay robot costs (\d+) ore./);
  let obsMatch = line.match(
    /Each obsidian robot costs (\d+) ore and (\d+) clay./
  );
  let geodeMatch = line.match(
    /Each geode robot costs (\d+) ore and (\d+) obsidian./
  );

  return {
    number,
    oo: parseInt(oreMatch[1]),
    co: parseInt(clayMatch[1]),
    bo: parseInt(obsMatch[1]),
    bc: parseInt(obsMatch[2]),
    go: parseInt(geodeMatch[1]),
    gb: parseInt(geodeMatch[2]),
  };
});

console.log("INPUT:", blueprints);

function getMaxGeode(blueprint) {
  console.log("GetMaxGeode", blueprint);
  const { oo, co, bo, bc, go, gb } = blueprint;

  let maxGeode = 0;
  let bestPath = null;
  const visited = new Set();
  let visitHit = 0;

  const oReq = Math.max(oo, co, bo, go);

  const dfs = (t, res, robots, buildPath) => {
    if (res[3] > maxGeode) {
      console.log("Improved MaxGeode!", res[3], buildPath);
      maxGeode = res[3];
      bestPath = buildPath;
    }

    if (t == 0) {
      return;
    }

    robots[0] = Math.min(robots[0], oReq);
    robots[1] = Math.min(robots[1], bc);
    robots[2] = Math.min(robots[2], gb);
    res[0] = Math.min(res[0], t * oReq - robots[0] * (t - 1));
    res[1] = Math.min(res[1], t * bc - robots[1] * (t - 1));
    res[2] = Math.min(res[2], t * gb - robots[2] * (t - 1));

    const stateKey = `${t}-${res.join(",")}-${robots.join(",")}`;
    if (visited.has(stateKey)) {
      visitHit += 1;
      return;
    }

    visited.add(stateKey);

    if (t >= 17) {
      console.log("DFS", t, res, robots, stateKey, visited.size, visitHit);
    }

    const newResBase = [
      res[0] + robots[0],
      res[1] + robots[1],
      res[2] + robots[2],
      res[3] + robots[3],
    ];

    // Geode robot
    if (res[0] >= go && res[2] >= gb) {
      let newRes = [
        newResBase[0] - go,
        newResBase[1],
        newResBase[2] - gb,
        newResBase[3],
      ];
      let newRobots = [robots[0], robots[1], robots[2], robots[3] + 1];
      dfs(t - 1, newRes, newRobots, buildPath + "g");
    }

    // Obs robot
    if (res[0] >= bo && res[1] >= bc) {
      let newRes = [
        newResBase[0] - bo,
        newResBase[1] - bc,
        newResBase[2],
        newResBase[3],
      ];
      let newRobots = [robots[0], robots[1], robots[2] + 1, robots[3]];
      dfs(t - 1, newRes, newRobots, buildPath + "b");
    }

    // Clay robot
    if (res[0] >= co) {
      let newRes = [
        newResBase[0] - co,
        newResBase[1],
        newResBase[2],
        newResBase[3],
      ];
      let newRobots = [robots[0], robots[1] + 1, robots[2], robots[3]];
      dfs(t - 1, newRes, newRobots, buildPath + "c");
    }

    // Clay robot
    if (res[0] >= oo) {
      let newRes = [
        newResBase[0] - oo,
        newResBase[1],
        newResBase[2],
        newResBase[3],
      ];
      let newRobots = [robots[0] + 1, robots[1], robots[2], robots[3]];
      dfs(t - 1, newRes, newRobots, buildPath + "o");
    }

    dfs(t - 1, newResBase, robots, buildPath + "_");
  };

  dfs(24, [0, 0, 0, 0], [1, 0, 0, 0], []);
  return maxGeode;
}

let total = 0;
blueprints.forEach((blueprint) => {
  const maxGeode = getMaxGeode(blueprint);
  total += maxGeode * blueprint.number;
  console.log("BLUEPRINT", blueprint.number, maxGeode);
});

console.log("RESULT", total);
