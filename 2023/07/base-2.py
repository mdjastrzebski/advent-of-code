from collections import Counter
import re


with open("input.txt") as f:
    input = f.read()

lines = input.split('\n')


def rank_hand(hand):
    card_values = {'J': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9,
                   'T': 10, 'Q': 12, 'K': 13, 'A': 14}

    counts = Counter(hand)
    jokers = counts['J']
    del counts['J']

    sorted_cards = sorted(counts, key=lambda x: (-counts[x], -card_values[x]))
    sorted_values = [card_values[c] for c in hand]

    print("RANK", hand, sorted_cards, counts)

    if len(counts) == 1 or len(counts) == 0:
        print("  RANK 6 - Five of a kind")
        return (6, sorted_values)
    if len(counts) == 2:
        if (counts[sorted_cards[0]] + jokers) == 4:
            print("  RANK 5 - Four of a kind")
            return (5, sorted_values)
        else:
            print("  RANK 4 - Full house")
            return (4, sorted_values)
    elif len(counts) == 3:
        if (counts[sorted_cards[0]] + jokers) == 3:
            print("  RANK 3 - Three of a kind")
            return (3, sorted_values)
        else:
            print("  RANK 2 - Two pair")
            return (2, sorted_values)
    elif len(counts) == 4:
        print("  RANK 1 - One pair")
        return (1, sorted_values)
    else:
        print("  RANK 0 - High card")
        return (0, sorted_values)


parsed_hands = [(hand.split()[0], int(hand.split()[1])) for hand in lines]
print("PARSED", parsed_hands)

ranked_hands = [(hand, bid, rank_hand(hand)) for hand, bid in parsed_hands]
print("RANKED HANDS", ranked_hands)

ranked_hands.sort(key=lambda card: (card[2][0], card[2][1]))
print("SORTED HANDS", ranked_hands)

result = 0
for rank, (hand, bid, ranking) in enumerate(ranked_hands):
    score = bid * (rank + 1)
    result += score
    print("  SCORE", rank + 1, hand, bid, "=>",
          ranking[0], ranking[1], "=>", rank+1, "*", bid, "=", score, "=>", result)


print("RESULT", result)
