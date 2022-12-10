import * as fs from "node:fs";
import _ from "lodash";

function readLines() {
  return fs.readFileSync("input1.txt", "utf-8").split(/\n/);
}

const lines = readLines().map((line) => line.split(" "));

console.log("INPUT:", lines);

function getValue(register, value) {
  const numValue = parseInt(value, 10);
  return Number.isNaN(numValue) ? register[value] : numValue;
}

function executeProgram(lines, input) {
  console.log("Execute", input);
  const registers = {
    w: 0,
    x: 0,
    y: 0,
    z: 0,
  };

  const numInput = input.split("").map((c) => parseInt(c, 10));

  lines.forEach((tokens, index) => {
    console.log("Line", index, tokens, registers);

    if (tokens[0] === "inp") {
      registers[tokens[1]] = numInput.splice(0, 1)[0];
    } else if (tokens[0] === "add") {
      registers[tokens[1]] =
        registers[tokens[1]] + getValue(registers, tokens[2]);
    } else if (tokens[0] === "mul") {
      registers[tokens[1]] =
        registers[tokens[1]] * getValue(registers, tokens[2]);
    } else if (tokens[0] === "div") {
      registers[tokens[1]] = Math.trunc(
        registers[tokens[1]] / getValue(registers, tokens[2])
      );
    } else if (tokens[0] === "mod") {
      registers[tokens[1]] =
        registers[tokens[1]] % getValue(registers, tokens[2]);
    } else if (tokens[0] === "eql") {
      registers[tokens[1]] =
        registers[tokens[1]] === getValue(registers, tokens[2]) ? 1 : 0;
    }

    console.log("  After", registers);
  });

  return registers.z === 0;
}

// for (let i = 9999_99999_99999; i >= 0; i--) {
//   const stringVal = i.toString().padStart(14, "0");
//   if (stringVal.includes("0")) {
//     console.log("SKIPPING:", i);
//     continue;
//   }

//   console.log("CHECKING:", i);
//   const result = executeProgram(lines, stringVal);
//   if (result) {
//     console.log("RESULT:", result);
//     break;
//   }
// }

const result = executeProgram(lines, "13579246899999");
console.log("RESULT:", result);
