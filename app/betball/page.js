'use client';
import React, { useState, useEffect , useRef } from 'react';
import { useRouter } from 'next/navigation';
import Swal from "sweetalert2";
import { Coins, TrendingUp, Timer, Trophy, X , Music } from 'lucide-react';

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
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [timeLeft, setTimeLeft] = useState(300);
  const [showResults, setShowResults] = useState(false);
  const [lastResults, setLastResults] = useState([]);
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false); // 🔊 state สำหรับเพลง
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0); // 0 - 100
  const [currentTime, setCurrentTime] = useState(0); // วินาที
  const [duration, setDuration] = useState(0); // วินาที
  const [currentTrack, setCurrentTrack] = useState(0); // index ของเพลงปัจจุบัน

  const playlist = [
  { title: "ส่วนเกิน&เรื่องบนเตียง", src: "/music/boy.mp3" },
  { title: "Please", src: "/music/please.mp3" },
  { title: "เธอยัง", src: "/music/potato.mp3" }
];


  const formatTime = (s) => {
  const minutes = Math.floor(s / 60);
  const seconds = Math.floor(s % 60).toString().padStart(2,'0');
  return `${minutes}:${seconds}`;
  };

const toggleMusic = async () => {
  if (!audioRef.current) return;
  try {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      await audioRef.current.play();
      setIsPlaying(true);
    }
  } catch (err) {
    console.error("Audio play error:", err);
  }
};

const nextTrack = () => {
  setCurrentTrack((prev) => (prev + 1) % playlist.length);
};

const prevTrack = () => {
  setCurrentTrack((prev) => (prev - 1 + playlist.length) % playlist.length);
};

const handleSeek = (e) => {
  const audio = audioRef.current;
  const newTime = (e.target.value / 100) * audio.duration;
  audio.currentTime = newTime;
  setProgress(e.target.value);
};



  const generateMatches = () => {
    const m = [];
    for (let i = 0; i < 10; i++) {
      const teamA = teams[Math.floor(Math.random() * teams.length)];
      let teamB;
      do { teamB = teams[Math.floor(Math.random() * teams.length)]; } while (teamA.name === teamB.name);
      m.push({
        id: i + 1,
        teamA,
        teamB,
        odds: { home: (Math.random()*2+1.5).toFixed(2), draw: (Math.random()*1.5+3).toFixed(2), away: (Math.random()*2+1.5).toFixed(2) },
        league: teamA.league,
        kickoff: new Date(Date.now() + (i + 1) * 3600000).toLocaleTimeString('th-TH',{hour:'2-digit',minute:'2-digit'})
      });
    }
    setMatches(m);
  };

