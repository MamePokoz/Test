import React from 'react';
import './BeautifulFootballCards.css'; 

const midfielderCards = [
  {
    id: 1,
    title: "Xavi Hernandez",
    text: "Xavi Hernández, often simply called Xavi, is a Spanish football manager and former player, widely regarded as one of the greatest midfielders of all time.",
    img: "/images/ball/xavi.jpg",
    slug: 'xavi-hernandez'
  },
  {
    id: 2,
    title: "Sergio Busquets",
    text: "Sergio Busquets is a Spanish professional footballer known for his exceptional defensive midfield play, particularly his tactical intelligence, accurate passing, and ability to control the game's tempo.",
    img: "/images/ball/SergioBusquets.jpg",
    slug: 'sergio-busquets'
  },
  {
    id: 3,
    title: "Andrés Iniesta",
    text: "Andrés Iniesta is a Spanish professional footballer, widely regarded as one of the greatest midfielders of all time.",
    img: "/images/ball/iniesta.jpg",
    slug: 'andres-iniesta'
  }
];

const forwardCards = [
  {
    id: 4,
    title: "Neymar Jr",
    text: "Neymar Jr. is a highly skilled and versatile Brazilian professional footballer.",
    img: "/images/ball/Neymar.jpg",
    slug: 'neymar-Jr'
  },
  {
    id: 5,
    title: "Luis Suárez",
    text: "Luis Suárez is a Uruguayan professional footballer, widely regarded as one of the best strikers of his generation.",
    img: "/images/ball/Suarez.jpg",
    slug: 'luis-suarez'
  },
  {
    id: 6,
    title: "Lionel Messi",
    text: "Lionel Messi is an Argentine professional footballer widely regarded as one of the greatest players of all time.",
    img: "/images/ball/Messi.jpg",
    slug: 'lionel-messi'
  },
];

const DefenderCards = [
  {
    id: 7,
    title: "Jordi Alba",
    text: "Jordi Alba is a Spanish professional footballer known for his speed and attacking prowess as a left-back.",
    img: "/images/ball/JordiAlba.jpg",
    slug: 'jordi-alba'
  },
  {
    id: 8,
    title: "Gerard Pique",
    text: "Gerard Piqué was a Spanish professional footballer who played as a center-back.",
    img: "/images/ball/GerardPique.jpg",
    slug: 'gerard-pique'
  },
  {
    id: 9,
    title: "Carles Puyol",
    text: "Carles Puyol was a Spanish professional footballer who played his entire career for FC Barcelona as a central defender.",
    img: "/images/ball/CarlesPuyol.jpg",
    slug: 'carles-puyol'
  },
  {
    id: 10,
    title: "Dani Alves",
    text: "Dani Alves is a retired Brazilian professional footballer who played as a right-back.",
    img: "/images/ball/DaniAlves.jpg",
    slug: 'dani-alves'
  },
];

const GoalkeeperCards = [
  {
    id: 11,
    title: "Marc-Andre ter Stegen",
    text: "ter Stegen is a German professional footballer who plays as a goalkeeper for La Liga club Barcelona and the Germany national team.",
    img: "/images/ball/MarcAndreterStegen.jpg",
    slug: 'marc-andre-ter-stegen'
  }
];

export default function BeautifulFootballCards() {
  return (
    <>
      <div className="container my-5">
        <div className="section-header">
          <h3 className="section-title">Forward</h3>
        </div>
        <div className="row">
          {forwardCards.map((card) => (
            <div className="col-md-4 mb-4" key={card.id}>
              <div className="card">
                <img src={card.img} className="card-img-top" alt={card.title} />
                <div className="card-body">
                  <h5 className="card-title">{card.title}</h5>
                  <p className="card-text">{card.text}</p>
                  <a href={`/player/${card.slug}`} className="btn btn-primary">Learn More</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container my-5">
        <div className="section-header">
          <h3 className="section-title">Midfielder</h3>
        </div>
        <div className="row">
          {midfielderCards.map((card) => (
            <div className="col-md-4 mb-4" key={card.id}>
              <div className="card">
                <img src={card.img} className="card-img-top" alt={card.title} />
                <div className="card-body">
                  <h5 className="card-title">{card.title}</h5>
                  <p className="card-text">{card.text}</p>
                  <a href={`/player/${card.slug}`} className="btn btn-primary">Learn More</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container my-5">
        <div className="section-header">
          <h3 className="section-title">Defender</h3>
        </div>
        <div className="row">
          {DefenderCards.map((card) => (
            <div className="col-md-3 mb-4" key={card.id}>
              <div className="card">
                <img src={card.img} className="card-img-top" alt={card.title} />
                <div className="card-body">
                  <h5 className="card-title">{card.title}</h5>
                  <p className="card-text">{card.text}</p>
                  <a href={`/player/${card.slug}`} className="btn btn-primary">Learn More</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container my-5">
        <div className="section-header">
          <h3 className="section-title">Goalkeeper</h3>
        </div>
        <div className="row">
          {GoalkeeperCards.map((card) => (
            <div className="col-md-3 mb-4" key={card.id}>
              <div className="card">
                <img src={card.img} className="card-img-top" alt={card.title} />
                <div className="card-body">
                  <h5 className="card-title">{card.title}</h5>
                  <p className="card-text">{card.text}</p>
                  <a href={`/player/${card.slug}`} className="btn btn-primary">Learn More</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}