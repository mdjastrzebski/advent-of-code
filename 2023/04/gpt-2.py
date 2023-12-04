with open("input.txt") as f:
    input = f.read()

lines = input.split('\n')


def count_total_scratchcards(cards):
    # Start with the original set of scratchcards
    total_scratchcards = len(cards)

    # Convert card data into a list of tuples for easier processing
    card_data = []
    for card in cards:
        header, numbers = card.split(": ")
        winning_numbers, your_numbers = numbers.split(" | ")
        winning_numbers = set(map(int, winning_numbers.split()))
        your_numbers = set(map(int, your_numbers.split()))
        matches = winning_numbers.intersection(your_numbers)
        card_data.append((len(matches), matches))

    # Process each card to calculate how many copies of subsequent cards are won
    # Initialize a list to count won cards for each original card
    won_cards = [0] * len(cards)
    for i, (match_count, _) in enumerate(card_data):
        for j in range(i + 1, min(i + 1 + match_count, len(cards))):
            won_cards[j] += 1

    # Process won cards and their copies
    i = 0
    while i < len(won_cards):
        copies = won_cards[i]
        # Check if there are copies and it's not the last card
        if copies > 0 and i < len(card_data) - 1:
            match_count, _ = card_data[i]
            for j in range(i + 1, min(i + 1 + match_count, len(cards))):
                won_cards[j] += copies
        i += 1

    # Calculate the total number of scratchcards including the original and won copies
    total_scratchcards += sum(won_cards)
    return total_scratchcards


# Count total scratchcards
total_scratchcards = count_total_scratchcards(lines)
print("RESULT", total_scratchcards)
