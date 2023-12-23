
from collections import deque, namedtuple
import sys

sys.setrecursionlimit(100_000)

Point = namedtuple('Point', ['x', 'y'])

with open('input.txt', "r") as file:
    map = file.read().strip().split('\n')

map_width, map_height = len(map[0]), len(map)

entrance = Point(map[0].index('.'), 0)
exit = Point(map[-1].index('.'), len(map) - 1)

# print("ENTRANCE", entrance, "EXIT", exit)

dirs = [Point(1, 0), Point(0, 1), Point(-1, 0), Point(0, -1)]


def adjacent(map, pos):
    result = []
    for d in dirs:
        nx, ny = pos.x + d.x, pos.y + d.y
        if nx in range(map_width) and ny in range(map_height) and map[ny][nx] != '#':
            result.append(Point(nx, ny))

    return result


graph = {entrance: dict(), exit: {}}
vertices = set([entrance, exit])

for y, row in enumerate(map):
    for x, char in enumerate(row):
        pos = Point(x, y)
        if char != '#' and len(adjacent(map, pos)) > 2:
            graph[pos] = dict()
            vertices.add(pos)


def bfs_nearest_vertices(map, vertices, start):
    queue = deque([(start, 0)])
    visited = set()

    while queue:
        pos, dist = queue.popleft()
        # print("  BFS", pos, dist)

        if pos in visited:
            continue

        if pos != start and pos in vertices:
            # print("    FOUND", pos, dist)
            if pos in graph[start]:
                graph[start][pos] = max(graph[start][pos], dist)
            else:
                graph[start][pos] = dist
            continue

        visited.add(pos)
        for next in adjacent(map, pos):
            if next not in visited:
                # print("    APPENDING", next, dist+1)
                queue.append((next, dist + 1))


for v in vertices:
    # print("VERTEX", v)
    bfs_nearest_vertices(map, vertices, v)

print("GRAPH")
for v in graph:
    print(v, ": ", graph[v])


def dfs(graph, start, end):
    return dfs_rec(graph, start, end, set(start), 0)


def dfs_rec(graph, current, end, visited, current_dist):
    if end == current:
        return current_dist

    max_dist = 0
    for next in graph[current]:
        if next not in visited:
            next_visited = visited.copy()
            next_visited.add(next)
            next_dist = current_dist + graph[current][next]

            result_dist = dfs_rec(graph, next, end, next_visited, next_dist)
            max_dist = max(max_dist, result_dist)

    return max_dist


answer = dfs(graph, entrance, exit)
print("ANSWER", answer)
