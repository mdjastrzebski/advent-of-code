from collections import Counter
import re


with open("input.txt") as f:
    input = f.read()

lines = input.split('\n')

instructions = list(lines[0])
nodes = {}

for line in lines[2:]:
    source, left, right = re.findall(r'\w+', line)
    nodes[source] = {"L": left, "R": right}

print("INPUT", instructions, nodes)

current = "AAA"
result = 0
while current != "ZZZ":
    print("ROUND", current, result)
    for instruction in instructions:
        if instruction == "L":
            current = nodes[current]["L"]
        else:
            current = nodes[current]["R"]

        result += 1
        print("  INST", instruction, current)

        if current == "ZZZ":
            break


print("RESULT", result)
