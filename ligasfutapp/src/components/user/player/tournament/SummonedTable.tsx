"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface InfoTablaSancionados {
    nombre_jugador: string;
    equipo: string;
    total_fechas_sancionadas: number;
    fechas_cumplidas: number;
    fechas_pendientes: number;
}

interface TablaSancionadosProps {
    sancionados: InfoTablaSancionados[]; // Usamos la interfaz InfoTablaSancionados para los datos
}

const TablaSancionados: React.FC<TablaSancionadosProps> = ({ sancionados }) => {
    const router = useRouter();
    const [selectedRow, setSelectedRow] = useState<number | null>(null);

    const handleRowClick = (index: number) => {
        setSelectedRow(index);
    };

    return (
        <div className="bg-transparent shadow border rounded-xl overflow-hidden xl1800:w-[97%] ml-[1%] h-auto max-h-[675px] mb-6">
            <div className="flex items-center px-6 py-4 bg-gray-50 h-[85px]">
                <div className="flex items-center">
                    <Image
                        width={100}
                        height={100}
                        src="/images/logos/Icono_Tabla.png"
                        className="shadow-lg h-10 w-10 mt-1 mr-2 opacity-60"
                        alt="Icono Tabla"
                    />
                    <h2 className="text-xl sm590:text-2xl sm670:text-3xl font-semibold tracking-tight text-gray-700">
                        Tabla de sancionados
                    </h2>
                </div>
            </div>

            {/* Contenedor con scroll */}
            <div className="overflow-y-auto max-h-[400px] rounded-lg scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 scrollbar-thumb-rounded-full">
                <table className="w-full table-auto">
                    <thead
                        className="bg-[#1e3a8a] text-white h-[60px] sticky top-0 z-10 text-xs sm590:text-base sm670:text-xl"
                        style={{ clipPath: "inset(0 0 0 0 round 0px)" }}
                    >
                        <tr>
                            <th className="text-center py-3 px-1 sm500:px-10 text-left font-medium tracking-tight">
                                Jugador
                            </th>
                            <th className="text-center py-3 px-1 sm500:px-10 text-left font-medium tracking-tight">
                                Equipo
                            </th>
                            <th className="text-center py-3 px-1 sm500:px-10 text-left font-medium tracking-tight">
                                F. Sancionadas
                            </th>
                            <th className="text-center py-3 px-1 sm500:px-10 text-left font-medium tracking-tight">
                                F. Pendientes
                            </th>
                            <th className="text-center py-3 px-1 sm500:px-10 text-left font-medium tracking-tight">
                                F. Cumplidas
                            </th>
                        </tr>
                    </thead>

                    <tbody className="bg-white">
                        {sancionados && sancionados.length > 0 ? (
                            sancionados.map((sancionado, index) => (
                                <tr
                                    key={index}
                                    className={`text-xs sm590:text-base sm670:text-xl border-b border-gray-200 cursor-pointer ${selectedRow === index ? "bg-blue-200" : ""}`}
                                    onClick={() => handleRowClick(index)}
                                >
                                    <td className="text-center py-4 px-1 sm500:px-10 text-gray-700">
                                        {sancionado.nombre_jugador}
                                    </td>
                                    <td className="text-center py-4 px-1 sm500:px-10 text-gray-700">
                                        {sancionado.equipo}
                                    </td>
                                    <td className="text-center py-4 px-1 sm500:px-10 text-gray-700">
                                        {sancionado.total_fechas_sancionadas}
                                    </td>
                                    <td className="text-center py-4 px-1 sm500:px-10 text-gray-700">
                                        {sancionado.fechas_pendientes}
                                    </td>
                                    <td className="text-center py-4 px-1 sm500:px-10 text-gray-700">
                                        {sancionado.fechas_cumplidas}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr className="text-xs sm590:text-base sm670:text-xl">
                                <td colSpan={5} className="text-center py-4 px-1 sm500:px-10 text-gray-700">
                                    No hay sancionados registrados
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TablaSancionados;