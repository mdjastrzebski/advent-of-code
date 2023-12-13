from math import floor
import re

file_path = "input-1.txt"

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
    print(name, "DOUBLES:", doubles)

    for d in doubles:
        if all([nums[d-i] == nums[d+i+1] for i in range(min(d, len(nums) - d - 2) + 1)]):
            print("  SOLUTION:", d+1)
            return d+1

    print("  NO SOLUTION")
    return 0


result = 0
for map_str in maps:
    (rows, cols, points, lines) = parse_map(map_str)
    print_map(lines)
    print("ROWS:", rows)
    print("COLS:", cols)
    row_sol = solve_list(rows, 'ROWS')
    col_sol = solve_list(cols, 'COLS')
    sol = 100*row_sol + col_sol
    print("SOLUTION:", sol)
    result += sol

print("RESULT:", result)
