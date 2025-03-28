import React from 'react';
import Image from 'next/image';

interface PositionProps {
  position: number;
}

const CurrentPosition: React.FC<PositionProps> = ({ position }) => {
  return (
    <div className="flex flex-col items-center justify-center mt-10 opacity-60">
      <div className="flex items-center text-center">
        <Image width={100} height={100} src='/images/logos/Icono_Posicion_Actual.png' className="h-6 sm750:h-10 w-6 sm750:w-10 mr-2" alt="Icono Posición Actual" /> 
        <span className='text-xl sm750:text-2xl'>Pos. Actual:</span>
      </div>
      <div className="bg-white w-1/6 flex items-center justify-center mt-3 rounded-xl border shadow-lg border-black text-sm sm750:text-2xl">
        {position}
      </div>
    </div>
  );
};

export default CurrentPosition;