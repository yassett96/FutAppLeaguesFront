"use client";
import React, { useState, useEffect } from 'react';

interface TorneoProps {
  torneos: Array<{ id_torneo: number; nombre_torneo: string }>;
  onTorneoSeleccionado: (torneo: any) => void;
}

const Torneo: React.FC<TorneoProps> = ({ torneos, onTorneoSeleccionado }) => {
  const [torneoSeleccionado, setTorneoSeleccionado] = useState('');

  // Convertir `torneos` en un array si es necesario
  const torneosArray = Array.isArray(torneos) ? torneos : [torneos];

  const handleTorneoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const torneoId = Number(e.target.value);
    const torneoSeleccionadoObj = torneosArray.find(torneo => torneo.id_torneo === torneoId);
  
    if (torneoSeleccionadoObj) {
      setTorneoSeleccionado(e.target.value);
      onTorneoSeleccionado(torneoSeleccionadoObj); // Pasa el objeto torneo completo
    }
  };

  return (
    <div className="my-6">
      <div className='flex justify-center items-center h-20'>
        <p className='text-black text-2xl xs340:text-3xl sm500:text-4xl opacity-50 text-center w-[80%]'>
          Selecciona el torneo de la liga
        </p>
      </div>
      <div className='flex justify-center items-center h-20 w-full'>
        <select
          className="p-2 border border-gray-300 rounded-xl text-black font-bold opacity-50 w-[95%] xxs:w-[70%] text-sm sm500:text-2xl"
          value={torneoSeleccionado}
          onChange={handleTorneoChange}
        >
          <option value="">Seleccione un torneo</option>
          {Array.isArray(torneosArray) && torneosArray.map((torneo) => (
            <option key={torneo.id_torneo} value={torneo.id_torneo}>
              {torneo.nombre_torneo}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Torneo;