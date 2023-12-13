from math import floor
import re

file_path = "input.txt"

with open(file_path, "r") as file:
    maps = file.read().split('\n\n')


def parse_map(map):
    lines = map.split('\n')

    points = []
    for y in range(len(lines)):
        for x in range(len(lines[y])):
            if lines[y][x] == '#':
                points.append((x, y))

    rows = []
    for y in range(len(lines)):
        indexes = [x for x in range(len(lines[y])) if lines[y][x] == '#']
        rows.append(encode_bits(indexes))

    cols = []
    for x in range(len(lines[0])):
        indexes = [y for y in range(len(lines)) if lines[y][x] == '#']
        cols.append(encode_bits(indexes))

    return (rows, cols, points, lines)


def print_map(lines):
    print("\nMAP:")
    print('\n'.join(lines))


def encode_bits(bits):
    return sum([2**index for index in bits])


def solve_list(nums, name):
    doubles = [i for i in range(len(nums) - 1) if nums[i] == nums[i+1]]
    print(" ", name, "DOUBLES:", doubles)

    result = []
    for d in doubles:
        if all([nums[d-i] == nums[d+i+1] for i in range(min(d, len(nums) - d - 2) + 1)]):
            print("    SOLUTION:", d+1)
            result.append(d+1)

    return result


def solve_map(rows, cols):
    print("  ROWS:", rows)
    print("  COLS:", cols)
    row_res = solve_list(rows, 'ROWS')
    col_res = solve_list(cols, 'COLS')
    return (row_res, col_res)


def solve_map_with_smudge(rows, cols):
    base_sol_rows, base_sol_cols = solve_map(rows, cols)
    print("BASE SOL:", base_sol_rows, base_sol_cols)

    for y in range(len(rows)):
        for x in range(len(cols)):
            #print("SMUDGE:", x, y)
            rows_mod = rows[:y] + [rows[y] ^ (1 << x)] + rows[y+1:]
            cols_mod = cols[:x] + [cols[x] ^ (1 << y)] + cols[x+1:]
            sol_rows, sol_cols = solve_map(rows_mod, cols_mod)
            sol_rows = list(set(sol_rows) - set(base_sol_rows))
            sol_cols = list(set(sol_cols) - set(base_sol_cols))
            if not sol_rows and not sol_cols:
                continue
            return sol_rows[0] if sol_rows else 0, sol_cols[0] if sol_cols else 0
        
    return 0, 0


result = 0
for map_str in maps:
    (rows, cols, points, lines) = parse_map(map_str)
    print_map(lines)

    row_sol, col_sol = solve_map_with_smudge(rows, cols)
    sol = 100*row_sol + col_sol
    print("SOLUTION:", sol)
    result += sol

print("RESULT:", result)
