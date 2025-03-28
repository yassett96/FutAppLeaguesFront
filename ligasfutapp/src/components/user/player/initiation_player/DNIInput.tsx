import React from 'react';
import Image from 'next/image';

const DNIInput = () => {
  return (
    <div className="text-center mb-6">
      <div className="flex justify-center items-center mb-2">
        <Image width={100} height={100} src="/images/logos/Icono_DNI.png" alt="DNI Icon" className="w-10 h-10 mr-2 mt-1 opacity-50" />
        <h3 className="text-5xl font-bold text-black opacity-50">DNI</h3>
      </div>
      <input type="text" className="w-1/4 p-2 border border-gray-300 rounded mx-auto block text-black" />
    </div>
  );
};

export default DNIInput;