"use client";
import React, { useState, useEffect } from 'react';
import Header from './Header';
import CategoryForm from './CategoryForm';
import CustomButton from '../../../../components_generics/button/CustomButton';
import CustomAlert from '../../../../../components/components_generics/custom_alert/CustomAlert';
import { actualizarCategoria } from '@/services/ligaCategoriaService';

interface PageProps {
  onClose?: () => void;
  id_liga: number;
  onCategoryEdited: () => void;
  datosCategoriaSeleccionada: any;
  setIsLoading: (isLoading: Boolean) => any;
}

const PopUpEditCategory: React.FC<PageProps> = ({ onClose, id_liga, onCategoryEdited, datosCategoriaSeleccionada, setIsLoading }) => {
  const [nuevaCategoria, setNuevaCategoria] = useState(datosCategoriaSeleccionada || {});
  const [showAlertCustom, setShowAlertCustom] = useState(false);
  const [messageAlertCustom, setMessageAlertCustom] = useState('');

  useEffect(() => {
    if (datosCategoriaSeleccionada) {
      setNuevaCategoria(prevState => ({
        ...prevState,
        genero: datosCategoriaSeleccionada.genero || "",
        nombre_categoria: datosCategoriaSeleccionada.nombre_categoria || "",
        edad_minima: datosCategoriaSeleccionada.edad_minima || prevState.edad_minima,
        edad_maxima: datosCategoriaSeleccionada.edad_maxima || prevState.edad_maxima,
      }));
    }
  }, [datosCategoriaSeleccionada]);

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

    if (nuevaCategoria.edad_minima === "") {
      setIsLoading(false);
      setMessageAlertCustom("¡Se debe de ingresar la edad inicial del rango de edad de la categoría");
      setShowAlertCustom(true);
      return false;
    }

    if (nuevaCategoria.edad_maxima === "") {
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
      const categoriaData = {
        nombre: nuevaCategoria.nombre_categoria,
        genero: nuevaCategoria.genero,
        edad_minima: nuevaCategoria.edad_minima,
        edad_maxima: nuevaCategoria.edad_maxima,
      };

      const actCategoriaYLigaCategoria = await actualizarCategoria(nuevaCategoria.id_liga_categoria, nuevaCategoria.id_categoria, categoriaData);

      setIsLoading(false);
      if (actCategoriaYLigaCategoria.success) {
        setMessageAlertCustom("¡Se ha actualizado correctamente la categoría!");
        setShowAlertCustom(true);
        onCategoryEdited();

        setTimeout(() => {          
          onClose();
        }, 3000);
      }
    }
  };

  const handleCloseAlertCustom = () => {
    setShowAlertCustom(false);
  };

  const handleOnNuevaCategoriaChange = (updatedCategoria) => {
    setNuevaCategoria((prevState) => ({
      ...prevState,
      ...updatedCategoria,
    }));
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-30">
      <div className="bg-blue-900 rounded-lg overflow-hidden w-[95%] max-h-[90vh]">
        <Header />
        <CategoryForm
          onNuevaCategoriaChange={handleOnNuevaCategoriaChange}
          initialData={nuevaCategoria}
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

export default PopUpEditCategory;