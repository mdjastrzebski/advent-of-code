from collections import Counter
import re


with open("input.txt") as f:
    input = f.read()

lines = input.split('\n')

instructions = list(lines[0])
nodes = {}

for line in lines[2:]:
    source, left, right = re.findall(r'[\w\d]+', line)
    nodes[source] = {"L": left, "R": right}

print("INPUT", instructions, nodes)

current = [n for n in nodes.keys() if n.endswith("A")]

cache = {}
next_elements = {}
z_indexes = {}

x_inst = instructions * 1000

for node in nodes.keys():
    steps = 0
    z_indexes[node] = []
    n = node
    for instruction in x_inst:
        if instruction == "L":
            n = nodes[n]["L"]
        else:
            n = nodes[n]["R"]

        steps += 1

        if n.endswith("Z"):
            z_indexes[node].append(steps)

    print("NODE", node, z_indexes[node])
    z_indexes[node] = set(z_indexes[node])
    next_elements[node] = n

print("CURRENT", current)
print("NEXT", next_elements)
print("Z", z_indexes)

round = 0
while True:
    if (round % 100) == 0:
        print("ROUND", round, round * len(x_inst),  current)

    idx = z_indexes[current[0]]
    for c in current[1:]:
        idx = idx.intersection(z_indexes[c])

    if (len(idx) > 0):
        print("RESULT", round * len(x_inst) + min(idx))
        break

    round += 1
    current = [next_elements[c] for c in current]

