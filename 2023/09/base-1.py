from itertools import pairwise

with open("input.txt", "r") as file:
    input = file.read().strip()

lines = [[int(n) for n in line.split()] for line in input.split('\n')]


def predict_num(sequence):
    if len(set(sequence)) == 1:
        print("  PREDICT-ZERO", sequence, sequence[0])
        return sequence[0]

    diffs = [b - a for a, b in pairwise(sequence)]
    diff = predict_num(diffs)
    print("  PREDICT", sequence, sequence[-1] + diff)
    return sequence[-1] + diff


result = 0
for line in lines:
    print("LINE", line)
    predicted_num = predict_num(line)
    result += predicted_num

print("RESULT", result)