useEffect(() => {
  const token = localStorage.getItem('token');
  if (!token) {
    router.push('/login');
    return;
  }

  generateMatches();

  const audio = audioRef.current;

  // 🔹 Timer เกม (ทำงานเสมอ)
  const timer = setInterval(() => {
    setTimeLeft(prev => (prev <= 1 ? 300 : prev - 1));
  }, 1000);

  if (audio) {
    audio.src = playlist[currentTrack].src;
    audio.load();

    // ถ้าเพลงกำลังเล่น ให้เล่นเพลงใหม่ทันที
    if (isPlaying) {
      audio.play().catch(err => console.log("Autoplay blocked:", err));
    }

    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleTimeUpdate = () => {
      if (audio.duration > 0) {
        setCurrentTime(audio.currentTime);
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };
    const handleEnded = () => nextTrack(); // auto next

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      clearInterval(timer);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  } else {
    // ถ้า audio ยังไม่พร้อม ให้ cleanup timer อย่างเดียว
    return () => clearInterval(timer);
  }
}, [currentTrack, isPlaying]); // ✅ เพิ่ม currentTrack + isPlaying



  const handleBetChange=(matchId,choice,amount)=>{
    setBets(prev=>({...prev,[matchId]:{choice,amount:parseInt(amount)||0}}));
  };

  const calculatePayout=(amount,odds)=>Math.floor(amount*parseFloat(odds));

  const handleSubmitBets=()=>{
    let roundResults=[],totalWinnings=0,totalLosses=0,betCount=0;

    matches.forEach(match=>{
      const outcomeOptions=['home','draw','away'];
      const result=outcomeOptions[Math.floor(Math.random()*outcomeOptions.length)];
      const bet=bets[match.id];
      if(bet && bet.amount>0 && bet.amount<=balance){
        betCount++;
        let won=false,payout=0;
        if((bet.choice==='home' && result==='home')||(bet.choice==='draw' && result==='draw')||(bet.choice==='away' && result==='away')){
          won=true;
          const odds=bet.choice==='home'?match.odds.home:bet.choice==='draw'?match.odds.draw:match.odds.away;
          payout=calculatePayout(bet.amount,odds);
          totalWinnings+=payout;
        } else totalLosses+=bet.amount;
        roundResults.push({match,result,bet,won,payout,resultText: result==='home'?match.teamA.name:result==='draw'?'Draw':match.teamB.name});
      }
    });

    const netResult=totalWinnings-totalLosses;
    setBalance(prev=>prev+netResult);
    const xpGained=betCount*10+(netResult>0?Math.floor(netResult/100):0);
    setXp(prev=>{const newXp=prev+xpGained; setLevel(Math.floor(newXp/1000)+1); return newXp;});

    setLastResults(roundResults);
    setShowResults(true);
    setResultsHistory(prev=>[...prev,{roundResults,timestamp:new Date()}]);
    setBets({});
    generateMatches();
  };

  const handlePopup=()=>{
    if(Object.keys(bets).length===0) return;
    Swal.fire({
      title:"ยืนยันการลงเดิมพัน?",
      text:"คุณแน่ใจหรือไม่ที่จะวางเดิมพันทั้งหมด",
      icon:"question",
      showCancelButton:true,
      confirmButtonText:"ยืนยัน",
      cancelButtonText:"ปิด",
      reverseButtons:true
    }).then(result=>{if(result.isConfirmed) handleSubmitBets();});
  };

  const getTotalBetAmount=()=>Object.values(bets).reduce((t,b)=>t+(b.amount||0),0);

  const choiceColors = { home:'#4ade80', draw:'#facc15', away:'#f87171' };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#0f2027,#203a43,#2c5364)",
        padding: "20px",
        fontFamily: "system-ui,sans-serif",
      }}
    >
      <div
        style={{
          background: "linear-gradient(rgba(0, 0, 0, 0.5)",
          borderRadius: "20px",
          padding: "20px",
          marginBottom: "30px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <h1 style={{ margin: 0, color: "white", fontSize: "2em" }}>
            ⚽ FOOTBALL BETTING
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            {/* ปุ่มเปิด/ปิดเพลง */}
            <button
              onClick={toggleMusic}
              style={{
                background: "rgba(0,0,0,0.3)",
                border: "none",
                borderRadius: "50%",
                padding: "8px",
                cursor: "pointer",
              }}
            >
              <Music color={isPlaying ? "#4ade80" : "white"} />
            </button>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(0,0,0,0.2)",
                padding: "8px 12px",
                borderRadius: "12px",
              }}
            >
              <Timer size={20} color="white" />
              <span style={{ color: "white", fontWeight: "bold" }}>
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>
        </div>

        {/* ปุ่มเปิดปิด เลื่อน */}
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <button
            onClick={prevTrack}
            style={{
              background: "linear-gradient(135deg,#667eea,#764ba2)",
              color: "white",
              border: "none",
              padding: "12px",
              borderRadius: "50%",
              cursor: "pointer",
              boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
              fontSize: "18px",
              transition: "0.3s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.1)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            ⏮️
          </button>

          <button
            onClick={toggleMusic}
            style={{
              background: "linear-gradient(135deg,#ff6b6b,#ff8e53)",
              color: "white",
              border: "none",
              padding: "12px 16px",
              borderRadius: "50%",
              cursor: "pointer",
              boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
              fontSize: "18px",
              transition: "0.3s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.1)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            {isPlaying ? "⏸️" : "▶️"}
          </button>

          <button
            onClick={nextTrack}
            style={{
              background: "linear-gradient(135deg,#43e97b,#38f9d7)",
              color: "white",
              border: "none",
              padding: "12px",
              borderRadius: "50%",
              cursor: "pointer",
              boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
              fontSize: "18px",
              transition: "0.3s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.1)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            ⏭️
          </button>

          {/* Slider เลื่อนเพลง */}
          <input
            type="range"
            min="0"
            max="100"
            value={isNaN(progress) ? 0 : progress}
            onChange={(e) => {
              const audio = audioRef.current;
              if (!audio) return;
              const newTime = (e.target.value / 100) * audio.duration;
              audio.currentTime = newTime;
              setProgress(e.target.value);
            }}
            style={{
              flex: 1,
              height: "10px",
              borderRadius: "5px",
              outline: "none",
              WebkitAppearance: "none",
              cursor: "pointer",

              // แยก background property
              backgroundImage: `linear-gradient(90deg, #004d9f 0%, #a50044 50%, #ffed02 100%)`,
              backgroundSize: `${progress}% 100%`,
              backgroundRepeat: "no-repeat",
              backgroundColor: "#2c2c3c", // สีของส่วนที่เหลือ

              transition: 'background-size 0.2s linear', // ทำให้ progress smooth
            }}
          />

          {/* สำหรับ วงกลมตอนเพลงเล่น*/}

          <style jsx>{`
            input[type="range"]::-webkit-slider-thumb {
              -webkit-appearance: none;
              height: 20px;
              width: 20px;
              border-radius: 50%;
              background: #4ade80;
              border: 2px solid #fff;
              box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
              cursor: pointer;
              transition: 'background-size 0.2s linear', // ทำให้ progress smooth
            }
            input[type="range"]::-webkit-slider-thumb:hover {
              transform: scale(1.2);
            }
            input[type="range"]::-moz-range-thumb {
              height: 20px;
              width: 20px;
              border-radius: 50%;
              background: #4ade80;
              border: 2px solid #fff;
              box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
              cursor: pointer;
              transition: 'background-size 0.2s linear', // ทำให้ progress smooth
            }
          `}</style>

          <span>
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>
        <div style={{ color: "white", marginTop: "5px" }}>
          Now Playing: {playlist[currentTrack].title}
        </div>

        <audio ref={audioRef}></audio>

        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              background: "#1f1f2e",
              borderRadius: "15px",
              padding: "20px",
              color: "white",
              textAlign: "center",
              boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
            }}
          >
            <Coins size={30} color="#FFD700" />
            <h3>Balance</h3>
            <p style={{ fontSize: "1.5em" }}>{balance.toLocaleString()} ฿</p>
          </div>
          <div
            style={{
              background: "#1f1f2e",
              borderRadius: "15px",
              padding: "20px",
              color: "white",
              textAlign: "center",
              boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
            }}
          >
            <Trophy size={30} color="#FFD700" />
            <h3>Level</h3>
            <p style={{ fontSize: "1.5em" }}>{level}</p>
          </div>
          <div
            style={{
              background: "#1f1f2e",
              borderRadius: "15px",
              padding: "20px",
              color: "white",
              textAlign: "center",
              boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
            }}
          >
            <TrendingUp size={30} color="#FFD700" />
            <h3>XP</h3>
            <p style={{ fontSize: "1.5em" }}>{xp}</p>
          </div>
        </div>

        {/* Matches */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
            gap: "25px",
            marginBottom: "30px",
          }}
        >
          {matches.map((match) => (
            <div
              key={match.id}
              style={{
                background: "#1c1c2a",
                borderRadius: "15px",
                padding: "15px",
                color: "white",
                boxShadow: "0 5px 15px rgba(0,0,0,0.5)",
                transition: "0.3s",
              }}
            >
              <div
                style={{
                  marginBottom: "10px",
                  fontWeight: "bold",
                  fontSize: "1.1em",
                }}
              >
                {match.teamA.flag} {match.teamA.name} vs {match.teamB.name}{" "}
                {match.teamB.flag}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "10px",
                }}
              >
                {["home", "draw", "away"].map((choice) => (
                  <div
                    key={choice}
                    style={{
                      background:
                        bets[match.id]?.choice === choice
                          ? choiceColors[choice]
                          : "#2c2c3c",
                      color:
                        bets[match.id]?.choice === choice ? "#fff" : "#ddd",
                      padding: "10px 0",
                      borderRadius: "10px",
                      textAlign: "center",
                      flex: "1",
                      cursor: "pointer",
                      fontWeight: "bold",
                      transition: "0.2s",
                    }}
                    onClick={() =>
                      handleBetChange(
                        match.id,
                        choice,
                        bets[match.id]?.amount || 0
                      )
                    }
                  >
                    {choice.toUpperCase()} <br />{" "}
                    {choice === "home"
                      ? match.odds.home
                      : choice === "draw"
                      ? match.odds.draw
                      : match.odds.away}
                  </div>
                ))}
              </div>
              <input
                type="number"
                placeholder="Amount"
                value={bets[match.id]?.amount || ""}
                onChange={(e) =>
                  handleBetChange(
                    match.id,
                    bets[match.id]?.choice || "home",
                    e.target.value
                  )
                }
                style={{
                  marginTop: "10px",
                  width: "100%",
                  padding: "10px",
                  borderRadius: "10px",
                  border: "none",
                  outline: "none",
                  textAlign: "center",
                }}
              />
            </div>
          ))}
        </div>

        {/* Place Bet Button */}
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <button
            onClick={handlePopup}
            style={{
              background: "linear-gradient(135deg,#ff6b6b,#ff8e53)",
              color: "white",
              border: "none",
              padding: "15px 25px",
              borderRadius: "15px",
              fontSize: "1.2em",
              cursor: "pointer",
              boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
            }}
          >
            Place Bets ({getTotalBetAmount().toLocaleString()} ฿)
          </button>
        </div>

        {/* Results Popup */}
        {showResults && lastResults.length > 0 && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
              padding: "20px",
            }}
          >
            <div
              style={{
                background: "#1f1f2e",
                borderRadius: "15px",
                padding: "20px",
                width: "100%",
                maxWidth: "450px",
                boxShadow: "0 5px 20px rgba(0,0,0,0.5)",
                display: "flex",
                flexDirection: "column",
                gap: "15px",
                transform: showResults ? "translateY(0)" : "translateY(-50px)",
                opacity: showResults ? 1 : 0,
                transition: "all 0.3s ease",
              }}
            >
              {/* Header */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  color: "white",
                }}
              >
                <h2 style={{ margin: 0 }}>🏆 Round Results</h2>
                <button
                  onClick={() => setShowResults(false)}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "white",
                    cursor: "pointer",
                    fontSize: "1.2em",
                    fontWeight: "bold",
                  }}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Results */}
              {lastResults.map((res, i) => (
                <div
                  key={i}
                  style={{
                    background: "#ffffffff",
                    padding: "10px",
                    borderRadius: "10px",
                  }}
                >
                  <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
                    {res.match.teamA.name} vs {res.match.teamB.name}
                  </div>
                  <div>
                    Result:{" "}
                    <span style={{ color: res.won ? "#4ade80" : "#f87171" }}>
                      {res.resultText}
                    </span>
                  </div>
                  {res.bet && (
                    <div>
                      Your Bet:{" "}
                      <span
                        style={{
                          color: {
                            home: "#4ade80",
                            draw: "#facc15",
                            away: "#f87171",
                          }[res.bet.choice],
                        }}
                      >
                        {res.bet.choice.toUpperCase()}
                      </span>{" "}
                      {res.bet.amount} ฿ → Payout: {res.payout}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FootballBettingSystem;
