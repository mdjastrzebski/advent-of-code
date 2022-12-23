import _ from "lodash";
import { rangeLength, rangesCompact, rangesInvert } from "../utils/range.mjs";

const input = [
  { sensor: [3972136, 2425195], beacon: [4263070, 2991690] },
  { sensor: [3063440, 2824421], beacon: [2870962, 2380928] },
  { sensor: [982575, 3224220], beacon: [883832, 2000000] },
  { sensor: [3987876, 3879097], beacon: [4101142, 3623324] },
  { sensor: [2202219, 115239], beacon: [2756860, -955842] },
  { sensor: [2337255, 2939761], beacon: [2870962, 2380928] },
  { sensor: [1942286, 3935612], beacon: [2942943, 3548053] },
  { sensor: [228100, 3955166], beacon: [-7488, 4058847] },
  { sensor: [2114394, 2368537], beacon: [2870962, 2380928] },
  { sensor: [3658485, 2855273], beacon: [4263070, 2991690] },
  { sensor: [3731843, 3995527], beacon: [4101142, 3623324] },
  { sensor: [1311535, 1294676], beacon: [883832, 2000000] },
  { sensor: [3533617, 3590533], beacon: [4101142, 3623324] },
  { sensor: [341495, 287725], beacon: [110643, -1160614] },
  { sensor: [1533864, 2131620], beacon: [883832, 2000000] },
  { sensor: [1179951, 1876387], beacon: [883832, 2000000] },
  { sensor: [3403590, 1619877], beacon: [2870962, 2380928] },
  { sensor: [2756782, 3344622], beacon: [2942943, 3548053] },
  { sensor: [14753, 3818113], beacon: [-7488, 4058847] },
  { sensor: [3808841, 388411], beacon: [4559391, 972750] },
  { sensor: [3129774, 3401225], beacon: [2942943, 3548053] },
  { sensor: [2710780, 3978709], beacon: [2942943, 3548053] },
  { sensor: [88084, 2475915], beacon: [883832, 2000000] },
  { sensor: [2503969, 3564612], beacon: [2942943, 3548053] },
  { sensor: [3954448, 3360708], beacon: [4101142, 3623324] },
  { sensor: [2724475, 1736595], beacon: [2870962, 2380928] },
];

function getDistance(sensor, beacon) {
  const xDistance = Math.abs(sensor[0] - beacon[0]);
  const yDistance = Math.abs(sensor[1] - beacon[1]);
  return xDistance + yDistance;
}

for (let i = 0; i < input.length; i++) {
  input[i].distance = getDistance(input[i].sensor, input[i].beacon);
}

console.log("INPUT", input);

function blockedRangeForSensor(y, { sensor, distance }) {
  const yDistance = Math.abs(sensor[1] - y);
  const distanceAtY = distance - yDistance;
  if (distanceAtY < 0) return null;

  return [sensor[0] - distanceAtY, sensor[0] + distanceAtY];
}

function blockedRangesForAllSensors(y) {
  const ranges = input
    .map((item) => blockedRangeForSensor(y, item))
    .filter((r) => r != null);
  return rangesCompact(ranges);
}

function getTuningFrequency(x, y) {
  return x * 4000000 + y;
}

let maxSearchX = 4000000;
let maxSearchY = 4000000;

for (let y = 0; y <= maxSearchY; y++) {
  const blockedRanges = blockedRangesForAllSensors(y);
  const allowedRanges = rangesInvert([0, maxSearchX], blockedRanges);
  if (allowedRanges.length > 0) {
    console.log("  Result", getTuningFrequency(allowedRanges[0][0], y));
  }
}
