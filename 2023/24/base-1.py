
from collections import namedtuple
import numpy as np


with open("input.txt", 'r') as file:
    lines = file.read().strip().split('\n')

Line = namedtuple('Line', ['p', 'v'])


def parse_vectors(line):
    parts = line.split(' @ ')
    v1 = np.array(list(map(int, parts[0].split(', '))))
    v2 = np.array(list(map(int, parts[1].split(', '))))
    return Line(v1, v2)


input = list(map(parse_vectors, lines))


def intersection_point(l, k):
    a = np.array([
        [l.v[0], -k.v[0]],
        [l.v[1], -k.v[1]],
        # [l.v[2], -k.v[2]],
    ])
    b = np.array([
        k.p[0] - l.p[0],
        k.p[1] - l.p[1],
        # k.p[2] - l.p[2],
    ])

    try:
        t = np.linalg.solve(a, b)
    except np.linalg.LinAlgError:
        return None

    if t[0] < 0 or t[1] < 0:
        return None

    return l.p + t[0] * l.v


min = 200000000000000  # 7
max = 400000000000000  # 17

answer = 0
for i1 in range(len(input)):
    for i2 in range(i1 + 1, len(input)):
        p = intersection_point(input[i1], input[i2])
        if p is not None and min <= p[0] <= max and min <= p[1] <= max:
            answer += 1


print("ANSWER", answer)
