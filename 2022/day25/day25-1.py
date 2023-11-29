with open("input.txt") as file:
    input = file.read()

lines = input.split('\n')
print("Lines", lines)

digit_decoder = {
    "=": -2,
    "-": -1,
    "0": 0,
    "1": 1,
    "2": 2,
}


def decode_number(num_str):
    print("Parse", num_str)

    acc = 0
    mul = 1
    for d in reversed(num_str):
        acc += digit_decoder[d] * mul
        mul *= 5
    print("  Res", acc)
    return acc


digits_encoder = {v: k for (k, v) in digit_decoder.items()}


def encode_number(num):
    result = []
    rest = num
    while rest > 0:
        pos = (rest + 2) % 5 - 2
        result.append(digits_encoder[pos])
        rest -= pos
        rest //= 5
    return "".join(reversed(result))


total = 0
for line in lines:
    total += decode_number(line)

print("Result", encode_number(total), total)
