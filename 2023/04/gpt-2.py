with open("input.txt") as f:
    input = f.read()

lines = input.split('\n')


def count_total_scratchcards(cards):
    # Initialize counters for each card
    card_counters = [1] * len(cards)  # Start with one copy of each card

    # Convert card data into a list of tuples for easier processing
    card_data = []
    for card in cards:
        header, numbers = card.split(": ")
        winning_numbers, your_numbers = numbers.split(" | ")
        winning_numbers = set(map(int, winning_numbers.split()))
        your_numbers = set(map(int, your_numbers.split()))
        matches = winning_numbers.intersection(your_numbers)
        card_data.append(len(matches))

    # Process each card and update counters for subsequent cards
    for i, match_count in enumerate(card_data):
        for j in range(i + 1, min(i + 1 + match_count, len(card_data))):
            card_counters[j] += card_counters[i]

    # Sum up the total number of scratchcards including original and won copies
    total_scratchcards = sum(card_counters)
    return total_scratchcards


# Count total scratchcards
total_scratchcards = count_total_scratchcards(lines)
print("RESULT", total_scratchcards)
