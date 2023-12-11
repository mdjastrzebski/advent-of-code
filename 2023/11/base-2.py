from math import floor

file_path = "input.txt"

with open(file_path, "r") as file:
    lines = file.read().split('\n')

# Read cities
cities = []
for y, line in enumerate(lines):
    for x, char in enumerate(line):
        if char == '#':
            cities.append((x, y))

print("\nCITIES", cities)

# Find empty rows and cols
empty_rows = sorted(set(range(len(lines))) -
                    set([y for _, y in cities]), reverse=True)
empty_cols = sorted(
    set(range(len(lines[0]))) - set([x for x, _ in cities]), reverse=True)

print("\nEMPTY ROWS", empty_rows)
print("EMPTY COLS", empty_cols)

expansion_factor = 1_000_000


def distance(a, b):
    matching_empty_rows = [
        empty_row for empty_row in empty_rows if empty_row > min(a[1], b[1]) and empty_row < max(a[1], b[1])]
    matching_empty_cols = [
        empty_col for empty_col in empty_cols if empty_col > min(a[0], b[0]) and empty_col < max(a[0], b[0])]

    return abs(a[0] - b[0]) + abs(a[1] - b[1]) + (expansion_factor - 1)*len(matching_empty_rows) + (expansion_factor-1)*len(matching_empty_cols)


result = 0
for i, city in enumerate(cities):
    for j, other_city in enumerate(cities):
        if i != j:
            result += distance(city, other_city)

print("\nRESULT", result // 2)
