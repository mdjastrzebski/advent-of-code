from collections import deque
file_path = "input-1b.txt"

with open(file_path, "r") as file:
    lines = file.read().split('\n')

map = [list(line) for line in lines]


def print_map(map):
    for line in map:
        print("".join(line))


start_coords = None
for y, line in enumerate(map):
    for x, char in enumerate(line):
        if char == 'S':
            start_coords = (x, y)
            break

print("INPUT", start_coords)
print_map(map)

north_pipes = set(['|', 'J', 'L', 'S'])
south_pipes = set(['|', '7', 'F', 'S'])
east_pipes = set(['-', 'L', 'F', 'S'])
west_pipes = set(['-', 'J', '7', 'S'])


def bfs(map, start_coords):
    queue = deque([(start_coords, 0)])
    visited = {start_coords: 0}

    while queue:
        coords, distance = queue.popleft()
        x, y = coords

        # Down
        if y + 1 < len(map) and (x, y + 1) not in visited and map[y][x] in south_pipes and map[y + 1][x] in north_pipes:
            queue.append(((x, y + 1), distance + 1))
            visited[(x, y + 1)] = distance + 1

        # Up
        if y - 1 >= 0 and (x, y - 1) not in visited and map[y][x] in north_pipes and map[y - 1][x] in south_pipes:
            queue.append(((x, y - 1), distance + 1))
            visited[(x, y - 1)] = distance + 1

        # Right
        if x + 1 < len(map[y]) and (x + 1, y) not in visited and map[y][x] in east_pipes and map[y][x + 1] in west_pipes:
            queue.append(((x + 1, y), distance + 1))
            visited[(x + 1, y)] = distance + 1

        # Left
        if x - 1 >= 0 and (x - 1, y) not in visited and map[y][x] in west_pipes and map[y][x - 1] in east_pipes:
            queue.append(((x - 1, y), distance + 1))
            visited[(x - 1, y)] = distance + 1

    return max(visited.values())


result = bfs(map, start_coords)
print("\nRESULT", result)
