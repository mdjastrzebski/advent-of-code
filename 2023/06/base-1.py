import re


with open("input.txt") as f:
    input = f.read()

time_str, distance_str = input.split('\n')


def parse_line(line):
    return [int(x) for x in re.findall(r'\d+', line)]


times = parse_line(time_str)
distances = parse_line(distance_str)


def distance_from_time(total_time, charge_time):
    return (total_time - charge_time) * charge_time


def calculate_min_time(time, distance):
    for i in range(0, time):
        if distance_from_time(time, i) > distance:
            return i

    return None


def calculate_max_time(time, distance):
    for i in range(time, 0, -1):
        if distance_from_time(time, i) > distance:
            return i

    return None


accumulator = 1
for time, distance in zip(times, distances):
    min = calculate_min_time(time, distance)
    max = calculate_max_time(time, distance)
    accumulator *= max - min + 1
    print("LINE", time, distance, min, max, max - min,
          distance_from_time(time, min), distance_from_time(time, max))

print("RESULT", accumulator)
