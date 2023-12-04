from collections import Counter
import re


with open("input.txt") as f:
    input = f.read()

lines = input.split('\n')


cards = [(0, 0)]
copies = [0]

for line in lines:
    header, rest = re.split(':', line)
    card_no = int(re.search(r'\d+', header).group())
    winning_str, own_str = rest.split('|')
    winning = set([int(x) for x in re.findall(r'\d+', winning_str)])
    own = set([int(x) for x in re.findall(r'\d+', own_str)])

    common = len(winning & own)
    cards.append((card_no, common))
    copies.append(1)

    print("CARD", card_no, common)


for card_no, count in cards:
    print("INC ", card_no, count)
    start = card_no + 1
    if count > 0:
        for i in range(start, start + count):
            print("  INC ITER", i)
            copies[i] += copies[card_no]
    print("INC END", copies)


print("RESULT", sum(copies))
