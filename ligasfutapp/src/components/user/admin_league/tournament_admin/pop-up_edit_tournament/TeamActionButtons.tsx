import React from 'react';
import Image from 'next/image';

const TeamActionsButtons = ({ onAddTeam }) => {
  return (
    <div className="flex justify-center space-x-4 my-4">
      <button onClick={onAddTeam} className="flex items-center bg-blue-500 text-white px-4 py-2 rounded shadow-lg hover:bg-blue-700">
        <span className="mr-2 text-3xl">Agregar Equipo</span>
        <Image src="/images/logos/Icono_Nuevo_Blanco.png" alt="Agregar Evento" className="w-10 h-10" width={100} height={100} />
      </button>
      <button className="flex items-center bg-red-500 text-white px-4 py-2 rounded shadow-lg hover:bg-red-700">
        <span className="mr-2 text-3xl">Eliminar Equipo</span>
        <Image src="/images/logos/Icono_Cancelar_Blanco.png" alt="Eliminar Evento" className="w-10 h-10" width={100} height={100} />
      </button>
    </div>
  );
};

export default TeamActionsButtons;