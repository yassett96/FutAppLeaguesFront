"use client";
import React, { useState, useEffect } from 'react';
import Header from './Header';
import CategoryForm from './CategoryForm';
import CustomButton from '../../../../components_generics/button/CustomButton';
import CustomAlert from '../../../../../components/components_generics/custom_alert/CustomAlert';
import { registrarCategoriaYLigaCategoria } from '@/services/ligaCategoriaService';

interface PageProps {
  onClose?: () => void;
  id_liga: number;
  onCategoryRegistered: () => void;
  setIsLoading: (isLoading: Boolean) => any;
}

const PopUpAddCategory: React.FC<PageProps> = ({ onClose, id_liga, onCategoryRegistered, setIsLoading }) => {
  const [nuevaCategoria, setNuevaCategoria] = useState(null);
  const [showAlertCustom, setShowAlertCustom] = useState(false);
  const [messageAlertCustom, setMessageAlertCustom] = useState('');

  const verificarValores = () => {
    if (nuevaCategoria === null) {
      setIsLoading(false);
      setMessageAlertCustom("¡Se debe de ingresar los datos de la nueva categoría");
      setShowAlertCustom(true);
      return false;
    }

    if (nuevaCategoria.genero === "") {
      setIsLoading(false);
      setMessageAlertCustom("¡Se debe de seleccionar el género de la categoría");
      setShowAlertCustom(true);
      return false;
    }

    if (nuevaCategoria.nombre === "") {
      setIsLoading(false);
      setMessageAlertCustom("¡Se debe de ingresar el nombre de la categoría");
      setShowAlertCustom(true);
      return false;
    }

    if (nuevaCategoria.rangoEdad.inicial === "") {
      setIsLoading(false);
      setMessageAlertCustom("¡Se debe de ingresar la edad inicial del rango de edad de la categoría");
      setShowAlertCustom(true);
      return false;
    }

    if (nuevaCategoria.rangoEdad.final === "") {
      setIsLoading(false);
      setMessageAlertCustom("¡Se debe de ingresar la edad final del rango de edad de la categoría");
      setShowAlertCustom(true);
      return false;
    }

    return true;
  };

  const guardarCategoria = async () => {
    setIsLoading(true);
    if (verificarValores()) {
      const regCategoriaYLigaCategoria = await registrarCategoriaYLigaCategoria(id_liga, nuevaCategoria);
      setIsLoading(false);
      if (regCategoriaYLigaCategoria.success) {
        setMessageAlertCustom("¡Se ha registrado correctamente la categoría y se ha asociado a esta liga!");
        setShowAlertCustom(true);
        onCategoryRegistered();

        setTimeout(() => {
          onClose();
        }, 2000)
      }
    }
  };

  const handleCloseAlertCustom = () => {
    setShowAlertCustom(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-30">
      <div className="bg-blue-900 rounded-lg overflow-hidden w-[95%] max-h-[90vh]">
        <Header />
        <CategoryForm
          onNuevaCategoriaChange={setNuevaCategoria} // Recibe datos de la nueva categoría
        />
        <div className="flex-col sm500:flex-row p-4 flex items-center justify-center space-x-0 sm500:space-x-5">
          <CustomButton
            text="Cancelar"
            color="#ef4444"
            width=""
            height=""
            onClick={onClose}
            className="flex-col w-[80%] sm750:w-[40%] text-sm sm590:text-xl"
            classNameIcon='w-6 sm590:h-8 w-6 sm590:w-8'
            icon="/images/logos/Icono_Cancelar_Blanco.png"
          />
          <CustomButton
            text="Guardar"
            color="#3b82f6"
            width=""
            height=""
            onClick={guardarCategoria}
            className="flex-col w-[80%] sm750:w-[40%] mt-5 sm500:mt-0 text-sm sm590:text-xl"
            classNameIcon='w-6 sm590:h-8 w-6 sm590:w-8'
            icon="/images/logos/Icono_Guardar_Blanco.png"
          />
        </div>
      </div>
      {/** Alertas de las acciones */}
      <CustomAlert message={messageAlertCustom} show={showAlertCustom} onClose={handleCloseAlertCustom} />
    </div>
  );
};

export default PopUpAddCategory;
