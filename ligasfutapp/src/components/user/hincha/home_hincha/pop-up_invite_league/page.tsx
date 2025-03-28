"use client";
import React, { useState } from "react";
import Header from "../../../../../components/user/hincha/home_hincha/pop-up_invite_league/Header";
import InviteForm from "../../../../../components/user/hincha/home_hincha/pop-up_invite_league/InviteForm";
import CustomButton from "../../../../../components/components_generics/button/CustomButton";
import { crearInvitacionYEnviarCorreo } from "@/services/invitacionService";
import CustomAlert from '@/components/components_generics/custom_alert/CustomAlert';

interface PopUpInviteLeagueProps {
  onClose?: () => void;
  id_usuario?: Number;
  setIsLoading?: (isLoading: Boolean)=>any;
}

const PopUpInviteLeague: React.FC<PopUpInviteLeagueProps> = ({ onClose, id_usuario, setIsLoading }) => {
  const [correoInvitado, setCorreoInvitado] = useState("");
  const [showAlertCustom, setShowAlertCustom] = useState(false);
  const [messageAlertCustom, setMessageAlertCustom] = useState('');

  const handleEnviarInvitacion = async () => {
    try {
      setIsLoading(true);
      const response = await crearInvitacionYEnviarCorreo({ id_hincha: id_usuario, correo_invitado: correoInvitado });
      setIsLoading(false);
      if (response.success) {
        setMessageAlertCustom("Invitación enviada exitosamente.");
        setShowAlertCustom(true);
        setTimeout(()=>{
          if (onClose) onClose();
        }, 2000)        
      } else {
        alert("Error al enviar la invitación: " + response.message);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error al enviar la invitación:", error);
      alert("Hubo un problema al enviar la invitación.");
    }
  };

  const handleCloseAlertCustom = () => {
    setShowAlertCustom(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-30">
      <div className="bg-blue-900 rounded-lg overflow-hidden w-[95%]">
        <Header />
        <InviteForm onCorreoChange={setCorreoInvitado} />
        <div className="flex-col xs300:flex-row flex items-center justify-center mb-5 p-4 space-x-0 xs300:space-x-10">
          <CustomButton
            text="Cancelar"
            color="#ef4444"
            width=""
            height=""
            onClick={onClose}
            className="flex-col w-full"
            classNameText = 'text-sm xs360:text-xl'
            classNameIcon='w-6 sm590:h-8 w-6 sm590:w-8'
            icon="/images/logos/Icono_Cancelar_Blanco.png"
          />
          <CustomButton
            text="Enviar"
            color="#22c55e"
            width=""
            height=""
            onClick={handleEnviarInvitacion}
            className="flex-col mt-5 xs300:mt-0 w-full"
            classNameText = 'text-sm xs360:text-xl'
            classNameIcon='w-6 sm590:h-8 w-6 sm590:w-8'
            icon="/images/logos/Icono_Enviar_Blanco.png"
          />
        </div>
      </div>
      {/** Alertas de las acciones */}
      <CustomAlert message={messageAlertCustom} show={showAlertCustom} onClose={handleCloseAlertCustom} />
    </div>
  );
};

export default PopUpInviteLeague;