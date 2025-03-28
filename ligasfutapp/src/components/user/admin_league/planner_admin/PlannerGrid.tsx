"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import CustomButton from '@/components/components_generics/button/CustomButton';
import CustomAlert from '@/components/components_generics/custom_alert/CustomAlert';
import CustomAlertAcceptOrCancel from '@/components/components_generics/custom_alert/CustomAlertAcceptOrCancel';
import { desactivarPlanilleroLiga } from '@/services/planilleroLigaService';

interface TablaPlaneadoresProps {
    onEditPlanner: (planner: any) => void;
    planilleros: any[];
    onPlannerDeleted: () => void;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>; // Define que es una función de estado
  }

  const TablaPlaneadores: React.FC<TablaPlaneadoresProps> = ({
    onEditPlanner,
    planilleros,
    onPlannerDeleted,
    setIsLoading,
  }) => {
    const [selectedRow, setSelectedRow] = useState(null);
    const [showAlertCustom, setShowAlertCustom] = useState(false);
    const [messageAlertCustom, setMessageAlertCustom] = useState('');
    const [showAlertCustomAcceptOrCancel, setShowAlertCustomAcceptOrCancel] = useState(false);
    const [messageAlertCustomAcceptOrCancel, setMessageAlertCustomAcceptOrCancel] = useState('');
    const [idPlanilleroLigaSeleccionado, setIdPlanilleroLigaSeleccionado] = useState(0);

    const handleDelete = async (idPlanilleroLiga: number) => {
        setIdPlanilleroLigaSeleccionado(idPlanilleroLiga);
        setMessageAlertCustomAcceptOrCancel("¿Estás seguro de que quieres eliminar este planillero?");
        setShowAlertCustomAcceptOrCancel(true);
    };

    const handleEdit = async (planillero: any) => {
        onEditPlanner(planillero);
    };

    const handleCloseAlertCustom = () => {
        setShowAlertCustom(false);
    };

    const handleAcceptCustomAlertAcceptOrCancel = async () => {
        setIsLoading(true);
        setShowAlertCustomAcceptOrCancel(false);
        try {
            const response = await desactivarPlanilleroLiga(idPlanilleroLigaSeleccionado);
            if (response.success) {
                setIsLoading(false);
                setMessageAlertCustom("¡Se ha eliminado el planillero correctamente!");
                setShowAlertCustom(true);

                setTimeout(() => {
                    onPlannerDeleted();
                }, 2000);
            }
        } catch (error) {
            console.log("Error al intentar desactivar el planillero de la liga: " + error);
            alert("Error al intentar desactivar el planillero de la liga: " + error);
        }
    };

    const handleCancelCustomAlertAcceptOrCancel = () => {
        setShowAlertCustomAcceptOrCancel(false);
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
                    <h2 className="text-xl sm590:text-2xl sm670:text-3xl font-semibold tracking-tight text-gray-700">Tabla de planilleros</h2>
                </div>
            </div>

            {/* Contenedor con scrollbar horizontal y vertical habilitado */}
            <div className="overflow-x-auto overflow-y-auto custom-scrollbar" style={{ maxHeight: 'calc(8 * 60px + 16px)' }}>
                <table className="w-full table-auto">
                    <thead className="bg-[#1e3a8a] text-white h-[60px] sticky top-0 z-10">
                        <tr className='text-[9px] sm590:text-sm sm670:text-xl'>
                            <th className="text-center py-3 px-0 sm500:px-10 font-medium tracking-tight">Nombre</th>
                            <th className="text-center py-3 px-0 sm500:px-10 font-medium tracking-tight">Correo</th>
                            <th className="text-center py-3 px-0 sm500:px-10 font-medium tracking-tight">DNI</th>
                            <th className="text-center py-3 px-0 sm500:px-10 font-medium tracking-tight">Fecha asignación</th>                            
                            <th className="text-center py-3 px-0 sm500:px-10 text-left font-medium tracking-tight">Acciones</th>
                        </tr>
                    </thead>

                    <tbody className="bg-white">
                        {planilleros.map((planillero, index) => (
                            <tr
                                key={index}
                                className={`text-[8px] sm590:text-xl sm670:text-2xl border-b border-gray-200 cursor-pointer ${selectedRow === index ? 'bg-blue-200' : ''}`}
                            >
                                <td className="text-center py-4 px-0 sm500:px-10 text-gray-700">
                                    {planillero.Usuario.primer_nombre + " " + planillero.Usuario.primer_apellido}
                                </td>
                                <td className="text-center py-4 px-0 sm500:px-10 text-gray-700">
                                    {planillero.Usuario.correo}
                                </td>
                                <td className="text-center py-4 px-1 sm500:px-10 text-gray-700">
                                    {planillero.Usuario.dni}
                                </td>
                                <td className="text-center py-4 px-0 sm500:px-10 text-gray-700">
                                    {planillero.fecha_asignacion}
                                </td>                                
                                <td className="text-center px-0 sm500:px-10 text-gray-700">
                                    <div className="flex flex-col items-center">
                                        <CustomButton
                                            text="Eliminar planillero"
                                            color="#ef4444"
                                            width=""
                                            height=""
                                            onClick={() => handleDelete(planillero.id_planillero_liga)}
                                            className="flex-col m-2 p-2"
                                            classNameText = "text-sm sm590:text-xl"
                                            classNameIcon='w-6 sm590:h-8 w-6 sm590:w-8'
                                            icon="/images/logos/Icono_Cancelar_Blanco.png"
                                        />
                                        <CustomButton
                                            text="Editar planillero"
                                            color="#f97316"
                                            width=""
                                            height=""
                                            onClick={() => handleEdit(planillero)}
                                            className="flex-col m-2 p-2"
                                            classNameText = "text-sm sm590:text-xl"
                                            classNameIcon='w-6 sm590:h-8 w-6 sm590:w-8'
                                            icon="/images/logos/Icono_Editar_Blanco.png"
                                        />
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

export default TablaPlaneadores;