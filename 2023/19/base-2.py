import copy
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


print("WORKFLOWS")
for workflow in workflows:
    print("  ", workflow, workflows[workflow])

accepted = []


def process_ranges(input, workflow, step):
    print("PROCESS", input, workflow, step)

    if workflow == "A":
        print("  ACCEPTED", input)
        accepted.append(input)
        return
    if workflow == "R":
        print("  REJECTED", input)
        return

    condition = workflows[workflow][step]
    next_workflow = condition["next"]
    if "variable" not in condition:
        print("  NEXT WORKFLOW", input, next_workflow, 0)
        process_ranges(input, next_workflow, 0)
        return

    variable = condition["variable"]
    check = condition["check"]
    value = condition["value"]
    input_min = input[variable][0]
    input_max = input[variable][1]

    if check == ">":
        if input_min > value:
            print("  > PASS => NEXT WORKFLOW", input, next_workflow, 0)
            process_ranges(input, next_workflow, 0)
            return
        if input_max > value:
            range1 = copy.deepcopy(input)
            range1[variable][0] = value + 1
            print("  > PASS => SPLIT 1", range1, next_workflow, 0)
            process_ranges(range1, next_workflow, 0)
            range2 = copy.deepcopy(input)
            range2[variable][1] = value
            print("  > PASS => SPLIT 2", range2, workflow, step + 1)
            process_ranges(range2, workflow, step + 1)
            return
    elif check == "<":
        if input_max < value:
            print("  < PASS => NEXT WORKFLOW", input, next_workflow, 0)
            process_ranges(input, next_workflow, 0)
            return
        if input_min < value:
            range1 = copy.deepcopy(input)
            range1[variable][1] = value - 1
            print("  < PASS => SPLIT 1", range1, next_workflow, 0)
            process_ranges(range1, next_workflow, 0)
            range2 = copy.deepcopy(input)
            range2[variable][0] = value
            print("  < PASS => SPLIT 2", range2, workflow, step + 1)
            process_ranges(range2, workflow, step + 1)
            return


all_ranges = {"x": [1, 4000], "m": [1, 4000], "a": [1, 4000], "s": [1, 4000]}
process_ranges(all_ranges, "in", 0)
print("ACCEPTED", accepted)

result = 0
for a in accepted:
    value = (a["x"][1] - a["x"][0] + 1) * (a["m"][1] - a["m"][0] + 1) * \
        (a["a"][1] - a["a"][0] + 1) * (a["s"][1] - a["s"][0] + 1)
    print("VALUE", value)
    result += value

print("RESULT", result)
