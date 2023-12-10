from math import floor

file_path = "input-1b.txt"

with open(file_path, "r") as file:
    lines = file.read().split('\n')

map = [list(line) for line in lines]

# Find start point
for y, line in enumerate(map):
    for x, char in enumerate(line):
        if char == 'S':
            start = (x, y)
            break

# Helper


def print_map(name, map):
    print(name, "MAP")
    for line in map:
        print("".join(line))
    print()


print_map("INPUT", map)
print("START", start)

pipe = {
    'S': "NSEW",
    '|': "NS",
    '-': "EW",
    'J': "NW",
    'L': "NE",
    '7': "SW",
    'F': "SE",
    ".": "",
}

# Map edges
lim_y = len(map)
lim_x = len(map[0])

current = start
path = [start]
path_set = set(start)

# Walk through the pipe
while True:
    cx, cy = current

    if cy + 1 < lim_y and "N" in pipe[map[cy + 1][cx]] and (cx, cy + 1) not in path_set:
        current = (cx, cy + 1)
    elif cy - 1 >= 0 and "S" in pipe[map[cy - 1][cx]] and (cx, cy - 1) not in path_set:
        current = (cx, cy - 1)
    elif cx + 1 < lim_x and "W" in pipe[map[cy][cx + 1]] and (cx + 1, cy) not in path_set:
        current = (cx + 1, cy)
    elif cx - 1 >= 0 and "E" in pipe[map[cy][cx - 1]] and (cx - 1, cy) not in path_set:
        current = (cx - 1, cy)
    else:
        raise Exception("No where to go", current)

    if current == start:
        break

    path.append(current)
    path_set.add(current)


print("PATH", path)

# Max dist is circumeference / 2 (round down)
print("RESULT", floor(len(path)/2))
