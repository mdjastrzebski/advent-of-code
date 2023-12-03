import re

with open("input.txt") as f:
    input = f.read()

lines = input.split('\n')


def find_numbers_with_regex():
    # Use regex to find all numbers and their start and end coordinates
    number_pattern = re.compile(r'\d+')
    numbers = []
    for y, row in enumerate(lines):
        for match in number_pattern.finditer(row):
            number = int(match.group())
            start_x = match.start()
            end_x = match.end() - 1  # Subtract 1 because end() returns one past the last match
            numbers.append(((y, start_x, end_x), number))
    return numbers


def find_symbols():
    # Extract coordinates of all symbols
    symbols = []
    for y, row in enumerate(lines):
        for x, ch in enumerate(row):
            if ch not in '0123456789.':
                symbols.append((y, x))
    return symbols


def is_adjacent(number_coords, symbol_coord):
    # Check if a number is adjacent (including diagonally) to a symbol
    ny, start_x, end_x = number_coords
    sy, sx = symbol_coord
    return abs(ny - sy) <= 1 and start_x - 1 <= sx <= end_x + 1


numbers = find_numbers_with_regex()
symbols = find_symbols()
result = 0

for number_coords, number in numbers:
    is_matching = False
    for symbol_coord in symbols:
        if is_adjacent(number_coords, symbol_coord):
            print("MATCHING PART", number, number_coords, symbol_coord)
            result += number
            is_matching = True
            break
    if not is_matching:
        print("X NUMBER", number, number_coords)


print("RESULT", result)
