import re


with open("input.txt") as f:
    input = f.read()

lines = input.split('\n')


def get_number_matches(line):
    """ Get the numbers and their positions in a text. """
    return re.finditer(r'\d+', line)


def has_adjacent_symbols(lines, row, start, end):
    """ Check if row range has an adjacent non-dot symbol, horizontally, vertically, or diagonally. """
    print("CALL has_adjacent_symbols", row, start, end)
    min = start - 1 if start > 0 else start
    max = end + 1 if end < len(lines[row]) - 1 else end

    for i in range(min, max):
        print("  CHECK", row, i, min, max)
        item_this = lines[row][i]
        if is_engine_part(item_this):
            return True

        item_up = lines[row - 1][i] if row > 0 else '.'
        if is_engine_part(item_up):
            return True

        item_down = lines[row + 1][i] if row < len(lines) - 1 else '.'
        if is_engine_part(item_down):
            return True

    return False


def is_engine_part(item):
    """ Check if an item is an engine part. """
    return item != '.' and not item.isdigit()


result = 0
for row, line in enumerate(lines):
    print("LINE", line)
    matches = get_number_matches(line)
    for match in matches:
        print("  NUMBER", match.group(), match.start(),  match.end())
        if has_adjacent_symbols(lines, row, match.start(), match.end()):
            print("    MATCH", match.group())
            result += int(match.group())

print("RESULT", result)
