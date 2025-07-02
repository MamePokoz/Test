// app/components/Card.js

const cardData = [
  {
    id: 1,
    title: "Project 1",
    text: "This is the first project description.",
    img: "/images/hearts/haujai.jpg"
  },
  {
    id: 2,
    title: "Project 2",
    text: "This is the second project description.",
    img: "/images/hearts/images.jpg"
  },
  {
    id: 3,
    title: "Project 3",
    text: "This is the third project description.",
    img: "/images/hearts/sunflower.jpg"
  }
];

export default function Card() {
  return (
    <div className="container my-5">
      <h3 className="mb-4">Our Project</h3>
      <div className="row">
        {cardData.map((card) => (
          <div className="col-md-4 mb-4" key={card.id}>
            <div className="card">
              <img src={card.img} className="card-img-top" alt={card.title} />
              <div className="card-body">
                <h5 className="card-title">{card.title}</h5>
                <p className="card-text">{card.text}</p>
                <a href="#" className="btn btn-primary">Learn More</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
