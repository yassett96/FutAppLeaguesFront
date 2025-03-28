"use client"
import React, { useState, useEffect } from 'react';
import PopUpTournamentMatchResume from '@/components/components_generics/pop-ups/pop-up_tournament_match_resume/page';
import Image from 'next/image';
import CustomButton from '../../../../components/components_generics/button/CustomButton';
import { obtenerDetallesPartido } from '@/services/partidoService';
import { obtenerFechaActual } from '@/utils/dateUtils';

interface InfoTablaPartido {
    id_partido: number;
    fecha: string;
    hora: string;
    equipo_local: string;
    resultado_local: number;
    equipo_visitante: string;
    resultado_visitante: number;
    estado: string;
    accion: string;
}

interface MatchesGridProps {
    partidos: InfoTablaPartido[];
    idTorneo: number;
    idCategoria: number;
    onDateChange: (nuevaFecha: string) => void;
}

const TablaPartidos: React.FC<MatchesGridProps> = ({ partidos, onDateChange }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [selectedDate, setSelectedDate] = useState<string>("2024-08-22");
    const [initialDateSet, setInitialDateSet] = useState(false);
    const [detallesPartido, setDetallesPartido] = useState<any>(null);

    useEffect(() => {
        // const fechaActual = obtenerFechaActual();
        // onDateChange(fechaActual);
        if (!initialDateSet) {
            setInitialDateSet(true);
            onDateChange('2024-08-22');
        }
    }, [initialDateSet, onDateChange]);

    const handleOpenPopup = async (id_partido: number) => {        
        try {
            const detalles = await obtenerDetallesPartido(id_partido);
            setDetallesPartido(Array.isArray(detalles) ? detalles : [detalles]);
        } catch (error) {
            console.error('Error al obtener los detalles del partido:', error);
        }
    };

    useEffect(() => {
        if (detallesPartido && detallesPartido.length > 0) {
            setIsPopupOpen(true);
        }
    }, [detallesPartido]);

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    const handleRowClick = (index) => {
        setSelectedRow(index);
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const nuevaFecha = e.target.value;
        setSelectedDate(nuevaFecha);
        onDateChange(nuevaFecha);
    };

    return (
        <div className="bg-transparent shadow border rounded-xl overflow-hidden overflow-x-auto xl1800:w-[97%] ml-[1%] h-auto max-h-[675px] mb-6">
            <div className="flex items-center px-6 py-4 bg-gray-50 h-[85px]">
                <div className="flex items-center">
                    <Image
                        width={100}
                        height={100}
                        src="/images/logos/Icono_Calendario.png"
                        className="shadow-lg h-10 w-10 mt-1 mr-2 opacity-50"
                        alt="Icono Tabla"
                    />
                    <h2 className="text-xl sm590:text-2xl sm670:text-3xl font-semibold tracking-tight text-gray-700">
                        Calendario de Partidos
                    </h2>
                </div>
            </div>

            <div className="flex justify-center mb-4">
                <label className="text-3xl font-bold text-black opacity-40 mr-4 mt-1">Fecha:</label>
                <input
                    type="date"
                    className="text-2xl p-2 border border-gray-300 rounded"
                    value={selectedDate}
                    onChange={handleDateChange}
                />
            </div>

            <div className="overflow-x-auto overflow-y-auto custom-scrollbar h-auto max-h-[615px]">
                <table className="text-center w-full table-auto">
                    <thead className="bg-[#1e3a8a] text-white h-[60px] sticky top-0 z-10">
                        <tr>
                            <th className="text-center py-3 px-1 sm500:px-10 text-left text-sm sm590:text-base sm670:text-xl font-medium tracking-tight">
                                Fecha
                            </th>
                            <th className="text-center py-3 px-1 sm500:px-10 text-left text-sm sm590:text-base sm670:text-xl font-medium tracking-tight">
                                Hora
                            </th>
                            <th className="text-center py-3 px-1 sm500:px-10 text-left text-sm sm590:text-base sm670:text-xl font-medium tracking-tight">
                                Equipo Local
                            </th>
                            <th className="text-center py-3 px-1 sm500:px-10 text-left text-sm sm590:text-base sm670:text-xl font-medium tracking-tight">
                                Resultado
                            </th>
                            <th className="text-center py-3 px-1 sm500:px-10 text-left text-sm sm590:text-base sm670:text-xl font-medium tracking-tight">
                                Equipo Visitante
                            </th>
                            <th className="text-center py-3 px-1 sm500:px-10 text-left text-sm sm590:text-base sm670:text-xl font-medium tracking-tight">
                                Estado
                            </th>
                            <th className="text-center py-3 px-1 sm500:px-10 text-center text-sm sm590:text-base sm670:text-xl font-medium tracking-tight">
                                Acción
                            </th>
                        </tr>
                    </thead>

                    <tbody className="bg-white">
                        {partidos && partidos.length > 0 ? (
                            partidos.map((partido, index) => (
                                <tr
                                    key={index}
                                    className={`text-center border-b border-gray-200 cursor-pointer ${selectedRow === index ? 'bg-blue-200' : ''}`}
                                    onClick={() => handleRowClick(index)}
                                >
                                    <td className="text-center py-4 px-1 sm500:px-10 text-sm sm590:text-base sm670:text-xl text-gray-700">{partido.fecha}</td>
                                    <td className="text-center py-4 px-1 sm500:px-10 text-sm sm590:text-base sm670:text-xl text-gray-700">{partido.hora}</td>
                                    <td className="text-center py-4 px-1 sm500:px-10 text-sm sm590:text-base sm670:text-xl text-gray-700">{partido.equipo_local}</td>
                                    <td className="text-center py-4 px-1 sm500:px-10 text-sm sm590:text-base sm670:text-xl text-gray-700">
                                        {partido.resultado_local} - {partido.resultado_visitante}
                                    </td>
                                    <td className="text-center py-4 px-1 sm500:px-10 text-sm sm590:text-base sm670:text-xl text-gray-700">{partido.equipo_visitante}</td>
                                    <td className={`text-center py-4 px-1 sm500:px-10 text-center ${partido.estado === 'Finalizado' ? 'text-green-500' : 'text-orange-500'}`}>
                                        {partido.estado}
                                    </td>
                                    <td className="text-center py-4 px-1 sm500:px-10 text-center flex justify-center">
                                        <CustomButton
                                            text="Detalles"
                                            color="#3b81f5"
                                            width=""
                                            height=""
                                            onClick={() => handleOpenPopup(partido.id_partido)}
                                            className={`flex-col w-[100%] sm750:w-[80%] ${partido.estado === 'Pendiente' ? 'cursor-not-allowed opacity-50' : ''}`}
                                            icon="/images/logos/Icono_Resumen_Blanco.png"
                                            classNameIcon="w-10 h-10"
                                            disabled={partido.estado === 'Pendiente'}
                                        />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={7} className="text-center py-4 text-gray-500">
                                    No se encontraron partidos para esta fecha.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {isPopupOpen && detallesPartido && <PopUpTournamentMatchResume detallesPartido={detallesPartido} onClose={handleClosePopup} />}
        </div>
    );
};

export default TablaPartidos;