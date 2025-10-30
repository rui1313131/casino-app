import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { HomeScreen } from '../src/components/HomeScreen';

describe('HomeScreen', () => {
  it('should enable the claim button when canClaimBonus is true', () => {
    render(<HomeScreen canClaimBonus={true} />);
    const claimButton = screen.getByRole('button', { name: /claim/i });
    expect(claimButton).toBeInTheDocument();
    expect(claimButton).toBeEnabled();
    expect(claimButton).toHaveTextContent('Claim 2,000 Coins');
  });

  it('should disable the claim button when canClaimBonus is false', () => {
    render(<HomeScreen canClaimBonus={false} />);
    const claimButton = screen.getByRole('button', { name: /claimed/i });
    expect(claimButton).toBeInTheDocument();
    expect(claimButton).toBeDisabled();
    expect(claimButton).toHaveTextContent('Already Claimed');
  });

  it('should display links to Poker and Roulette', () => {
    render(<HomeScreen />);
    const playLinks = screen.getAllByRole('link', { name: /play now/i });
    expect(playLinks).toHaveLength(2);
    expect(playLinks[0]).toHaveAttribute('href', '/poker');
    expect(playLinks[1]).toHaveAttribute('href', '/roulette');
  });
});
