"use client";
<<<<<<< HEAD

import dynamic from "next/dynamic";
import { useEffect } from "react";
import styles from "./Footer.module.css"; // import CSS module

// Dynamic Import แบบปิด SSR
const BootstrapBundle = dynamic(
  () => import("bootstrap/dist/js/bootstrap.bundle.min.js"),
=======
import dynamic from 'next/dynamic';
import { useEffect } from "react";

// Dynamic Import แบบปิด SSR
const BootstrapBundle = dynamic(
  () => import('bootstrap/dist/js/bootstrap.bundle.min.js'),
>>>>>>> 9be121d1490086dfb5ca0046d9b9c4648191c034
  { ssr: false }
);

export default function Footer() {
  useEffect(() => {
    BootstrapBundle;
  }, []);

  return (
<<<<<<< HEAD
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
=======
    <footer className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-black py-10 mt-16 shadow-inner">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        
        {/* Branding */}
        <div className="text-center md:text-left">
          <h3 className="text-2xl font-bold mb-2">Supalerk Audomakasop</h3>
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} All rights reserved.</p>
        </div>

        {/* Navigation */}
        {/*<div className="flex space-x-6 text-black">
          <a href="/about" className="text-black-300 hover:text-black transition duration-300 ease-in-out">
            About
          </a>
          <a href="/service" className="text-black-300 hover:text-black transition duration-300 ease-in-out">
            Services
          </a>
          <a href="/contact" className="text-black-300 hover:text-black transition duration-300 ease-in-out ">
            Contact
          </a>
        </div>*/}
>>>>>>> 9be121d1490086dfb5ca0046d9b9c4648191c034
      </div>
    </footer>
  );
}
