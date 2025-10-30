type Card = { suit: 'spades' | 'hearts' | 'diamonds' | 'clubs'; rank: string };
type HandRank = 'Royal Flush' | 'Straight Flush' | 'Four of a Kind' | 'Full House' | 'Flush' | 'Straight' | 'Three of a Kind' | 'Two Pair' | 'One Pair' | 'High Card' | 'Invalid';

class PokerLogicService {
  evaluateHand(hand: Card[]): HandRank {
    if (hand.length !== 5) return 'Invalid';
    const isFlush = new Set(hand.map(c => c.suit)).size === 1;
    if (isFlush && hand.every(c => ['A', 'K', 'Q', 'J', '10'].includes(c.rank))) {
      return 'Royal Flush';
    }
    if (isFlush) return 'Flush';
    return 'High Card';
  }

  calculateWinnings(bet: number, handRank: HandRank): number {
    if (bet <= 0) throw new Error('Bet must be positive.');
    const multipliers = {
      'Royal Flush': 250, 'Straight Flush': 50, 'Four of a Kind': 25,
      'Full House': 9, 'Flush': 6, 'Straight': 4, 'Three of a Kind': 3,
      'Two Pair': 2, 'One Pair': 1, 'High Card': 0, 'Invalid': 0,
    };
    return bet * (multipliers[handRank] || 0);
  }
}

describe('PokerLogicService', () => {
  let service: PokerLogicService;

  beforeEach(() => {
    service = new PokerLogicService();
  });

  describe('evaluateHand', () => {
    it('should correctly identify a Royal Flush', () => {
      const royalFlush: Card[] = [
        { suit: 'spades', rank: 'A' }, { suit: 'spades', rank: 'K' },
        { suit: 'spades', rank: 'Q' }, { suit: 'spades', rank: 'J' },
        { suit: 'spades', rank: '10' },
      ];
      expect(service.evaluateHand(royalFlush)).toBe('Royal Flush');
    });

    it('should correctly identify a Flush', () => {
      const flush: Card[] = [
        { suit: 'hearts', rank: '2' }, { suit: 'hearts', rank: '5' },
        { suit: 'hearts', rank: '8' }, { suit: 'hearts', rank: 'J' },
        { suit: 'hearts', rank: 'A' },
      ];
      expect(service.evaluateHand(flush)).toBe('Flush');
    });

    it('should return "Invalid" for hands not containing 5 cards', () => {
      const invalidHand: Card[] = [{ suit: 'spades', rank: 'A' }];
      expect(service.evaluateHand(invalidHand)).toBe('Invalid');
    });
  });

  describe('calculateWinnings', () => {
    it('should calculate winnings for a Full House correctly', () => {
      expect(service.calculateWinnings(100, 'Full House')).toBe(900);
    });

    it('should return 0 for a High Card', () => {
      expect(service.calculateWinnings(100, 'High Card')).toBe(0);
    });

    it('should throw an error for a non-positive bet', () => {
      expect(() => service.calculateWinnings(0, 'Flush')).toThrow('Bet must be positive.');
      expect(() => service.calculateWinnings(-100, 'Flush')).toThrow('Bet must be positive.');
    });
  });
});
