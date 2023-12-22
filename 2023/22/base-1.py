with open("input.txt", "r") as file:
    lines = file.read().strip().split("\n")

bricks = []
for line in lines:
    part1, part2 = line.split("~")
    c1_str = part1.split(",")
    c2_str = part2.split(",")

    c1 = (int(c1_str[0]), int(c1_str[1]), int(c1_str[2]))
    c2 = (int(c2_str[0]), int(c2_str[1]), int(c2_str[2]))

    if (c1[2] > c2[2]):
        c1, c2 = c2, c1

    bricks.append((c1, c2))

max_x = max([max(b1[0], b2[0]) for b1, b2 in bricks])
max_y = max([max(b1[1], b2[1]) for b1, b2 in bricks])


def drop_bricks(bricks):
    levels = [[0]*(max_x + 1) for _ in range(max_y+1)]
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

    return sorted(result, key=lambda x: x[0][2])


bricks = sorted(bricks, key=lambda x: x[0][2])
bricks = drop_bricks(bricks)

answer = 0
bricks = sorted(bricks, key=lambda x: x[0][2])
for i in range(len(bricks)):
    bricks_before = bricks[:i] + bricks[i+1:]
    bricks_after = drop_bricks(bricks_before)

    if bricks_before == bricks_after:
        answer += 1

print("ANSWER", answer)
