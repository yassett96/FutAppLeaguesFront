import React, { useState } from 'react';
import Image from 'next/image';

const DNIInput = ({ onDniChange }: { onDniChange: (dni: string) => void }) => {
  const [dni, setDni] = useState('');

  const handleDniChange = (value: string) => {
    const filtered = value.replace(/[^A-Za-z0-9-]/g, '');
    setDni(filtered);
    // Llama al callback si es necesario
    onDniChange(filtered);
  };
  
  return (
    <div className="text-center mb-6">
      <div className="flex justify-center items-center mb-2">
        <Image
          width={100}
          height={100}
          src="/images/logos/Icono_DNI.png"
          alt="DNI Icon"
          className="w-6 sm750:w-10 h-6 sm750:h-10 mr-2 mt-1 opacity-50"
        />
        <h3 className="text-xl sm590:text-2xl font-bold text-black opacity-50">DNI</h3>
      </div>
      <input
        type="text"
        className="w-[100%] sm500:w-[50%] xl1200:w-1/4 p-2 border border-gray-300 rounded mx-auto block text-sm sm750:text-2xl text-black"
        value={dni}        
        onChange={(e) => {
          const value = e.target.value.replace(/[^A-Za-z0-9.\-]/g, '');          
          handleDniChange(value)
        }}
      />
    </div>
  );
  
};

export default DNIInput;