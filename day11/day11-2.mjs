// const monkeyItems = [[79, 98], [54, 65, 75, 74], [79, 60, 97], [74]];
// const monkeyOp = [(x) => x * 19, (x) => x + 6, (x) => x * x, (x) => x + 3];
// const monkeyTest = [
//   (x) => (x % 23 === 0 ? 2 : 3),
//   (x) => (x % 19 === 0 ? 2 : 0),
//   (x) => (x % 13 === 0 ? 1 : 3),
//   (x) => (x % 17 === 0 ? 0 : 1),
// ];
// const monkeyInspectTimes = [0, 0, 0, 0];

const monkeyItems = [
  [98, 97, 98, 55, 56, 72],
  [73, 99, 55, 54, 88, 50, 55],
  [67, 98],
  [82, 91, 92, 53, 99],
  [52, 62, 94, 96, 52, 87, 53, 60],
  [94, 80, 84, 79],
  [89],
  [70, 59, 63],
];

const monkeyOp = [
  (x) => x * 13,
  (x) => x + 4,
  (x) => x * 11,
  (x) => x + 8,
  (x) => x * x,
  (x) => x + 5,
  (x) => x + 1,
  (x) => x + 3,
];

const monkeyTest = [
  (x) => (x % 11 === 0 ? 4 : 7),
  (x) => (x % 17 === 0 ? 2 : 6),
  (x) => (x % 5 === 0 ? 6 : 5),
  (x) => (x % 13 === 0 ? 1 : 2),
  (x) => (x % 19 === 0 ? 3 : 1),
  (x) => (x % 2 === 0 ? 7 : 0),
  (x) => (x % 3 === 0 ? 0 : 5),
  (x) => (x % 7 === 0 ? 4 : 3),
];
const monkeyInspectTimes = [0, 0, 0, 0, 0, 0, 0, 0];

for (let round = 1; round <= 10000; round += 1) {
  console.log("ROUND", round);
  for (let m = 0; m < monkeyItems.length; m += 1) {
    console.log("  Monkey", m);
    const items = [...monkeyItems[m]];
    monkeyItems[m] = [];
    items.forEach((item, i) => {
      const newItem = monkeyOp[m](item) % 9699690;
      const receiver = monkeyTest[m](newItem);
      monkeyItems[receiver].push(newItem);
      console.log("    Item", item + " => " + newItem, receiver);
      monkeyInspectTimes[m] += 1;
    });

    //console.log("  Items", monkeyItems);
  }
}

console.log("DEBUG: ", monkeyItems);
console.log("RESULT 2: ", monkeyInspectTimes);
monkeyInspectTimes.sort((a, b) => b - a);
console.log(
  "RESULT 1: ",
  monkeyInspectTimes[0] * monkeyInspectTimes[1],
  monkeyInspectTimes
);
