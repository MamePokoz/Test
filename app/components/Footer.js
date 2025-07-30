"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import styles from "./Footer.module.css"; // CSS Module

// Load Bootstrap JS dynamically (Client only)
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
        <div className="container py-4">
          <div className="row">
          {/* Branding */}
            <div className="col-md-4 mb-3 mb-md-0 text-center text-md-start">
              <h4 className={styles.title}>Supalerk Audomkasop</h4>

            {/* Navigation Menu */}
              <div className={styles.nav}>
                <a href="/" className={styles.navLink}>Home</a>
                <a href="/about" className={styles.navLink}>About</a>
                <a href="/contact" className={styles.navLink}>Contact</a>
                <a href="/service" className={styles.navLink}>Services</a>
              </div>

              <p className={styles.copy}>
                 © 2025 All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
