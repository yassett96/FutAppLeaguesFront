"use client";
import React, { useEffect, useState, useCallback } from 'react';
import Header from './Header';
import SanctionedForm from './SanctionedForm';
import CustomButton from '../../../../components_generics/button/CustomButton';
import CustomAlert from '@/components/components_generics/custom_alert/CustomAlert';
import { registrarExpulsion } from '@/services/expulsionService';
import { crearSancionado } from '@/services/sancionadoService';
import { obtenerEquiposPorLigaYCategoria } from '@/services/ligaCategoriaService';

interface PageProps {
  onClose?: () => void;
  onSave?: () => void;
  idLigaSeleccionada: number;
  id_liga_categoria: number;
  setIsLoading: (isLoading: Boolean) => any;
}

const PopUpAddCategory: React.FC<PageProps> = ({ onClose, onSave, idLigaSeleccionada, id_liga_categoria, setIsLoading }) => {
  const [datosEquipos, setDatosEquipos] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [showAlertCustom, setShowAlertCustom] = useState(false);
  const [messageAlertCustom, setMessageAlertCustom] = useState('');

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        // Obtener datos de los equipos
        const consultaDatosEquipos = await obtenerEquiposPorLigaYCategoria(id_liga_categoria);
        setDatosEquipos(consultaDatosEquipos.equipos);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        alert('Error: ' + error);
      }
    };
    fetchDatos();
  }, [id_liga_categoria]);

  const guardarSancionado = async () => {

    // Validar si los datos requeridos están disponibles
    if (!formData.jugadorSeleccionado) {
      setIsLoading(false);
      setMessageAlertCustom("Debe de haber un jugador seleccionado e ingresar las fechas sancionadas para actualizar.");
      setShowAlertCustom(true);
      return;
    }

    if (!formData.expulsarJugador) {
      if (!formData.fechasSancionadas) {
        setIsLoading(false);
        setMessageAlertCustom("Se debe de ingresar las fechas sancionadas del jugador");
        setShowAlertCustom(true);
        return;
      }
    }

    // Construir el objeto para el request
    const sancionadoData = {
      id_jugador: formData.jugadorSeleccionado.value, // ID del jugador
      id_partido: formData.partidoSeleccionado?.id_partido || null, // ID del partido o null
      fecha_sancion: formData.fechaSancion,
      fechas_sancionadas: formData.fechasSancionadas || 0, // Número de fechas sancionadas
      fechas_pendientes: formData.fechasSancionadas || 0, // Son las mismas que las sancionadas porque se está creando la sanción
      comentario_comite_disciplina: formData.comentario || '', // Comentario opcional
    };

    // Llamar al servicio para crear el sancionado
    const response = await crearSancionado(sancionadoData);
    setIsLoading(false);

    if (response.success) {
      formData.expulsarJugador ?
        setMessageAlertCustom("Sanción y expulsión creados exitosamente")
        :
        setMessageAlertCustom("Sanción creada exitosamente");

      setShowAlertCustom(true);

      setTimeout(() => {
        onSave();
      }, 2000);
    }
  };

  const clickAddSanctioned = async () => {
    try {
      setIsLoading(true);
      if (!formData.expulsarJugador) {
        await guardarSancionado();
      } else {
        if (formData.motivoExpulsion != '') {
          const expulsionData = {
            id_jugador: formData.jugadorSeleccionado.value, // ID del jugador
            id_torneo: null,
            id_liga: idLigaSeleccionada, // De momento siempre se expulsa de una liga
            motivo: formData.motivoExpulsion,
            permanente: false,
          };

          // Registrar la expulsión
          const response = await registrarExpulsion(expulsionData);

          if (response.success) {
            setMessageAlertCustom("¡Expulsión registrado correctamente!");
            setShowAlertCustom(true);

            await guardarSancionado();
          }

        } else {
          setMessageAlertCustom("¡Se debe de introducir el motivo de la expulsión!");
          setShowAlertCustom(true);
        }
      }

    } catch (error) {
      setIsLoading(false);
      console.error('Error al crear sanción:', error);
      alert("Error al crear la sanción");
    }
  };

  // Handle form data changes
  const handleFormChange = useCallback((data: any) => {
    setFormData(data);
  }, []);

  const handleCloseAlertCustom = () => {
    setShowAlertCustom(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-30">
      <div className="relative bg-blue-900 rounded-lg p-6 w-[95%] z-30 overflow-auto max-h-[90vh]">
        <Header />
        <SanctionedForm datosEquipos={datosEquipos} onFormChange={handleFormChange} idLigaCategoria={id_liga_categoria} />
        <div className='flex-col sm:flex-row flex items-center justify-center p-4 space-x-0 sm:space-x-5 mb-8'>
          <CustomButton
            text="Cancelar"
            color="#ef4444"
            width=""
            height=""
            onClick={onClose}
            className='flex-col w-[80%] sm750:w-[40%]'
            classNameText='text-sm xs360:text-xl'
            classNameIcon='w-6 sm590:h-8 w-6 sm590:w-8'
            icon="/images/logos/Icono_Cancelar_Blanco.png"
          />
          <CustomButton
            text="Agregar"
            color="#3b82f6"
            width=""
            height=""
            onClick={clickAddSanctioned}
            className='flex-col w-[80%] sm750:w-[40%] mt-5 sm:mt-0'
            classNameText = 'text-sm xs360:text-xl'
            classNameIcon='w-6 sm590:h-8 w-6 sm590:w-8'
            icon="/images/logos/Icono_Guardar_Blanco.png"
          />
        </div>
        {/** Alertas de las acciones */}
        <CustomAlert message={messageAlertCustom} show={showAlertCustom} onClose={handleCloseAlertCustom} />
      </div>
    </div>
  );
};

export default PopUpAddCategory;