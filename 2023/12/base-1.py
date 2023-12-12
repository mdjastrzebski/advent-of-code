from math import floor
import re

file_path = "input.txt"

with open(file_path, "r") as file:
    lines = file.read().split('\n')


def parse_line(line):
    map_str, num_str = line.split(' ')
    nums = [int(n) for n in num_str.split(',')]

    return (map_str, nums)


def parse_segment(map_str, type):
    count = 0
    while count < len(map_str) and map_str[count] == type:
        count += 1

    return count


def peak_next(map_str):
    return map_str[0] if len(map_str) > 0 else None


def solve_line_rec(map_str, nums, broken, depth):
    # print("  "*depth, "SOLVE", map_str, nums, broken)
    if (len(nums) == 0):
        return 1 if broken == 0 and '#' not in map_str else 0

    if broken > nums[0]:
        # print("  "*depth, "  TOO MUCH BROKEN", broken, ">", nums[0])
        return 0

    if broken == 0:
        empty = parse_segment(map_str, '.')
        map_str = map_str[empty:]

        next = peak_next(map_str)
        if next == None:
            return 1 if len(nums) == 0 else 0

        broken = parse_segment(map_str, '#')
        if broken > 0:
            # print("  "*depth, "  CASE N#")
            return solve_line_rec(map_str[broken:], nums, broken, depth+1)

        assert next == '?'
        # print("  "*depth, "  CASE N? => .")
        result_empty = solve_line_rec(map_str[1:], nums, 0, depth+1)

        # print("  "*depth, "  CASE N? => #")
        result_broken = solve_line_rec(map_str[1:], nums, 1, depth+1)
        return result_empty + result_broken

    assert broken > 0
    next = peak_next(map_str)
    if next == None:
        return 1 if len(nums) == 1 and nums[0] == broken else 0

    if next == '.':
        # print("  "*depth, "  CASE B.")
        if len(nums) == 0 or nums[0] != broken:
            return 0
        return solve_line_rec(map_str[1:], nums[1:], 0, depth+1)

    if next == '#':
        more_broken = parse_segment(map_str, '#')
        return solve_line_rec(map_str[more_broken:], nums, broken + more_broken, depth+1)

    assert next == '?'
    # Case 1: pick empty
    # print("  "*depth, "  CASE B? => .")
    if len(nums) == 0 or nums[0] != broken:
        return_empty = 0
    else:
        return_empty = solve_line_rec(map_str[1:], nums[1:], 0, depth+1)

    # Case 2: pick broken
    # print("  "*depth, "  CASE B? => #")
    return_broken = solve_line_rec(map_str[1:], nums, broken + 1, depth+1)

    return return_empty + return_broken


result = 0
for line in lines:
    # line = lines[5]
    map_str, nums = parse_line(line)
    solution = solve_line_rec(map_str, nums, 0, 0)
    result += solution
    print(map_str, nums, "=>", solution)

print("RESULT", result)
