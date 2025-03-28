"use client";
import React, { useState, useEffect } from 'react';
import Header from './Header';
import SanctionedForm from './SanctionedForm';
import CustomButton from '../../../../components_generics/button/CustomButton';
import CustomAlert from '@/components/components_generics/custom_alert/CustomAlert';
import { obtenerEquiposPorLigaYCategoria } from '@/services/ligaCategoriaService';
import { actualizarSancionado } from '@/services/sancionadoService';
import { registrarExpulsion } from '@/services/expulsionService';
import { obtenerTorneoPorEquipo } from '@/services/torneoService';

interface PageProps {
  onClose?: () => void;
  onEdit?: () => void;
  idLigaSeleccionada: number;
  id_liga_categoria: number;
  datosSancionado: any;
  pathImageLogo: string;
  titlePopUp: string;
  setIsLoading: (isLoading: Boolean) => any;
}

const PopUpEditSanctioned: React.FC<PageProps> = ({ onClose, onEdit, idLigaSeleccionada, id_liga_categoria, datosSancionado, pathImageLogo, titlePopUp, setIsLoading }) => {
  const [datosEquipos, setDatosEquipos] = useState<any>(null);
  const [formData, setFormData] = useState<any>(datosSancionado || {});
  const [showAlertCustom, setShowAlertCustom] = useState(false);
  const [messageAlertCustom, setMessageAlertCustom] = useState('');

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const consultaDatosEquipos = await obtenerEquiposPorLigaYCategoria(id_liga_categoria);
        setDatosEquipos(consultaDatosEquipos.equipos);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        alert('Error: ' + error);
      }
    };

    // Llama a la función para cargar los datos de los equipos
    fetchDatos();
  }, [id_liga_categoria]); // `id_liga_categoria` es suficiente para cargar los equipos una vez al montar o cuando cambia

  useEffect(() => {
    if (datosSancionado && (!formData || formData.id !== datosSancionado.id)) {
      setFormData(datosSancionado);
    }
  }, [datosSancionado, formData]);

  const guardarCambiosSancionado = async () => {
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
      fechas_sancionadas: formData.fechasSancionadas, // Número de fechas sancionadas
      fechas_pendientes: formData.fechasSancionadas, // Son las mismas que las sancionadas porque se está creando la sanción
      comentario_comite_disciplina: formData.comentario || null, // Comentario opcional
    };

    // Llamar al servicio para actualizar el sancionado
    const response = await actualizarSancionado(formData.id_sancion, sancionadoData);
    setIsLoading(false);

    if (response.success) {
      setMessageAlertCustom("Sanción editado exitosamente");
      setShowAlertCustom(true);
      setTimeout(() => {
        onEdit();
      }, 2000);
    }
  }

  const clickJudgeOrEditSanctioned = async () => {
    try {
      setIsLoading(true);
      if (!formData.expulsarJugador) {
        guardarCambiosSancionado();
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
          setIsLoading(false);

          if (response.success) {
            setMessageAlertCustom("¡Expulsión registrado correctamente!");
            setShowAlertCustom(true);

            setTimeout(() => {
              guardarCambiosSancionado();
            }, 3000)
          }

          if (response.success) {
            console.log('Expulsión registrada con éxito:', response.data);
          } else {
            console.error('Error al registrar la expulsión:', response.message);
          }
        } else {
          setIsLoading(false);
          setMessageAlertCustom("Se debe de escribir el motivo de la expulsión");
          setShowAlertCustom(true);
        }
      }
    } catch (error) {
      setIsLoading(false);
      console.error('Error al crear sanción:', error);
      alert("Error al crear la sanción");
    }
  };

  const handleFormChange = (data: any) => {
    setFormData(data);
  };

  const handleCloseAlertCustom = () => {
    setShowAlertCustom(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-30">
      <div className="relative bg-blue-900 rounded-lg p-2 xs360:p-6 w-[95%] z-30 overflow-auto max-h-[90vh]">
        <Header pathImageLogo={pathImageLogo} titlePopUp={titlePopUp} />
        <SanctionedForm
          datosEquipos={datosEquipos}
          onFormChange={handleFormChange}
          idLigaCategoria={id_liga_categoria}
          datosIniciales={formData} // Envía los datos iniciales
        />
        <div className='flex-col md:flex-row p-4 flex items-center justify-center space-x-0 md:space-x-5'>
          <CustomButton
            text="Cancelar"
            color="#ef4444"
            width=""
            height=""
            onClick={onClose}
            className='flex-col w-[80%] sm750:w-[40%]'
            classNameText="text-sm sm590:text-xl"
            classNameIcon='w-6 sm590:h-8 w-6 sm590:w-8'
            icon="/images/logos/Icono_Cancelar_Blanco.png"
          />
          <CustomButton
            text="Guardar"
            color="#3b82f6"
            width=""
            height=""
            onClick={clickJudgeOrEditSanctioned}
            className='flex-col w-[80%] sm750:w-[40%] mt-5 md:mt-0'
            classNameText="text-sm sm590:text-xl"
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

export default PopUpEditSanctioned;