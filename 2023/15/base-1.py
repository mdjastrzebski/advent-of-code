file_path = "input.txt"

with open(file_path, "r") as file:
    input = file.read().split('\n')


def hash(input):
    current = 0
    for char in input:
        # print("  CHAR:", char)
        current = (current + ord(char)) * 17 % 256
        # print("  CURRENT:", current)
    return current


elements = input[0].split(',')
# print("INPUT", elements)

result = 0
for e in elements:
    # print("ELEMENT:", e)
    result += hash(e)

print("RESULT:", result)
