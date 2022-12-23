def parseLine(line):
    parts = line.split(': ')
    return (parts[0], parts[1].split(' '))


with open("input.txt") as f:
    input = f.read()

lines = input.split('\n')
nodes = dict(parseLine(line) for line in lines)
print("Input: ", nodes)


def processNode(key):
    node = nodes[key]
    if len(node) == 1:
        return int(node[0])

    left = processNode(node[0])
    right = processNode(node[2])

    match node[1]:
        case '+':
            return left + right
        case '-':
            return left - right
        case '*':
            return left * right
        case '/':
            return left / right
        case _:
            raise Exception("Unknown operator: " + node[1])


print("Result: ", processNode("root"))
