import * as fs from "node:fs";
import _ from "lodash";

function readInput() {
  return fs.readFileSync("input.txt", "utf-8");
}

const input = readInput()
  .split("")
  .map((hexChar) => {
    return parseInt(hexChar, 16).toString(2).padStart(4, "0");
  })
  .join("")
  .split("");

console.log("DEBUG input", input.join(""));

function parsePacket(array) {
  const version = parseInt(array.splice(0, 3).join(""), 2);
  const type = parseInt(array.splice(0, 3).join(""), 2);
  console.log("DEBUG packet type=", type, array);

  if (type === 4) {
    let totalBits = "";
    let flag;
    let bits;
    do {
      [flag, ...bits] = array.splice(0, 5);
      totalBits += bits.join("");
    } while (flag === "1");

    const value = parseInt(totalBits, 2);
    console.log("  DEBUG value", value);
    return value;
  } else {
    let values = [];

    let lengthType = parseInt(array.splice(0, 1).join(""), 2);
    if (lengthType === 0) {
      const subPacketsLength = parseInt(array.splice(0, 15).join(""), 2);
      const subArray = array.splice(0, subPacketsLength);
      console.log("  DEBUG operator subpacket length", subPacketsLength);
      while (subArray.join("").replaceAll("0", " ").trimRight().length > 0) {
        values.push(parsePacket(subArray));
      }
    } else {
      const subPacketsCount = parseInt(array.splice(0, 11).join(""), 2);
      console.log("  DEBUG operator subpacket count", subPacketsCount);
      for (let i = 0; i < subPacketsCount; i++) {
        values.push(parsePacket(array));
      }
    }

    if (type === 0) {
      return _.sum(values);
    } else if (type === 1) {
      return values.reduce((a, b) => a * b, 1);
    } else if (type === 2) {
      return _.min(values);
    } else if (type === 3) {
      return _.max(values);
    } else if (type === 5) {
      return values[0] > values[1] ? 1 : 0;
    } else if (type === 6) {
      return values[0] < values[1] ? 1 : 0;
    } else if (type === 7) {
      return values[0] === values[1] ? 1 : 0;
    }
  }
}

const result = parsePacket(input);
console.log("RESULT:", result);
