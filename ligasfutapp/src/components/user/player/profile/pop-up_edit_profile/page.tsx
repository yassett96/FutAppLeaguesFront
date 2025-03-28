"use client";
import React, { useState } from 'react';
import Header from '@/components/user/player/profile/pop-up_edit_profile/Header';
import ProfileForm from '@/components/user/player/profile/pop-up_edit_profile/ProfileForm';
import CustomButton from '@/components/components_generics/button/CustomButton';
import PopUpEditPassword from './pop-up_update_password/page';
import { actualizarPerfilUsuario } from '@/services/usuarioService';
import CustomAlert from '@/components/components_generics/custom_alert/CustomAlert';
import Image from 'next/image';
import { actualizarCodigoLigaSegunIdJugadorYIdLiga } from '@/services/jugadorLigaService';

interface PopUpEditProfileProps {
  onClose?: () => void;
  onSave?: () => void;
  id_usuario: number,
  primer_nombre: string;
  segundo_nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  foto: Blob;
  dni: string;
  fecha_nacimiento: string;
  nacionalidad: string;
  setIsLoading: (isLoading: Boolean) => void;
  ligaJugadorSeleccionada: any;
}

const PopUpEditProfile: React.FC<PopUpEditProfileProps> = ({
  onClose,
  onSave,
  id_usuario,
  primer_nombre: initialPrimerNombre,
  segundo_nombre: initialSegundoNombre,
  primer_apellido: initialPrimerApellido,
  segundo_apellido: initialSegundoApellido,
  foto: initialFoto,
  dni,
  fecha_nacimiento: initialFechaNacimiento,
  nacionalidad: initialNacionalidad,
  setIsLoading,
  ligaJugadorSeleccionada
}) => {
  // Estados locales para manejar los cambios en los campos
  const [primer_nombre, setPrimerNombre] = useState(initialPrimerNombre);
  const [segundo_nombre, setSegundoNombre] = useState(initialSegundoNombre);
  const [primer_apellido, setPrimerApellido] = useState(initialPrimerApellido);
  const [segundo_apellido, setSegundoApellido] = useState(initialSegundoApellido);
  const [foto, setFoto] = useState(initialFoto);
  const [fecha_nacimiento, setFechaNacimiento] = useState(initialFechaNacimiento);
  const [nacionalidad, setNacionalidad] = useState(initialNacionalidad);
  const [codigoLiga, setCodigoLiga] = useState(ligaJugadorSeleccionada.codigo_liga);
  const [showPopupEditPassword, setShowPopupEditPassword] = useState(false);
  const [showAlertCustom, setShowAlertCustom] = useState(false);
  const [messageAlertCustom, setMessageAlertCustom] = useState('');

  const handleInputChange = (name: string, value: string) => {
    switch (name) {
      case 'primer_nombre':
        setPrimerNombre(value);
        break;
      case 'segundo_nombre':
        setSegundoNombre(value);
        break;
      case 'primer_apellido':
        setPrimerApellido(value);
        break;
      case 'segundo_apellido':
        setSegundoApellido(value);
        break;
      case 'fecha_nacimiento':
        setFechaNacimiento(value);
        break;
      case 'nacionalidad':
        setNacionalidad(value);
        break;
    }
  };

  const handleFotoChange = (newFoto: Blob) => {
    setFoto(newFoto);
  };

  const handleShowPopupEditPassword = () => {
    setShowPopupEditPassword(true);
  };

  const handleOnClosePopUpEditPassword = () => {
    setShowPopupEditPassword(false);
  }

  const handleGuardarClick = async () => {
    try {
      setIsLoading(true);
      // Aquí puedes pasar los valores que tienes como estado o props al servicio
      const response = await actualizarPerfilUsuario(
        id_usuario,
        primer_nombre,
        segundo_nombre,
        primer_apellido,
        segundo_apellido,
        foto,
        dni,
        fecha_nacimiento,
        nacionalidad
      );

      if (ligaJugadorSeleccionada.Liga.codigo_liga) {
        const data = {
          id_liga: ligaJugadorSeleccionada.id_liga,
          id_jugador: ligaJugadorSeleccionada.id_jugador,
          codigo_liga: codigoLiga
        };

        await actualizarCodigoLigaSegunIdJugadorYIdLiga(data);
      }

      setIsLoading(false);
      // Manejo de éxito, podrías mostrar un mensaje o cerrar el modal
      setMessageAlertCustom('¡Usuario actualizado con éxito!');
      setShowAlertCustom(true);
      setTimeout(() => {
        if (onSave) {
          console.log("response: ", response);
          onSave();
        }

        onClose();
      }, 3000);

    } catch (error) {
      setIsLoading(false);
      console.error('Error al actualizar el usuario:', error);
      alert('Hubo un error al guardar los cambios. Inténtalo de nuevo.');
    }
  };

  const handleCodigoLigaChange = (e: any) => {
    const codigoLiga = e.target.value.replace(/[^A-Za-z0-9.\-]/g, '');
    setCodigoLiga(codigoLiga);
  };

  const handleCloseAlertCustom = () => {
    setShowAlertCustom(false);
  };

  const handleIsLoadingChangePassword = (isLoading: Boolean) => {
    setIsLoading(isLoading);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-30">
      <div className="max-h-[90vh] overflow-y-auto bg-blue-900 rounded-lg overflow-hidden w-[96%] max-w-3xl">
        <Header />
        {/* Pasamos los datos y funciones de manejo de cambios al ProfileForm */}
        <ProfileForm
          primer_nombre={primer_nombre}
          segundo_nombre={segundo_nombre}
          primer_apellido={primer_apellido}
          segundo_apellido={segundo_apellido}
          foto={foto}
          dni={dni}
          fecha_nacimiento={fecha_nacimiento}
          nacionalidad={nacionalidad}
          onInputChange={handleInputChange}
          onFotoChange={handleFotoChange}
        />

        {ligaJugadorSeleccionada.Liga.codigo_liga && (
          <div className="relative mb-4 flex flex-wrap items-center text-center justify-center">
            <Image
              width={100}
              height={100}
              src="/images/logos/Icono_Codigo_Liga_Blanco.png"
              alt="nacionalidad"
              className="mr-2 h-9 w-9"
            />
            <label className="text-xl font-bold text-white w-full sm:w-auto sm:mr-4">Código de liga:</label>
            <div className='w-full flex items-center justify-center flex-col mt-3'>
              <input
                type="text"
                value={codigoLiga}
                onChange={handleCodigoLigaChange}
                placeholder="Escriba para buscar una nacionalidad"
                className="border ml-2 p-2 rounded flex-1 text-shadow-default w-full sm:w-auto mb-2 text-center"
              />
            </div>
          </div>
        )}

        <div className="flex-col sm750:flex-row flex items-center justify-center mb-5 p-5 space-x-0 sm750:space-x-5">
          <CustomButton
            text="Cambiar contraseña"
            color="#F5A623"
            width=""
            height=""
            onClick={handleShowPopupEditPassword}
            className="flex-col w-[100%] sm750:w-[35%]"
            icon="/images/logos/Icono_Editar_Blanco.png"
          />
        </div>

        {showPopupEditPassword && (
          <PopUpEditPassword onClose={handleOnClosePopUpEditPassword} setIsLoading={handleIsLoadingChangePassword} />
        )}

        <div className="flex-col sm750:flex-row flex items-center justify-center mb-5 p-5 space-x-0 sm750:space-x-5">
          <CustomButton
            text="Cancelar"
            color="#ef4444"
            width=""
            height=""
            onClick={onClose}
            className="flex-col w-[100%] sm750:w-[35%]"
            icon="/images/logos/Icono_Cancelar_Blanco.png"
          />
          <CustomButton
            text="Guardar"
            color="#3b82f6"
            width=""
            height=""
            onClick={handleGuardarClick}
            className="flex-col w-[100%] sm750:w-[35%] mt-[20px] sm750:mt-[0px]"
            icon="/images/logos/Icono_Guardar_Blanco.png"
          />
        </div>
      </div>
      {/** Alertas de las acciones */}
      <CustomAlert message={messageAlertCustom} show={showAlertCustom} onClose={handleCloseAlertCustom} />
    </div>
  );
};

export default PopUpEditProfile;
