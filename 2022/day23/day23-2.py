from collections import Counter
from collections import deque

with open("input.txt") as f:
    input = f.read()

elves = set()
lines = input.split('\n')
for (y, line) in enumerate(lines):
    for (x, char) in enumerate(line):
        if char == '#':
            elves.add((x, y))

print("Input", elves, len(elves))


def get_pos(pos, dir):
    # print("    GetPos", pos, dir)
    match dir:
        case "N": return (pos[0], pos[1] - 1)
        case "S": return (pos[0], pos[1] + 1)
        case "W": return (pos[0] - 1, pos[1])
        case "E": return (pos[0] + 1, pos[1])
        case "NW": return (pos[0] - 1, pos[1] - 1)
        case "SW": return (pos[0] - 1, pos[1] + 1)
        case "NE": return (pos[0] + 1, pos[1] - 1)
        case "SE": return (pos[0] + 1, pos[1] + 1)
        case _: raise Exception("Should not happen")


def get_move(pos, directions):
    moveN = get_pos(pos, "N")
    moveS = get_pos(pos, "S")
    moveE = get_pos(pos, "E")
    moveW = get_pos(pos, "W")
    moveNW = get_pos(pos, "NW")
    moveNE = get_pos(pos, "NE")
    moveSW = get_pos(pos, "SW")
    moveSE = get_pos(pos, "SE")

    if (moveN not in elves and moveNW not in elves and moveNE not in elves and moveS not in elves and moveSW not in elves and moveSE not in elves and moveW not in elves and moveE not in elves and moveE not in elves):
        return None

    for dir in directions:
        if (dir == "N" and moveN not in elves and moveNW not in elves and moveNE not in elves):
            return moveN
        if (dir == "S" and moveS not in elves and moveSW not in elves and moveSE not in elves):
            return moveS
        if (dir == "W" and moveW not in elves and moveNW not in elves and moveSW not in elves):
            return moveW
        if (dir == "E" and moveE not in elves and moveNE not in elves and moveSE not in elves):
            return moveE


def print_map(elves):
    minx = min(elves, key=lambda x: x[0])[0]
    maxx = max(elves, key=lambda x: x[0])[0]
    miny = min(elves, key=lambda x: x[1])[1]
    maxy = max(elves, key=lambda x: x[1])[1]

    for y in range(miny, maxy + 1):
        for x in range(minx - 1, maxx + 1):
            if (x, y) in elves:
                print("#", end='')
            else:
                print(".", end='')
        print()


directions = deque(["N", "S", "W", "E"])
inv_directions = {"N": "S", "S": "N", "E": "W", "W": "E"}

rounds = 0
while True:
    print("Round", rounds)

    proposed = Counter()
    next_elves = set()

    for elf in elves:
        move = get_move(elf, directions)
        proposed[move] += 1

    for elf in elves:
        move = get_move(elf, directions)
        if move != None and proposed[move] == 1:
            next_elves.add(move)
        else:
            next_elves.add(elf)

    dir = directions[0]
    if (elves == next_elves):
        print("No change", rounds, dir)
        print_map(elves)
        break

    # print("  Elves")
    # print_map(elves)

    elves = next_elves
    directions.rotate(-1)
    rounds += 1


print("Result", rounds + 1)
