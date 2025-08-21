'use client';
import React, { useState, useEffect } from 'react';
import Swal from "sweetalert2";
import { Coins, Users, TrendingUp, Zap, Timer, Trophy, Target, DollarSign, Activity, Star } from 'lucide-react';

const teams = [
  { name: 'Manchester United', flag: '🇬🇧', league: 'EPL' },
  { name: 'Liverpool', flag: '🇬🇧', league: 'EPL' },
  { name: 'FC Barcelona', flag: '🇪🇸', league: 'La Liga' },
  { name: 'Real Madrid', flag: '🇪🇸', league: 'La Liga' },
  { name: 'Bayern Munich', flag: '🇩🇪', league: 'Bundesliga' },
  { name: 'Borussia Dortmund', flag: '🇩🇪', league: 'Bundesliga' },
  { name: 'Paris Saint-Germain', flag: '🇫🇷', league: 'Ligue 1' },
  { name: 'Juventus', flag: '🇮🇹', league: 'Serie A' },
  { name: 'AC Milan', flag: '🇮🇹', league: 'Serie A' },
  { name: 'Chelsea', flag: '🇬🇧', league: 'EPL' },
  { name: 'Manchester City', flag: '🇬🇧', league: 'EPL' },
  { name: 'Arsenal', flag: '🇬🇧', league: 'EPL' }
];

