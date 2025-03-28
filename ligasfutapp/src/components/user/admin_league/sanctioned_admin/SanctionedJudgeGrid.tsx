"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import CustomButton from '@/components/components_generics/button/CustomButton';
import CustomAlert from '@/components/components_generics/custom_alert/CustomAlert';
import CustomAlertAcceptOrCancel from '@/components/components_generics/custom_alert/CustomAlertAcceptOrCancel';
import { desactivarSancionado } from '@/services/sancionadoService';

interface SancionadoJuzgado {
    id_sancion: number;
    equipo: string;
    fecha_partido: string;
    fecha_sancion: any;
    fechas_pendientes: number;
    fechas_sancionadas: number;
    id_jugador: number;
    id_partido: number;
    nombre_jugador: string;
}


interface TablaSancionadoJuzgadoProps {
    sancionados: SancionadoJuzgado[];
    onEditSanctioned: (sancionado: SancionadoJuzgado) => void;
    onDeleteSanctioned: () => void;
    setIsLoading: (isLoading: Boolean) => any;
}

const TablaSancionadoJuzgado: React.FC<TablaSancionadoJuzgadoProps> = ({
    sancionados,
    onEditSanctioned,
    onDeleteSanctioned,
    setIsLoading
}) => {
    const [selectedRow, setSelectedRow] = useState(null);
    const [showAlertCustom, setShowAlertCustom] = useState(false);
    const [messageAlertCustom, setMessageAlertCustom] = useState('');
    const [showAlertCustomAcceptOrCancel, setShowAlertCustomAcceptOrCancel] = useState(false);
    const [messageAlertCustomAcceptOrCancel, setMessageAlertCustomAcceptOrCancel] = useState('');
    const [idSancionado, setIdSancionado] = useState(0);

    const handleRowClick = (index) => {
        setSelectedRow(index);
    };

    const handleDeleteSanctioned = async (id_sancionado: number) => {
        setIdSancionado(id_sancionado);
        setMessageAlertCustomAcceptOrCancel("¿Está seguro de que desea eliminar esta sanción? Esta acción no se puede deshacer.");
        setShowAlertCustomAcceptOrCancel(true);
    };

    const handleAcceptAlertAcceptOrCancel = async () => {
        try {
            setShowAlertCustomAcceptOrCancel(false);
            setIsLoading(true);
            const response = await desactivarSancionado(idSancionado);
            setIsLoading(false);
            if (response.success) {
                setMessageAlertCustom("¡Sanción eliminada correctamente!");
                setShowAlertCustom(true);

                onDeleteSanctioned();
            } else {
                setIsLoading(false);
                alert(`Error: ${response.message}`);
            }
        } catch (error) {
            setIsLoading(false);
            console.error("Error al eliminar la sanción: ", error);
            alert("Hubo un error al intentar eliminar la sanción.");
        }
    };

    const handleCancelAlertAcceptOrCancel = () => {
        setShowAlertCustomAcceptOrCancel(false);
    };

    const handleCloseAlertCustom = () => {
        setShowAlertCustom(false);
    };

    return (
        <div className="bg-transparent shadow border rounded-xl overflow-hidden overflow-x-auto xl1800:w-[97%] ml-[1%] h-auto mb-6">
            <div className="flex items-center px-6 py-4 bg-gray-50 h-[85px]">
                <div className="flex items-center">
                    <Image width={100} height={100} src="/images/logos/Icono_Tabla.png" className="shadow-lg h-10 w-10 mt-1 mr-2 opacity-60" alt="Icono Tabla" />
                    <h2 className="text-xl sm590:text-2xl sm670:text-3xl font-semibold tracking-tight text-gray-700">Sancionados juzgados</h2>
                </div>
            </div>

            {/* Contenedor con scrollbar horizontal y vertical habilitado */}
            <div className="overflow-x-auto custom-scrollbar" style={{ maxHeight: '500px' }}>
                <table className="w-full table-auto">
                    <thead className="bg-[#1e3a8a] text-white h-[60px] sticky top-0 z-10">
                        <tr className="border-b border-gray-300 text-[8px] sm590:text-sm sm670:text-xl">
                            <th className="text-center py-3 px-1 sm500:px-10 text-left font-medium tracking-tight">Jugador</th>
                            <th className="text-center py-3 px-1 sm500:px-10 text-left font-medium tracking-tight">Equipo</th>
                            <th className="text-center py-3 px-1 sm500:px-10 text-left font-medium tracking-tight">Fecha Partido</th>
                            <th className="text-center py-3 px-1 sm500:px-10 text-left font-medium tracking-tight">Fecha Sanción</th>
                            <th className="text-center py-3 px-1 sm500:px-10 text-left font-medium tracking-tight">Fechas Sancionadas</th>
                            <th className="text-center py-3 px-1 sm500:px-10 text-left font-medium tracking-tight">Fechas Pendientes</th>
                            <th className="text-center py-3 px-1 sm500:px-10 text-left font-medium tracking-tight">Acciones</th>
                        </tr>
                    </thead>

                    <tbody className="bg-white">
                        {sancionados != undefined && sancionados.length > 0 ? (
                            sancionados.map((sancionado, index) => (
                                <tr
                                    key={index}
                                    className={`text-[8px] sm590:text-xl sm670:text-2xl border-b cursor-pointer ${selectedRow === index ? 'bg-blue-200' : ''}`}
                                    onClick={() => handleRowClick(index)}
                                >
                                    <td className="text-center py-4 px-1 sm500:px-10 text-gray-700">{sancionado.nombre_jugador}</td>
                                    <td className="text-center py-4 px-1 sm500:px-10 text-gray-700">{sancionado.equipo}</td>
                                    <td className="text-center py-4 px-1 sm500:px-10 text-gray-700">{sancionado.fecha_partido}</td>
                                    <td className="text-center py-4 px-1 sm500:px-10 text-gray-700">
                                        {sancionado.fecha_sancion ? sancionado.fecha_sancion.split('T')[0] : ''}
                                    </td>
                                    <td className="text-center py-4 px-1 sm500:px-10 text-gray-700">{sancionado.fechas_sancionadas}</td>
                                    <td className="text-center py-4 px-1 sm500:px-10 text-gray-700">{sancionado.fechas_pendientes}</td>
                                    <td className="text-center text-gray-700 flex flex-col items-center justify-center">
                                        <CustomButton
                                            text="Editar sancionado"
                                            color="#f97316"
                                            width=""
                                            height=""
                                            onClick={() => onEditSanctioned(sancionado)}
                                            className="flex-col m-1"
                                            classNameText='text-[8px] sm590:text-xl sm670:text-2xl'
                                            classNameIcon='w-6 sm590:h-8 w-6 sm590:w-8'
                                            icon="/images/logos/Icono_Editar_Blanco.png"
                                        />
                                        <CustomButton
                                            text="Eliminar sancionado"
                                            color="#ef4444"
                                            width=""
                                            height=""
                                            onClick={() => handleDeleteSanctioned(sancionado.id_sancion)}
                                            className="flex-col m-1"
                                            classNameText='text-[8px] sm590:text-xl sm670:text-2xl'
                                            classNameIcon='w-6 sm590:h-8 w-6 sm590:w-8'
                                            icon="/images/logos/Icono_Cancelar_Blanco.png"
                                        />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={7}
                                    className="text-center py-4 px-6 text-sm sm590:text-base sm670:text-xl text-gray-700"
                                >
                                    No hay sancionados registrados.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {/** Alertas de las acciones */}
            <CustomAlert message={messageAlertCustom} show={showAlertCustom} onClose={handleCloseAlertCustom} />
            <CustomAlertAcceptOrCancel message={messageAlertCustomAcceptOrCancel} onAccept={handleAcceptAlertAcceptOrCancel} onCancel={handleCancelAlertAcceptOrCancel} show={showAlertCustomAcceptOrCancel} />
        </div>
    );
};

export default TablaSancionadoJuzgado;