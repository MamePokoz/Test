// app/service/page.js
import "./service.css";
import Image from "next/image";

const services = [
  {
    id: 1,
    title: "FCB Web Showcase",
    description: "เว็บไซต์แบบไดนามิกที่จัดแสดงประวัติศาสตร์อันเป็นตำนาน ถ้วยรางวัล และโปรไฟล์ผู้เล่นของสโมสรฟุตบอลบาร์เซโลนา."
  },
  {
    id: 2,
    title: "Mobile App for Culers",
    description: "ติดตามข่าวสารพิเศษ คะแนนสด และเบื้องหลังจาก Camp Nou บนโทรศัพท์ของคุณ."
  },
  {
    id: 3,
    title: "Barça Fan Club Tools",
    description: "เราพัฒนาเครื่องมือดิจิทัลสำหรับแฟนคลับท้องถิ่นเพื่อจัดการกิจกรรม สมาชิก และการสำรวจความคิดเห็นในชุมชน."
  }
];

export default function Service() {
  return (
    <div className="service-wrapper">
      <div className="hero">
        <Image
          src="/images/ball/campnou.jpg"
          alt="Camp Nou"
          width={1200}
          height={600}
          className="hero-img"
        />
        <div className="overlay">
          <h1 className="hero-title">Our Barça Services</h1>
          <p className="hero-sub">โซลูชันดิจิทัลที่สร้างขึ้นด้วยความมุ่งมั่นของ FC Barcelona</p>
        </div>
      </div>
      <div className="card-container">
        {services.map((service) => (
          <div className="service-card" key={service.id}>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}