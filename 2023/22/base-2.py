with open("input.txt", "r") as file:
    lines = file.read().strip().split("\n")

bricks = []
for line in lines:
    part1, part2 = line.split("~")
    a_str = part1.split(",")
    b_str = part2.split(",")

    a = (int(a_str[0]), int(a_str[1]), int(a_str[2]))
    b = (int(b_str[0]), int(b_str[1]), int(b_str[2]))

    if (a[2] > b[2]):
        a, b = b, a

    bricks.append((a, b))

max_x = max([max(a[0], b[0]) for a, b in bricks])
max_y = max([max(a[1], b[1]) for a, b in bricks])


def drop_bricks(bricks):
    levels = [[1]*(max_x + 1) for _ in range(max_y+1)]

    result = []
    for a, b in bricks:
        height = b[2] - a[2] + 1

        x1 = min(a[0], b[0])
        x2 = max(a[0], b[0])
        y1 = min(a[1], b[1])
        y2 = max(a[1], b[1])

        bottom = 0
        for y in range(y1, y2 + 1):
            for x in range(x1, x2 + 1):
                bottom = max(bottom, levels[y][x])

        for y in range(y1, y2 + 1):
            for x in range(x1, x2 + 1):
                levels[y][x] = bottom + height

        new_a = (a[0], a[1], bottom)
        new_b = (b[0], b[1], bottom + height - 1)
        result.append((new_a, new_b))

    return result


bricks = sorted(bricks, key=lambda brick: brick[0][2])
bricks = drop_bricks(bricks)

answer = 0
bricks = sorted(bricks, key=lambda brick: brick[0][2])
for i in range(len(bricks)):
    bricks_before = bricks[:i] + bricks[i+1:]
    bricks_after = drop_bricks(bricks_before)

    diff = 0
    for i, brick in enumerate(bricks_before):
        if brick != bricks_after[i]:
            diff += 1
    # print("  FALLING", diff)
    answer += diff

print("ANSWER", answer)
