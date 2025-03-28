"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import CustomButton from '@/components/components_generics/button/CustomButton';
import CustomAlert from '../../../../components/components_generics/custom_alert/CustomAlert';
import CustomAlertAcceptOrCancel from '@/components/components_generics/custom_alert/CustomAlertAcceptOrCancel';
import { desactivarLigaCategoria } from '@/services/ligaCategoriaService';

const CategoryGrid = ({ categorias, onCategoriaEliminada, onEdit, setIsLoading }) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [showAlertCustom, setShowAlertCustom] = useState(false);
  const [messageAlertCustom, setMessageAlertCustom] = useState('');
  const [idLigaCategoria, setIdLigaCategoria] = useState(0);
  const [showAlertCustomAcceptOrCancel, setShowAlertCustomAcceptOrCancel] = useState(false);
  const [messageAlertCustomAcceptOrCancel, setMessageAlertCustomAcceptOrCancel] = useState('');

  if (!Array.isArray(categorias)) {
    categorias = [categorias];
  }

  console.log("categorias adentro: ", categorias);

  const handleRowClick = (index) => {
    setSelectedRow(index);
  };

  const handleDelete = async (idLigaCategoria: number) => {
    setMessageAlertCustomAcceptOrCancel("¿Estás seguro de que quieres eliminar esta categoría?");
    setShowAlertCustomAcceptOrCancel(true);
    setIdLigaCategoria(idLigaCategoria);
  };

  const handleEdit = async (categoria: any) => {
    console.log("categoria: ", categoria);
    onEdit(categoria);
  };

  const handleCloseAlertCustom = () => {
    setShowAlertCustom(false);
  };

  const handleAcceptAlertAcceptOrCancel = async () => {    
    setShowAlertCustomAcceptOrCancel(false);
    setIsLoading(true);
    
    try {

      await desactivarLigaCategoria(idLigaCategoria);
      setIsLoading(false);

      setMessageAlertCustom("¡Categoría eliminada correctamente!");
      setShowAlertCustom(true);
      
      setTimeout(()=>{
        onCategoriaEliminada();
      }, 2000);
            
    } catch (error) {
      console.log("Error al intentar desactivar la Liga_Categoria: " + error);
      alert("Error al intentar desactivar la Liga_Categoria: " + error);
    }
  };

  const handleCancelAlertAcceptOrCancel = () => {
    setShowAlertCustomAcceptOrCancel(false);
  };

  return (
    <div className="bg-transparent shadow border rounded-xl overflow-hidden overflow-x-auto xl1800:w-[97%] ml-[1%] h-auto max-h-[540px] mb-6">
      <div className="flex items-center px-6 py-4 bg-gray-50 h-[85px]">
        <div className="flex items-center">
          <Image width={100} height={100} src="/images/logos/Icono_Tabla.png" className='shadow-lg h-10 w-10 mt-1 mr-2 opacity-60' alt="Icono Tabla" />
          <h2 className="text-xl sm590:text-2xl sm670:text-3xl font-semibold tracking-tight text-gray-700">Categorías</h2>
        </div>
      </div>

      {/* Contenedor con scrollbar horizontal y vertical habilitado */}
      <div className="overflow-x-auto overflow-y-auto custom-scrollbar h-auto max-h-[450px]">
        <table className="w-full table-auto">
          <thead
            className="text-[8px] xs300:text-[10px] xs420:text-xl bg-[#1e3a8a] text-white h-[60px] sticky top-0 z-10"
            style={{ clipPath: 'inset(0 0 0 0 round 0px)' }}>
            <tr className='text-[9px] sm590:text-sm sm670:text-xl'>
              <th className="py-3 px-1 sm500:px-10 text-center font-medium tracking-tight">Género</th>
              <th className="py-3 px-1 sm500:px-10 text-center font-medium tracking-tight">Categoría</th>
              <th className="py-3 px-1 sm500:px-10 text-center font-medium tracking-tight">Rango de Edad</th>
              <th className="py-3 px-1 sm500:px-10 text-center font-medium tracking-tight">Acciones</th>
            </tr>
          </thead>

          <tbody className="bg-white text-[9px] sm590:text-sm sm670:text-xl text-center">
            {categorias.length > 0 ? (
              categorias.map((categoria, index) => (
                <tr
                  key={index}
                  className={`border-b border-gray-200 cursor-pointer ${selectedRow === index ? 'bg-blue-200' : ''
                    }`}
                  onClick={() => handleRowClick(index)}
                >
                  <td className="py-4 px-1 sm500:px-10 text-gray-700">
                    {categoria.genero}
                  </td>
                  <td className="py-4 px-1 sm500:px-10 text-gray-700">
                    {categoria.nombre_categoria}
                  </td>
                  <td className="py-4 px-1 sm500:px-10 text-gray-700">
                    {categoria.edad_minima} - {categoria.edad_maxima}
                  </td>
                  <td className="flex flex-col items-center justify-center text-center text-gray-700 space-y-2 p-3">
                    <CustomButton
                      text="Eliminar"
                      color="#ef4444"
                      width=""
                      height=""
                      onClick={() => handleDelete(categoria.id_liga_categoria)}
                      className="flex-col mt-5 xs300:mt-0 mb-5 xs300:mb-0 w-full"
                      classNameText='text-xs sm590:text-xl sm670:text-2xl'
                      classNameIcon='w-6 sm590:h-8 w-6 sm590:w-8'
                      icon="/images/logos/Icono_Cancelar_Blanco.png"
                    />
                    <CustomButton
                      text="Editar"
                      color="#FFA500"
                      width=""
                      height=""
                      onClick={() => handleEdit(categoria)}
                      className="flex-col mt-5 xs300:mt-0 mb-5 xs300:mb-0 w-full"
                      classNameText='text-xs sm590:text-xl sm670:text-2xl'
                      classNameIcon='w-6 sm590:h-8 w-6 sm590:w-8'
                      icon="/images/logos/Icono_Cancelar_Blanco.png"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="text-center py-6 text-sm sm590:text-base sm670:text-xl text-gray-500"
                >
                  No hay categorías registradas para esta Liga.
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

export default CategoryGrid;