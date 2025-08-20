'use client';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import './player.css';
import './global.css';

// Enhanced players data with more information
const players = {
  "lionel-messi": {
    name: "Lionel Messi",
    position: "Forward / Right Winger",
    nationality: "Argentina",
    era: "2004–2021",
    image: "/images/ball/Messi.jpg",
    jerseyNumber: "10",
    trophies: "35",
    goals: "672",
    description: "เมสซีได้รับการยกย่องว่าเป็นหนึ่งในนักฟุตบอลที่ยิ่งใหญ่ที่สุดตลอดกาล พา บาร์ซา คว้าทุกแชมป์สำคัญ และคว้าบัลลงดอร์หลายสมัย ด้วยทักษะการเลี้ยงลูกบอลที่เหนือชั้นและการทำประตูที่น่าทึ่ง",
    highlights: [
      "บัลลงดอร์ 6 ครั้งขณะอยู่ที่บาร์ซา",
      "ชิงแชมป์ยุโรป 4 ครั้ง",
      "ลาลีกา 10 ครั้ง",
      "ผู้ทำประตูสูงสุดในประวัติศาสตร์บาร์ซา"
    ]
  },
  "neymar-jr": {
    name: "Neymar Jr",
    position: "Left Winger / Forward",
    nationality: "Brazil",
    era: "2013–2017",
    image: "/images/ball/Neymar.jpg",
    jerseyNumber: "11",
    trophies: "8",
    goals: "105",
    description: "กองหน้าชาวบราซิล หนึ่งในสามประสาน MSN ที่ทรงพลังและเล่นได้อย่างสวยงาม มีทักษะเทคนิคที่โดดเด่นและความคิดสร้างสรรค์สูง",
    highlights: [
      "ส่วนหนึ่งของ MSN ที่ทรงพลัง",
      "ชิงแชมป์ยุโรป 1 ครั้ง (2015)",
      "ลาลีกา 2 ครั้ง",
      "ผู้เล่นที่มีราคาแพงที่สุดในโลก"
    ]
  },
  "luis-suarez": {
    name: "Luis Suárez",
    position: "Center Forward",
    nationality: "Uruguay",
    era: "2014–2020",
    image: "/images/ball/Suarez.jpg",
    jerseyNumber: "9",
    trophies: "13",
    goals: "198",
    description: "กองหน้าชาวอุรุกวัย ผู้ทำประตูร่วมกับ MSN และคว้าแชมป์ลาลีกาหลายสมัย มีความแม่นยำในการยิงประตูและการทำงานร่วมกับทีมที่ยอดเยี่ยม",
    highlights: [
      "ส่วนหนึ่งของ MSN ที่ทรงพลัง",
      "ชิงแชมป์ยุโรป 1 ครั้ง (2015)",
      "ลาลีกา 4 ครั้ง",
      "Golden Boot ลาลีกา 2016"
    ]
  },
  "andres-iniesta": {
    name: "Andrés Iniesta",
    position: "Central Midfielder",
    nationality: "Spain",
    era: "2002–2018",
    image: "/images/ball/iniesta.jpg",
    jerseyNumber: "8",
    trophies: "32",
    goals: "57",
    description: "ผู้สร้างสรรค์เกมอัจฉริยะ มีบทบาทสำคัญในการคว้าแชมป์ทั้งในสโมสรและทีมชาติ ด้วยการเล่นที่ละเอียดอ่อนและการส่งลูกที่แม่นยำ",
    highlights: [
      "ชิงแชมป์ยุโรป 4 ครั้ง",
      "ลาลีกา 9 ครั้ง",
      "ประตูชัยชนะฟุตบอลโลก 2010",
      "Man of the Match ยูโร 2012"
    ]
  },
  "xavi-hernandez": {
    name: "Xavi Hernández",
    position: "Central Midfielder",
    nationality: "Spain",
    era: "1998–2015",
    image: "/images/ball/xavi.jpg",
    jerseyNumber: "6",
    trophies: "25",
    goals: "85",
    description: "กองกลางที่เป็นหัวใจของเกมบุกแบบ tiki-taka และเป็นผู้จัดการทีมคนปัจจุบัน มีวิสัยทัศน์การเล่นที่ยอดเยี่ยมและเป็นผู้นำทีมที่แท้จริง",
    highlights: [
      "ชิงแชมป์ยุโรป 4 ครั้ง",
      "ลาลีกา 8 ครั้ง",
      "ผู้จัดการทีมบาร์ซาปัจจุบัน",
      "หัวใจของ Tiki-taka"
    ]
  },
  "sergio-busquets": {
    name: "Sergio Busquets",
    position: "Defensive Midfielder",
    nationality: "Spain",
    era: "2008–2023",
    image: "/images/ball/SergioBusquets.jpg",
    jerseyNumber: "5",
    trophies: "30",
    goals: "18",
    description: "ผู้เล่นกองกลางตัวรับที่ฉลาดและมีบทบาทสำคัญในความสำเร็จของยุคทองบาร์ซา มีการอ่านเกมที่ยอดเยี่ยมและการส่งลูกที่แม่นยำ",
    highlights: [
      "ชิงแชมป์ยุโรป 3 ครั้ง",
      "ลาลีกา 9 ครั้ง",
      "กัปตันทีมคนสุดท้าย",
      "ผู้เล่นที่มีการส่งลูกแม่นที่สุด"
    ]
  },
  "jordi-alba": {
    name: "Jordi Alba",
    position: "Left Back",
    nationality: "Spain",
    era: "2012–2023",
    image: "/images/ball/JordiAlba.jpg",
    jerseyNumber: "18",
    trophies: "23",
    goals: "27",
    description: "แบ็คซ้ายจอมบุกที่มีความเร็วสูงและประสานงานยอดเยี่ยมกับเมสซี มีการเซ็นเตอร์ลูกที่แม่นยำและการป้องกันที่มั่นคง",
    highlights: [
      "ชิงแชมป์ยุโรป 1 ครั้ง",
      "ลาลีกา 6 ครั้ง",
      "แอสซิสต์จากแบ็ค 40+ ครั้ง",
      "ความเร็วสูงสุด 35 กม./ชม."
    ]
  },
  "gerard-pique": {
    name: "Gerard Piqué",
    position: "Center Back",
    nationality: "Spain",
    era: "2008–2022",
    image: "/images/ball/GerardPique.jpg",
    jerseyNumber: "3",
    trophies: "30",
    goals: "53",
    description: "เซ็นเตอร์ฮาล์ฟที่แข็งแกร่ง มีส่วนสำคัญในแชมป์ยุโรปและลาลีกาหลายสมัย มีการเล่นลูกบอลและการทำประตูจากเซ็ตพีซที่ดี",
    highlights: [
      "ชิงแชมป์ยุโรป 3 ครั้ง",
      "ลาลีกา 8 ครั้ง",
      "ประตูจากเซ็นเตอร์แบ็ค 50+ ประตู",
      "ผู้เล่นตัวสำคัญยุคทอง"
    ]
  },
  "carles-puyol": {
    name: "Carles Puyol",
    position: "Center Back",
    nationality: "Spain",
    era: "1999–2014",
    image: "/images/ball/CarlesPuyol.jpg",
    jerseyNumber: "5",
    trophies: "21",
    goals: "18",
    description: "กัปตันผู้ยิ่งใหญ่ จิตวิญญาณแห่งการป้องกันและความทุ่มเทแบบไม่มีข้อแม้ เป็นแรงบันดาลใจให้กับทีมและแฟนบอลทั่วโลก",
    highlights: [
      "ชิงแชมป์ยุโรป 3 ครั้ง",
      "ลาลีกา 6 ครั้ง",
      "กัปตันยุคทองบาร์ซา",
      "ประตูสำคัญเซมิไฟนอลบอลโลก"
    ]
  },
  "dani-alves": {
    name: "Dani Alves",
    position: "Right Back",
    nationality: "Brazil",
    era: "2008–2016, 2021–2022",
    image: "/images/ball/DaniAlves.jpg",
    jerseyNumber: "2",
    trophies: "23",
    goals: "23",
    description: "แบ็คขวาจอมบุก ผู้คว้าแชมป์มากที่สุดในประวัติศาสตร์นักฟุตบอล มีทักษะการบุกและการเซ็นเตอร์ลูกที่ยอดเยี่ยม",
    highlights: [
      "ชิงแชมป์ยุโรป 3 ครั้ง",
      "ลาลีกา 6 ครั้ง",
      "แชมป์มากที่สุดในประวัติศาสตร์",
      "แอสซิสต์จากแบ็ค 100+ ครั้ง"
    ]
  },
  "marc-andre-ter-stegen": {
    name: "Marc-André ter Stegen",
    position: "Goalkeeper",
    nationality: "Germany",
    era: "2014–present",
    image: "/images/ball/MarcAndreterStegen.jpg",
    jerseyNumber: "1",
    trophies: "15",
    goals: "0",
    description: "ผู้รักษาประตูมือหนึ่งของทีม มีบทบาทสำคัญในความสำเร็จของทีมช่วงยุคหลัง ด้วยการเซฟที่ยอดเยี่ยมและการเล่นด้วยเท้าที่ดี",
    highlights: [
      "ชิงแชมป์ยุโรป 1 ครั้ง",
      "ลาลีกา 5 ครั้ง",
      "Clean Sheet 100+ ครั้ง",
      "ผู้รักษาประตูที่เล่นด้วยเท้าดี"
    ]
  },
};

