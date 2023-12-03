import re


with open("input.txt") as f:
    input = f.read()

lines = input.split('\n')


def sum_gear_ratios(schematic):
    def find_numbers_with_regex():
        # Use regex to find all numbers and their start and end coordinates
        number_pattern = re.compile(r'\d+')
        numbers = []
        for x, row in enumerate(schematic):
            for match in number_pattern.finditer(row):
                number = int(match.group())
                start_y = match.start()
                end_y = match.end() - 1
                numbers.append(((x, start_y, end_y), number))
        return numbers

    def find_gears():
        # Extract coordinates of all gears (* symbols)
        gears = []
        for x, row in enumerate(schematic):
            for y, ch in enumerate(row):
                if ch == '*':
                    gears.append((x, y))
        return gears

    def is_adjacent(number_coords, gear_coord):
        # Check if a number is adjacent (including diagonally) to a gear
        nx, start_y, end_y = number_coords
        gx, gy = gear_coord
        return abs(nx - gx) <= 1 and (start_y - 1 <= gy <= end_y + 1)

    numbers = find_numbers_with_regex()
    gears = find_gears()
    gear_ratios = []

    for gear_coord in gears:
        adjacent_numbers = []
        for number_coords, number in numbers:
            if is_adjacent(number_coords, gear_coord):
                adjacent_numbers.append(number)
                if len(adjacent_numbers) > 2:  # Break early if more than 2 numbers are adjacent
                    break

        if len(adjacent_numbers) == 2:
            gear_ratio = adjacent_numbers[0] * adjacent_numbers[1]
            gear_ratios.append(gear_ratio)

    return sum(gear_ratios)


# Calculating the sum of gear ratios in the example schematic
result = sum_gear_ratios(lines)
print("RESULT", result)
