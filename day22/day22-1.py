with open("input.txt") as f:
    input = f.read()


def pad_map(map):
    max_len = max([len(line) for line in map])
    for index, line in enumerate(map):
        map[index] = line + " " * (max_len - len(line))
    return map


def split_path(path):
    result = []
    num = 0
    for char in path:
        if char == 'L' or char == 'R':
            result.append(num)
            result.append(char)
            num = 0
        else:
            num = num * 10 + int(char)
    result.append(num)
    return result


lines = input.split('\n')
map = pad_map(lines[:-2])
path = split_path(lines[-1])
pos = (map[0].index('.'), 0, "right")

for (y, line) in enumerate(map):
    print(line.replace(' ', '*'))


def opposite_up(pos):
    x = pos[0]
    y = pos[1]

    print("    OppositeUp A", x, y)

    while True:
        y -= 1
        if (y < 0):
            y = len(map) - 1
        if (map[y][x]) == '#':
            return pos
        if (map[y][x] == '.'):
            return (x, y, pos[2])


def opposite_down(pos):
    x = pos[0]
    y = pos[1]

    print("    OppositeDown A", x, y)

    while True:
        y += 1
        print("    OppositeDown B", x, y)
        if (y >= len(map)):
            y = 0
        print("    OppositeDown C", x, y)
        if (map[y][x]) == '#':
            print("    OppositeDown R#", x, y)
            return pos
        if (map[y][x] == '.'):
            print("    OppositeDown R.", x, y)
            return (x, y, pos[2])


def opposite_left(pos):
    x = pos[0]
    y = pos[1]

    print("    OppositeLeft A", x, y)

    while True:
        x -= 1
        if (x < 0):
            x = len(map[y]) - 1
        if (map[y][x]) == '#':
            return pos
        if (map[y][x] == '.'):
            return (x, y, pos[2])


def opposite_right(pos):
    x = pos[0]
    y = pos[1]
    print("    OppositeRight B", x, y)

    while True:
        x += 1
        print("    OppositeRight C", x, y)
        if (x >= len(map[y])):
            x = 0

        print("    OppositeRight CA", x, y)
        if (map[y][x]) == '#':
            print("    OppositeRight C#", x, y)
            return pos
        if (map[y][x] == '.'):
            print("    OppositeRight C.", x, y)
            return (x, y, pos[2])
    print("XXX", x, y, map[y][x])
    assert False, "Should not happen"


def move_up(pos):
    x = pos[0]
    y = pos[1]
    print("  MoveUp", x, y)
    if (y <= 0 or map[y - 1][x] == ' '):
        return opposite_up(pos)
    if map[y - 1][pos[0]] == '#':
        return pos
    return (x, y - 1, pos[2])


def move_down(pos):
    x = pos[0]
    y = pos[1]
    print("  MoveDownX", x, y)
    if (y >= len(map) - 1 or map[y + 1][x] == ' '):
        return opposite_down(pos)
    if map[y + 1][pos[0]] == '#':
        return pos
    return (x, y + 1, pos[2])


def move_left(pos):
    x = pos[0]
    y = pos[1]
    print("  MoveLeft", x, y)
    if (x <= 0 or map[y][x - 1] == ' '):
        return opposite_left(pos)
    if map[y][x - 1] == '#':
        return pos
    return (x - 1, y, pos[2])


def move_right(pos):
    x = pos[0]
    y = pos[1]
    print("  MoveRight", x, y)
    if (x >= len(map[y]) - 1 or map[y][x + 1] == ' '):
        print("  MoveRight: Opposite", x, y)
        return opposite_right(pos)
    if map[y][x + 1] == '#':
        print("  MoveRight: Wall", x, y)
        return pos
    return (x + 1, y, pos[2])


dir_points = {
    "up": 3,
    "left": 2,
    "down": 1,
    "right": 0,
}


def result(pos):
    return (pos[1] + 1) * 1000 + (pos[0] + 1) * 4 + dir_points[pos[2]]


rotate_left = {
    "up": "left",
    "left": "down",
    "down": "right",
    "right": "up",
}

rotate_right = {
    "up": "right",
    "right": "down",
    "down": "left",
    "left": "up",
}

# pos = (2, 198, "down")
# print("Test", pos, move_down(pos), move_down(move_down(pos)))
# exit(0)

# pos = (0, 5, "left")
# print("Test", pos, move_left(pos), pos)

# pos = (11, 1, "right")
# print("Test", pos, move_right(pos), move_right(pos))

# pos = (13, 8, "up")
# print("Test", pos, move_up(pos), move_up(move_up(pos)))

# print("Map:", map, path, split_path(path))
# print("Path:", path)
# print("StarPos:", pos, map[pos[1]][pos[0]])

for index, step in enumerate(path):
    print("Step", index, ":", step, pos)
    if step == 'L':
        pos = (pos[0], pos[1], rotate_left[pos[2]])
    elif step == 'R':
        pos = (pos[0], pos[1], rotate_right[pos[2]])
    else:
        if pos[2] == "up":
            for _ in range(step):
                pos = move_up(pos)
        elif pos[2] == "down":
            for _ in range(step):
                pos = move_down(pos)
        elif pos[2] == "left":
            for _ in range(step):
                pos = move_left(pos)
        elif pos[2] == "right":
            for i in range(step):
                print("  MoveRight step", i, ":", pos)
                pos = move_right(pos)
        else:
            assert False, "Unknown direction"

print("FinalPos", pos)
print("Final Password", result(pos))
