"use client";
import React, { useState } from 'react';
import Header from '../../../../../components/user/player/manage_team/pop-up_manage_player/Header';
import PlayerForm from '../../../../../components/user/player/manage_team/pop-up_manage_player/PlayerForm';
import CustomButton from '@/components/components_generics/button/CustomButton';
import CustomAlert from '@/components/components_generics/custom_alert/CustomAlert';
import { validarEmail } from '@/utils/emailUtils';
import { obtenerUsuarioPorCorreoExcluyendoUsuario, obtenerUsuarioPorDniExcluyendoUsuario } from '@/services/usuarioService';
import { actualizarJugadorUsuario } from '@/services/usuarioService';

interface PopUpManagePlayerProps {
  onClose: () => void;
  onUpdate: () => void;
  jugador: {
    id_usuario: number;
    primer_nombre: string;
    segundo_nombre: string;
    primer_apellido: string;
    segundo_apellido: string;
    correo: string;
    dni: string;
  };
  setIsLoading: (isLoading: Boolean) => void;
  idEquipoCategoria: number;
  ligaJugadorSeleccionada: any;
}

const PopUpManagePlayer: React.FC<PopUpManagePlayerProps> = ({ onClose, onUpdate, jugador, setIsLoading, idEquipoCategoria, ligaJugadorSeleccionada }) => {
  const [updatedPlayer, setUpdatedPlayer] = useState(jugador);
  const [showAlertCustom, setShowAlertCustom] = useState(false);
  const [messageAlertCustom, setMessageAlertCustom] = useState('');

  // Función para manejar la actualización del jugador
  const handleGuardar = async () => {
    try {
      setIsLoading(true);
      if (verificarInformacionJugador(updatedPlayer)) {
        const verificarExistenciaCorreo = await obtenerUsuarioPorCorreoExcluyendoUsuario(updatedPlayer.correo, updatedPlayer.id_usuario);

        if (verificarExistenciaCorreo.success === false) {
          const existeDNI = await obtenerUsuarioPorDniExcluyendoUsuario(updatedPlayer.dni, updatedPlayer.id_usuario);
          // Ver si se obtiene bien verificarExistenciaDNI
          if (!existeDNI.success) {
            const response = await actualizarJugadorUsuario(updatedPlayer.id_usuario, updatedPlayer.primer_nombre, updatedPlayer.segundo_nombre, updatedPlayer.primer_apellido, updatedPlayer.segundo_apellido, updatedPlayer.correo, updatedPlayer.dni, idEquipoCategoria, ligaJugadorSeleccionada.id_liga);

            setIsLoading(false);
            if (response) {
              setMessageAlertCustom("¡Jugador actualizado correctamente!");
              setShowAlertCustom(true);

              setTimeout(() => {
                onUpdate();
              }, 4000)
            }
          } else {
            setIsLoading(false);
            setMessageAlertCustom(`¡Este DNI ya está registrado a nombre de ${existeDNI.data.primer_nombre + " " + existeDNI.data.primer_apellido}, se debe de ingresar uno nuevo!`);
            setShowAlertCustom(true);
          }

        } else {
          setIsLoading(false);
          setMessageAlertCustom(`¡Este correo ya está registrado a nombre de ${verificarExistenciaCorreo.data.primer_nombre + " " + verificarExistenciaCorreo.data.primer_apellido}, se debe de ingresar uno nuevo!`);
          setShowAlertCustom(true);
        }
      }
    } catch (error) {
      alert('Hubo un error al actualizar el jugador');
      console.error('Error al actualizar el jugador:', error);
    }
  };

  // Para validar los campos del formulario del nuevo jugador
  const verificarInformacionJugador = (jugador: any) => {
    var verificado = false;

    if (jugador.primer_nombre === '') {
      setMessageAlertCustom("¡Se debe de ingresar el primer nombre!");
      setShowAlertCustom(true);
    } else if (jugador.primer_apellido === '') {
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
      <div className="bg-blue-900 rounded-lg overflow-hidden w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <Header />
        <PlayerForm jugador={jugador} setPlayer={setUpdatedPlayer} />
        <div className='pt-5 pb-5'>
          <CustomButton text="Cancelar" color="#ef4444" width="" height="" onClick={onClose} className='flex-col w-[80%] xl1400:w-[40%] ml-[10%] xl1400:ml-[8%] text-center' icon='/images/logos/Icono_Cancelar_Blanco.png' />
          <CustomButton text="Guardar" color="#3b82f6" width="" height="" onClick={handleGuardar} className='flex-col w-[80%] xl1400:w-[40%] mt-[15px] xl1400:mt-[0px] ml-[10%] xl1400:ml-[8%] text-center' icon='/images/logos/Icono_Guardar_Blanco.png' />
        </div>
      </div>
      {/** Alertas de las acciones */}
      <CustomAlert message={messageAlertCustom} show={showAlertCustom} onClose={handleCloseAlertCustom} />
    </div>
  );
};

export default PopUpManagePlayer;