import React from 'react';
import Image from 'next/image';

const ActionButtons = ({ onClose }) => {
  return (
    <div className="flex justify-center space-x-4 p-4">
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center justify-center text-shadow-default shadow-lg w-60 text-3xl"
        onClick={onClose}>
        <Image width={100} height={100} src="/images/logos/Icono_Guardar_Blanco.png" alt="Guardar cambios" className="w-10 h-10 mr-2" />
        Aceptar
      </button>
    </div>
  );
};

export default ActionButtons;