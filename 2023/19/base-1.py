import re


with open("input.txt", "r") as file:
    part1, part2 = file.read().strip().split("\n\n")

workflows = {}
for str in part1.split("\n"):
    print("WORKFLOW", str)
    id, rest = str.split("{")
    steps = rest.strip("}").split(",")
    print("  ID", id)
    workflows[id] = []
    for step in steps:
        parts = step.split(":")
        if len(parts) == 1:
            print("  NEXT", parts[0])
            workflows[id].append({"next": parts[0]})
        else:
            variable = parts[0][0]
            check = parts[0][1]
            value = int(parts[0][2:])

            print("  CHECK", variable, check, value)
            workflows[id].append({
                "variable": variable,
                "check": check,
                "value": value,
                "next": parts[1],
            })

print("WORKFLOWS", workflows)

ratings = []
for str in part2.split("\n"):
    v = [int(val) for val in re.findall("(\d+)", str)]
    ratings.append({"x": v[0], "m": v[1], "a": v[2], "s": v[3]})

print("RATINGS", ratings)


def process_rating(rating, workflow):
    if workflow == "A" or workflow == "R":
        return workflow

    for condition in workflows[workflow]:
        if "variable" in condition:
            if condition["check"] == ">":
                if rating[condition["variable"]] > condition["value"]:
                    return process_rating(rating, condition["next"])
            elif condition["check"] == "<":
                if rating[condition["variable"]] < condition["value"]:
                    return process_rating(rating, condition["next"])
        else:
            return process_rating(rating, condition["next"])


accepted = []
rejected = []
for rating in ratings:
    res = process_rating(rating, "in")
    if res == 'A':
        accepted.append(rating)
    elif res == 'R':
        rejected.append(rating)
    else:
        raise Exception("Invalid state", res)


print("ACCEPTED", accepted)
print("REJECTED", rejected)

result = 0
for rating in accepted:
    result += rating["x"] + rating["m"] + rating["a"] + rating["s"]

print("RESULT", result)
