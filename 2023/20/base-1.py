from collections import deque

with open("input.txt", "r") as file:
    lines = file.read().strip().split("\n")

nodes = {}
for line in lines:
    id, rest = line.split(" -> ")
    outputs = rest.split(", ")

    if id.startswith('%'):
        id = id[1:]
        nodes[id] = {
            "type": "flip-flop",
            "state": False,  # Off
            "outputs": outputs,
        }
    elif id.startswith('&'):
        id = id[1:]
        nodes[id] = {
            "type": "conjunction",
            "state": {},  # To be filled with connections
            "outputs": outputs,
        }
    else:
        nodes[id] = {
            "type": "broadcast",
            "outputs": outputs,
        }

# Add terminal nodes, init state for conjunctions
for id in [*nodes.keys()]:
    for output in nodes[id]["outputs"]:
        if output not in nodes:
            nodes[output] = {
                "type": "terminal",
                "outputs": [],
            }
        elif nodes[output]["type"] == "conjunction":
            nodes[output]["state"][id] = False


def print_nodes(nodes):
    for node in nodes:
        print(node, ": ", nodes[node])


print_nodes(nodes)

# def get_pulse_out(node, sender, pulse_in) {
#     if node == 'broadcaster':
#         return 0

#     if node["type"] == "%":
#         return
# }

total_low = 0
total_high = 0


def send_pulse(nodes, initial):
    global total_low, total_high
    queue = deque([initial])

    while queue:
        id, prev_id, pulse_in = queue.popleft()
        print("PULSE", pulse_in, "id=", id, "prev=", prev_id, )

        if pulse_in:
            total_high += 1
        else:
            total_low += 1

        node = nodes[id]
        print("  NODE", node)

        if node["type"] == "broadcast":
            for output in node["outputs"]:
                print("  ENQUEUE (broadcast)", output, id, pulse_in)
                queue.append((output, id, pulse_in))
            continue

        if node["type"] == "flip-flop":
            if pulse_in == 0:
                node["state"] = not node["state"]
                for output in node["outputs"]:
                    print("  ENQUEUE (flip-flop)", output, id, node["state"])
                    queue.append((output, id, node["state"]))
            continue

        if node["type"] == "conjunction":
            node["state"][prev_id] = pulse_in
            pulse_out = not all(node["state"].values())
            for output in node["outputs"]:
                print("  ENQUEUE (conjunction)", output, id, pulse_out)
                queue.append((output, id, pulse_out))
            continue


for i in range(0, 1000):
    send_pulse(nodes, ("broadcaster", "button", False))

print("LOW", total_low, "HIGH", total_high)
print("RESULT", total_low * total_high)
