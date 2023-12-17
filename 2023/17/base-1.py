import heapq

with open('input.txt', 'r') as file:
    map = file.read().strip().split('\n')

opposite = {
    "": "",
    "right": "left",
    "left": "right",
    "up": "down",
    "down": "up"
}


def dijkstra(map, start, end):
    start_x = (start[0], start[1], "")
    queue = [(0, start_x)]
    distances = {start_x: 0}
    paths = {start_x: []}

    while queue:
        (distance, current) = heapq.heappop(queue)
        (x, y, dir) = current

        for dx, dy, n_dir in [(1, 0, "right"), (-1, 0, "left"), (0, 1, "down"), (0, -1, "up")]:
            for m in range(1, 4):
                nx, ny = x + m*dx, y + m*dy
                next = (nx, ny, n_dir)

                if 0 <= nx < len(map[0]) and 0 <= ny < len(map) and dir != n_dir and opposite[dir] != n_dir:
                    move_distance = 0
                    for i in range(1, m+1):
                        move_distance += int(map[y + i*dy][x + i*dx])
                    new_distance = distance + move_distance

                    if next not in distances or new_distance < distances[next]:
                        distances[next] = new_distance
                        paths[next] = paths[current] + [next]
                        heapq.heappush(queue, (new_distance, next))

    end_distances = [(v, k) for k, v in distances.items()
                     if k[0] == end[0] and k[1] == end[1]]

    end_distance = min(end_distances)
    return end_distance[0], paths[end_distance[1]]


result, paths = dijkstra(map, (0, 0), (len(map[0]) - 1, len(map) - 1))
print("RESULT", result)
