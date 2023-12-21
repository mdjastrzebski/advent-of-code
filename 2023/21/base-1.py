from collections import deque

with open("input.txt", "r") as file:
    map = file.read().strip().split("\n")

start = None
rocks = set([])
gardens = set([])
for y, row in enumerate(map):
    for x, char in enumerate(row):
        if char == "S":
            start = (x, y)
        elif char == "#":
            rocks.add((x, y))
        elif char == ".":
            gardens.add((x, y))

print("START", start)


def bfs(start, gardens):
    distances = {}
    queue = deque()
    queue.append((start, 0))
    directions = [(0, 1), (1, 0), (0, -1), (-1, 0)]  # right, down, left, up

    while queue:
        pos, distance = queue.popleft()
        print("BFS", pos, distance)
        x, y = pos

        if (x, y) not in distances:
            distances[(x, y)] = distance
            for dx, dy in directions:
                new_x, new_y = x + dx, y + dy
                if (new_x, new_y) not in distances and (new_x, new_y) in gardens:
                    queue.append(((new_x, new_y), distance + 1))

    return distances


distances = bfs(start, gardens)
print("DISTANCES", distances)

target = 64
answer = 0
for distance in distances.values():
    if distance <= target and (distance - target) % 2 == 0:
        answer += 1

print("ANSWER", answer)
