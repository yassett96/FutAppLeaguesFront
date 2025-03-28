import React from 'react';
import Image from 'next/image';
import { formatearFechaDDMMYYYY } from '@/utils/dateUtils';

const PlayerBasicInfo = ({ dni, birthDate, nationality }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-around my-4 text-black text-shadow-lg opacity-50">
      <div className="flex flex-col items-center my-5 sm:my-0">
        <div className="flex items-center">
          <Image width={100} height={100} src="/images/logos/Icono_DNI.png" alt="DNI" className="mr-2 h-6 sm750:h-10 w-6 sm750:w-10" />
          <p className="text-xl sm750:text-2xl font-bold">DNI</p>
        </div>
        <div className="border p-2 mt-1 rounded-xl shadow-xl border-2 border-black text-sm sm500:text-2xl">{dni}</div>
      </div>
      <div className="flex flex-col items-center my-5 sm:my-0">
        <div className="flex items-center">
          <Image width={100} height={100} src="/images/logos/Icono_Cumple.png" alt="Birth date" className="mr-2 h-6 sm750:h-10 w-6 sm750:w-10" />
          <p className="text-xl sm750:text-2xl font-bold">F. de Nac.</p>
        </div>
        <div className="border p-2 mt-1 rounded-xl shadow-xl border-2 border-black text-sm sm500:text-2xl">{birthDate === '' ? '' : formatearFechaDDMMYYYY(birthDate)}</div>
      </div>
      <div className="flex flex-col items-center my-5 sm:my-0">
        <div className="flex items-center">
          <Image width={100} height={100} src="/images/logos/Icono_Nacionalidad.png" alt="Nationality" className="mr-2 h-6 sm750:h-10 w-6 sm750:w-10" />
          <p className="text-xl sm750:text-2xl font-bold">Nacionalidad</p>
        </div>
        <div className="border p-2 mt-1 rounded-xl shadow-xl border-2 border-black text-sm sm500:text-2xl">{nationality}</div>
      </div>
    </div>
  );
};

export default PlayerBasicInfo;