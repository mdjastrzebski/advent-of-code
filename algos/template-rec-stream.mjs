import * as fs from "node:fs";
import _ from "lodash";

function readInput() {
  return fs.readFileSync("input.txt", "utf-8");
}

const input = readInput()
  .split("")
  .map((char) => {
    return parseInt(char, 10);
  });

console.log("DEBUG input", input.join(""));

function parsePacket(array) {
  const type = parseInt(array.splice(0, 1).join(""), 2);
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
  }
}

const result = parsePacket(input);
console.log("RESULT:", result);