// Loading Component
const LoadingSpinner = () => (
  <div className="loading">
    <div className="spinner"></div>
  </div>
);

// Error Component
const ErrorMessage = ({ message }) => (
  <div className="player-container">
    <div className="error-message">
      <h2>❌ {message}</h2>
      <p>ไม่พบข้อมูลผู้เล่นที่ค้นหา</p>
    </div>
  </div>
);

// Info Item Component
const InfoItem = ({ label, value, icon }) => (
  <div className="info-item">
    <span className={`info-label ${icon}`}>
      {label}
    </span>
    <span className="info-value">{value}</span>
  </div>
);

// Highlights Component
const PlayerHighlights = ({ highlights }) => (
  <div className="highlights-section">
    <h3 className="highlights-title">🏆 ความสำเร็จที่โดดเด่น</h3>
    <ul className="highlights-list">
      {highlights?.map((highlight, index) => (
        <li key={index} className="highlight-item">
          <span className="highlight-bullet">⚡</span>
          {highlight}
        </li>
      ))}
    </ul>
  </div>
);

// Stats Component
const PlayerStats = ({ player }) => (
  <div className="stats-grid">
    <div className="stat-card">
      <div className="stat-number">{player.trophies}</div>
      <div className="stat-label">🏆 แชมป์</div>
    </div>
    <div className="stat-card">
      <div className="stat-number">{player.goals}</div>
      <div className="stat-label">⚽ ประตู</div>
    </div>
    <div className="stat-card">
      <div className="stat-number">{player.jerseyNumber}</div>
      <div className="stat-label">👕 เสื้อ</div>
    </div>
  </div>
);

