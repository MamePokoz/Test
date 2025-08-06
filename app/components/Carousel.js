'use client';
import { useEffect } from 'react';
import Image from "next/image";
import styles from './Carousel.module.css'; // ไฟล์ CSS ที่แยก

export default function Carousel() {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return (
    <div
      id="carouselExample"
      className={`carousel slide ${styles.carouselWrapper}`}
      data-bs-ride="carousel"
      data-bs-interval="2000"
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <div className={styles.imageWrapper}>
            <Image
              src="/images/ball/Main.jpg"
              alt="Slide 1"
              fill
              priority
            />
          </div>
        </div>
        <div className="carousel-item">
          <div className={styles.imageWrapper}>
            <Image
              src="/images/ball/2.jpg"
              alt="Slide 2"
              fill
            />
          </div>
        </div>
        <div className="carousel-item">
          <div className={styles.imageWrapper}>
            <Image
              src="/images/ball/3.jpg"
              alt="Slide 3"
              fill
            />
          </div>
        </div>
      </div>

      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
