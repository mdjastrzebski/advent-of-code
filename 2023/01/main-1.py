import re

with open("input.txt") as f:
    input = f.read()

lines = input.split('\n')

sum = 0
for line in lines:
    digits = re.findall(r'\d', line)
    number = int(digits[0] + digits[-1])

    print("LINE", line, digits, number)
    sum += number

print("RESULT", sum)
