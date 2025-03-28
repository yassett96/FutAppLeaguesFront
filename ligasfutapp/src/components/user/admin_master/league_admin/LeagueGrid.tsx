"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import CustomButton from '@/components/components_generics/button/CustomButton';

const LeagueGrid = ({ ligas, onSelectLiga, onEditarLiga, onEliminarLiga }) => {
  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (index) => {
    setSelectedRow(index);
    if (onSelectLiga) {
      onSelectLiga(ligas[index]); // Notifica al padre la liga seleccionada
    }
  };

  const handleEditarClick = (liga) => {
    if (onEditarLiga) {
      onEditarLiga(liga); // Llama a la función pasada desde el padre
    }
  };

  const handleEliminarClick = (liga) => {
    if (onEliminarLiga) {
      onEliminarLiga(liga); // Llama a la función pasada desde el padre
    }
  };

  return (
    <div className="bg-transparent shadow border rounded-xl overflow-hidden overflow-x-auto xl1800:w-[97%] ml-[1%] h-auto mb-6">
      <div className="flex items-center px-6 py-4 bg-gray-50 h-[85px]">
        <div className="flex items-center">
          <Image width={100} height={100} src="/images/logos/Icono_Tabla.png" className='shadow-lg h-10 w-10 mt-1 mr-2 opacity-60' alt="Icono Tabla" />
          <h2 className="text-xl sm590:text-2xl sm670:text-3xl font-semibold tracking-tight text-gray-700">Ligas de Fútbol</h2>
        </div>
      </div>

      {/* Contenedor con scrollbar horizontal y vertical habilitado */}
      <div
        className="overflow-x-auto overflow-y-auto custom-scrollbar"
        style={{
          maxHeight: '540px', // Limitar la altura máxima
          paddingBottom: '10px', // Espacio adicional para que el último registro no sea cortado
        }}
      >
        <table className="w-full table-auto">
          <thead className="bg-[#1e3a8a] text-white h-[80px] text-[9px] sm590:text-[10px] sm670:text-xl">
            <tr>
              <th className="text-center">Nombre</th>
              <th className="text-center">Logo</th>
              <th className="text-center">Descripción</th>
              <th className="text-center">Administrador</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white text-[8px] xs300:text-[10px] xs420:text-[13px]">
            {ligas && ligas.length > 0 ? (
              ligas.map((liga, index) => (
                <tr
                  key={index}
                  className={`text-xs sm590:text-xl sm670:text-2xl cursor-pointer text-center ${selectedRow === index ? 'bg-blue-200' : ''}`}
                  onClick={() => handleRowClick(index)}
                >
                  <td>{liga.nombre_liga}</td>
                  <td>
                    <Image
                      src={liga.logo || ""}
                      alt={liga.nombre || ""}
                      className="h-[100px] w-[200px] mx-auto object-contain" // Usa Tailwind para tamaño adicional
                      width={300} // Tamaño en píxeles
                      height={300}
                    />
                  </td>
                  <td>{liga.descripcion}</td>
                  <td>{liga.primer_nombre + " " + liga.primer_apellido}</td>
                  <td>
                    <div className="flex flex-col items-center">
                      <CustomButton
                        text="Editar"
                        color="#FFA500"
                        width=""
                        height=""
                        onClick={() => handleEditarClick(liga)}
                        className="mt-2 flex-col w-full"
                        classNameText='text-xs sm590:text-xl sm670:text-2xl'
                        icon="/images/logos/Icono_Editar_Blanco.png"
                      />
                      <CustomButton
                        text="Eliminar"
                        color="#ef4444"
                        width=""
                        height=""
                        onClick={() => handleEliminarClick(liga)}
                        className="mt-1 mb-2 flex-col w-full"
                        classNameText='text-xs sm590:text-xl sm670:text-2xl'
                        icon="/images/logos/Icono_Cancelar_Blanco.png"
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center">No se encontraron ligas</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeagueGrid;
