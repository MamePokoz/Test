"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import styles from "./Footer.module.css";

const BootstrapBundle = dynamic(
  () => import("bootstrap/dist/js/bootstrap.bundle.min.js"),
  { ssr: false }
);

export default function Footer() {
  useEffect(() => {
    BootstrapBundle;
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className="row">
          {/* Branding & Main Nav */}
          <div className="col-md-4 mb-4 text-center text-md-start">
            <h4 className={styles.title}>Supalerk Audomkasop</h4>
          </div>

          {/* Services or Extra Nav */}
          <div className="col-md-4 mb-4 text-center text-md-start">
            <h5 className={styles.subTitle}>Explore</h5>
            <div className={styles.nav}>
              <a href="/" className={styles.navLink}>Home</a>
              <a href="/about" className={styles.navLink}>About</a>
              <a href="/contact" className={styles.navLink}>Contact</a>
              <a href="/service" className={styles.navLink}>Services</a>
            </div>
          </div>

          {/* Contact */}
          <div className="col-md-4 text-center text-md-start">
            <h5 className={styles.subTitle}>Contact</h5>
            <p className={styles.contactItem}>📍 Chiang Mai, Thailand</p>
            <p className={styles.contactItem}>📞 012-345-6789</p>
            <p className={styles.contactItem}>✉️ test@email.com</p>
          </div>
        </div>

        <div className="text-center mt-4">
          <p className={styles.copy}>© 2025 All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
