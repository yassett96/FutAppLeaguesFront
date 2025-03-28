"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface Posicion {
    equipo: string;
    puntos: number;
    partidos_jugados: number;
    partidos_ganados: number;
    partidos_empatados: number;
    partidos_perdidos: number;
    goles_a_favor: number;
    goles_en_contra: number;
    diferencia_goles: number;
}

interface TablaPosicionesProps {
    posiciones: Posicion[];
}

const TablaPosiciones: React.FC<TablaPosicionesProps> = ({ posiciones }) => {
    const router = useRouter();
    const [selectedRow, setSelectedRow] = useState<number | null>(null);

    const handleRowClick = (index: number) => {
        setSelectedRow(index);
    };

    return (
        <div className="bg-transparent shadow border rounded-xl overflow-hidden overflow-x-auto xl1800:w-[97%] ml-[1%] mb-6">
            <div className="flex items-center px-6 py-4 bg-gray-50 h-[85px]">
                <div className="flex items-center">
                    <Image width={100} height={100} src="/images/logos/Icono_Tabla.png" className='shadow-lg h-10 w-10 mt-1 mr-2 opacity-60' alt="Icono Tabla" />
                    <h2 className="text-xl sm590:text-2xl sm670:text-3xl font-semibold tracking-tight text-gray-700">Tabla de Posiciones</h2>
                </div>
            </div>

            {/* Contenedor con scrollbar horizontal y vertical habilitado */}
            <div className="overflow-x-auto overflow-y-auto custom-scrollbar max-h-[615px] h-auto">
                <table className="w-full table-auto">
                    <thead
                        className="bg-[#1e3a8a] text-white h-[60px] sticky top-0 z-10"
                        style={{ clipPath: 'inset(0 0 0 0 round 0px)' }}>
                        <tr className='text-[9px] sm590:text-sm sm670:text-xl'>
                            <th className="text-center py-3 px-0 sm500:px-10 text-left font-medium tracking-tight">Equipo</th>
                            <th className="text-center py-3 px-0 sm500:px-10  text-left font-medium tracking-tight">Puntos</th>
                            <th className="text-center py-3 px-1 sm500:px-10  text-left font-medium tracking-tight">P. Jugados</th>
                            <th className="text-center py-3 px-1 sm500:px-10  text-left font-medium tracking-tight">P. Ganados</th>
                            <th className="text-center py-3 px-1 sm500:px-10  text-left font-medium tracking-tight">P. Empatados</th>
                            <th className="text-center py-3 px-1 sm500:px-10  text-left font-medium tracking-tight">P. Perdidos</th>
                            <th className="text-center py-3 px-1 sm500:px-10  text-left font-medium tracking-tight">G. Favor</th>
                            <th className="text-center py-3 px-1 sm500:px-10  text-left font-medium tracking-tight">G. Contra</th>
                            <th className="text-center py-3 px-1 sm500:px-10  text-left font-medium tracking-tight">Dif. de Goles</th>
                        </tr>
                    </thead>

                    <tbody className="bg-white">
                        {posiciones.map((posicion, index) => (
                            <tr
                                key={index}
                                className={`text-[8px] sm590:text-xl sm670:text-2xl text-center border-b border-gray-200 cursor-pointer ${selectedRow === index ? 'bg-blue-200' : ''}`}
                                onClick={() => handleRowClick(index)}
                            >
                                <td className="py-4 px-0 sm500:px-10 text-gray-700">{posicion.equipo}</td>
                                <td className="py-4 px-0 sm500:px-10 text-gray-700">{posicion.puntos}</td>
                                <td className="py-4 px-0 sm500:px-10 text-gray-700">{posicion.partidos_jugados}</td>
                                <td className="py-4 px-0 sm500:px-10 text-gray-700">{posicion.partidos_ganados}</td>
                                <td className="py-4 px-0 sm500:px-10 text-gray-700">{posicion.partidos_empatados}</td>
                                <td className="py-4 px-0 sm500:px-10 text-gray-700">{posicion.partidos_perdidos}</td>
                                <td className="py-4 px-0 sm500:px-10 text-gray-700">{posicion.goles_a_favor}</td>
                                <td className="py-4 px-0 sm500:px-10 text-gray-700">{posicion.goles_en_contra}</td>
                                <td className="py-4 px-0 sm500:px-10 text-gray-700">{posicion.diferencia_goles}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TablaPosiciones;