const FootballBettingSystem = () => {
  const [balance, setBalance] = useState(10000);
  const [bets, setBets] = useState({});
  const [matches, setMatches] = useState([]);
  const [resultsHistory, setResultsHistory] = useState([]);
  const [npcs, setNpcs] = useState([]);
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [hoveredMatch, setHoveredMatch] = useState(null);
  const [timeLeft, setTimeLeft] = useState(300);
  const [showResults, setShowResults] = useState(false);
  const [lastResults, setLastResults] = useState([]);
  const [totalProfit, setTotalProfit] = useState(0);

  useEffect(() => {
    initNPCs();
    generateMatches();
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          return 300;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePopup = () => {
    if (Object.keys(bets).length === 0) return;

    Swal.fire({
      title: "ยืนยันการลงเดิมพัน?",
      text: "คุณแน่ใจหรือไม่ที่จะวางเดิมพันทั้งหมด",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ปิด", // ✅ ปุ่มปิด popup
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        handleSubmitBets(); // ✅ เรียกฟังก์ชันวางเดิมพัน
      }
    });
  };

  const initNPCs = () => {
    const npcPlayers = [
      { name: 'BettingKing', balance: 15000, risk: 0.8, avatar: '👑', status: 'Pro' },
      { name: 'LuckyStrike', balance: 8500, risk: 0.6, avatar: '🍀', status: 'Expert' },
      { name: 'SafeBetter', balance: 12000, risk: 0.3, avatar: '🛡️', status: 'Conservative' },
      { name: 'RiskTaker', balance: 3000, risk: 0.9, avatar: '🎯', status: 'Aggressive' },
      { name: 'TheAnalyst', balance: 18000, risk: 0.5, avatar: '📊', status: 'Strategic' }
    ];
    setNpcs(npcPlayers);
  };

  const generateMatches = () => {
    let m = [];
    for (let i = 0; i < 6; i++) {
      const teamA = teams[Math.floor(Math.random() * teams.length)];
      let teamB;
      do { 
        teamB = teams[Math.floor(Math.random() * teams.length)] 
      } while (teamA.name === teamB.name);
      
      const homeWinOdds = (Math.random() * 2 + 1.5).toFixed(2);
      const drawOdds = (Math.random() * 1.5 + 3).toFixed(2);
      const awayWinOdds = (Math.random() * 2 + 1.5).toFixed(2);
      
      m.push({ 
        id: i + 1, 
        teamA, 
        teamB,
        odds: {
          home: homeWinOdds,
          draw: drawOdds,
          away: awayWinOdds
        },
        league: teamA.league,
        kickoff: new Date(Date.now() + (i + 1) * 3600000).toLocaleTimeString('th-TH', { 
          hour: '2-digit', 
          minute: '2-digit' 
        })
      });
    }
    setMatches(m);
  };

  const handleBetChange = (matchId, choice, amount) => {
    setBets(prev => ({ ...prev, [matchId]: { choice, amount: parseInt(amount) || 0 } }));
  };

  const calculatePayout = (amount, odds) => {
    return Math.floor(amount * parseFloat(odds));
  };

  const handleSubmitBets = () => {
    let roundResults = [];
    let totalWinnings = 0;
    let totalLosses = 0;
    let betCount = 0;

    matches.forEach(match => {
      const outcomeOptions = ['home', 'draw', 'away'];
      const result = outcomeOptions[Math.floor(Math.random() * outcomeOptions.length)];
      
      const bet = bets[match.id];
      
      if (bet && bet.amount > 0 && bet.amount <= balance) {
        betCount++;
        let won = false;
        let payout = 0;
        
        if ((bet.choice === 'home' && result === 'home') ||
            (bet.choice === 'draw' && result === 'draw') ||
            (bet.choice === 'away' && result === 'away')) {
          won = true;
          const odds = bet.choice === 'home' ? match.odds.home : 
                      bet.choice === 'draw' ? match.odds.draw : match.odds.away;
          payout = calculatePayout(bet.amount, odds);
          totalWinnings += payout;
        } else {
          totalLosses += bet.amount;
        }
        
        roundResults.push({
          match,
          result,
          bet,
          won,
          payout,
          resultText: result === 'home' ? match.teamA.name : 
                     result === 'draw' ? 'Draw' : match.teamB.name
        });
      }
    });

    const netResult = totalWinnings - totalLosses;
    setBalance(prev => prev + netResult);
    setTotalProfit(prev => prev + netResult);
    
    const xpGained = betCount * 10 + (netResult > 0 ? Math.floor(netResult / 100) : 0);
    setXp(prev => {
      const newXp = prev + xpGained;
      const newLevel = Math.floor(newXp / 1000) + 1;
      setLevel(newLevel);
      return newXp;
    });

    npcs.forEach(npc => {
      const npcBets = Math.floor(Math.random() * 3) + 1;
      let npcResult = 0;
      for (let i = 0; i < npcBets; i++) {
        const amount = Math.floor(npc.balance * npc.risk * 0.1);
        const won = Math.random() > 0.6;
        if (won) {
          npcResult += amount * 2;
        } else {
          npcResult -= amount;
        }
      }
      npc.balance = Math.max(0, npc.balance + npcResult);
    });

    setLastResults(roundResults);
    setShowResults(true);
    setResultsHistory(prev => [...prev, { roundResults, timestamp: new Date() }]);
    setBets({});
    generateMatches();
    setNpcs([...npcs]);

    setTimeout(() => setShowResults(false), 8000);
  };

  const getTotalBetAmount = () => {
    return Object.values(bets).reduce((total, bet) => total + (bet.amount || 0), 0);
  };

  const getPotentialPayout = () => {
    return Object.entries(bets).reduce((total, [matchId, bet]) => {
      if (bet.amount > 0 && bet.choice) {
        const match = matches.find(m => m.id == matchId);
        if (match) {
          const odds = bet.choice === 'home' ? match.odds.home :
                      bet.choice === 'draw' ? match.odds.draw : match.odds.away;
          return total + calculatePayout(bet.amount, parseFloat(odds));
        }
      }
      return total;
    }, 0);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '20px',
        padding: '30px',
        marginBottom: '30px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
        border: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{
              background: 'linear-gradient(135deg, #ff6b6b, #ff8e53)',
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '30px'
            }}>
              ⚽
            </div>
            <div>
              <h1 style={{
                margin: 0,
                color: 'white',
                fontSize: '2.5em',
                fontWeight: 'bold',
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
              }}>
                FOOTBALL BETTING
              </h1>
              <div style={{
                color: 'rgba(255,255,255,0.8)',
                fontSize: '1.1em',
                marginTop: '5px'
              }}>
                Live Sports Betting Platform
              </div>
            </div>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            background: 'rgba(0,0,0,0.2)',
            padding: '15px 20px',
            borderRadius: '15px',
            backdropFilter: 'blur(10px)'
          }}>
            <Timer size={24} color="white" />
            <div>
              <div style={{ color: 'white', fontSize: '1.8em', fontWeight: 'bold' }}>
                {formatTime(timeLeft)}
              </div>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9em' }}>
                Next Round
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Dashboard */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #11998e, #38ef7d)',
          borderRadius: '15px',
          padding: '25px',
          color: 'white',
          boxShadow: '0 10px 30px rgba(17, 153, 142, 0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '15px'
        }}>
          <DollarSign size={32} />
          <div>
            <div style={{ fontSize: '2em', fontWeight: 'bold' }}>
              ฿{balance.toLocaleString()}
            </div>
            <div style={{ opacity: 0.9, fontSize: '0.9em' }}>Balance</div>
          </div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          borderRadius: '15px',
          padding: '25px',
          color: 'white',
          boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '15px'
        }}>
          <Trophy size={32} />
          <div>
            <div style={{ fontSize: '2em', fontWeight: 'bold' }}>
              {level}
            </div>
            <div style={{ opacity: 0.9, fontSize: '0.9em' }}>Level</div>
          </div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #ff6b6b, #ff8e53)',
          borderRadius: '15px',
          padding: '25px',
          color: 'white',
          boxShadow: '0 10px 30px rgba(255, 107, 107, 0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '15px'
        }}>
          <Activity size={32} />
          <div>
            <div style={{ fontSize: '2em', fontWeight: 'bold' }}>
              ฿{totalProfit >= 0 ? '+' : ''}{totalProfit.toLocaleString()}
            </div>
            <div style={{ opacity: 0.9, fontSize: '0.9em' }}>Total P&L</div>
          </div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #00ffb3ff, #ffffffff)',
          borderRadius: '15px',
          padding: '25px',
          color: 'white',
          boxShadow: '0 10px 30px rgba(30, 255, 0, 0.3)',
          display: 'flex',
          alignItems: 'center',
          gap: '15px'
        }}>
          <Star size={32} />
          <div>
            <div style={{ fontSize: '2em', fontWeight: 'bold' }}>
              {xp.toLocaleString()}
            </div>
            <div style={{ opacity: 0.9, fontSize: '0.9em' }}>XP Points</div>
          </div>
        </div>
      </div>

      {/* Betting Summary */}
      {getTotalBetAmount() > 0 && (
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '15px',
          padding: '20px',
          marginBottom: '20px',
          border: '1px solid rgba(255,255,255,0.2)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ color: 'white' }}>
            <span style={{ fontSize: '1.1em', fontWeight: 'bold' }}>
              Total Stake: ฿{getTotalBetAmount().toLocaleString()}
            </span>
            <span style={{ marginLeft: '20px', opacity: 0.8 }}>
              Potential Win: ฿{getPotentialPayout().toLocaleString()}
            </span>
          </div>
          <div style={{
            background: getPotentialPayout() > getTotalBetAmount() ? '#27ae60' : '#e74c3c',
            padding: '8px 16px',
            borderRadius: '20px',
            color: 'white',
            fontSize: '0.9em'
          }}>
            {getPotentialPayout() > getTotalBetAmount() ? 
              `+฿${(getPotentialPayout() - getTotalBetAmount()).toLocaleString()}` :
              'No Profit'
            }
          </div>
        </div>
      )}

      {/* Results Modal */}
{showResults && lastResults.length > 0 && (
  <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px'
  }}>
    <div style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: '20px',
      padding: '40px',
      maxWidth: '600px',
      width: '100%',
      maxHeight: '80vh',
      overflow: 'auto',
      boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
      position: 'relative' // ✅ สำคัญเพื่อวางปุ่มปิด
    }}>
      {/* ปุ่มปิด */}
      <button
        onClick={() => setShowResults(false)}
        style={{
          position: 'absolute',
          top: '15px',
          right: '15px',
          background: 'rgba(255,255,255,0.2)',
          border: 'none',
          borderRadius: '50%',
          width: '35px',
          height: '35px',
          color: 'white',
          fontSize: '18px',
          cursor: 'pointer'
        }}
      >
        ✖
      </button>

      <h2 style={{ color: 'white', textAlign: 'center', marginBottom: '30px' }}>
        🎯 Betting Results
      </h2>

      {lastResults.map((result, idx) => (
        <div key={idx} style={{
          background: result.won ? 'rgba(39, 174, 96, 0.2)' : 'rgba(231, 76, 60, 0.2)',
          border: `2px solid ${result.won ? '#27ae60' : '#e74c3c'}`,
          borderRadius: '10px',
          padding: '15px',
          marginBottom: '15px',
          color: 'white'
        }}>
          <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
            {result.match.teamA.flag} {result.match.teamA.name} vs {result.match.teamB.name} {result.match.teamB.flag}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Result: <strong>{result.resultText}</strong></span>
            <span style={{
              background: result.won ? '#27ae60' : '#e74c3c',
              padding: '5px 10px',
              borderRadius: '15px',
              fontSize: '0.9em'
            }}>
              {result.won ? `+฿${result.payout.toLocaleString()}` : `-฿${result.bet.amount.toLocaleString()}`}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
)}


      {/* Matches Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '25px',
        marginBottom: '30px'
      }}>
        {matches.map(match => (
          <div 
            key={match.id}
            style={{
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(15px)',
              borderRadius: '20px',
              padding: '25px',
              border: '1px solid rgba(255,255,255,0.2)',
              boxShadow: hoveredMatch === match.id ? '0 15px 35px rgba(0,0,0,0.3)' : '0 10px 25px rgba(0,0,0,0.2)',
              transform: hoveredMatch === match.id ? 'translateY(-5px)' : 'translateY(0)',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={() => setHoveredMatch(match.id)}
            onMouseLeave={() => setHoveredMatch(null)}
          >
            {/* Match Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
              paddingBottom: '15px',
              borderBottom: '1px solid rgba(255,255,255,0.2)'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #ff6b6b, #ff8e53)',
                padding: '5px 12px',
                borderRadius: '15px',
                fontSize: '0.8em',
                color: 'white',
                fontWeight: 'bold'
              }}>
                {match.league}
              </div>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9em' }}>
                ⏰ {match.kickoff}
              </div>
            </div>

            {/* Teams */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '25px'
            }}>
              <div style={{ textAlign: 'center', flex: 1 }}>
                <div style={{ fontSize: '2em', marginBottom: '5px' }}>
                  {match.teamA.flag}
                </div>
                <div style={{ 
                  color: 'white', 
                  fontWeight: 'bold',
                  fontSize: '1.1em'
                }}>
                  {match.teamA.name.length > 15 ? 
                    match.teamA.name.split(' ')[0] : 
                    match.teamA.name
                  }
                </div>
              </div>
              
              <div style={{
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                padding: '10px 20px',
                borderRadius: '25px',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '1.2em'
              }}>
                VS
              </div>
              
              <div style={{ textAlign: 'center', flex: 1 }}>
                <div style={{ fontSize: '2em', marginBottom: '5px' }}>
                  {match.teamB.flag}
                </div>
                <div style={{ 
                  color: 'white', 
                  fontWeight: 'bold',
                  fontSize: '1.1em'
                }}>
                  {match.teamB.name.length > 15 ? 
                    match.teamB.name.split(' ')[0] : 
                    match.teamB.name
                  }
                </div>
              </div>
            </div>

            {/* Betting Options */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: '10px',
              marginBottom: '20px'
            }}>
              {[
                { key: 'home', label: 'Home Win', odds: match.odds.home },
                { key: 'draw', label: 'Draw', odds: match.odds.draw },
                { key: 'away', label: 'Away Win', odds: match.odds.away }
              ].map(option => (
                <button
                  key={option.key}
                  style={{
                    background: bets[match.id]?.choice === option.key ? 
                      'linear-gradient(135deg, #27ae60, #2ecc71)' : 
                      'rgba(255,255,255,0.1)',
                    border: bets[match.id]?.choice === option.key ?
                      '2px solid #27ae60' :
                      '2px solid rgba(255,255,255,0.3)',
                    borderRadius: '12px',
                    padding: '15px',
                    color: 'white',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    backdropFilter: 'blur(10px)'
                  }}
                  onClick={() => handleBetChange(match.id, option.key, bets[match.id]?.amount || 0)}
                >
                  <div style={{ fontSize: '0.9em', marginBottom: '5px', opacity: 0.8 }}>
                    {option.label}
                  </div>
                  <div style={{ fontSize: '1.3em', fontWeight: 'bold' }}>
                    {option.odds}
                  </div>
                </button>
              ))}
            </div>
            
            {/* Bet Amount Input */}
            <div style={{ marginBottom: '15px' }}>
              <input
                type="number"
                placeholder="Enter bet amount..."
                style={{
                  width: '100%',
                  padding: '15px',
                  borderRadius: '12px',
                  border: '2px solid rgba(255,255,255,0.3)',
                  background: 'rgba(255,255,255,0.1)',
                  color: 'white',
                  fontSize: '1.1em',
                  backdropFilter: 'blur(10px)',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
                value={bets[match.id]?.amount || ''}
                onChange={(e) => handleBetChange(match.id, bets[match.id]?.choice || '', e.target.value)}
                min="0"
                max={balance}
              />
            </div>

            {/* Potential Payout */}
            {bets[match.id]?.amount > 0 && bets[match.id]?.choice && (
              <div style={{
                background: 'rgba(39, 174, 96, 0.2)',
                border: '1px solid #27ae60',
                borderRadius: '8px',
                padding: '10px',
                color: 'white',
                textAlign: 'center'
              }}>
                Potential Win: <strong>
                  ฿{calculatePayout(
                    bets[match.id].amount,
                    bets[match.id].choice === 'home' ? match.odds.home :
                    bets[match.id].choice === 'draw' ? match.odds.draw : match.odds.away
                  ).toLocaleString()}
                </strong>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Place Bets Button */}
    <div style={{ textAlign: "center", marginBottom: "30px" }}>
      <button
        style={{
          background:
            Object.keys(bets).length > 0
              ? "linear-gradient(135deg, #ff6b6b, #ff8e53)"
              : "rgba(255,255,255,0.3)",
          border: "none",
          borderRadius: "25px",
          padding: "20px 50px",
          color: "white",
          fontSize: "1.3em",
          fontWeight: "bold",
          cursor: Object.keys(bets).length > 0 ? "pointer" : "not-allowed",
          boxShadow:
            Object.keys(bets).length > 0
              ? "0 15px 35px rgba(255, 107, 107, 0.4)"
              : "none",
          transition: "all 0.3s ease",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          margin: "0 auto",
          backdropFilter: "blur(10px)",
        }}
        onClick={handlePopup}
        disabled={Object.keys(bets).length === 0}
      >
        <Zap size={24} />
        PLACE ALL BETS
      </button>
    </div>
  );

      {/* AI Players Leaderboard */}
      <div style={{
        background: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(15px)',
        borderRadius: '20px',
        padding: '30px',
        marginBottom: '30px',
        border: '1px solid rgba(255,255,255,0.2)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '15px',
          marginBottom: '25px'
        }}>
          <Users size={24} color="white" />
          <h2 style={{ color: 'white', margin: 0 }}>AI Players Leaderboard</h2>
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '15px'
        }}>
          {npcs.sort((a, b) => b.balance - a.balance).map((npc, i) => (
            <div key={i} style={{
              background: i === 0 ? 'linear-gradient(135deg, #f39c12, #e67e22)' :
                         i === 1 ? 'linear-gradient(135deg, #95a5a6, #7f8c8d)' :
                         i === 2 ? 'linear-gradient(135deg, #e67e22, #d35400)' :
                         'rgba(255,255,255,0.1)',
              borderRadius: '15px',
              padding: '20px',
              textAlign: 'center',
              border: '1px solid rgba(255,255,255,0.2)',
              position: 'relative'
            }}>
              {i < 3 && (
                <div style={{
                  position: 'absolute',
                  top: '-10px',
                  right: '-10px',
                  background: i === 0 ? '#f1c40f' : i === 1 ? '#95a5a6' : '#e67e22',
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.8em',
                  fontWeight: 'bold',
                  color: 'white'
                }}>
                  #{i + 1}
                </div>
              )}
              <div style={{ fontSize: '2em', marginBottom: '10px' }}>
                {npc.avatar}
              </div>
              <div style={{ color: 'white', fontWeight: 'bold', marginBottom: '8px' }}>
                {npc.name}
              </div>
              <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9em', marginBottom: '8px' }}>
                {npc.status}
              </div>
              <div style={{ color: 'white', fontSize: '1.2em', fontWeight: 'bold' }}>
                ฿{npc.balance.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Results History */}
      {resultsHistory.length > 0 && (
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(15px)',
          borderRadius: '20px',
          padding: '30px',
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            marginBottom: '25px'
          }}>
            <TrendingUp size={24} color="white" />
            <h2 style={{ color: 'white', margin: 0 }}>Recent Match Results</h2>
          </div>
          
          <div style={{ maxHeight: '300px', overflow: 'auto' }}>
            {resultsHistory.slice(-5).reverse().map((rh, idx) => (
              <div key={idx} style={{
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '10px',
                padding: '15px',
                marginBottom: '15px',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                <div style={{ 
                  color: 'rgba(255,255,255,0.7)', 
                  fontSize: '0.9em', 
                  marginBottom: '10px' 
                }}>
                  {rh.timestamp?.toLocaleString('th-TH') || 'Recent'}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {rh.roundResults.map((r, i) => (
                    <div key={i} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      color: 'white',
                      fontSize: '0.95em'
                    }}>
                      <span>
                        {r.match.teamA.name} vs {r.match.teamB.name}
                      </span>
                      <span style={{
                        background: 'rgba(102, 126, 234, 0.3)',
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '0.85em'
                      }}>
                        {r.resultText}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FootballBettingSystem;