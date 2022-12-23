const nodes = {
  A: { C: 2, D: 6 },
  B: { A: 1, C: 10 },
  C: { B: 1, D: 5 },
  D: { C: 1, D: 4 },
};

function floyd() {
  console.log("Floyd start");

  const dist = {};
  Object.keys(nodes).forEach((node) => {
    dist[node] = {};
    Object.keys(nodes).forEach((next) => {
      dist[node][next] = Infinity;
    });
  });

  Object.keys(nodes).forEach((node) => {
    Object.keys(nodes[node]).forEach((next) => {
      dist[node][next] = nodes[node][next];
    });
    dist[node][node] = 0;
  });

  Object.keys(nodes).forEach((k) => {
    Object.keys(nodes).forEach((i) => {
      Object.keys(nodes).forEach((j) => {
        if (dist[i][j] > dist[i][k] + dist[k][j]) {
          dist[i][j] = dist[i][k] + dist[k][j];
        }
      });
    });
  });

  console.log("Floyd end", dist);
  return dist;
}

const dist = floyd();
console.log("RESULT", dist);
