import React from 'react';
import Image from 'next/image';

const BirthDateInput = ({ onBirthDateChange }) => {
  const handleDateChange = (e) => {
    onBirthDateChange(e.target.value);
  };

  return (
    <div className="text-center mb-6">
      <div className="flex justify-center items-center mb-2">
        <Image width={100} height={100} src="/images/logos/Icono_Cumple.png" alt="Calendar Icon" className="w-6 sm750:w-10 h-6 sm750:h-10 mr-2 mt-1 opacity-50" />
        <h3 className="text-xl sm590:text-2xl font-bold text-black opacity-50">F. de Nac.</h3>
      </div>
      <input type="date" className="w-[80%] xxs:w-[50%] lg:w-1/4 p-2 border border-gray-300 rounded mx-auto block text-black text-sm sm750:text-2xl" onChange={handleDateChange} />
    </div>
  );
};

export default BirthDateInput;