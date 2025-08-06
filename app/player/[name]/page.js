'use client';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import './player.css';

const players = {
  "lionel-messi": {
    name: "Lionel Messi",
    position: "Forward",
    nationality: "Argentina",
    era: "2004–2021",
    image: "/images/ball/Messi.jpg",
    description:
      "เมสซีได้รับการยกย่องว่าเป็นหนึ่งในนักฟุตบอลที่ยิ่งใหญ่ที่สุดตลอดกาล พา บาร์ซา คว้าทุกแชมป์สำคัญ และคว้าบัลลงดอร์หลายสมัย"
  },
    "neymar-jr": {
    name: "Neymar Jr",
    position: "Forward",
    era: "2013–2017",
    image: "/images/ball/Neymar.jpg",
    description:
      "กองหน้าชาวบราซิล หนึ่งในสามประสาน MSN ที่ทรงพลังและเล่นได้อย่างสวยงาม"
  },
  "luis-suarez": {
    name: "Luis Suárez",
    position: "Forward",
    era: "2014–2020",
    image: "/images/ball/Suarez.jpg",
    description:
      "กองหน้าชาวอุรุกวัย ผู้ทำประตูร่วมกับ MSN และคว้าแชมป์ลาลีกาหลายสมัย"
  },    
  "andres-iniesta": {
    name: "Andres Iniesta",
    position: "Midfielder",
    era: "2002–2018",
    image: "/images/ball/iniesta.jpg",
    description:
      "ผู้สร้างสรรค์เกมอัจฉริยะ มีบทบาทสำคัญในการคว้าแชมป์ทั้งในสโมสรและทีมชาติ"
  },
  "xavi-hernandez": {
    name: "Xavi Hernandez",
    position: "Midfielder",
    era: "1998–2015",
    image: "/images/ball/xavi.jpg",
    description:
      "กองกลางที่เป็นหัวใจของเกมบุกแบบ tiki-taka และเป็นผู้จัดการทีมคนปัจจุบัน"
    },
  "sergio-busquets": {
    name: "Sergio Busquets",
    position: "Midfielder",
    era: "2008–2023",
    image: "/images/ball/SergioBusquets.jpg",
    description:
      "ผู้เล่นกองกลางตัวรับที่ฉลาดและมีบทบาทสำคัญในความสำเร็จของยุคทองบาร์ซา"
  },
  "jordi-alba": {
    name: "Jordi Alba",
    position: "Left Back",
    era: "2012–2023",
    image: "/images/ball/JordiAlba.jpg",
    description:
      "แบ็คซ้ายจอมบุกที่มีความเร็วสูงและประสานงานยอดเยี่ยมกับเมสซี"
  },
  "gerard-pique": {
    name: "Gerard Piqué",
    position: "Defender",
    era: "2008–2022",
    image: "/images/ball/GerardPique.jpg",
    description:
      "เซ็นเตอร์ฮาล์ฟที่แข็งแกร่ง มีส่วนสำคัญในแชมป์ยุโรปและลาลีกาหลายสมัย"
  },
  "carles-puyol": {
    name: "Carles Puyol",
    position: "Defender",
    era: "1999–2014",
    image: "/images/ball/CarlesPuyol.jpg",
    description:
      "กัปตันผู้ยิ่งใหญ่ จิตวิญญาณแห่งการป้องกันและความทุ่มเทแบบไม่มีข้อแม้"
  },
  "dani-alves": {
    name: "Dani Alves",
    position: "Right Back",
    era: "2008–2016",
    image: "/images/ball/DaniAlves.jpg",
    description:
      "แบ็คขวาจอมบุก ผู้คว้าแชมป์มากที่สุดในประวัติศาสตร์นักฟุตบอล"
  },
  "marc-andre-ter-stegen": {
    name: "Marc-André ter Stegen",
    position: "Goalkeeper",
    era: "2014–present",
    image: "/images/ball/MarcAndreterStegen.jpg",
    description:
      "ผู้รักษาประตูมือหนึ่งของทีม มีบทบาทสำคัญในความสำเร็จของทีมช่วงยุคหลัง"
  },
};

export default function PlayerPage() {
  const params = useParams();
  const player = players[params.name?.toLowerCase()];

  if (!player) return <div className="player-container">Player not found</div>;

  return (
    <div className="player-container">
      <div className="card">
        <Image 
          src={player.image} 
          alt={player.name} 
          width={300} 
          height={300} 
          className="player-image"
        />
        <h1>{player.name}</h1>
        <p><strong>Position:</strong> {player.position}</p>
        <p><strong>Era:</strong> {player.era}</p>
        <p>{player.description}</p>
      </div>
    </div>
  );
}