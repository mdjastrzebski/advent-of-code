import re


with open("input.txt") as f:
    input = f.read()

lines = input.split('\n')

sum = 0
for line in lines:
    orig_line = line

    line = line.replace("twone", "21")
    line = line.replace("eightwo", "82")
    line = line.replace("eighthree", "83")
    line = line.replace("oneight", "18")
    line = line.replace("threeight", "38")
    line = line.replace("fiveight", "58")
    line = line.replace("nineight", "98")

    line = line.replace('one', '1')
    line = line.replace('two', '2')
    line = line.replace('three', '3')
    line = line.replace('four', '4')
    line = line.replace('five', '5')
    line = line.replace('six', '6')
    line = line.replace('seven', '7')
    line = line.replace('eight', '8')
    line = line.replace('nine', '9')

    digits = re.findall(r'\d', line)
    number = int(digits[0]+digits[-1])

    print("LINE", orig_line, "-", line, "-", digits, "-", number)
    sum += number


print("RESULT", sum)
