"use client";
import Carousel from "./components/Carousel";
import { motion } from "framer-motion";
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 px-6">
      
      {/* Section 2: Title */}
      <motion.div
        className="flex flex-col items-center text-center py-10"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-6xl text-indigo-700 font-extrabold mb-6 drop-shadow-lg">
          Home Page
        </h1>
        <h2 className="text-4xl font-semibold text-purple-800 mb-8 max-w-xl">
          Supalerk Audomkasop <span className="text-pink-600">038</span>
        </h2>
      </motion.div>

      {/* Section 1: Carousel */}
      <motion.div
        className="flex justify-center items-center py-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl p-4 transition-transform hover:scale-105">
          <Carousel />
        </div>
      </motion.div>

    </div>
  );
}
