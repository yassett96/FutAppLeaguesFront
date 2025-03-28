"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import CustomButton from '@/components/components_generics/button/CustomButton';
import CustomAlert from '@/components/components_generics/custom_alert/CustomAlert';
import CustomAlertAcceptOrCancel from '@/components/components_generics/custom_alert/CustomAlertAcceptOrCancel';
import { desactivarDelegadoEquipoCategoria } from '@/services/delegadoEquipoCategoriaService';
import { desactivarEquipoCategoria } from '@/services/equipoCategoriaService';

const TablaEquipo = ({ equipos, onTeamDeleted, onTeamEdit, setIsLoading }) => {
  const [teamData, setTeamData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [showAlertCustom, setShowAlertCustom] = useState(false);
  const [messageAlertCustom, setMessageAlertCustom] = useState('');
  const [showAlertCustomAcceptOrCancel, setShowAlertCustomAcceptOrCancel] = useState(false);
  const [messageAlertCustomAcceptOrCancel, setMessageAlertCustomAcceptOrCancel] = useState('');
  const [idEquipoCategoria, setIdEquipoCategoria] = useState(0);
  const [idDelegadoEquipoCategoria, setIdDelegadoEquipoCategoria] = useState(0);

  // Actualiza los equipos cuando se reciban nuevas props
  useEffect(() => {
    setTeamData(equipos);
  }, [equipos]);

  const handleRowClick = (index) => {
    setSelectedRow(index);
  };

  const handleDelete = async (id_equipo_categoria: any, id_delegado_equipo_categoria: any) => {
    setIdEquipoCategoria(id_equipo_categoria);
    setIdDelegadoEquipoCategoria(id_delegado_equipo_categoria);

    setMessageAlertCustomAcceptOrCancel("¿Estás seguro de que deseas eliminar este equipo de la categoría? Esta acción no se puede deshacer.");
    setShowAlertCustomAcceptOrCancel(true);  
  };

  const handleEdit = (equipo: any) => {
    if (onTeamEdit) onTeamEdit(equipo);
  };

  const handleCloseAlertCustom = () => {
    setShowAlertCustom(false);
  };

  const handleAcceptCustomAlertAcceptOrCancel = async () => {
    try {
      setShowAlertCustomAcceptOrCancel(false);
      setIsLoading(true);
      // Intentar desactivar el delegado y la categoría
      const desactivarDelegado = await desactivarDelegadoEquipoCategoria(idDelegadoEquipoCategoria);
      const desactivarECategoria = await desactivarEquipoCategoria(idEquipoCategoria);
      setIsLoading(false);
      if (desactivarDelegado.success && desactivarECategoria.success) {
        setMessageAlertCustom("Se ha eliminado el equipo de esta categoría");
        setShowAlertCustom(true);

        setTimeout(()=>{
          if (onTeamDeleted) onTeamDeleted();
        }, 2000);        
      } else {
        setIsLoading(false);
        alert("Error al eliminar");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error al intentar eliminar el equipo:", error);
      alert("Ocurrió un error al intentar eliminar el equipo. Intenta nuevamente.");
    }
  }

  const handleCancelCustomAlertAcceptOrCancel = () => {
    setShowAlertCustomAcceptOrCancel(false);
  }

  return (
    <div className="bg-transparent shadow border rounded-xl overflow-hidden overflow-x-auto xl1800:w-[97%] ml-[1%] h-auto mb-6">
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
            Tabla de Equipos
          </h2>
        </div>
      </div>

      {/* Contenedor con scrollbar horizontal y vertical habilitado */}
      <div className="overflow-x-auto custom-scrollbar">
        <div className="h-auto max-h-[80vh] overflow-y-auto custom-scrollbar">
          <table className="w-full table-auto">
            <thead
              className="bg-[#1e3a8a] text-white h-[60px] sticky top-0 z-10"
              style={{ clipPath: "inset(0 0 0 0 round 0px)" }}
            >
              <tr className='text-[9px] sm590:text-sm sm670:text-xl'>
                <th className="py-3 px-1 sm500:px-10 text-center font-medium tracking-tight">
                  Equipo
                </th>
                <th className="py-3 px-1 sm500:px-10 text-center font-medium tracking-tight">
                  Delegado
                </th>
                <th className="py-3 px-1 sm500:px-10 text-center font-medium tracking-tight">
                  Correo
                </th>
                <th className="py-3 px-1 sm500:px-10 text-center font-medium tracking-tight">
                  Acciones
                </th>
              </tr>
            </thead>

            <tbody className="bg-white">
              {teamData.length > 0 ? (
                teamData.map((equipo, index) => (
                  <tr
                    key={index}
                    className={`text-[8px] sm590:text-xl sm670:text-2xl px-1 sm500:px-10 text-center border-b border-gray-200 cursor-pointer ${selectedRow === index ? "bg-blue-200" : ""
                      }`}
                    onClick={() => handleRowClick(index)}
                  >
                    <td className="px-0 sm500:px-10 text-center py-4 text-gray-700">
                      <div className=''>{equipo.nombre_equipo}</div>
                    </td>
                    <td className="px-0 sm500:px-10 text-center py-4 text-gray-700">
                      {equipo.delegado_primer_nombre + " " + equipo.delegado_primer_apellido}
                    </td>
                    <td className="px-1 sm500:px-10 text-center py-4 text-gray-700">
                      {equipo.delegado_correo}
                    </td>
                    <td className="px-0 sm500:px-10 text-center text-gray-700">
                      <div className="flex flex-col items-center mb-3 m-1">
                        <CustomButton
                          text="Eliminar equipo"
                          color="#ef4444"
                          width=""
                          height=""
                          onClick={() =>
                            handleDelete(equipo.id_equipo_categoria, equipo.id_delegado_equipo_categoria)
                          }
                          className="flex-col w-full mt-2"
                          classNameText='text-xs sm590:text-xl sm670:text-2xl'
                          classNameIcon='w-6 sm590:h-8 w-6 sm590:w-8'
                          icon="/images/logos/Icono_Cancelar_Blanco.png"
                        />
                        <CustomButton
                          text="Editar equipo"
                          color="#f97316"
                          width=""
                          height=""
                          onClick={() => handleEdit(equipo)}
                          className="flex-col w-full mt-2"
                          classNameText='text-xs sm590:text-xl sm670:text-2xl'
                          classNameIcon='w-6 sm590:h-8 w-6 sm590:w-8'
                          icon="/images/logos/Icono_Editar_Blanco.png"
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center py-4 px-6 text-gray-700"
                  >
                    No se encontraron equipos asociados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/** Alertas de las acciones */}
      <CustomAlert message={messageAlertCustom} show={showAlertCustom} onClose={handleCloseAlertCustom} />
      <CustomAlertAcceptOrCancel message={messageAlertCustomAcceptOrCancel} onAccept={handleAcceptCustomAlertAcceptOrCancel} onCancel={handleCancelCustomAlertAcceptOrCancel} show={showAlertCustomAcceptOrCancel} />
    </div>
  );
};

export default TablaEquipo;