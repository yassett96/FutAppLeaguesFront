import React from 'react';
import Image from 'next/image';

const ActionButtons = ({ onClose }) => {
  return (
    <div className="flex justify-center space-x-4 p-4 mb-6">
      <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 flex items-center justify-center text-shadow-default shadow-lg w-1/2 text-3xl"
        onClick={onClose}>
        <Image src="/images/logos/Icono_Cancelar_Blanco.png" alt="Cancelar" className="w-8 h-8 mr-2" width={100} height={100} />
        Cancelar
      </button>
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center justify-center text-shadow-default shadow-lg w-1/2 text-3xl"
        onClick={onClose}>
        <Image src="/images/logos/Icono_Guardar_Blanco.png" alt="Guardar cambios" className="w-8 h-8 mr-2" width={100} height={100} />
        Agregar
      </button>
    </div>
  );
};

export default ActionButtons;