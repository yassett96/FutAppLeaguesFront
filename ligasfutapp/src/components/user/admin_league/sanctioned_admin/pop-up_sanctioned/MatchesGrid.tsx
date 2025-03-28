"use client";
import React, { useState, useEffect } from 'react';

const MatchesGrid = ({ partidos, onPartidoSeleccionado, partidoSeleccionado }) => {
    const [selectedRow, setSelectedRow] = useState(null);

    // Seleccionar fila inicial si hay un partido preseleccionado
    useEffect(() => {
        if (partidoSeleccionado) {
            const index = partidos.findIndex((p) => p.id_partido === partidoSeleccionado.id_partido);
            if (index !== -1 && selectedRow !== index) {
                setSelectedRow(index);
            }
        }
    }, [selectedRow, partidos, partidoSeleccionado]);

    const handleRowClick = (index: any, partido: any) => {
        setSelectedRow(index);
        if (onPartidoSeleccionado) {
            onPartidoSeleccionado(partido);
        }
    };

    return (
        <div className="bg-transparent shadow border rounded-xl overflow-hidden overflow-x-auto ml-[2%] mr-[2%] h-auto mb-6">
            {/* Contenedor con scrollbar horizontal y vertical habilitado */}
            <div className="overflow-x-auto overflow-y-auto custom-scrollbar h-auto">
                <table className="w-full table-auto">
                    <thead className="bg-[#1e3a8a] text-white h-[60px] sticky top-0 z-10">
                        <tr>
                            <th className="text-center py-3 px-6 text-sm sm590:text-base sm670:text-xl font-medium tracking-tight">Fecha</th>
                            <th className="text-center py-3 px-6 text-sm sm590:text-base sm670:text-xl font-medium tracking-tight">Hora</th>
                            <th className="text-center py-3 px-6 text-sm sm590:text-base sm670:text-xl font-medium tracking-tight">Equipo Local</th>
                            <th className="text-center py-3 px-6 text-sm sm590:text-base sm670:text-xl font-medium tracking-tight">Resultado</th>
                            <th className="text-center py-3 px-6 text-sm sm590:text-base sm670:text-xl font-medium tracking-tight">Equipo Visitante</th>
                            <th className="text-center py-3 px-6 text-sm sm590:text-base sm670:text-xl font-medium tracking-tight">Estado</th>
                        </tr>
                    </thead>

                    <tbody className="bg-white">
                        {partidos.length > 0 ? (
                            partidos.map((partido: any, index: any) => (
                                <tr
                                    key={index}
                                    className={`border-b border-gray-200 cursor-pointer ${selectedRow === index ? 'bg-blue-200' : ''}`}
                                    onClick={() => handleRowClick(index, partido)}
                                >
                                    <td className="py-4 px-6 text-sm sm590:text-base sm670:text-xl text-gray-700 text-center">{partido.fecha}</td>
                                    <td className="py-4 px-6 text-sm sm590:text-base sm670:text-xl text-gray-700 text-center">{partido.hora}</td>
                                    <td className="py-4 px-6 text-sm sm590:text-base sm670:text-xl text-gray-700 text-center">{partido.equipo_local}</td>
                                    <td className="py-4 px-6 text-sm sm590:text-base sm670:text-xl text-gray-700 text-center">{partido.resultado_local + " - " + partido.resultado_visitante}</td>
                                    <td className="py-4 px-6 text-sm sm590:text-base sm670:text-xl text-gray-700 text-center">{partido.equipo_visitante}</td>
                                    <td className={`py-4 px-6 text-sm sm590:text-base sm670:text-xl text-center ${partido.estado === 'Terminado' ? 'text-green-500' : 'text-orange-500'}`}>{partido.estado}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className="py-4 px-6 text-sm sm590:text-base sm670:text-xl text-gray-700 text-center">
                                    No hay partidos registrados.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MatchesGrid;