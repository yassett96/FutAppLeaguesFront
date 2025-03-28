import React from 'react';
import Image from 'next/image';

const Warnings = ({ localWarnings, visitorWarnings }) => {
  return (
    <div className="text-center mb-6 text-shadow-lg w-[100%] xs360:w-[90%] xs360:mr-[5%]">
      <div className='flex justify-center opacity-80'>
        <Image width={100} height={100} alt='' src="/images/logos/Icono_Amonestaciones.png" className='w-10 h-10 opacity-60 mr-[4%] lg:mr-[5%]' />
      </div>
      <h2 className="text-4xl font-bold text-black opacity-50 mr-[4%] lg:mr-[5%]">Amonestaciones</h2>
      <div className='flex items-center justify-center'>
        <div className="mt-2 text-black flex justify-between w-[100%] xxs:w-[100%] xs420:w-[85%] sm550:w-[65%]">

          {/* Div para las advertencias del equipo local */}
          <div className=''>
            {localWarnings.map((warning, index) => (
              <div key={index} className="flex flex-col xs360:flex-row justify-center items-center mb-2">
                <p className="text-2xl opacity-70">{warning.player}</p>
                <Image width={100} height={100} alt='' src="/images/logos/Icono_Tarjeta_Roja.png" className='h-13 w-7 mt-2 xs360:mt-0 ml-0 xs360:ml-2 opacity-60' />
              </div>
            ))}
          </div>

          {/* Div para las advertencias del equipo visitante */}
          <div className=''>
            {visitorWarnings.map((warning, index) => (
              <div key={index} className="flex flex-col xs360:flex-row justify-center items-center mb-2">
                <p className="text-2xl mx-2">{warning.player}</p>
                <Image width={100} height={100} alt='' src="/images/logos/Icono_Tarjeta_Amarilla.png" className='h-13 w-7 mt-2 xs360:mt-0 opacity-60' />
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Warnings;