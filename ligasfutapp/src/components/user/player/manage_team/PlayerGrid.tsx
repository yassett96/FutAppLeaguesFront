"use client";
import React, { useState } from 'react';
import Image from 'next/image';

const PlayerGrid = ({ jugadores, selectedRow, setSelectedRow, onSelectPlayer }) => {

  const handleRowClick = (index: any, jugador: any) => {
    setSelectedRow(index); // Controlar la selección desde el componente padre
    onSelectPlayer(jugador); // Pasar el jugador seleccionado al componente padre
  };

  return (
    <div className="bg-transparent shadow border rounded-xl overflow-hidden overflow-x-auto xl1800:w-[97%] ml-[1%] h-auto max-h-[675px] mb-6">
      <div className="flex items-center px-6 py-4 bg-gray-50 h-[85px]">
        <div className="flex items-center">
          <Image width={100} height={100} src="/images/logos/Icono_Tabla.png" className="shadow-lg h-10 w-10 mt-1 mr-2 opacity-60" alt="Icono Tabla" />
          <h2 className="text-xl sm590:text-2xl sm670:text-3xl font-semibold tracking-tight text-gray-700">Detalle de Jugadores</h2>
        </div>
      </div>

      <div className="overflow-x-auto overflow-y-auto custom-scrollbar h-auto max-h-[615px]">
        <table className="w-full table-auto">
          <thead className="bg-[#1e3a8a] text-white h-[60px] sticky top-0 z-10">
            <tr className='text-sm sm590:text-base sm670:text-xl'>
              <th className="text-center py-3 px-1 sm500:px-10 text-center font-medium tracking-tight">Jugador</th>
              <th className="text-center py-3 px-1 sm500:px-10 text-center font-medium tracking-tight">Correo</th>
              <th className="text-center py-3 px-1 sm500:px-10 text-center font-medium tracking-tight">DNI</th>
            </tr>
          </thead>

          <tbody className="bg-white">
            {jugadores.length === 0 ? (
              <tr>
                <td
                  className="text-center py-4 px-1 sm500:px-10 text-sm sm590:text-base sm670:text-xl text-gray-700"
                  colSpan={3}
                >
                  No hay jugadores en el equipo
                </td>
              </tr>
            ) : (
              jugadores.map((jugador: any, index: any) => (
                <tr
                  key={index}
                  className={`text-[9px] sm590:text-base sm670:text-xl text-center border-b border-gray-200 cursor-pointer ${selectedRow === index ? 'bg-blue-200' : ''}`}
                  onClick={() => handleRowClick(index, jugador)}
                >
                  <td className="text-center py-4 px-1 sm500:px-10 text-gray-700">{jugador.nombre_jugador}</td>
                  <td className="text-center py-4 px-1 sm500:px-10 text-gray-700">{jugador.correo}</td>
                  <td className="text-center py-4 px-1 sm500:px-10 text-gray-700">{jugador.dni}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlayerGrid;