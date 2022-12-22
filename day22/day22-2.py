with open("input.txt") as f:
    input = f.read()

lines = input.split('\n')


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


path = split_path(lines[-1])


def pad_map(map):
    max_len = max([len(line) for line in map])
    for index, line in enumerate(map):
        map[index] = line + " " * (max_len - len(line))
    return map


map = pad_map(lines[:-2])
print("Input map:")
for (y, line) in enumerate(map):
    print(line)

pos = (map[0].index('.'), 0, "right")
print("Input pos:", pos)

rows = len(map)
cols = len(map[0])
side = min(rows, cols) // 3


def get_side_coord(pos):
    (x, y, _) = pos
    return (x // side, y // side)


def get_side_progress(pos):
    (x, y, dir) = pos
    if dir == "left" or dir == "right":
        return y % side
    return x % side


def get_side_edge(pos):
    (x, y, dir) = pos
    if x % side == 0 and dir == "left":
        return "left"
    if x % side == side - 1 and dir == "right":
        return "right"
    if y % side == 0 and dir == "up":
        return "up"
    if y % side == side - 1 and dir == "down":
        return "down"

    raise Exception("Invalid side edge" + str(pos))


def next_pos_raw(pos):
    (x, y, dir) = pos
    match dir:
        case "left": return (x - 1, y, dir)
        case "right": return (x + 1, y, dir)
        case "up": return (x, y - 1, dir)
        case "down": return (x, y + 1, dir)


def is_valid(pos):
    (x, y, _) = pos
    return 0 <= x < cols and 0 <= y < rows and map[y][x] != ' '


# Real
side_coord_map = {
    1: (1, 0),
    2: (2, 0),
    3: (1, 1),
    4: (0, 2),
    5: (1, 2),
    6: (0, 3),
}

# Training
# side_coord_map = {
#     1: (2, 0),
#     2: (0, 1),
#     3: (1, 1),
#     4: (2, 1),
#     5: (2, 2),
#     6: (3, 2),
# }
side_coord_map_rev = {side_coord_map[k]: k for k in side_coord_map}

# Real
edge_map = {
    (1, "up"): (6, "left", False),
    (1, "left"): (4, "left", True),
    (2, "up"): (6, "down", False),
    (2, "down"): (3, "right", False),
    (2, "right"): (5, "right", True),
    (3, "left"): (4, "up", False),
    (5, "down"): (6, "right", False),
}

# Training
# edge_map = {
#     (1, "up"): (2, "up", True),
#     (1, "left"): (3, "up", False),
#     (1, "right"): (6, "right", True),
#     (2, "down"): (5, "down", True),
#     (2, "left"): (6, "down", True),
#     (3, "down"): (5, "left", True),
#     (4, "right"): (6, "up", True),
# }
edge_map_rev = {(v[0], v[1]): (k[0], k[1], v[2]) for k, v in edge_map.items()}


def apply_side_rel_inv(side_rel, inv):
    if inv:
        return side - 1 - side_rel
    return side_rel


inv_dir = {
    "up": "down",
    "down": "up",
    "left": "right",
    "right": "left",
}


def apply_side_progress(side_no, side_edge, side_rel):
    (sx, sy) = side_coord_map[side_no]
    (x, y) = (sx * side, sy * side)
    print("    ApplySideProgress", (sx, sy), (x, y))

    if side_edge == "left":
        return (x, y + side_rel, "right")
    if side_edge == "right":
        return (x + side - 1, y + side_rel, "left")
    if side_edge == "up":
        return (x + side_rel, y, "down")
    if side_edge == "down":
        return (x + side_rel, y + side - 1, "up")


def move(pos):
    print("  Move", pos)
    next = next_pos_raw(pos)
    if is_valid(next):
        print("    Result(Easy)", next)
        return next

    side_coord = get_side_coord(pos)
    print("    SideCoord", side_coord)
    side_no = side_coord_map_rev[side_coord]
    side_edge = get_side_edge(pos)
    side_rel = get_side_progress(pos)
    print("    Side", side_coord, side_no, side_edge, side_rel)

    _pos_val = apply_side_progress(side_no, side_edge, side_rel)
    pos_val = (_pos_val[0], _pos_val[1],  inv_dir[_pos_val[2]])
    assert pos == pos_val, "Invalid pos: " + str(pos) + " != " + str(pos_val)

    dir = pos[2]
    (other_no, other_edge, inv) = edge_map.get(
        (side_no, dir), edge_map_rev.get((side_no, dir)))

    other_rel = apply_side_rel_inv(side_rel, inv)
    print("    Other", other_no, other_edge, inv, other_rel)
    res = apply_side_progress(other_no, other_edge, other_rel)
    print("    Result(Edge)", res)
    return res


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

for index, step in enumerate(path):
    print("Step", index, ":", pos, step)
    if step == 'L':
        pos = (pos[0], pos[1], rotate_left[pos[2]])
        print("  Rotate Left", pos)
    elif step == 'R':
        pos = (pos[0], pos[1], rotate_right[pos[2]])
        print("  Rotate Right", pos)
    else:
        for _ in range(step):
            next = move(pos)
            if map[next[1]][next[0]] == '#':
                continue
            else:
                pos = next


def result(pos):
    dir_points = {
        "up": 3,
        "left": 2,
        "down": 1,
        "right": 0,
    }
    return (pos[1] + 1) * 1000 + (pos[0] + 1) * 4 + dir_points[pos[2]]


print("FinalPos", pos)
print("Final Password", result(pos))
