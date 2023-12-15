file_path = "input.txt"

with open(file_path, "r") as file:
    map = file.read().split('\n')


def parse_map(map):
    static_cols = [[] for i in range(len(map[0]))]
    static_rows = [[] for i in range(len(map))]

    moving_cols = [[] for i in range(len(map[0]))]

    for y, line in enumerate(map):
        for x, char in enumerate(line):
            if char == 'O':
                moving_cols[x].append(y)
            elif char == '#':
                static_cols[x].append(y)
                static_rows[y].append(x)
    return (static_cols, static_rows, moving_cols)


def move_rocks_north(moving_cols, static_cols, length):
    moved_cols = [[] for _ in range(len(map[0]))]
    for x, static in enumerate(static_cols):
        # print("INDEX:", x, static, moving_rocks[x])
        end = length
        for start in [*reversed(static), -1]:
            count = len([my for my in moving_cols[x] if start < my < end])
            for i in range(count):
                moved_cols[x].append(start + i + 1)
            end = start
        moved_cols[x] = sorted(moved_cols[x])
        # print("  OUTPUT:", moved_cols[x])

    return moved_cols


def move_rocks_south(moving_cols, static_cols, length):
    moved_cols = [[] for _ in range(len(map[0]))]
    for x, static in enumerate(static_cols):
        # print("INDEX:", x, static, moving_cols[x])
        end = -1
        for start in [*static, length]:
            count = len([my for my in moving_cols[x] if end < my < start])
            for i in range(count):
                moved_cols[x].append(start - i - 1)
            end = start
        moved_cols[x] = sorted(moved_cols[x], reverse=True)
        # print("  OUTPUT:", moved_cols[x])

    return moved_cols


def move_rocks_west(moving_rows, static_rows, length):
    moved_rows = [[] for _ in range(len(map[0]))]
    for y, static in enumerate(static_rows):
        # print("INDEX:", x, static, moving_rocks[x])
        end = length
        for start in [*reversed(static), -1]:
            count = len([mx for mx in moving_rows[y] if start < mx < end])
            for i in range(count):
                moved_rows[y].append(start + i + 1)
            end = start
        moved_rows[y] = sorted(moved_rows[y])

    return moved_rows


def move_rocks_east(moving_rows, static_rows, length):
    moved_rows = [[] for _ in range(len(map[0]))]
    for y, static in enumerate(static_rows):
        # print("INDEX:", x, static, moving_rocks[x])
        end = -1
        for start in [*static, length]:
            count = len([mx for mx in moving_rows[y] if end < mx < start])
            for i in range(count):
                moved_rows[y].append(start - i - 1)
            end = start
        moved_rows[y] = sorted(moved_rows[y], reverse=True)
        # print("  OUTPUT:", moved_cols[x])

    return moved_rows


def cols_to_rows(cols, rows_count):
    rows = [[] for _ in range(rows_count)]
    for x, col in enumerate(cols):
        for y in col:
            # print("COLS TO ROWS:", x, y)
            rows[y].append(x)
    return rows


def rows_to_cols(rows, cols_count):
    cols = [[] for _ in range(cols_count)]
    for y, row in enumerate(rows):
        for x in row:
            cols[x].append(y)
    return cols


def score_column(rocks, length):
    score = 0
    for rock in rocks:
        score += (length - rock)
    return score


print("MAP SIZE:", "ROWS: ", len(map), "COLS:", len(map[0]))
static_cols, static_rows, moving_cols = parse_map(map)


def move_cycle(moving_cols_0):
    moving_cols_1 = move_rocks_north(moving_cols_0, static_cols, len(map))
    # print("COLS 1:", sum([len(i) for i in moving_cols_1]), moving_cols_1)
    moving_rows_1 = cols_to_rows(moving_cols_1, len(map))
    # print("ROWS 1:", sum([len(i) for i in moving_rows_1]), moving_rows_1)
    moving_rows_2 = move_rocks_west(moving_rows_1, static_rows, len(map[0]))
    # print("ROWS 2:", sum([len(i) for i in moving_rows_2]), moving_rows_2)
    moving_cols_2 = rows_to_cols(moving_rows_2, len(map[0]))
    # print("COLS 2:", sum([len(i) for i in moving_cols_2]), moving_cols_2)
    moving_cols_3 = move_rocks_south(moving_cols_2, static_cols, len(map))
    # print("COLS 3:", sum([len(i) for i in moving_cols_3]), moving_cols_3)
    moving_rows_3 = cols_to_rows(moving_cols_3, len(map))
    # print("ROWS 3:", sum([len(i) for i in moving_rows_3]), moving_rows_3)
    moving_rows_4 = move_rocks_east(moving_rows_3, static_rows, len(map[0]))
    # print("ROWS 4:", sum([len(i) for i in moving_rows_4]), moving_rows_4)
    moving_cols_4 = rows_to_cols(moving_rows_4, len(map[0]))
    # print("COLS 4:", sum([len(i) for i in moving_cols_4]), moving_cols_4)
    return moving_cols_4


def to_tuple(cols):
    return tuple([tuple(col) for col in cols])


visited = {}
current_cols = to_tuple(moving_cols)
i = 0
lim = 1_000_000_000

while i < lim:
    if (i % 1_000_000) == 0:
        print("ITER:", i // 1_000_000)

    current_cols = move_cycle(current_cols)
    current_cols_tuple = to_tuple(current_cols)
    # print("COLS X:", sum([len(i) for i in current_cols]), current_cols)

    last_visit = visited.get(current_cols_tuple)

    if last_visit != None:
        cycle_length = i - last_visit
        # print("CYCLE AT:", i, "LEN", cycle_length)

        cycle_forward = (1_000_000_000 - i) // cycle_length
        i += cycle_forward * cycle_length

    visited[current_cols_tuple] = i
    i += 1


result = 0
for column in current_cols:
    result += score_column(column, len(map[0]))

print("RESULT:", result)
