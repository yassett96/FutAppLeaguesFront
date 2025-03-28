import React from 'react';
import Image from 'next/image';

const Injuries = ({ localInjuries, visitorInjuries }) => {
  return (
    <div className="text-center mb-6 text-shadow-lg w-[100%] xs420:w-[90%] mr-[0%] xs420:mr-[9.5%]">
      <div className="flex justify-center mb-2">
        <Image width={100} height={100} alt='' src="/images/logos/Icono_Lesiones.png" className='h-10 w-10 opacity-60' />
      </div>
      <h2 className="text-4xl font-bold text-black opacity-50">Lesiones</h2>
      <div className="mt-2 text-black flex justify-around -space-x-50 md:-space-x-96">
        <div className='w-[100%] sm550:w-[66%] flex justify-between ml-[0%] xs420:ml-[5%]'>
          {/* Div para las lesiones del equipo local */}
          <div className=''>
            {localInjuries.map((injury, index) => (
              <div key={index} className="flex flex-col xs360:flex-row justify-center items-center mb-2">
                <p className="text-2xl opacity-70">{injury.player}</p>
                <p className="text-3xl mx-2">
                  <Image width={100} height={100} alt='' src="/images/logos/Icono_Lesiones.png" className='h-10 w-10 opacity-60' />
                </p>
              </div>
            ))}
          </div>

          {/* Div para las lesiones del equipo visitante */}
          <div className=''>
            {visitorInjuries.map((injury, index) => (
              <div key={index} className="flex flex-col xs360:flex-row justify-center items-center mb-2">                
                <p className="text-2xl opacity-70">{injury.player}</p>
                <p className="text-3xl mx-2">
                  <Image width={100} height={100} alt='' src="/images/logos/Icono_Lesiones.png" className='h-10 w-10 opacity-60' />
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Injuries;