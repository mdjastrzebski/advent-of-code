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

console.log("DEBUG input", input);

let versionTotal = 0;

function parsePacket(array) {
  const version = parseInt(array.splice(0, 3).join(""), 2);
  const type = parseInt(array.splice(0, 3).join(""), 2);
  console.log("DEBUG packet", type, version, array);

  versionTotal += version;

  if (type === 4) {
    let payload = "";
    do {
      payload = array.splice(0, 5).join("");
      console.log("  DEBUG value", payload);
    } while (payload.startsWith("1"));
  } else {
    let lengthType = parseInt(array.splice(0, 1).join(""), 2);
    if (lengthType === 0) {
      const subPacketsLength = parseInt(array.splice(0, 15).join(""), 2);
      const subArray = array.splice(0, subPacketsLength);
      console.log("  DEBUG operator subpacket length", subPacketsLength);
      while (subArray.join("").replaceAll("0", " ").trimRight().length > 0) {
        parsePacket(subArray);
      }
    } else {
      const subPacketsCount = parseInt(array.splice(0, 11).join(""), 2);
      const subPackets = [];
      console.log("  DEBUG operator subpacket count", subPacketsCount);
      for (let i = 0; i < subPacketsCount; i++) {
        parsePacket(array);
      }
    }
  }
}

parsePacket(input);

console.log("RESULT:", versionTotal);
