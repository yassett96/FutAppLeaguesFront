"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import CustomButton from '@/components/components_generics/button/CustomButton';
import CustomAlert from '@/components/components_generics/custom_alert/CustomAlert';
import CustomAlertAcceptOrCancel from '@/components/components_generics/custom_alert/CustomAlertAcceptOrCancel';
import { desactivarTorneoCategoria } from '@/services/torneoCategoriaService';

const TablaTorneos = ({ onManageMatch, torneos, onTournamentDeleted, setIsLoading }) => {
    const [selectedRow, setSelectedRow] = useState(null);
    const [showPopupEditTournament, setShowPopupEditTournament] = useState(false);
    const [showAlertCustom, setShowAlertCustom] = useState(false);
    const [messageAlertCustom, setMessageAlertCustom] = useState('');
    const [showAlertCustomAcceptOrCancel, setShowAlertCustomAcceptOrCancel] = useState(false);
    const [messageAlertCustomAcceptOrCancel, setMessageAlertCustomAcceptOrCancel] = useState('');
    const [idTorneoCategoriaSeleccionado, setIdTorneoCategoriaSeleccionado] = useState(0);
    const [torneosActualizados, setTorneosActualizados] = useState(torneos);

    useEffect(() => {
        setTorneosActualizados(torneos);
    }, [torneos]);

    const handleDelete = async (idTorneoCategoria) => {
        setIdTorneoCategoriaSeleccionado(idTorneoCategoria);
        setMessageAlertCustomAcceptOrCancel('¿Estás seguro de que quieres eliminar este Torneo?');
        setShowAlertCustomAcceptOrCancel(true);
    };

    const handleCloseAlertCustom = () => {
        setShowAlertCustom(false);
    };

    const handleAcceptCustomAlertAcceptOrCancel = async () => {
        try {
            setShowAlertCustomAcceptOrCancel(false);
            setIsLoading(true);
            const res = await desactivarTorneoCategoria(idTorneoCategoriaSeleccionado)
            setIsLoading(false);
            if (res.success) {
                setMessageAlertCustom("¡Torneo eliminado correctamente!");
                setShowAlertCustom(true);

                if (onTournamentDeleted) {
                    onTournamentDeleted();
                }
            } else {
                setIsLoading(false);
                alert(`Error al eliminar el torneo: ${res.message}`);
            }
        } catch (error) {
            setIsLoading(false);
            console.log("Error al intentar desactivar la Liga_Categoria: " + error);
            alert("Error al intentar desactivar la Liga_Categoria: " + error);
        }
    };

    const handleCancelCustomAlertAcceptOrCancel = () => {
        setShowAlertCustomAcceptOrCancel(false);
    };

    const handldeDescargarListaJugadores = (torneo: any) => {
        console.log("torneo: ", torneo);
    };

    return (
        <div className="bg-transparent shadow border rounded-xl overflow-hidden overflow-x-auto xl1800:w-[97%] ml-[1%] h-auto mb-6">
            <div className="flex flex-col xs410:flex-row justify-center px-6 py-6 xs410:py-4 h-auto">
                <div className="flex items-center">
                    <Image
                        width={100}
                        height={100}
                        src="/images/logos/Icono_Tabla.png"
                        className="shadow-lg h-10 w-10 mt-1 mr-2 opacity-60"
                        alt="Icono Tabla"
                    />
                    <h2 className="text-xl sm590:text-2xl sm670:text-3xl font-semibold tracking-tight text-gray-700">Tabla de Torneos</h2>
                </div>
            </div>

            {/* Contenedor con scrollbar horizontal y vertical habilitado */}
            <div className="overflow-x-auto overflow-y-auto custom-scrollbar max-h-[70vh]">
                <table className="w-full table-auto">
                    <thead className="bg-[#1e3a8a] text-white h-[60px] sticky top-0 z-10">
                        <tr className='text-[9px] sm590:text-sm sm670:text-xl'>
                            <th className="text-center py-3 px-0 sm500:px-10 font-medium tracking-tight">Torneo</th>
                            <th className="text-center py-3 px-1 sm500:px-10 font-medium tracking-tight">Liga</th>
                            <th className="text-center py-3 px-1 sm500:px-10 font-medium tracking-tight">Categoría</th>
                            <th className="text-center py-3 px-1 sm500:px-10 font-medium tracking-tight">F. Inicio</th>
                            <th className="text-center py-3 px-0 sm500:px-10 font-medium tracking-tight">F. Final</th>
                            <th className="text-center py-3 px-0 sm500:px-10 font-medium tracking-tight">Tipo Torneo</th>
                            <th className="text-center py-3 px-0 sm500:px-10 text-left font-medium tracking-tight">Acciones</th>
                        </tr>
                    </thead>

                    <tbody className="bg-white">
                        {torneosActualizados.map((torneo, index) => (
                            <tr
                                key={index}
                                className={`text-[8px] sm590:text-xl sm670:text-2xl border-b border-gray-200 cursor-pointer ${selectedRow === index ? 'bg-blue-200' : ''
                                    }`}

                            >
                                <td className="py-4 px-0 sm500:px-10 text-gray-700 text-center">{torneo.nombre_torneo}</td>
                                <td className="py-4 px-0 sm500:px-10 text-gray-700 text-center">{torneo.nombre_liga}</td>
                                <td className="py-4 px-0 sm500:px-10 text-gray-700 text-center">{torneo.nombre_categoria}</td>
                                <td className="py-4 px-0 sm500:px-10 text-gray-700 text-center">{torneo.fecha_inicio}</td>
                                <td className="py-4 px-0 sm500:px-10 text-gray-700 text-center">{torneo.fecha_final}</td>
                                <td className="py-4 px-0 sm500:px-10 text-gray-700 text-center">{torneo.tipo_torneo}</td>
                                <td className="text-center px-0 sm500:px-10 text-gray-700">
                                    <div className="flex flex-col items-center m-1">
                                        <CustomButton
                                            text="Eliminar Torneo"
                                            color="#ef4444"
                                            width=""
                                            height=""
                                            onClick={() => handleDelete(torneo.id_torneo_categoria)}
                                            className="flex-col w-full sm500:w-[200px] mt-2 mb-2"
                                            classNameText='text-[8px] sm590:text-xl sm670:text-2xl'
                                            classNameIcon='w-6 sm590:h-8 w-6 sm590:w-8'
                                            icon="/images/logos/Icono_Cancelar_Blanco.png"
                                        />
                                        <CustomButton
                                            text="Editar Fixture"
                                            color="#34D399"
                                            width=""
                                            height=""
                                            onClick={() => onManageMatch(torneo)}
                                            className="flex-col w-full sm500:w-[200px] mt-2 mb-2"
                                            classNameText='text-[8px] sm590:text-xl sm670:text-2xl'
                                            classNameIcon='w-6 sm590:h-8 w-6 sm590:w-8'
                                            icon="/images/logos/Icono_GestionarPartido_Blanco.png"
                                        />
                                        {/* <CustomButton
                                            text="Descargar lista"
                                            color="#f97316"
                                            width=""
                                            height="40px"
                                            onClick={handldeDescargarListaJugadores(torneo)}
                                            className="w-[180px] sm500:w-[200px] mb-2"
                                            icon="/images/logos/Icono_Editar_Blanco.png"
                                        /> */}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/** Alertas de las acciones */}
            <CustomAlert message={messageAlertCustom} show={showAlertCustom} onClose={handleCloseAlertCustom} />
            <CustomAlertAcceptOrCancel message={messageAlertCustomAcceptOrCancel} onAccept={handleAcceptCustomAlertAcceptOrCancel} onCancel={handleCancelCustomAlertAcceptOrCancel} show={showAlertCustomAcceptOrCancel} />
        </div>
    );
};

export default TablaTorneos;