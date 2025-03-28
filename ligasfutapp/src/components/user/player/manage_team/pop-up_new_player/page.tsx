"use client";
import { useState } from 'react';
import React from 'react';
import Header from '../../../../../components/user/player/manage_team/pop-up_new_player/Header';
import PlayerForm from './NewPlayerForm';
import CustomButton from '@/components/components_generics/button/CustomButton';
import CustomAlert from '@/components/components_generics/custom_alert/CustomAlert';
import { validarEmail } from '@/utils/emailUtils';
import { obtenerUsuarioPorCorreo, obtenerUsuarioPorDNI } from '@/services/usuarioService';
import { registrarJugadorDelegado, registrarJugadorExistente } from '@/services/jugadorService';
import { verificarJugadorExistenteEnEquipo } from '@/services/equipoService';

interface PopUpNewPlayerProps {
  onClose?: () => void;
  idEquipoCategoria: number;
  setIsLoading: (isLoading: Boolean) => void;
  ligaJugadorSeleccionada: any;
}

interface FormData {
  primerNombre: string;
  segundoNombre: string;
  primerApellido: string;
  segundoApellido: string;
  correo: string;
  dni: string;
  isSwitchActive: Boolean,
  selectedUserId: number
}

const PopUpNewPlayer: React.FC<PopUpNewPlayerProps> = ({ onClose, idEquipoCategoria, setIsLoading, ligaJugadorSeleccionada }) => {
  const [formData, setFormData] = useState<FormData>({
    primerNombre: '',
    segundoNombre: '',
    primerApellido: '',
    segundoApellido: '',
    correo: '',
    dni: '',
    isSwitchActive: false,
    selectedUserId: null,
  });

  const [showAlertCustom, setShowAlertCustom] = useState(false);
  const [messageAlertCustom, setMessageAlertCustom] = useState('');

  const handleCambiarInformacionJugador = (formDataActualizado: any) => {
    setFormData(formDataActualizado);
  };

  const handleGuardarJugador = async () => {
    try {
      setIsLoading(true);
      if (!formData.isSwitchActive) {
        const data = {
          id_usuario: formData.selectedUserId,
          id_equipo_categoria: idEquipoCategoria,
          id_liga: ligaJugadorSeleccionada.id_liga,
        }
        const existeJugador = await verificarJugadorExistenteEnEquipo(data);

        if (!existeJugador.success) {
          const response = await registrarJugadorExistente(data);
          if (response.success) {
            setIsLoading(false);
            setMessageAlertCustom("¡Jugador registrado exitosamente al equipo!");
            setShowAlertCustom(true);

            setTimeout(() => {
              onClose();
            }, 4000);
          } else {
            setIsLoading(false);
            setMessageAlertCustom(response.message);
            setShowAlertCustom(true);
          }
        } else {
          setIsLoading(false);
          setMessageAlertCustom("¡Este jugador ya está registrado en este equipo, debes de seleccionar o registrar uno nuevo!");
          setShowAlertCustom(true);
        }

      } else {
        if (verificarInformacionJugador(formData)) {
          const verificarExistenciaCorreo = await obtenerUsuarioPorCorreo(formData.correo);

          if (verificarExistenciaCorreo === false) {
            const verificarExistenciaDNI = await obtenerUsuarioPorDNI(formData.dni);

            if (verificarExistenciaDNI === false) {
              console.log("formData: ", formData);
              console.log("idEquipoCategoria: ", idEquipoCategoria);
              console.log("ligaJugadorSeleccionada: ", ligaJugadorSeleccionada);              

              const insercionJugadorDelegado = await registrarJugadorDelegado(formData, idEquipoCategoria, Array.isArray(ligaJugadorSeleccionada) ? ligaJugadorSeleccionada[0].id_liga : ligaJugadorSeleccionada.id_liga);

              if (insercionJugadorDelegado) {
                setIsLoading(false);
                setMessageAlertCustom("¡Jugador registrado exitosamente!. Se envió un correo al jugador para informarle de las credenciales para ingresar a su cuenta.");
                setShowAlertCustom(true);

                setTimeout(() => {
                  onClose();
                }, 4000);
              }
            } else {
              setIsLoading(false);
              setMessageAlertCustom(`¡Este DNI ya existe a nombre de ${verificarExistenciaDNI.primer_nombre + " " + verificarExistenciaDNI.primer_apellido}, se debe de ingresar un DNI que identifique a este jugador!`);
              setShowAlertCustom(true);
            }
          } else {
            setIsLoading(false);
            setMessageAlertCustom(`¡Este correo ya está registrado a nombre de ${verificarExistenciaCorreo.primer_nombre + " " + verificarExistenciaCorreo.primer_apellido}, se debe de ingresar uno nuevo!`);
            setShowAlertCustom(true);
          }
        }
      }
    } catch (error) {
      alert('Hubo un error al guardar el jugador');
      console.error('Error al guardar el jugador:', error);
    }
  };

  // Para validar los campos del formulario del nuevo jugador
  const verificarInformacionJugador = (jugador: any) => {
    var verificado = false;

    if (jugador.primerNombre === '') {
      setMessageAlertCustom("¡Se debe de ingresar el primer nombre!");
      setShowAlertCustom(true);
    } else if (jugador.primerApellido === '') {
      setMessageAlertCustom("¡Se debe de ingresar el primer apellido!");
      setShowAlertCustom(true);
    } else if (jugador.correo === '' || !validarEmail(jugador.correo)) {
      setMessageAlertCustom("¡Se debe de ingresar un correo correctamente, Ej: ejemplocorreo@gmail.com");
      setShowAlertCustom(true);
    } else if (jugador.dni === '') {
      setMessageAlertCustom("¡Se debe de ingresar el DNI o identificación del jugador!");
      setShowAlertCustom(true);
    } else {
      verificado = true;
    }

    return verificado;
  };

  const handleCloseAlertCustom = () => {
    setShowAlertCustom(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-30">
      <div className="bg-blue-900 rounded-lg overflow-hidden w-[95%] max-h-[90vh] overflow-y-auto">
        <Header />
        <PlayerForm player={formData} onFormChange={handleCambiarInformacionJugador} />
        <div className='flex-row h-auto flex items-center justify-center space-x-3 xs300:space-x-10'>
          <CustomButton text="Cancelar" color="#ef4444" width="" height="" onClick={onClose} className='flex-col w-[45%] xs300:w-[40%]' icon="/images/logos/Icono_Cancelar_Blanco.png" />
          <CustomButton text="Guardar" color="#3b82f6" width="" height="" onClick={handleGuardarJugador} className='flex-col w-[45%] xs300:w-[40%] mt-5 mb-5' icon="/images/logos/Icono_Guardar_Blanco.png" />
        </div>
      </div>
      {/** Alertas de las acciones */}
      <CustomAlert message={messageAlertCustom} show={showAlertCustom} onClose={handleCloseAlertCustom} />
    </div>
  );
};

export default PopUpNewPlayer;