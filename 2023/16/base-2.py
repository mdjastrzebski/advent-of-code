
from collections import deque


with open('input.txt', 'r') as file:
    map = file.read().split('\n')


def print_map(map):
    for row in map:
        print(row)
    print()


slash = {
    (1, 0): (0, -1),
    (0, 1): (-1, 0),
    (-1, 0): (0, 1),
    (0, -1): (1, 0)
}

backslash = {
    (1, 0): (0, 1),
    (0, 1): (1, 0),
    (-1, 0): (0, -1),
    (0, -1): (-1, 0)
}

vertical = {
    (1, 0): [(0, 1), (0, -1)],
    (-1, 0): [(0, 1), (0, -1)],
    (0, 1): [(0, 1)],
    (0, -1): [(0, -1)]
}

horizontal = {
    (1, 0): [(1, 0)],
    (-1, 0): [(-1, 0)],
    (0, 1): [(1, 0), (-1, 0)],
    (0, -1): [(1, 0), (-1, 0)],
}

def visited_count(loc, dir):
    visited = set()
    visited_loc = set()
    queue = deque()
    queue.append((loc, dir))

    while queue:
        loc, dir = queue.popleft()
        #print("LOC", loc, dir)

        if (loc, dir) in visited:
            continue

        visited.add((loc, dir))
        visited_loc.add(loc)

        loc = (loc[0] + dir[0], loc[1] + dir[1])

        if loc[0] < 0 or loc[0] >= len(map[0]) or loc[1] < 0 or loc[1] >= len(map):
            continue

        char = map[loc[1]][loc[0]]

        if char == '.':
            next_dir = [dir]
        elif char == '/':
            next_dir = [slash[dir]]
        elif char == '\\':
            next_dir = [backslash[dir]]
        elif char == '|':
            next_dir = vertical[dir]
        elif char == '-':
            next_dir = horizontal[dir]
        else:
            raise Exception("Unknown char:", char)

        for dir in next_dir:
            queue.append((loc, dir))

        #print("  queue", queue)
    return len(visited_loc) - 1


result = 0
for y in range(len(map)):
    left = visited_count((-1, y), (1, 0))
    right = visited_count((len(map), y), (-1, 0))
    result = max(result, left, right)


for x in range(len(map[0])):
    top = visited_count((x, -1), (0, 1))
    bottom = visited_count((x, len(map)), (0, -1))
    result = max(result, top, bottom)

print("RESULT", result)