import React from 'react';
import { GiCardAceSpades, GiRollingDices } from 'react-icons/gi';
import { FaCoins } from 'react-icons/fa';

type GameCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
};

const GameCard: React.FC<GameCardProps> = ({ title, description, icon, href }) => (
  <div className="bg-gray-800/50 rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-casino-gold/20">
    <div className="p-6 flex flex-col items-center text-center">
      <div className="text-casino-gold text-6xl mb-4">{icon}</div>
      <h3 className="font-serif-display text-2xl text-white mb-2">{title}</h3>
      <p className="font-sans-body text-gray-400 mb-4">{description}</p>
      <a
        href={href}
        className="font-bold font-sans-body text-casino-dark bg-casino-gold px-6 py-2 rounded-full shadow-md transition-all duration-300 hover:bg-white hover:shadow-lg"
      >
        Play Now
      </a>
    </div>
  </div>
);

export const HomeScreen: React.FC<{ canClaimBonus?: boolean }> = ({ canClaimBonus = false }) => {
  return (
    <div className="min-h-screen bg-casino-dark text-white font-sans-body p-8">
      <header className="text-center mb-12">
        <h1 className="font-serif-display text-5xl md:text-6xl text-casino-gold drop-shadow-lg">
          Gemini Grand Casino
        </h1>
        <p className="text-gray-300 mt-2">Your fortune awaits.</p>
      </header>

      <main className="max-w-4xl mx-auto">
        <div className="bg-casino-red/80 text-center p-6 rounded-lg shadow-xl mb-12 border-2 border-casino-gold/50">
          <h2 className="font-serif-display text-3xl text-white mb-3">Daily Login Bonus</h2>
          <p className="text-gray-200 mb-4">Claim your daily bonus to boost your bankroll!</p>
          <button 
            disabled={!canClaimBonus}
            className="bg-casino-gold text-casino-dark font-bold py-3 px-8 rounded-full shadow-lg transition-transform duration-200 hover:scale-110 flex items-center justify-center mx-auto disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            <FaCoins className="mr-2" />
            {canClaimBonus ? 'Claim 2,000 Coins' : 'Already Claimed'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <GameCard
            title="Texas Hold'em"
            description="The classic game of skill, strategy, and nerve."
            icon={<GiCardAceSpades />}
            href="/poker"
          />
          <GameCard
            title="Roulette"
            description="Place your bets and watch the wheel spin for big wins."
            icon={<GiRollingDices />}
            href="/roulette"
          />
        </div>
      </main>
    </div>
  );
};
