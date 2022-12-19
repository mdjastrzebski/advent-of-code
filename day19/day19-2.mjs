import * as fs from "node:fs";
import _ from "lodash";
import { LargeSet } from "../utils/LargeSet.mjs";

function readLines() {
  return fs.readFileSync("input.txt", "utf-8").split(/\n/);
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

function encodeState([res, robots]) {
  return `${res.join(",")}-${robots.join(",")}`;
}

function getMaxGeode(blueprint) {
  console.log("GetMaxGeode", blueprint);
  const { oo, co, bo, bc, go, gb } = blueprint;

  let maxGeode = 0;
  let bestPath = null;
  const visited = new LargeSet(
    (key) => encodeState(key.slice(1)),
    (key) => key[0]
  );

  const oReq = Math.max(oo, co, bo, go);

  const dfs = (t, res, robots, buildPath) => {
    if (res[3] > maxGeode) {
      console.log(
        "Improved MaxGeode!",
        res[3],
        buildPath,
        visited.size,
        visited.hitRatio
      );
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

    const state = [t, res, robots];
    if (visited.has(state)) {
      return;
    }

    visited.add(state);

    if (t >= 20) {
      console.log("DFS", state, visited.size, visited.hitRatio);
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
      //return;
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

  dfs(32, [0, 0, 0, 0], [1, 0, 0, 0], []);
  return maxGeode;
}

let result = 1;
blueprints.slice(0, 3).forEach((blueprint) => {
  const maxGeode = getMaxGeode(blueprint);
  result *= maxGeode;
  console.log("BLUEPRINT", blueprint.number, maxGeode);
});

console.log("RESULT", result);
