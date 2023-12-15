file_path = "input.txt"

with open(file_path, "r") as file:
    input = file.read().split('\n')


def hash(input):
    current = 0
    for char in input:
        current = (current + ord(char)) * 17 % 256
    return current


def parse_element(element):
    if element.endswith('-'):
        return ('-', element[:-1], 0)

    label, num = element.split('=')
    return ('=', label,  int(num))


def process_lens(box, op, label, value):
    if op == '-':
        return remove_lens(box, label)
    else:
        return insert_lens(box, label, value)


def remove_lens(box, label):
    # print("  REMOVE", label, box)
    return [el for el in box if el[0] != label]


def insert_lens(box, label, value):
    for i, el in enumerate(box):
        if el[0] == label:
            box[i] = (label, value)
            return box

    return [*box, (label, value)]


def print_boxes(boxes):
    for i, box in enumerate(boxes):
        if len(box) > 0:
            print("  BOX", i, box)


elements = input[0].split(',')
# print("INPUT", elements)

boxes = [[] for _ in range(256)]
# print("BOXES", boxes)
for e in elements:
    # print("ELEMENT:", e)
    op, label, value = parse_element(e)
    id = hash(label)
    boxes[id] = process_lens(boxes[id], op, label, value)
    print_boxes(boxes)


def focusing_power(box, box_id):
    result = 0
    for i, (_, value) in enumerate(box):
        power = (box_id + 1)*(i + 1)*value
        # print("  FOCUSING POWER", box_id, i, value, power)
        result += power

    return result


# print("FOCUSING POWER")
result = 0
for i, box in enumerate(boxes):
    result += focusing_power(box, i)
    # if (len(box) > 0):
    #    print("BOX:", i, box, result)

print("RESULT:", result)
