"use client";
import React, { useState } from "react";
import Image from "next/image";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

interface LigasCarouselProps {
  ligas: Array<{
    id_liga: number;
    nombre_liga: string;
    descripcion: string;
    logo: string;
  }>;
  onSelectLiga: (ligaId: number) => void;
}

const LigasCarousel: React.FC<LigasCarouselProps> = ({ ligas, onSelectLiga }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? ligas.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === ligas.length - 1 ? 0 : prev + 1));
  };

  const handleSlideClick = () => {
    onSelectLiga(ligas[currentIndex].id_liga);
  };

  if (!ligas || ligas.length === 0) {
    return <div>No hay ligas para planillar</div>;
  }

  return (
    <div className="relative w-full h-[510px] mx-auto flex items-center justify-center ">
      <div className="relative w-[80%] h-[500px] overflow-hidden rounded-lg bg-white shadow-xl">
        {ligas.map((liga, index) => (
          <div
            key={index}
            className={`absolute inset-0 flex justify-center items-center transition-transform duration-500 ease-in-out ${index === currentIndex
              ? "transform translate-x-0"
              : index < currentIndex
                ? "transform -translate-x-full"
                : "transform translate-x-full"
              }`}
            onClick={handleSlideClick} // Detecta el click en el slide
          >
            <div className="w-[100%] h-[420px] mb-[90px] relative hover:cursor-pointer">
              <Image
                src={liga.logo}
                alt={liga.nombre_liga}
                fill
                className="rounded-lg mt-3"
              />
            </div>
          </div>
        ))}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-[#1e3a8a] text-white">
          <h3 className="text-2xl font-bold">{ligas[currentIndex].nombre_liga}</h3>
          <p className="text-sm">{ligas[currentIndex].descripcion}</p>
          <div className="flex justify-center mt-4 space-x-2">
            {ligas.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${index === currentIndex ? "bg-white" : "bg-gray-400"
                  }`}
              />
            ))}
          </div>
        </div>
        <div
          className="absolute left-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-white"
          onClick={prevSlide}
        >
          <IoChevronBack size={30} className="text-black mb-28 rounded-full hover:shadow hover:shadow-white hover:border hover:border-2" />
        </div>
        <div
          className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-white"
          onClick={nextSlide}
        >
          <IoChevronForward size={30} className="text-black mb-28 rounded-full hover:shadow hover:shadow-white hover:border hover:border-2" />
        </div>
      </div>
    </div>
  );
};

export default LigasCarousel;