export default function PlayerPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    // Simulate loading time for better UX
    const timer = setTimeout(() => {
      const playerData = players[params.name?.toLowerCase()];
      setPlayer(playerData);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [params.name]);

  // Handle back button
  const handleBack = () => {
    router.push('/');
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape') {
        handleBack();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Loading state
  if (loading) {
    return <LoadingSpinner />;
  }

  // Error state
  if (!player) {
    return <ErrorMessage message="ไม่พบผู้เล่น" />;
  }

  return (
    <>      
      <div className="player-container">
        <article className="card">
          {/* Player Image Section */}
          <div className="player-image-container">
            <Image 
              src={player.image} 
              alt={`${player.name} - Barcelona Legend`}
              width={300} 
              height={300} 
              className="player-image"
              priority
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            />
          </div>

          {/* Player Name */}
          <h1 className="player-name">{player.name}</h1>

          {/* Player Stats */}
          <PlayerStats player={player} />

          {/* Player Info */}
          <div className="info-section">
            <InfoItem 
              label="ตำแหน่ง" 
              value={player.position} 
              icon="position-icon"
            />
            <InfoItem 
              label="สัญชาติ" 
              value={player.nationality} 
              icon="nationality-icon"
            />
            <InfoItem 
              label="ช่วงเวลา" 
              value={player.era} 
              icon="era-icon"
            />
          </div>

          {/* Player Description */}
          <div className="player-description">
            {player.description}
          </div>

          {/* Player Highlights */}
          <PlayerHighlights highlights={player.highlights} />

          {/* Action Buttons */}
          <div className="action-buttons">
            <button 
              className="btn btn-primary" 
              onClick={handleBack}
            >
              <span>← กลับหน้าหลัก</span>
            </button>
            <button 
              className="btn btn-secondary" 
              onClick={() => window.print()}
            >
              <span>🖨️ พิมพ์</span>
            </button>
          </div>
        </article>
      </div>
    </>
  );
}