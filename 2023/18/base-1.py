with open("input.txt", "r") as file:
    lines = file.read().strip().split("\n")


dirs = {
    "R": (1, 0),
    "L": (-1, 0),
    "U": (0, -1),
    "D": (0, 1)
}

current = (0, 0)
path = [(0, 0)]
circumference = 0
for line in lines:
    dir, steps_str, _ = line.split(" ")
    steps = int(steps_str)

    dx, dy = dirs[dir]
    current = (current[0] + steps*dx, current[1] + steps*dy)
    path.append(current)
    circumference += steps


def calculate_shoelace_area(path):
    area = 0
    n = len(path)
    for i in range(n):
        i_next = (i + 1) % n
        area += path[i][0] * path[i_next][1]
        area -= path[i_next][0] * path[i][1]
    assert area % 2 == 0
    area = abs(area) // 2
    return area


# print("PATH", path)
shoelace_area = calculate_shoelace_area(path)
assert circumference % 2 == 0
internal_points = shoelace_area + 1 - circumference // 2

print("RESULT", internal_points+circumference)
