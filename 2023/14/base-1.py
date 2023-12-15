file_path = "input.txt"

with open(file_path, "r") as file:
    map = file.read().split('\n')


def parse_map(map):
    moving_rocks = [[] for i in range(len(map[0]))]
    static_rocks = [[] for i in range(len(map[0]))]

    for y, line in enumerate(map):
        for x, char in enumerate(line):
            if char == 'O':
                moving_rocks[x].append(y)
            elif char == '#':
                static_rocks[x].append(y)
    return (moving_rocks, static_rocks)


def move_rocks(moving_rocks, static_rocks):
    moved_rocks = [[] for i in range(len(map[0]))]
    for x, static in enumerate(static_rocks):
        # print("INDEX:", x, static, moving_rocks[x])
        last_y = 10000000000
        for sy in [*reversed(static), -1]:
            # print("  SY:", sy, last_y)
            in_sector = len(
                [my for my in moving_rocks[x] if sy < my < last_y])
            for i in range(in_sector):
                moved_rocks[x].append(sy + i + 1)
            last_y = sy
        moved_rocks[x] = sorted(moved_rocks[x])
        # print("  OUTPUT:", moved_rocks[x])

    return moved_rocks


def score_column(rocks, length):
    score = 0
    for rock in rocks:
        score += (length - rock)
    return score


moving_rocks, static_rocks = parse_map(map)
moved_rocks = move_rocks(moving_rocks, static_rocks)
# print("ROCKS:", moved_rocks)

result = 0
for column in moved_rocks:
    result += score_column(column, len(map[0]))

print("RESULT:", result)
