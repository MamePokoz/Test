import Carousel from "./components/Carousel";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 px-6">
      

      {/* Section 2: Title */}
      <div className="flex flex-col items-center text-center py-10">
        <h1 className="text-6xl text-indigo-700 font-extrabold mb-6 drop-shadow-lg">
          Home Page
        </h1>
        <h2 className="text-4xl font-semibold text-purple-800 mb-8 max-w-xl">
          Supalerk Audomkasop <span className="text-pink-600">038</span>
        </h2>
      </div>

            {/* Section 1: Carousel */}
      <div className="flex justify-center items-center py-10">
        <Carousel />
      </div>
      
    </div>
  );
}
