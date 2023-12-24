
from collections import namedtuple
from sympy import Eq, solve, symbols


with open("input.txt", 'r') as file:
    lines = file.read().strip().split('\n')

Line = namedtuple('Line', ['p', 'v'])


def parse_vectors(line):
    parts = line.split(' @ ')
    v1 = tuple(map(int, parts[0].split(', ')))
    v2 = tuple(map(int, parts[1].split(', ')))
    return Line(v1, v2)


input = list(map(parse_vectors, lines))

p1, v1 = input[0]
p2, v2 = input[1]
p3, v3 = input[2]

px, py, pz = symbols('px py pz')
vx, vy, vz = symbols('vx vy vz')
t1, t2, t3 = symbols('t1 t2 t3')

sol = solve([
    Eq(px + t1*vx, p1[0] + t1*v1[0]),
    Eq(py + t1*vy, p1[1] + t1*v1[1]),
    Eq(pz + t1*vz, p1[2] + t1*v1[2]),

    Eq(px + t2*vx, p2[0] + t2*v2[0]),
    Eq(py + t2*vy, p2[1] + t2*v2[1]),
    Eq(pz + t2*vz, p2[2] + t2*v2[2]),

    Eq(px + t3*vx, p3[0] + t3*v3[0]),
    Eq(py + t3*vy, p3[1] + t3*v3[1]),
    Eq(pz + t3*vz, p3[2] + t3*v3[2]),
], check=False)[0]

print("ANSWER", sum([sol[px], sol[py], sol[pz]]))
