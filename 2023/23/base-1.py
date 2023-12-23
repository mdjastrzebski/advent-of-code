
import sys

sys.setrecursionlimit(100_000)

with open('input.txt', "r") as file:
    map = file.read().strip().split('\n')

entrance = (map[0].index('.'), 0)
exit = (map[-1].index('.'), len(map) - 1)

print("ENTRACE", entrance, "EXIT", exit)


def dfs(map, start, end):
    return dfs_rec(map, start, end, set(start), [start])


def dfs_rec(map, current, end, visited, path):
    directions = [(1, 0), (0, 1), (-1, 0), (0, -1)]  # right, down, left, up

    # print("DFS", current, end, visited, path)
    if end == current:
        print("  END", len(path))
        return path

    max_paths = []
    for dir in directions:
        next_x, next_y = current[0] + dir[0], current[1] + dir[1]
        next = (next_x, next_y)

        next_char = map[next_y][next_x]
        can_go = next_char == '.' \
            or (next_char == '>' and dir == (1, 0)) \
            or (next_char == '<' and dir == (-1, 0)) \
            or (next_char == '^' and dir == (0, -1)) \
            or (next_char == 'v' and dir == (0, 1))

        # print("  NEXT", next, next_char, can_go, next not in visited)

        if can_go and next not in visited:
            next_visited = visited.copy()
            next_visited.add(next)
            next_path = path.copy()
            next_path.append(next)

            max_path = dfs_rec(map, next, end, next_visited, next_path)
            if max_path is not None:
                max_paths.append(max_path)

    # print("  MAX PATHS", max_paths)

    if len(max_paths) == 0:
        # print("  DEAD END", path)
        return None

    return max(max_paths, key=lambda x: len(x))


answer = dfs(map, entrance, exit)
print("ANSWER", len(answer) - 1)
