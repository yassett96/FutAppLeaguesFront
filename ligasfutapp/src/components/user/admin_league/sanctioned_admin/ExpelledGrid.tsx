"use client";
import React, { useState } from 'react';
import Image from 'next/image';
// import CustomButton from '@/components/components_generics/button/CustomButton';
import CustomAlert from '@/components/components_generics/custom_alert/CustomAlert';
import { desactivarSancionado } from '@/services/sancionadoService';

interface Expulsado {
    equipo: string;
    fecha_expulsion: string;
    id_expulsin: number;
    jugador: string;
    liga: string;
    motivo: string;
    permanente: boolean;
    torneo: string;
}

interface TablaExpulsadoProps {
    expulsados: Expulsado[];
    onEditExpelled: (sancionado: Expulsado) => void;
    onDeleteExpelled: () => void;
}

const TablaExpulsado: React.FC<TablaExpulsadoProps> = ({
    expulsados,
    onEditExpelled,
    onDeleteExpelled
}) => {
    console.log("expulsados: ", expulsados);
    const [selectedRow, setSelectedRow] = useState(null);
    const [showAlertCustom, setShowAlertCustom] = useState(false);
    const [messageAlertCustom, setMessageAlertCustom] = useState('');

    const handleRowClick = (index) => {
        setSelectedRow(index);
    };

    const handleDeleteExpelled = async (id_sancionado: number) => {
        const confirmDelete = window.confirm(
            "¿Está seguro de que desea eliminar esta sanción? Esta acción no se puede deshacer."
        );

        if (!confirmDelete) {
            return; // Si el usuario cancela, no se realiza ninguna acción
        }

        try {
            const response = await desactivarSancionado(id_sancionado);
            if (response.success) {
                setMessageAlertCustom("¡Sanción eliminada correctamente!");
                setShowAlertCustom(true);

                onDeleteExpelled();
            } else {
                alert(`Error: ${response.message}`);
            }
        } catch (error) {
            console.error("Error al eliminar la sanción: ", error);
            alert("Hubo un error al intentar eliminar la sanción.");
        }
    };

    const handleCloseAlertCustom = () => {
        setShowAlertCustom(false);
    };

    return (
        <div className="bg-transparent shadow border rounded-xl overflow-hidden overflow-x-auto xl1800:w-[97%] ml-[1%] h-auto mb-6">
            <div className="flex items-center px-6 py-4 bg-gray-50 h-[85px]">
                <div className="flex items-center">
                    <Image width={100} height={100} src="/images/logos/Icono_Tabla.png" className="shadow-lg h-10 w-10 mt-1 mr-2 opacity-60" alt="Icono Tabla" />
                    <h2 className="text-xl sm590:text-2xl sm670:text-3xl font-semibold tracking-tight text-gray-700">Expulsados</h2>
                </div>
            </div>

            {/* Contenedor con scrollbar horizontal y vertical habilitado */}
            <div className="overflow-x-auto custom-scrollbar" style={{ maxHeight: '500px' }}>
                <table className="w-full table-auto">
                    <thead className="bg-[#1e3a8a] text-white h-[60px] sticky top-0 z-10">
                        <tr className="border-b border-gray-300 text-[8px] sm590:text-sm sm670:text-xl">
                            <th className="text-center py-3 px-1 sm500:px-10 text-left font-medium tracking-tight">Jugador</th>
                            <th className="text-center py-3 px-1 sm500:px-10 text-left font-medium tracking-tight">Equipo</th>
                            {/* <th className="text-center py-3 px-1 sm500:px-10 text-left font-medium tracking-tight">Liga</th>
                            <th className="text-center py-3 px-1 sm500:px-10 text-left font-medium tracking-tight">Torneo</th>
                            <th className="text-center py-3 px-1 sm500:px-10 text-left font-medium tracking-tight">Permanente</th> */}
                            <th className="text-center py-3 px-1 sm500:px-10 text-left font-medium tracking-tight">Motivo</th>
                            <th className="text-center py-3 px-1 sm500:px-10 text-left font-medium tracking-tight">Fecha expulsión</th>
                            {/* <th className="text-center py-3 px-1 sm500:px-10 text-left font-medium tracking-tight">Acciones</th> */}
                        </tr>
                    </thead>

                    <tbody className="bg-white">
                        {expulsados != undefined && expulsados.length > 0 ? (
                            expulsados.map((expulsado, index) => (
                                <tr
                                    key={index}
                                    className={`text-[8px] sm590:text-xl sm670:text-2xl border-b cursor-pointer ${selectedRow === index ? 'bg-blue-200' : ''}`}
                                    onClick={() => handleRowClick(index)}
                                >
                                    <td className="text-center py-4 px-1 sm500:px-10 text-gray-700">{expulsado.jugador}</td>
                                    <td className="text-center py-4 px-1 sm500:px-10 text-gray-700">{expulsado.equipo}</td>
                                    {/* <td className="text-center py-4 px-1 sm500:px-10 text-gray-700">{expulsado.liga}</td>
                                    <td className="text-center py-4 px-1 sm500:px-10 text-gray-700">{expulsado.torneo}</td>
                                    <td className="text-center py-4 px-1 sm500:px-10 text-gray-700">{expulsado.permanente? "Expulsado permanente" : ""}</td> */}
                                    <td className="text-center py-4 px-1 sm500:px-10 text-gray-700">{expulsado.motivo}</td>
                                    <td className="text-center py-4 px-1 sm500:px-10 text-gray-700">
                                        {expulsado.fecha_expulsion ? expulsado.fecha_expulsion.split('T')[0] : ''}
                                    </td>
                                    {/* <td className="text-center text-gray-700 flex flex-col items-center justify-center">
                                        <CustomButton
                                            text="Editar sancionado"
                                            color="#f97316"
                                            width=""
                                            height="40px"
                                            onClick={() => onEditExpelled(sancionado)}
                                            className="w-[180px] sm500:w-[200px] mt-2 mb-2"
                                            icon="/images/logos/Icono_Editar_Blanco.png"
                                        />
                                        <CustomButton
                                            text="Eliminar sancionado"
                                            color="#ef4444"
                                            width=""
                                            height="40px"
                                            onClick={() => handleDeleteExpelled(sancionado.id_sancion)}
                                            className="w-[180px] sm500:w-[200px] mt-2 mb-2"
                                            icon="/images/logos/Icono_Cancelar_Blanco.png"
                                        />
                                    </td> */}
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
        </div>
    );
};

export default TablaExpulsado;