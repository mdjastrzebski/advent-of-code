from collections import deque
file_path = "input-2d.txt"

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


north_pipes = set(['|', 'J', 'L'])
south_pipes = set(['|', '7', 'F'])
east_pipes = set(['-', 'L', 'F'])
west_pipes = set(['-', 'J', '7'])

# Replace S symbol with proper pipe
sx, sy = start_coords
if sy - 1 >= 0 and sy < len(map) and map[sy - 1][sx] in north_pipes and map[sy + 1][sx] in south_pipes:
    map[sy][sx] = '|'
elif sx - 1 >= 0 and sx < len(map[0]) and map[sy][sx - 1] in east_pipes and map[sy][sx + 1] in west_pipes:
    map[sy][sx] = '-'
elif sy - 1 >= 0 and sx - 1 >= 0 and map[sy - 1][sx] in south_pipes and map[sy][sx - 1] in east_pipes:
    map[sy][sx] = 'J'
elif sy - 1 >= 0 and sx + 1 < len(map[0]) and map[sy - 1][sx] in south_pipes and map[sy][sx + 1] in west_pipes:
    map[sy][sx] = 'L'
elif sy < len(map) and sx + 1 < len(map[0]) and map[sy + 1][sx] in north_pipes and map[sy][sx + 1] in west_pipes:
    map[sy][sx] = 'F'
elif sy < len(map) and sx - 1 >= 0 and map[sy + 1][sx] in north_pipes and map[sy][sx - 1] in east_pipes:
    map[sy][sx] = '7'
else:
    raise Exception("ERROR", sx, sy, map[sy][sx])


def upscale_map(original_map):
    """Upscale the map by 3 times"""

    # Determine the dimensions of the original map
    original_height = len(original_map)
    original_width = len(original_map[0])

    # Calculate the dimensions of the upscaled map
    scaled_height = original_height * 3
    scaled_width = original_width * 3

    # Create an empty upscaled map
    upscaled_map = [[0] * scaled_width for _ in range(scaled_height)]

    # Copy values from the original map to the upscaled map
    for (y, line) in enumerate(map):
        for (x, current) in enumerate(map[y]):
            for yy in range(3):
                for xx in range(3):
                    upscaled_map[y * 3 + yy][x * 3 + xx] = "."

            if current == "|":
                upscaled_map[y * 3 + 0][x * 3 + 1] = "#"
                upscaled_map[y * 3 + 1][x * 3 + 1] = "#"
                upscaled_map[y * 3 + 2][x * 3 + 1] = "#"

            if current == "-":
                upscaled_map[y * 3 + 1][x * 3 + 0] = "#"
                upscaled_map[y * 3 + 1][x * 3 + 1] = "#"
                upscaled_map[y * 3 + 1][x * 3 + 2] = "#"

            if current == "L":
                upscaled_map[y * 3 + 0][x * 3 + 1] = "#"
                upscaled_map[y * 3 + 1][x * 3 + 1] = "#"
                upscaled_map[y * 3 + 1][x * 3 + 2] = "#"

            if current == "J":
                upscaled_map[y * 3 + 0][x * 3 + 1] = "#"
                upscaled_map[y * 3 + 1][x * 3 + 1] = "#"
                upscaled_map[y * 3 + 1][x * 3 + 0] = "#"

            if current == "7":
                upscaled_map[y * 3 + 2][x * 3 + 1] = "#"
                upscaled_map[y * 3 + 1][x * 3 + 1] = "#"
                upscaled_map[y * 3 + 1][x * 3 + 0] = "#"

            if current == "F":
                upscaled_map[y * 3 + 2][x * 3 + 1] = "#"
                upscaled_map[y * 3 + 1][x * 3 + 1] = "#"
                upscaled_map[y * 3 + 1][x * 3 + 2] = "#"

    return upscaled_map


upscaled_map = upscale_map(map)

print("\nUPSCALED MAP")
print_map(upscaled_map)


def bfs(map):
    """BFS from all edges of the map"""
    edge_points = []
    for y in range(len(map)):
        edge_points.append((0, y))
        edge_points.append((len(map[0]) - 1, y))

    for x in range(len(map[0])):
        edge_points.append((x, 0))
        edge_points.append((x, len(map) - 1))

    queue = deque(edge_points)
    visited = set(edge_points)
    directions = [(0, 1), (0, -1), (1, 0), (-1, 0)]

    while queue:
        x, y = queue.popleft()

        for dir in directions:
            dx, dy = dir
            nx, ny = x + dx, y + dy
            if 0 <= ny < len(map) and 0 <= nx < len(map[0]) and map[ny][nx] != "#" and (nx, ny) not in visited:
                queue.append((nx, ny))
                visited.add((nx, ny))

    return visited


upscaled_visited = bfs(upscaled_map)

all_points = set([])
for y in range(len(map)):
    for x in range(len(map[0])):
        all_points.add((x, y))

visited_points = set([])
for x, y in upscaled_visited:
    visited_points.add((x // 3, y // 3))

print("RESULT", len(all_points - visited_points))
