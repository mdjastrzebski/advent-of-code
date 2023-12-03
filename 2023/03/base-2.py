import re


with open("input.txt") as f:
    input = f.read()

lines = input.split('\n')


def extract_number_locations(lines):
    """ Extract the locations of the numbers in all lines. """
    result = []
    for row, line in enumerate(lines):
        matches = re.finditer(r'\d+', line)
        for match in matches:
            result.append((match.group(), row, match.start(), match.end()))

    return result


def extract_gear_locations(lines):
    """ Extract the locations of the gears in all lines. """
    result = []
    for row, line in enumerate(lines):
        columns = [match.start() for match in re.finditer(r'\*', line)]
        for column in columns:
            result.append((row, column))

    return result


def is_number_adjacent_to_gear(number, gear):
    """ Check if a number is adjacent to a gear. """
    number_row = number[1]
    number_start = number[2]
    number_end = number[3]
    gear_row = gear[0]
    gear_start = gear[1]

    return gear_row >= number_row - 1 and gear_row <= number_row + 1 and gear_start >= number_start - 1 and gear_start <= number_end


gears = extract_gear_locations(lines)
numbers = extract_number_locations(lines)

result = 0
for gear in gears:
    print("GEAR", gear)

    matching_numbers = []

    for number in numbers:
        if is_number_adjacent_to_gear(number, gear):
            matching_numbers.append(number)
            print("  MATCHING NUMBER", number)

    if len(matching_numbers) == 2:
        result += int(matching_numbers[0][0]) * int(matching_numbers[1][0])

print("RESULT", result)
