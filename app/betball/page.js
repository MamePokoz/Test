'use client';
import React, { useState, useEffect } from 'react';
import { Coins, Users, TrendingUp, Zap } from 'lucide-react';
import styles from './betball.module.css';
import Swal from 'sweetalert2';

const teams = [
  'Manchester United','Liverpool','FC Barcelona','Real Madrid','Bayern Munich',
  'Borussia Dortmund','Paris Saint-Germain','Juventus','AC Milan','Chelsea',
  'Manchester City','Arsenal','Tottenham Hotspur','FC Porto','Benfica',
  'Ajax','PSV Eindhoven','Flamengo','Palmeiras','Inter Milan'
];

const FootballBettingSystem = () => {
  const [balance, setBalance] = useState(1000);
  const [bets, setBets] = useState({});
  const [matches, setMatches] = useState([]);
  // Removed round
  const [resultsHistory, setResultsHistory] = useState([]);
  const [npcs, setNpcs] = useState([]);
  const [xp, setXp] = useState(0);
  const [hoveredMatch, setHoveredMatch] = useState(null);

  useEffect(() => {
    initNPCs();
    generateMatches();
  }, []);

  const initNPCs = () => {
    const npcPlayers = ['NPC_Alpha', 'NPC_Bravo', 'NPC_Charlie', 'NPC_Delta', 'NPC_Echo'].map(name => ({
      name,
      balance: Math.floor(Math.random() * 2000 + 500),
      risk: Math.random()
    }));
    setNpcs(npcPlayers);
  };

  const generateMatches = () => {
    let m = [];
    for (let i = 0; i < 5; i++) {
      const a = teams[Math.floor(Math.random() * teams.length)];
      let b;
      do { b = teams[Math.floor(Math.random() * teams.length)] } while (a === b);
      m.push({ id: i + 1, teamA: a, teamB: b });
    }
    setMatches(m);
  };

  const handleBetChange = (matchId, choice, amount) => {
    setBets(prev => ({ ...prev, [matchId]: { choice, amount: parseInt(amount) || 0 } }));
  };

  const randomEvent = () => {
    const r = Math.random();
    if (r < 0.1) return 'jackpot';
    if (r > 0.9) return 'sabotage';
    return null;
  };

  const handleSubmitBets = () => {
    let roundResults = [];
    let totalWinnings = 0;
    let totalLosses = 0;
    let messages = [];

    matches.forEach(match => {
      const outcomeOptions = [match.teamA, match.teamB, 'Draw'];
      const result = outcomeOptions[Math.floor(Math.random() * outcomeOptions.length)];

      const bet = bets[match.id];
      let multiplier = 1;
      const event = randomEvent();

      if (event === 'jackpot') {
        multiplier = 2;
        messages.push('🎉 Jackpot! Double winnings!');
      }
      if (event === 'sabotage') {
        multiplier = -1;
        messages.push('⚡ Sabotage! Coins lost!');
      }

      if (bet && bet.amount > 0 && bet.amount <= balance) {
        if (bet.choice === result) {
          const winAmount = bet.amount * multiplier;
          setBalance(prev => prev + winAmount);
          totalWinnings += winAmount;
        } else {
          const lossAmount = bet.amount * Math.abs(multiplier);
          setBalance(prev => prev - lossAmount);
          totalLosses += lossAmount;
        }
      }

      // NPC betting
      npcs.forEach(npc => {
        const npcChoice = outcomeOptions[Math.floor(Math.random() * outcomeOptions.length)];
        const npcAmount = Math.floor(npc.risk * 100) + 10;
        if (npcChoice === result) {
          npc.balance += npcAmount;
        } else {
          npc.balance -= npcAmount;
        }
      });

      roundResults.push({ match, result });
    });

    setResultsHistory(prev => [...prev, { roundResults }]);
    setBets({});
    generateMatches();
    setNpcs([...npcs]);

    // Show results
    const netResult = totalWinnings - totalLosses;
    const resultMessage = netResult > 0 
      ? `🎉 Great bets! +${netResult} coins` 
      : netResult < 0 
        ? `😔 Tough bets! -${Math.abs(netResult)} coins`
        : `😐 Break even this time`;

    Swal.fire({
      title: 'Bet Results',
      html: `<div style="font-size:1.2em">${resultMessage.replace(/\n/g, '<br>')}</div>
             <div style="margin-top:1em">${messages.join('<br>')}</div>`,
      icon: netResult > 0 ? 'success' : netResult < 0 ? 'error' : 'info',
      confirmButtonText: 'OK'
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainCard}>
        <div className={styles.header}>
          <h1 className={styles.title}>Football Betting System ⚽</h1>
          {/* Removed round display */}
        </div>

        {/* Stats Row */}
        <div className={styles.statsRow}>
          <div className={styles.statCard}>
            <Coins size={24} />
            <div className={styles.statValue}>{balance.toLocaleString()}</div>
            <div className={styles.statLabel}>Balance</div>
          </div>
        </div>

        {/* Matches */}
        <div className={styles.sectionTitle}>
          <Zap size={20} />
          Today's Matches
        </div>
        
        <div className={styles.matchesGrid}>
          {matches.map(match => (
            <div 
              key={match.id}
              className={`${styles.matchCard} ${hoveredMatch === match.id ? styles.matchCardHover : ''}`}
              onMouseEnter={() => setHoveredMatch(match.id)}
              onMouseLeave={() => setHoveredMatch(null)}
            >
              <div className={styles.matchTeams}>
                {match.teamA} vs {match.teamB}
              </div>
              
              <div className={styles.betOptions}>
                {[match.teamA, 'Draw', match.teamB].map(option => (
                  <button
                    key={option}
                    className={`${styles.betButton} ${bets[match.id]?.choice === option ? styles.betButtonActive : ''}`}
                    onClick={() => handleBetChange(match.id, option, bets[match.id]?.amount || 0)}
                  >
                    {option === 'Draw' ? 'Draw' : option.split(' ')[0]}
                  </button>
                ))}
              </div>
              
              <input
                type="number"
                placeholder="Bet amount..."
                className={styles.amountInput}
                value={bets[match.id]?.amount || ''}
                onChange={(e) => handleBetChange(match.id, bets[match.id]?.choice || '', e.target.value)}
                min="0"
                max={balance}
              />
            </div>
          ))}
        </div>

        <button
          className={styles.submitButton}
          onClick={handleSubmitBets}
          onMouseEnter={e => e.currentTarget.classList.add(styles.submitButtonHover)}
          onMouseLeave={e => e.currentTarget.classList.remove(styles.submitButtonHover)}
        >
          <Zap size={20} />
          Place All Bets
        </button>

        {/* NPCs */}
        <div className={styles.npcSection}>
          <div className={styles.sectionTitle}>
            <Users size={20} />
            AI Players
          </div>
          <div className={styles.npcGrid}>
            {npcs.map((npc, i) => (
              <div key={i} className={styles.npcCard}>
                <div className={styles.npcName}>{npc.name}</div>
                <div className={styles.npcBalance}>{npc.balance.toLocaleString()} coins</div>
              </div>
            ))}
          </div>
        </div>

        {/* Results History */}
        {resultsHistory.length > 0 && (
          <div className={styles.npcSection}>
            <div className={styles.sectionTitle}>
              <TrendingUp size={20} />
              Recent Results
            </div>
            {resultsHistory.slice(-3).reverse().map((rh, idx) => (
              <div key={idx} className={styles.historyItem}>
                {/* Removed round number */}
                <ul className={styles.resultList}>
                  {rh.roundResults.map((r, i) => (
                    <li key={i} className={styles.resultItem}>
                      {r.match.teamA} vs {r.match.teamB}: <strong>{r.result}</strong>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FootballBettingSystem;