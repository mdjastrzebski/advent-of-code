from collections import deque
import numpy as np

with open("input.txt", "r") as file:
    map = file.read().strip().split("\n")

map_width = len(map[0])
map_height = len(map)
print("MAP SIZE", map_width, map_height)

start = None
rocks = set([])
gardens = set([])
for y, row in enumerate(map):
    for x, char in enumerate(row):
        if char == "S":
            start = (x, y)
        if char == "#":
            rocks.add((x, y))
        else:
            gardens.add((x, y))

print("START", start)


def is_garden(x, y):
    global map_width, map_height, gardens
    return (x % map_width, y % map_height) in gardens


def bfs(start, steps):
    odd_count = 0
    even_count = 0

    data_points = [None]*steps

    queue = deque()
    queue.append((start, 0))
    visited = set(start)
    directions = [(0, 1), (1, 0), (0, -1), (-1, 0)]  # right, down, left, up

    last_distance = 0

    while queue:
        pos, distance = queue.popleft()
        x, y = pos
        # print("BFS", pos, distance)

        if distance > steps:
            break

        if distance > last_distance:
            if last_distance % 131 == 65:
                print(f"{last_distance}\t{even_count}\t{odd_count}")
            data_points[last_distance] = (even_count, odd_count)
            last_distance = distance

        if distance % 2 == 0:
            even_count += 1
        else:
            odd_count += 1

        visited.add(pos)

        for dx, dy in directions:
            next_pos = (x + dx, y + dy)
            if is_garden(next_pos[0], next_pos[1]) and next_pos not in visited:
                queue.append((next_pos, distance + 1))
                visited.add(next_pos)

    return data_points


input = 26501365
cycle = 131
mod = input % cycle
x_n = (input - mod) // cycle
print("MOD", mod, "X_n", x_n)

steps = 1_000
data_points = bfs(start, steps)

print("DATA POINTS", data_points)

y1 = data_points[65][1]
y2 = data_points[65 + 1*131][0]
y3 = data_points[65 + 2*131][1]
print("Y", y1, y2, y3)

answer = y1 + x_n * (y2 - y1 + (x_n - 1) * (y3 - 2*y2 + y1) // 2)
print("ANSWER", answer)
