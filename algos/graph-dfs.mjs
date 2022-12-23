let bestScore = [];
let bestPath = [];

const graph = {
  A: ["B", "C", "D"],
  B: ["A", "C", "D"],
  C: ["A", "B", "D"],
  D: ["B", "C", "D"],
};

function dfs(node, visited, score = 0, path = []) {
  console.log("DFS start", node, [...visited], score, path);

  if (score > bestScore) {
    bestScore = score;
    bestPath = path;
  }

  const neighbors = graph[node];
  neighbors.forEach((next) => {
    if (next === node || visited.has(next)) {
      return;
    }

    dfs(next, new Set([...visited, next]), score + 1, [...path, next]);
  });

  console.log("DFS end", node, [...visited], bestScore, bestPath);
}

dfs("A", new Set(["A"]));
console.log("RESULT", bestScore, bestPath);
