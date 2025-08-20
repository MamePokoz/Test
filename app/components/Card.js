'use client';
import React from 'react';
import './BeautifulFootballCards.css'; 
import { useRouter } from "next/navigation";

const midfielderCards = [
  {
    id: 1,
    title: "Xavi Hernández",
    text: "Xavi Hernández, often simply called Xavi, is a Spanish football manager and former player, widely regarded as one of the greatest midfielders of all time. His vision and passing ability revolutionized modern football.",
    img: "/images/ball/xavi.jpg",
    slug: 'xavi-hernandez',
    position: "Central Midfielder",
    nationality: "Spain"
  },
  {
    id: 2,
    title: "Sergio Busquets",
    text: "Sergio Busquets is a Spanish professional footballer known for his exceptional defensive midfield play, particularly his tactical intelligence, accurate passing, and ability to control the game's tempo.",
    img: "/images/ball/SergioBusquets.jpg",
    slug: 'sergio-busquets',
    position: "Defensive Midfielder",
    nationality: "Spain"
  },
  {
    id: 3,
    title: "Andrés Iniesta",
    text: "Andrés Iniesta is a Spanish professional footballer, widely regarded as one of the greatest midfielders of all time. His dribbling skills and creativity made him a Barcelona legend.",
    img: "/images/ball/iniesta.jpg",
    slug: 'andres-iniesta',
    position: "Attacking Midfielder",
    nationality: "Spain"
  }
];

const forwardCards = [
  {
    id: 4,
    title: "Neymar Jr",
    text: "Neymar Jr. is a highly skilled and versatile Brazilian professional footballer known for his pace, dribbling, finishing, and ability to play with both feet.",
    img: "/images/ball/Neymar.jpg",
    slug: 'neymar-Jr',
    position: "Left Winger",
    nationality: "Brazil"
  },
  {
    id: 5,
    title: "Luis Suárez",
    text: "Luis Suárez is a Uruguayan professional footballer, widely regarded as one of the best strikers of his generation with incredible finishing and work rate.",
    img: "/images/ball/Suarez.jpg",
    slug: 'luis-suarez',
    position: "Center Forward",
    nationality: "Uruguay"
  },
  {
    id: 6,
    title: "Lionel Messi",
    text: "Lionel Messi is an Argentine professional footballer widely regarded as one of the greatest players of all time. His dribbling, vision, and goal-scoring ability are unmatched.",
    img: "/images/ball/Messi.jpg",
    slug: 'lionel-messi',
    position: "Right Winger / False 9",
    nationality: "Argentina"
  },
];

const DefenderCards = [
  {
    id: 7,
    title: "Jordi Alba",
    text: "Jordi Alba is a Spanish professional footballer known for his speed and attacking prowess as a left-back. His crosses and overlapping runs are crucial to Barcelona's play style.",
    img: "/images/ball/JordiAlba.jpg",
    slug: 'jordi-alba',
    position: "Left-Back",
    nationality: "Spain"
  },
  {
    id: 8,
    title: "Gerard Piqué",
    text: "Gerard Piqué was a Spanish professional footballer who played as a center-back. His leadership, aerial ability, and ball-playing skills made him a Barcelona icon.",
    img: "/images/ball/GerardPique.jpg",
    slug: 'gerard-pique',
    position: "Center-Back",
    nationality: "Spain"
  },
  {
    id: 9,
    title: "Carles Puyol",
    text: "Carles Puyol was a Spanish professional footballer who played his entire career for FC Barcelona as a central defender. Known for his leadership and never-give-up attitude.",
    img: "/images/ball/CarlesPuyol.jpg",
    slug: 'carles-puyol',
    position: "Center-Back",
    nationality: "Spain"
  },
  {
    id: 10,
    title: "Dani Alves",
    text: "Dani Alves is a retired Brazilian professional footballer who played as a right-back. One of the most successful players in football history with incredible pace and crossing ability.",
    img: "/images/ball/DaniAlves.jpg",
    slug: 'dani-alves',
    position: "Right-Back",
    nationality: "Brazil"
  },
];

