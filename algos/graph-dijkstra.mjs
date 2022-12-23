import _ from "lodash";

const nodes;
const height;
const width;
const endCode;

function encodeNode(node) {
  const [x, y] = node;
  return `${x},${y}`;
}

function decodeNode(node) {
  const [x, y] = node.split(",");
  return [parseInt(x), parseInt(y)];
}

function getNodeNeighborsWithWeights(node) {
  const [x, y] = node;
  const neighbors = [
    [x - 1, y],
    [x + 1, y],
    [x, y - 1],
    [x, y + 1],
  ];
  return neighbors
    .filter(([nx, ny]) => nx >= 0 && nx < width && ny >= 0 && ny < height)
    .map((node) => [node, nodes[node[1]][node[0]]]);
}

function dijkstra(...startNodes) {
  const nodeDistances = new Map();
  const previousNode = new Map();

  const queuedNodes = new Set();
  const doneNodes = new Set();
  startNodes.forEach((node) => {
    const nodeCode = encodeNode(node);
    nodeDistances.set(nodeCode, 0);
    queuedNodes.add(nodeCode);
  });

  console.log("Dijkstra Start", nodeDistances);

  while (queuedNodes.size > 0) {
    const nodeCode = _.minBy(
      [...queuedNodes],
      (node) => nodeDistances.get(node) ?? Infinity
    );
    const node = decodeNode(nodeCode);
    const distance = nodeDistances.get(nodeCode);
    queuedNodes.delete(nodeCode);
    doneNodes.add(nodeCode);

    console.log("Processing", node, distance);

    // Check for early return
    const shouldFinishEarly = nodeCode === endCode;
    if (shouldFinishEarly) {
      console.log("Dijkstra Finish (early)", node, distance);
      return { nodeDistances, previousNode };
    }

    const neighbors = getNodeNeighborsWithWeights(node);
    neighbors.forEach(([neighbor, weight]) => {
      const neighborCode = encodeNode(neighbor);
      if (doneNodes.has(neighborCode)) {
        console.log("  Skipping (already processed)", neighbor);
        return;
      }

      // Restrict neighbor visits
      const canVisit = true;
      if (!canVisit) {
        console.log("  Skipping (cannot visit)", neighbor);
        return;
      }

      const altDistance = distance + weight;
      const neightborDistance = nodeDistances.get(neighborCode) ?? Infinity;
      if (altDistance < neightborDistance) {
        nodeDistances.set(neighborCode, altDistance);
        previousNode[neighborCode] = node;
        queuedNodes.add(neighborCode);
        console.log(
          "  Distance reduced",
          neighbor,
          weight,
          neightborDistance,
          "=>",
          altDistance
        );
      } else {
        console.log(
          "  Distance not changed",
          neighbor,
          weight,
          neightborDistance,
          "vs",
          altDistance
        );
      }
    });
  }

  console.log("Dijkstra Finish", nodeDistances);
  return { nodeDistances, previousNode };
}

const { nodeDistances, previousNode } = dijkstra([0, 0]);

console.log("RESULT", endCode, nodeDistances.get(endCode));
