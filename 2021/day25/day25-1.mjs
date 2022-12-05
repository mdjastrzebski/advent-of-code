import * as fs from "node:fs";
import _ from "lodash";

function readLines() {
  return fs.readFileSync("input.txt", "utf-8").split(/\n/);
}

function formatBoard() {
  return board.map((row) => row.join("")).join("\n");
}

function getField(board, x, y) {
  const row = board[y % board.length];
  return row[x % row.length];
}

function setField(board, x, y, value) {
  const row = board[y % board.length];
  row[x % row.length] = value;
}

function moveBoard(input) {
  const newBoard1 = input.map((row) => row.map(() => "."));
  for (let y = 0; y < input.length; y += 1) {
    for (let x = 0; x < input[y].length; x += 1) {
      if (getField(input, x, y) === ">" && getField(input, x + 1, y) === ".") {
        //console.log("DEBUG move right", x, y, x + 1, y);
        setField(newBoard1, x + 1, y, ">");
      } else if (getField(newBoard1, x, y) !== ">") {
        newBoard1[y][x] = input[y][x];
      }
    }
  }

  input = newBoard1;
  const newBoard2 = input.map((row) => row.map(() => "."));
  for (let y = 0; y < input.length; y += 1) {
    for (let x = 0; x < input[y].length; x += 1) {
      if (getField(input, x, y) === "v" && getField(input, x, y + 1) === ".") {
        //console.log("DEBUG move down", x, y, x, y + 1);
        setField(newBoard2, x, y + 1, "v");
      } else if (getField(newBoard2, x, y) !== "v") {
        newBoard2[y][x] = input[y][x];
      }
    }
  }

  return newBoard2;
}

let move = 0;
let board = readLines().map((line) => line.split(""));
let limit = 1000000;
console.log(`INPUT ${move}:\n${formatBoard()}`);

while (limit-- > 0) {
  const previous = board;
  board = moveBoard(board);
  move += 1;

  if (move % 100 === 0) {
    console.log(`STEP ${move}:\n${formatBoard()}`);
  }

  if (_.isEqual(previous, board)) {
    break;
  }
}

console.log(`RESULT ${move}:\n${formatBoard()}`);
