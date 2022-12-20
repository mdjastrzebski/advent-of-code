with open('input.txt') as f:
    lines = f.read()

rawGroups = lines.split('\n\n')
groups = [[int(line) for line in line.split('\n')] for line in rawGroups]
groupSums = [sum(group) for group in groups]

groupSums.sort(reverse=True)
print("Sum Top 3: ", sum(groupSums[:3]))
