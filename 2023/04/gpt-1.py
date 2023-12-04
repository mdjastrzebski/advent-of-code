# Re-defining the function and re-executing the code after state reset

with open("input.txt") as f:
    input = f.read()

lines = input.split('\n')


def calculate_card_points(cards):
    total_points = 0

    for card in cards:
        # Split the card into header and numbers, then split numbers into winning and your numbers
        header, numbers = card.split(": ")
        winning_numbers, your_numbers = numbers.split(" | ")
        winning_numbers = set(map(int, winning_numbers.split()))
        your_numbers = set(map(int, your_numbers.split()))

        # Find matching numbers
        matches = winning_numbers.intersection(your_numbers)

        # Calculate points for this card
        card_points = 2 ** (len(matches) - 1) if matches else 0
        total_points += card_points

    return total_points


# Calculate the total points for the provided cards
total_points = calculate_card_points(lines)
print("RESULT", total_points)
