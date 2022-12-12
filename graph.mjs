import _ from "lodash";

function encodeNode(node) {
  const [x, y] = node;
  return `${x},${y}`;
}

function getNodeNeighbors(node) {
  const [x, y] = node;
  const neighbors = [
    [x - 1, y],
    [x + 1, y],
    [x, y - 1],
    [x, y + 1],
  ];
  return neighbors.filter(
    ([nx, ny]) => nx >= 0 && nx < width && ny >= 0 && ny < height
  );
}

function bfs(...startNodes) {
  const queue = [...startNodes];
  const nodeDistances = new Map();
  startNodes.forEach((node) => {
    nodeDistances.set(encodeNode(node), 0);
  });

  console.log("BFS Start", nodeDistances);

  while (queue.length > 0) {
    const head = queue.splice(0, 1)[0];
    const distance = nodeDistances.get(encodeNode(head));
    console.log("Processing", head, distance);

    // Check for early return
    const shouldFinishEarly = false;
    if (shouldFinishEarly) {
      console.log("BFS Finish (early)", head);
      return nodeDistances;
    }

    const neighbors = getNodeNeighbors(head);
    console.log("  Neighbors", neighbors);
    neighbors.forEach((neighbor) => {
      const neighborCode = encodeNode(neighbor);
      if (nodeDistances.get(neighborCode) != null) {
        console.log("  Skipping (already visited)", neighbor);
        return;
      }

      // Restrict neighbor visits
      const canVisit = true;
      if (canVisit) {
        queue.push(neighbor);
        nodeDistances.set(neighborCode, distance + 1);
        console.log("  Enqueue neighbor", neighbor, distance + 1);
      } else {
        console.log("  Skipping (cannot visit)", neighbor);
      }
    });
  }

  console.log("BFS Finish");
  return nodeDistances;
}
