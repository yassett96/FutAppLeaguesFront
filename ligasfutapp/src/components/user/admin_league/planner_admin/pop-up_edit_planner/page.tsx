"use client"
import React, { useState } from 'react';
import Header from './Header';
import EditPlannerForm from './EditPlannerForm';
import CustomButton from '../../../../components_generics/button/CustomButton';
import CustomAlert from '@/components/components_generics/custom_alert/CustomAlert';
import { validarEmail } from '@/utils/emailUtils';
import { obtenerUsuarioPorCorreoExcluyendoUsuario, obtenerUsuarioPorDNI, obtenerUsuarioPorDniExcluyendoUsuario } from '@/services/usuarioService';
import { actualizarEquipoConDelegadoExistente, actualizarEquipoConDelegadoNuevo } from '@/services/equipoService';
import { actualizarUsuarioPlanillero } from '@/services/planilleroLigaService';

interface PageProps {
    onClose?: () => void;
    onSave?: () => void;
    usuariosActivos: any;
    planilleros: any;
    idLigaSeleccionada: number;
    datosPlanilleroAEditar: any;
    setIsLoading?: (loading: boolean) => void;
}

interface FormData {
    id_usuario: number;
    primerNombre: string;
    segundoNombre: string;
    primerApellido: string;
    segundoApellido: string;
    email: string;
    dni: string;
    isSwitchActive: boolean,
    selectedUserId: number
}

const PopUpEditarEquipo: React.FC<PageProps> = ({ onClose, onSave, usuariosActivos, planilleros, idLigaSeleccionada, datosPlanilleroAEditar, setIsLoading }) => {
    const [formData, setFormData] = useState<FormData>({
        id_usuario: datosPlanilleroAEditar?.Usuario.id_usuario || 0,
        primerNombre: datosPlanilleroAEditar?.Usuario.primer_nombre || '',
        segundoNombre: datosPlanilleroAEditar?.Usuario.segundo_nombre || '',
        primerApellido: datosPlanilleroAEditar?.Usuario.primer_apellido || '',
        segundoApellido: datosPlanilleroAEditar?.Usuario.segundo_apellido || '',
        email: datosPlanilleroAEditar?.Usuario.correo || '',
        dni: datosPlanilleroAEditar?.Usuario.dni || '',
        isSwitchActive: false,
        selectedUserId: datosPlanilleroAEditar?.Usuario.id_usuario || 0,
    });
    const [showAlertCustom, setShowAlertCustom] = useState(false);
    const [messageAlertCustom, setMessageAlertCustom] = useState('');

    // Callback para recibir datos del formulario desde el hijo
    const handleFormChange = (updatedData: FormData) => {
        setFormData((prevData) => ({
            ...prevData,
            ...updatedData,
            selectedUserId: updatedData.selectedUserId || prevData.selectedUserId,
        }));
    };

    const validarCamposDeRegistro = () => {

        // Validar los campos restantes
        if (formData.primerNombre.trim() === '') {
            setMessageAlertCustom("¡Se debe de ingresar el primer nombre!");
            setShowAlertCustom(true);
            return false;
        }

        if (formData.primerApellido.trim() === '') {
            setMessageAlertCustom("¡Se debe de ingresar el primer apellido!");
            setShowAlertCustom(true);
            return false;
        }

        if (formData.email.trim() === '') {
            setMessageAlertCustom("¡Se debe de ingresar el correo electrónico!");
            setShowAlertCustom(true);
            return false;
        }

        if (!validarEmail(formData.email)) {
            setMessageAlertCustom("¡Se debe de ingresar un correo electrónico válido, por ejemplo: example@gmail.com!");
            setShowAlertCustom(true);
            return false;
        }

        if (formData.dni.trim() === '') {
            setMessageAlertCustom("¡Se debe de ingresar el DNI!");
            setShowAlertCustom(true);
            return false;
        }

        return true;
    };

    // Función para manejar el clic en "Guardar"
    const handleUpdate = async () => {
        setIsLoading(true);
        // Verificamos los campos del formulario        
        if (validarCamposDeRegistro()) {
            try {
                const existeUsuarioCorreo = await obtenerUsuarioPorCorreoExcluyendoUsuario(formData.email, formData.id_usuario);

                if (!existeUsuarioCorreo.success) {
                    const dniSinGuiones = formData.dni.trim().replace(/-/g, '');
                    const existeUsuarioPorDNI = await obtenerUsuarioPorDniExcluyendoUsuario(dniSinGuiones, formData.id_usuario);

                    const id_usuario = formData.id_usuario;
                    const id_liga = idLigaSeleccionada;
                    const usuarioData = {
                        correo: formData.email,
                        dni: formData.dni,
                        primer_nombre: formData.primerNombre,
                        segundo_nombre: formData.segundoNombre,
                        primer_apellido: formData.primerApellido,
                        segundo_apellido: formData.segundoApellido,
                    };

                    if (!existeUsuarioPorDNI.success) {
                        const response = await actualizarUsuarioPlanillero(id_usuario, usuarioData, id_liga);

                        if (response.success) {
                            setIsLoading(false);
                            setMessageAlertCustom("¡Los datos del planillero se han actualizado con éxito!");
                            setShowAlertCustom(true);

                            setTimeout(() => {
                                onSave();
                            }, 3000)
                        }
                    } else {
                        setIsLoading(false);
                        setMessageAlertCustom("!Este DNI ya está registrado a nombre de: '" + existeUsuarioPorDNI.data.primer_nombre + " " + existeUsuarioPorDNI.data.primer_apellido + "', registra un DNI nuevo!");
                        setShowAlertCustom(true);
                    }
                } else {
                    setIsLoading(false);
                    setMessageAlertCustom("¡Este correo ya se encuentra registrado a nombre de: '" + existeUsuarioCorreo.data.primer_nombre + " " + existeUsuarioCorreo.data.primer_apellido + "', resgitra un correo nuevo!");
                    setShowAlertCustom(true);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    const handleCloseAlertCustom = () => {
        setShowAlertCustom(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative bg-blue-900 rounded-lg p-6 w-[95%] max-w-3xl z-30 overflow-auto max-h-[90vh]">
                <Header />
                <EditPlannerForm formData={formData} onFormChange={handleFormChange} usuariosActivos={usuariosActivos} />
                <div className='p-4 flex-col sm500:flex-row flex items-center justify-center space-x-0 sm500:space-x-5'>
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
                        text="Actualizar"
                        color="#3b82f6"
                        width=""
                        height=""
                        onClick={handleUpdate}
                        className='flex-col w-[80%] sm750:w-[40%] mt-5 sm500:mt-0'
                        classNameText = "text-sm sm590:text-xl"
                        classNameIcon='w-6 sm590:h-8 w-6 sm590:w-8'
                        icon="/images/logos/Icono_Nuevo_Blanco.png"
                    />
                </div>
            </div>
            {/** Alertas de las acciones */}
            <CustomAlert message={messageAlertCustom} show={showAlertCustom} onClose={handleCloseAlertCustom} />
        </div>
    );
};

export default PopUpEditarEquipo;