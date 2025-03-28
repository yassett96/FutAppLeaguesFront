import React from 'react';
import Image from 'next/image';

const PlayerDetails = ({ matches, goalAverage, assists, redCards, yellowCards, injuries }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-around my-4 text-black opacity-50 text-shadow-lg">
      <div className="flex flex-col ml-[5%] sm480:ml-[20%] sm:ml-0">
        <div className="flex items-center mb-5 sm:mb-0">
          <Image width={100} height={100} src="/images/logos/Icono_Partidos.png" alt="Matches" className='h-10 sm750:h-20 w-10 sm750:w-20'/>
          <p className="text-sm xxxs:text-xl ml-2 w-96 flex items-center text-center">Partidos jugados: &nbsp;<span className='flex items-center justify-center border-2 rounded-lg w-12 shadow-lg border-black'>{matches}</span></p>
        </div>
        <div className="flex items-center mt-2 mb-5 sm:mb-0">
          <Image width={100} height={100} src="/images/logos/Icono_Promedio.png" alt="Goal average" className='h-8 sm750:h-12 w-8 sm750:w-12' />
          <p className="text-sm xxxs:text-xl ml-2 flex items-center text-center">Prom. goles/partido:&nbsp; <span className='flex items-center justify-center w-20 border-2 rounded-lg shadow-lg border-black'>{goalAverage}</span></p>
        </div>
        <div className="flex items-center mt-2 mb-5 sm:mb-0">
          <Image width={100} height={100} src="/images/logos/Icono_Asistencia.png" alt="Assists" className='h-8 sm750:h-12 w-8 sm750:w-12' />
          <p className="text-sm xxxs:text-xl ml-2 flex items-center justify-center text-center">Asistencias: &nbsp;<span className='flex items-center justify-center w-20 border-2 rounded-lg shadow-lg border-black'>{assists}</span>%</p>
        </div>
      </div>
      <div className="flex flex-col ml-[5%] sm480:ml-[20%] sm:ml-0">
        <div className="flex items-center mb-5 sm:mb-0">
          <Image width={100} height={100} src="/images/logos/Icono_Tarjeta_Roja.png" alt="Red cards" className='h-8 sm750:h-12 w-8 sm750:w-12' />
          <p className="text-sm xxxs:text-xl ml-2 flex items-center justify-center text-center">Rojas:&nbsp; <span className='flex items-center justify-center w-20 border-2 rounded-lg shadow-lg border-black'>{redCards}</span></p>
        </div>
        <div className="flex items-center mt-2 mb-5 sm:mb-0">
          <Image width={100} height={100} src="/images/logos/Icono_Tarjeta_Amarilla.png" alt="Yellow cards" className='h-8 sm750:h-12 w-8 sm750:w-12' />
          <p className="text-sm xxxs:text-xl ml-2 flex items-center justify-center text-center">Amarillas:&nbsp; <span className='flex items-center justify-center w-20 border-2 rounded-lg shadow-lg border-black'>{yellowCards}</span></p>
        </div>        
        <div className="flex items-center mt-2 mb-5 sm:mb-0">
          <Image width={100} height={100} src="/images/logos/Icono_Lesiones.png" alt="Injuries" className='h-8 sm750:h-12 w-8 sm750:w-12' />
          <p className="text-sm xxxs:text-xl ml-2 flex items-center justify-center text-center">Lesiones:&nbsp;<span className='flex items-center justify-center w-20 border-2 rounded-lg shadow-lg border-black'>{injuries}</span></p>
        </div>
      </div>
    </div>
  );
};

export default PlayerDetails;