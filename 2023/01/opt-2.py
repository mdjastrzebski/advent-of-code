import re

with open("input.txt") as f:
    input = f.read()

lines = input.split('\n')


def parse_digit(text):
    if re.match(r'\d', text):
        return text
    if text == "one":
        return "1"
    if text == "two":
        return "2"
    if text == "three":
        return "3"
    if text == "four":
        return "4"
    if text == "five":
        return "5"
    if text == "six":
        return "6"
    if text == "seven":
        return "7"
    if text == "eight":
        return "8"
    if text == "nine":
        return "9"

    raise ValueError("Unknown number" + text)


regex = r'(\d|one|two|three|four|five|six|seven|eight|nine)'
rev_regex = r'(\d|eno|owt|eerht|ruof|evif|xis|neves|thgie|enin)'

sum = 0
for line in lines:
    orig_line = line

    first_digit = re.search(regex, line).group()
    last_digit = re.search(rev_regex, line[::-1]).group()[::-1]

    number = int(parse_digit(first_digit) + parse_digit(last_digit))

    print("LINE", orig_line, "-", first_digit, "-", last_digit, "-", number)
    sum += number


print("RESULT", sum)
