with open('input.txt') as f:
    lines = f.read()

rawGroups = lines.split('\n\n')
groups = [[int(line) for line in line.split('\n')] for line in rawGroups]
maxElf = max(sum(group) for group in groups)

print("Max: ", maxElf)
