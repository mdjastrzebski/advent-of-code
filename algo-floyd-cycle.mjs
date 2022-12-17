function floydCycle(sequence) {
  // # Main phase of algorithm: finding a repetition x_i = x_2i.
  //   # The hare moves twice as quickly as the tortoise and
  //   # the distance between them increases by 1 at each step.
  //   # Eventually they will both be inside the cycle and then,
  //   # at some point, the distance between them will be
  //   # divisible by the period λ.

  let tortoiseIdx = 1;
  let hareIdx = 2;

  while (sequence[tortoiseIdx] !== sequence[hareIdx]) {
    tortoiseIdx += 1;
    hareIdx += 2;
  }

  console.log("Floyd A", tortoiseIdx, hareIdx);

  // # At this point the tortoise position, ν, which is also equal
  // # to the distance between hare and tortoise, is divisible by
  // # the period λ. So hare moving in circle one step at a time,
  // # and tortoise (reset to x0) moving towards the circle, will
  // # intersect at the beginning of the circle. Because the
  // # distance between them is constant at 2ν, a multiple of λ,
  // # they will agree as soon as the tortoise reaches index μ.

  let mu = 0;
  tortoiseIdx = 0;
  while (sequence[tortoiseIdx] !== sequence[hareIdx]) {
    tortoiseIdx += 1;
    hareIdx += 1;
    mu += 1;
  }

  console.log("Floyd B", tortoiseIdx, hareIdx, mu);

  // # Find the length of the shortest cycle starting from x_μ
  // # The hare moves one step at a time while tortoise is still.
  // # lam is incremented until λ is found.

  let lam = 1;
  hareIdx = tortoiseIdx + 1;
  while (sequence[tortoiseIdx] !== sequence[hareIdx]) {
    hareIdx += 1;
    lam += 1;
  }

  console.log("Floyd C", tortoiseIdx, hareIdx, mu, lam);

  return [lam, mu];
}