const GoalkeeperCards = [
  {
    id: 11,
    title: "Marc-André ter Stegen",
    text: "Marc-André ter Stegen is a German professional footballer who plays as a goalkeeper for La Liga club Barcelona and the Germany national team. Known for his shot-stopping and distribution.",
    img: "/images/ball/MarcAndreterStegen.jpg",
    slug: 'marc-andre-ter-stegen',
    position: "Goalkeeper",
    nationality: "Germany"
  }
];

// Card Component
const PlayerCard = ({ card, sectionClass }) => {
  const router = useRouter();

  return (
    <div className="col-md-4 mb-4" key={card.id}>
      <div className={`card ${sectionClass}`}>
        <img 
          src={card.img} 
          className="card-img-top" 
          alt={card.title}
          loading="lazy"
        />
        <div className="card-body">
          <h5 className="card-title">{card.title}</h5>
          {card.position && (
            <div className="position-badge mb-2">
              <span className="badge">{card.position}</span>
              <span className="nationality">{card.nationality}</span>
            </div>
          )}
          <p className="card-text">{card.text}</p>
          <button 
            className="btn btn-primary" 
            onClick={() => router.push(`/player/${card.slug}`)}
            aria-label={`Learn more about ${card.title}`}
          >
            <span>Learn More</span>
            <i className="arrow">→</i>
          </button>
        </div>
      </div>
    </div>
  );
};

// Defender Card Component (different column size)
const DefenderCard = ({ card, sectionClass }) => {
  const router = useRouter();

  return (
    <div className="col-md-3 mb-4" key={card.id}>
      <div className={`card ${sectionClass}`}>
        <img 
          src={card.img} 
          className="card-img-top" 
          alt={card.title}
          loading="lazy"
        />
        <div className="card-body">
          <h5 className="card-title">{card.title}</h5>
          {card.position && (
            <div className="position-badge mb-2">
              <span className="badge">{card.position}</span>
              <span className="nationality">{card.nationality}</span>
            </div>
          )}
          <p className="card-text">{card.text}</p>
          <button 
            className="btn btn-primary" 
            onClick={() => router.push(`/player/${card.slug}`)}
            aria-label={`Learn more about ${card.title}`}
          >
            <span>Learn More</span>
            <i className="arrow">→</i>
          </button>
        </div>
      </div>
    </div>
  );
};

// Section Component
const PlayerSection = ({ title, cards, sectionClass, CardComponent = PlayerCard }) => {
  return (
    <div className={`container my-5 ${sectionClass}`}>
      <div className="section-header">
        <h3 className="section-title">{title}</h3>
        <p className="section-subtitle">
          {title === 'Forward' && 'The Goal Scorers & Creators'}
          {title === 'Midfielder' && 'The Heart of the Team'}
          {title === 'Defender' && 'The Backbone of Defense'}
          {title === 'Goalkeeper' && 'The Last Line of Defense'}
        </p>
      </div>
      <div className="row justify-content-center">
        {cards.map((card) => (
          <CardComponent 
            key={card.id} 
            card={card} 
            sectionClass={sectionClass}
          />
        ))}
      </div>
    </div>
  );
};

export default function BeautifulFootballCards() {
  return (
    <div className="football-cards-container">

      {/* Forward Section */}
      <PlayerSection 
        title="Forward" 
        cards={forwardCards}
        sectionClass="forward-section"
      />

      {/* Midfielder Section */}
      <PlayerSection 
        title="Midfielder" 
        cards={midfielderCards}
        sectionClass="midfielder-section"
      />

      {/* Defender Section */}
      <PlayerSection 
        title="Defender" 
        cards={DefenderCards}
        sectionClass="defender-section"
        CardComponent={DefenderCard}
      />

      {/* Goalkeeper Section */}
      <PlayerSection 
        title="Goalkeeper" 
        cards={GoalkeeperCards}
        sectionClass="goalkeeper-section"
        CardComponent={DefenderCard}
      />

      {/* Footer Decoration */}
      <div className="footer-decoration">
        <div className="container">
          <div className="barca-colors">
            <div className="color-bar blue"></div>
            <div className="color-bar red"></div>
            <div className="color-bar gold"></div>
          </div>
        </div>
      </div>
    </div>
  );
}