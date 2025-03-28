"use client";
import React, { useState } from 'react';
import Header from '@/components/user/player/profile/pop-up_edit_profile/pop-up_update_password/Header';
import PasswordForm from '@/components/user/player/profile/pop-up_edit_profile/pop-up_update_password/PasswordForm';
import CustomButton from '@/components/components_generics/button/CustomButton';
import CustomAlert from '@/components/components_generics/custom_alert/CustomAlert';
import { cambiarContrasena } from '@/services/usuarioService';

interface PopUpEditPasswordProps {
    onClose: () => void;
    setIsLoading: (isLoading: Boolean) => void;
}

const PopUpEditPassword: React.FC<PopUpEditPasswordProps> = ({ onClose, setIsLoading }) => {
    const [contrasenaActual, setContrasenaActual] = useState('');
    const [nuevaContrasena, setNuevaContrasena] = useState('');
    const [confirmarNuevaContrasena, setConfirmarNuevaContrasena] = useState('');
    const [showAlertCustom, setShowAlertCustom] = useState(false);
    const [messageAlertCustom, setMessageAlertCustom] = useState('');

    // Función para manejar los cambios en el formulario
    const handleInputChange = (name: string, value: string) => {
        if (name === 'contrasena_actual') setContrasenaActual(value);
        if (name === 'nueva_contrasena') setNuevaContrasena(value);
        if (name === 'confirmar_nueva_contrasena') setConfirmarNuevaContrasena(value);
    };

    const handleCambiarContrasena = async () => {

        if (!nuevaContrasena || !confirmarNuevaContrasena || !contrasenaActual) {
            setMessageAlertCustom('Por favor, completa todos los campos.');
            setShowAlertCustom(true);
            return;
        }

        try {
            setIsLoading(true);
            // Llamada al servicio para cambiar la contraseña
            const constCambiarContrasena = await cambiarContrasena(contrasenaActual, nuevaContrasena, confirmarNuevaContrasena);
            setIsLoading(false);
            if (constCambiarContrasena) {
                setMessageAlertCustom('¡Contraseña actualizado exitosamente!');
                setShowAlertCustom(true);
            }

            setTimeout(() => {
                onClose();
            }, 3000);
        } catch (error) {
            setIsLoading(false);
            console.error('Error al cambiar la contraseña:', error);
            alert(error.message);
        }
    };

    const handleCloseAlertCustom = () => {
        setShowAlertCustom(false);
    };

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-30">
            <div className="max-h-[80vh] overflow-y-auto bg-blue-900 rounded-lg overflow-hidden w-full max-w-3xl">
                <Header />
                <PasswordForm
                    contrasenaActual={contrasenaActual}
                    nuevaContrasena={nuevaContrasena}
                    confirmarNuevaContrasena={confirmarNuevaContrasena}
                    onInputChange={handleInputChange}
                />
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
                        text="Cambiar"
                        color="#3b82f6"
                        width=""
                        height=""
                        onClick={handleCambiarContrasena}
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

export default PopUpEditPassword;