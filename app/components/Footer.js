"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import styles from "./Footer.module.css";
import { useRouter } from "next/navigation";

const BootstrapBundle = dynamic(
  () => import("bootstrap/dist/js/bootstrap.bundle.min.js"),
  { ssr: false }
);

export default function Footer() {
  const router = useRouter();
  useEffect(() => {
    BootstrapBundle;
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className="row">
          {/* Branding & Main Nav */}
          <div className="col-md-4 mb-4 text-center text-md-start">
            <div className={styles.brandSection}>
              <h4 className={styles.brandTitle}>Supalerk Audomkasop</h4>
              <p className={styles.brandTagline}>
                Creating digital experiences
              </p>
            </div>
          </div>

          {/* Services or Extra Nav */}
          <div className="col-md-4 mb-4 text-center text-md-start">
            <div className={styles.navSection}>
              <h5 className={styles.sectionTitle}>Explore</h5>
              <nav className={styles.navList}>
                <button
                  className={styles.navLink}
                  onClick={() => router.push("/")}
                >
                  <span className={styles.navIcon}>🏠</span>
                  Home
                </button>

                <button
                  className={styles.navLink}
                  onClick={() => router.push("/about")}
                >
                  <span className={styles.navIcon}>👤</span>
                  About
                </button>

                <button
                  className={styles.navLink}
                  onClick={() => router.push("/contact")}
                >
                  <span className={styles.navIcon}>📧</span>
                  Contact
                </button>

                <button
                  className={styles.navLink}
                  onClick={() => router.push("/service")}
                >
                  <span className={styles.navIcon}>⚡</span>
                  Services
                </button>
              </nav>
            </div>
          </div>

          {/* Contact */}
          <div className="col-md-4 text-center text-md-start">
            <div className={styles.contactSection}>
              <h5 className={styles.sectionTitle}>Get in Touch</h5>
              <div className={styles.contactList}>
                <div className={styles.contactItem}>
                  <span className={styles.contactIcon}>📍</span>
                  <span className={styles.contactText}>
                    Chiang Mai, Thailand
                  </span>
                </div>
                <div className={styles.contactItem}>
                  <span className={styles.contactIcon}>📞</span>
                  <span className={styles.contactText}>012-345-6789</span>
                </div>
                <div className={styles.contactItem}>
                  <span className={styles.contactIcon}>✉️</span>
                  <span className={styles.contactText}>test@email.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
