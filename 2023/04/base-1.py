import re


with open("input.txt") as f:
    input = f.read()

lines = input.split('\n')

result = 0
for line in lines:
    header, rest = re.split(':', line)
    winning_str, own_str = rest.split('|')
    winning = set([int(x) for x in re.findall(r'\d+', winning_str)])
    own = set([int(x) for x in re.findall(r'\d+', own_str)])

    common = winning & own
    if len(common) > 0:
        result += 2**(len(common) - 1)

    print("LINE", line, winning_str, own_str, "-", winning, own)

print("RESULT", result)
