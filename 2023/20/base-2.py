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
            "type": "F",
            "state": False,  # Off
            "outputs": outputs,
        }
    elif id.startswith('&'):
        id = id[1:]
        nodes[id] = {
            "type": "C",
            "state": {},  # To be filled with connections
            "outputs": outputs,
        }
    else:
        nodes[id] = {
            "type": "S",
            "outputs": outputs,
        }

# Add terminal nodes, init state for conjunctions
for id in [*nodes.keys()]:
    for output in nodes[id]["outputs"]:
        if output not in nodes:
            nodes[output] = {
                "type": "T",
                "outputs": [],
            }
        elif nodes[output]["type"] == "C":
            nodes[output]["state"][id] = False


def print_graph_date(nodes):
    print("\"nodes\": [")
    for node in nodes:
        print(
            f'  {{ "id": "{node}", "label": "{nodes[node]["type"]} {node}" }},')
    print('],')
    print('\"edges\": [')
    for node in nodes:
        for output in nodes[node]["outputs"]:
            print(f'  {{ "from": "{node}", "to": "{output}" }},')
    print(']')

# Print data for visualization
# print_graph_date(nodes)


def send_pulse(nodes, start, stop):
    queue = deque([start])

    while queue:
        id, prev_id, pulse_in = queue.popleft()
        # print("  PULSE", id, prev_id, pulse_in)

        node = nodes[id]

        if id == stop[0] and pulse_in == stop[1]:
            print("  FOUND STOP", id, prev_id, pulse_in)
            return True

        if node["type"] == "broadcast":
            for output in node["outputs"]:
                queue.append((output, id, pulse_in))
            continue

        if node["type"] == "F":
            if pulse_in == 0:
                node["state"] = not node["state"]
                for output in node["outputs"]:
                    queue.append((output, id, node["state"]))
            continue

        if node["type"] == "C":
            node["state"][prev_id] = pulse_in
            pulse_out = not all(node["state"].values())
            for output in node["outputs"]:
                queue.append((output, id, pulse_out))
            continue

    return False


res_dz = None
for i in range(1, 100_000):
    stop = send_pulse(nodes, ("dz", "broadcaster", False), ("gf", True))
    if stop:
        res_dz = i
        break

res_kg = None
for i in range(1, 100_000):
    stop = send_pulse(nodes, ("kg", "broadcaster", False), ("gf", True))
    if stop:
        res_kg = i
        break

res_bq = None
for i in range(1, 100_000):
    stop = send_pulse(nodes, ("bq", "broadcaster", False), ("gf", True))
    if stop:
        res_bq = i
        break

res_ff = None
for i in range(1, 100_000):
    stop = send_pulse(nodes, ("ff", "broadcaster", False), ("gf", True))
    if stop:
        res_ff = i
        break

print("DZ", res_dz)
print("KG", res_kg)
print("BQ", res_bq)
print("FF", res_ff)
print("ANSWER", res_dz * res_kg * res_bq * res_ff)
