with open("input.txt") as f:
    input = f.read()

lines = input.split('\n')
height = len(lines)
width = len(lines[0])

entrance = None
exit = None
wall = set()
bliz0 = set()

for (y, line) in enumerate(lines):
    for (x, char) in enumerate(line):
        if char == '#':
            wall.add((x, y))
        if y == 0 and char == '.':
            assert entrance == None, "Multiple entrances"
            entrance = (x, y)
        if y == len(lines) - 1 and char == '.':
            assert exit == None, "Multiple exits"
            exit = (x, y)
        if char == '^':
            bliz0.add((x, y, "N"))
        if char == 'v':
            bliz0.add((x, y, "S"))
        if char == '<':
            bliz0.add((x, y, "W"))
        if char == '>':
            bliz0.add((x, y, "E"))

assert entrance != None, "No entrance"
assert exit != None, "No exit"


def get_blizs(blizs, pos):
    result = []
    for dir in ["N", "S", "W", "E"]:
        if (pos[0], pos[1], dir) in blizs:
            result.append((pos[0], pos[1], dir))
    return result


def print_map(blizs, pos):
    for y in range(len(lines)):
        for x in range(len(lines[y])):
            if (x, y) in wall:
                print("#", end='')
            elif (x, y) == pos:
                print("+", end='')
            else:
                pos_bliz = get_blizs(blizs, (x, y))
                if (len(pos_bliz) > 1):
                    print(len(pos_bliz), end='')
                elif len(pos_bliz) == 1:
                    if pos_bliz[0][2] == "N":
                        print("^", end='')
                    elif pos_bliz[0][2] == "S":
                        print("v", end='')
                    elif pos_bliz[0][2] == "W":
                        print("<", end='')
                    elif pos_bliz[0][2] == "E":
                        print(">", end='')
                    else:
                        raise Exception("Should not happen")
                else:
                    print(".", end='')

        print()


def get_pos(pos, dir):
    # print("      GetPos", pos, dir)
    if dir == "N":
        return (pos[0], pos[1] - 1)
    if dir == "S":
        return (pos[0], pos[1] + 1)
    if dir == "W":
        return (pos[0] - 1, pos[1])
    if dir == "E":
        return (pos[0] + 1, pos[1])
    if dir == "X":
        return (pos[0], pos[1])
    raise Exception("Should not happen")


def move_blizs(blizs):
    new_blizs = set()
    for (x, y, dir) in blizs:
        # print("    MoveBlizs Iter", x, y, dir)
        (nx, ny) = get_pos((x, y), dir)
        new_pos = (nx, ny, dir)
        if ny == 0:
            # print("Blizzard hit top", (nx, ny, dir))
            new_pos = (nx, height - 2, dir)
        elif ny == height - 1:
            # print("Blizzard hit bottom", (nx, ny, dir))
            new_pos = (nx, 1, dir)
        elif new_pos[0] == 0:
            # print("Blizzard hit left", (nx, ny, dir))
            new_pos = (width - 2, ny, dir)
        elif new_pos[0] == width - 1:
            # print("Blizzard hit right", (nx, ny, dir))
            new_pos = (1, ny, dir)

        new_blizs.add(new_pos)
    return new_blizs


bliz_turns = [
    move_blizs(bliz0),
]


# print_map(bliz0, entrance)
# bliz0 = move_blizs(bliz0)
# print_map(bliz0, entrance)
# bliz0 = move_blizs(bliz0)
# print_map(bliz0, entrance)
# bliz0 = move_blizs(bliz0)
# print_map(bliz0, entrance)
# bliz0 = move_blizs(bliz0)
# print_map(bliz0, entrance)
# exit(0)


def bfs(start, end, steps_0):
    print("BFS Start", start, end, steps_0)
    queue = [(start, steps_0)]
    visited = set()
    while len(queue) > 0:
        (pos, steps) = queue.pop(0)
        # print("BFS Item", pos, steps)

        if (pos, steps) in visited:
            # print("    BFS Visited")
            continue
        visited.add((pos, steps))

        if pos == end:
            return steps

        bliz = bliz_turns[steps] if steps < len(bliz_turns) else None
        if bliz == None:
            bliz = move_blizs(bliz_turns[steps - 1])
            bliz_turns.append(bliz)
            # print("Gen Bliz", steps, len(bliz_turns), len(bliz))

        for dir in ["N", "S", "W", "E", "X"]:
            next_pos = get_pos(pos, dir)
            # print("  BFS Walk", next_pos, steps + 1)

            if next_pos[1] < 0 or next_pos[1] >= height:
                # print("    BFS Outside map")
                continue
            if next_pos in wall:
                # print("    BFS Wall")
                continue
            pos_bliz = get_blizs(bliz, next_pos)
            if len(pos_bliz) > 0:
                # print("    BFS Bliz", pos_bliz)
                continue
            queue.append((next_pos, steps + 1))

    return None


result1 = bfs(entrance, exit, 0)
result2 = bfs(exit, entrance, result1)
result3 = bfs(entrance, exit, result2)
print("Result", result3)
