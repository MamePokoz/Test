"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import styles from "./Footer.module.css"; // import CSS module

// Dynamic Import แบบปิด SSR
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
        {/* Branding */}
        <div className={styles.branding}>
          <h3 className={styles.title}>Supalerk Audomakasop</h3>
          <p className={styles.copy}>
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>

        {/* Navigation (commented out as before) */}
        {/* <div className={styles.nav}>
          <a href="/about" className={styles.navLink}>
            About
          </a>
          <a href="/service" className={styles.navLink}>
            Services
          </a>
          <a href="/contact" className={styles.navLink}>
            Contact
          </a>
        </div> */}
      </div>
    </footer>
  );
}
