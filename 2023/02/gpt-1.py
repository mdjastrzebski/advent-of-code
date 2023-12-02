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


def main(games):
    """ Solve the puzzle by checking which games are possible and summing their IDs. """
    max_cubes = {'red': 12, 'green': 13, 'blue': 14}
    possible_games_sum = 0

    for game in games:
        game_id_str, game_data = game.split(': ')
        game_id = int(game_id_str.replace('Game ', ''))
        game_cubes = parse_game_data(game_data)
        if is_game_possible(game_cubes, max_cubes):
            possible_games_sum += game_id

    return possible_games_sum


# Solve the puzzle
result = main(lines)
print("RESULT", result)
