"use client";
import React from 'react';

interface Goleador {
  equipo_contrario: string;
  goles: number;
  fecha: string;
}

interface TopDetailScorePlayerGridProps {
  detalles: Goleador[];
}

const TopDetailScorePlayerGrid: React.FC<TopDetailScorePlayerGridProps> = ({ detalles }) => {
  return (
    <div className="bg-transparent shadow border rounded-xl overflow-hidden overflow-x-auto xl1800:w-[97%] ml-[1%] h-auto mb-6">
      {/* Contenedor con scrollbar horizontal y vertical habilitado */}
      <div className="overflow-x-auto overflow-y-auto custom-scrollbar h-auto max-h-[615px]">
        <table className="w-full table-auto bg-gray-700">
          <thead
            className="bg-[#1e3a8a] text-white h-[60px] sticky top-0 z-10"
            style={{ clipPath: 'inset(0 0 0 0 round 0px)' }}>
            <tr className='text-sm sm590:text-base sm670:text-xl '>
              <th className="text-center py-3 px-1 sm500:px-10 text-center font-medium tracking-tight">Equipo</th>
              <th className="text-center py-3 px-1 sm500:px-10 text-center font-medium tracking-tight">N° Goles</th>
              <th className="text-center py-3 px-1 sm500:px-10 text-center font-medium tracking-tight">Fecha</th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {detalles.length > 0 ? (
              detalles.map((goleador, index) => (
                <tr key={index} className="border-b border-gray-200 cursor-pointer text-sm sm590:text-base sm670:text-xl ">
                  <td className="py-4 px-1 sm500:px-10 text-center text-gray-700 text-center">{goleador.equipo_contrario}</td>
                  <td className="py-4 px-1 sm500:px-10 text-center text-gray-700 text-center">{goleador.goles}</td>
                  <td className="py-4 px-1 sm500:px-10 text-center text-gray-700 text-center">{goleador.fecha}</td>
                </tr>
              ))
            ) : (
              <tr className='text-sm sm590:text-base sm670:text-xl '>
                <td colSpan={3} className="py-4 text-center text-gray-500">
                  No hay registros de goles.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopDetailScorePlayerGrid;