import React from 'react';
import Image from 'next/image';

const PlayerGoals = ({ goals }) => {
  return (
    <div className="flex flex-col items-center my-4 text-shadow-lg my-3 sm:my-0 -translate-x-[2%]">
      <div className="flex items-center">
        <Image width={100} height={100} src="/images/logos/Icono_Balon.png" alt="Goals" className="mr-2 h-6 sm750:h-10 w-6 sm750:w-10" />
        <p className="text-xl sm750:text-2xl font-bold text-black opacity-50">Goles</p>
      </div>
      <div className="border-2 p-2 mt-1 text-black rounded-xl shadow-xl border-2 border-black text-sm sm500:text-2xl opacity-50">{goals}</div>
    </div>
  );
};

export default PlayerGoals;