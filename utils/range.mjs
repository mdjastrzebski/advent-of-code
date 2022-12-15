// Inclusive range: [start, end]

export function rangeLength(range) {
  return range[1] - range[0] + 1;
}

export function rangeHasOverlap(a, b) {
  return a[0] - 1 <= b[1] && b[0] - 1 <= a[1];
}

export function rangeIntersection(a, b) {
  if (!rangeHasOverlap(a, b)) return null;
  return [Math.max(a[0], b[0]), Math.min(a[1], b[1])];
}

export function rangesCompact(list) {
  list.sort((a, b) => a[0] - b[0]);

  const result = [];
  list.forEach((range) => {
    if (result.length === 0) {
      result.push(range);
      return;
    }

    const lastResult = result[result.length - 1];
    if (rangeHasOverlap(lastResult, range)) {
      result[result.length - 1] = [
        Math.min(lastResult[0], range[0]),
        Math.max(lastResult[1], range[1]),
      ];
    } else {
      result.push(range);
    }
  });

  return result;
}

export function rangesInvert(overall, list) {
  const compactList = rangesCompact(list);

  const result = [];
  let last = overall[0];
  compactList.forEach((range) => {
    if (last < range[0]) result.push([last, range[0] - 1]);
    last = range[1] + 1;
  });

  if (last < overall[1]) {
    result.push([last, overall[1]]);
  }

  return result;
}
