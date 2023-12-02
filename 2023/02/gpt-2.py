import re

with open("input.txt") as f:
    input = f.read()

lines = input.split('\n')


def parse_game_data(game_str):
    """ Parse the game data to extract the counts of each color in each subset. """
    subsets = game_str.split('; ')
    game_cubes = []
    for subset in subsets:
        cube_counts = {'red': 0, 'green': 0, 'blue': 0}
        cubes = subset.split(', ')
        for cube in cubes:
            count, color = cube.split(' ')
            cube_counts[color] += int(count)
        game_cubes.append(cube_counts)
    return game_cubes


def is_game_possible(game_cubes, max_cubes):
    """ Check if a game is possible with the given maximum cubes. """
    for subset in game_cubes:
        if any(subset[color] > max_cubes[color] for color in subset):
            return False
    return True


def minimum_cubes_required(game_cubes):
    """ Calculate the minimum number of cubes required for each color in a game. """
    min_cubes = {'red': 0, 'green': 0, 'blue': 0}
    for subset in game_cubes:
        for color in subset:
            min_cubes[color] = max(min_cubes[color], subset[color])
    return min_cubes


def calculate_power_of_set(cube_set):
    """ Calculate the power of a set of cubes. """
    return cube_set['red'] * cube_set['green'] * cube_set['blue']


def main(games):
    """ Solve the updated puzzle by finding the minimum set of cubes and summing their powers. """
    total_power = 0

    for game in games:
        game_id_str, game_data = game.split(': ')
        game_cubes = parse_game_data(game_data)
        min_cubes = minimum_cubes_required(game_cubes)
        power = calculate_power_of_set(min_cubes)
        total_power += power

    return total_power


# Solve the puzzle
result = main(lines)
print("RESULT", result)
