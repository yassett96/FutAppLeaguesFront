"use client"
import React, { useState } from 'react';
import Header from './Header';
import NewTeamForm from './NewPlannerForm';
import CustomButton from '../../../../components_generics/button/CustomButton';
import CustomAlert from '@/components/components_generics/custom_alert/CustomAlert';
import { validarEmail } from '@/utils/emailUtils';
import { obtenerUsuarioPorDNI } from '@/services/usuarioService';
import { obtenerUsuarioPorCorreo } from '@/services/usuarioService';
import { agregarPlanilleroLiga, agregarPlanilleroLigaNuevoUsuario } from '@/services/planilleroLigaService';

interface PageProps {
    onClose?: () => void;
    onSave?: () => void;
    usuariosActivos: any;
    planilleros: any;
    idLigaSeleccionada: number;
    setIsLoading?: (loading: boolean) => void;
}

interface PlanilleroData {
    nombre_planillero: string;
    fecha_asignacion: string;
}

interface FormData {
    primerNombre: string;
    segundoNombre: string;
    primerApellido: string;
    segundoApellido: string;
    email: string;
    dni: string;
    planillero: PlanilleroData;
    isSwitchActive: Boolean,
    selectedUserId: number
}

const PopUpNewPlanner: React.FC<PageProps> = ({ onClose, onSave, usuariosActivos, planilleros, idLigaSeleccionada, setIsLoading }) => {
    const [formData, setFormData] = useState<FormData>({
        primerNombre: '',
        segundoNombre: '',
        primerApellido: '',
        segundoApellido: '',
        email: '',
        dni: '',
        planillero: {
            nombre_planillero: '',
            fecha_asignacion: '',
        },
        isSwitchActive: false,
        selectedUserId: 0
    });
    const [showAlertCustom, setShowAlertCustom] = useState(false);
    const [messageAlertCustom, setMessageAlertCustom] = useState('');

    // Callback para recibir datos del formulario desde el hijo
    const handleFormChange = (updatedData: FormData) => {
        setFormData((prevData) => ({
            ...prevData,
            ...updatedData,
            planillero: {
                ...prevData.planillero,
                ...updatedData.planillero, // Asegúrate de no sobrescribir todo el objeto equipo
            },
            selectedUserId: updatedData.selectedUserId || prevData.selectedUserId, // Actualiza el ID del usuario seleccionado
        }));
    };

    const validarCamposDeRegistro = () => {
        // Validar los campos
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
    const handleSave = async () => {
        setIsLoading(true);
        // Vemos si es un nuevo administrador
        if (formData.isSwitchActive) {
            if (validarCamposDeRegistro()) {
                try {
                    const existeUsuarioCorreo = await obtenerUsuarioPorCorreo(formData.email);

                    if (!existeUsuarioCorreo) {
                        const dniSinGuiones = formData.dni.trim().replace(/-/g, '');
                        const existeUsuarioPorDNI = await obtenerUsuarioPorDNI(dniSinGuiones);

                        if (!existeUsuarioPorDNI) {
                            const nuevoPlanillero = {
                                usuario: {
                                    primerNombre: formData.primerNombre,
                                    segundoNombre: formData.segundoNombre,
                                    primerApellido: formData.primerApellido,
                                    segundoApellido: formData.segundoApellido,
                                    email: formData.email,
                                    dni: formData.dni,
                                },
                                id_liga: idLigaSeleccionada,
                            };

                            const response = await agregarPlanilleroLigaNuevoUsuario(nuevoPlanillero);

                            if (response.success) {
                                setIsLoading(false);
                                setMessageAlertCustom("¡El planillero se ha registrado y agregado a la liga correctamente!")
                                setShowAlertCustom(true);

                                setTimeout(() => {
                                    onSave();
                                    setIsLoading(false);
                                }, 3000);
                            } else {
                                setMessageAlertCustom(response.message)
                                setShowAlertCustom(true);
                                setIsLoading(false);
                            }
                        } else {
                            setMessageAlertCustom("!Este DNI ya está registrado a nombre de: " + existeUsuarioPorDNI.primer_nombre + " " + existeUsuarioPorDNI.primer_apellido + ", registrar con otro DNI!");
                            setShowAlertCustom(true);
                            setIsLoading(false);
                        }
                    } else {
                        setMessageAlertCustom(`¡Este correo ya se encuentra registrado a nombre de ${existeUsuarioCorreo.primer_nombre + " " + existeUsuarioCorreo.primer_apellido}, vincular con otro correo!`);
                        setShowAlertCustom(true);
                        setIsLoading(false);
                    }
                } catch (error) {
                    console.error('Error:', error);
                    setIsLoading(false);
                }
            }
        } else {

            const dataPlanilleroLiga = {
                id_usuario: formData.selectedUserId,
                id_liga: idLigaSeleccionada
            }

            if (formData.selectedUserId === 0) {
                setMessageAlertCustom("¡Se debe de seleccionar el usuario para hacerlo planillero de esta liga!");
                setShowAlertCustom(true);
                setIsLoading(false);
                return false;
            }

            try {
                const response = await agregarPlanilleroLiga(dataPlanilleroLiga);

                if (response.success) {
                    setMessageAlertCustom("¡Planillero agregado correctamente!");
                    setShowAlertCustom(true);

                    setTimeout(() => {
                        onSave();
                        setIsLoading(false);
                    }, 3000);
                } else {
                    // Mostrar mensaje de error específico
                    setMessageAlertCustom(`${response.message}`);
                    setShowAlertCustom(true);
                    setIsLoading(false);
                }
            } catch (error) {
                console.log("Error al agregar el nuevo planillero: ", error);
                alert("Error al agregar el nuevo planillero: " + error);
                setIsLoading(false);
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
                <NewTeamForm onFormChange={handleFormChange} usuariosActivos={usuariosActivos} />
                <div className='p-4 flex-col sm500:flex-row flex items-center justify-center space-x-0 sm500:space-x-5'>
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
                        text="Guardar"
                        color="#3b82f6"
                        width=""
                        height=""
                        onClick={handleSave}
                        className='flex-col w-[80%] sm750:w-[40%] mt-5 sm500:mt-0'
                        classNameText = 'text-sm xs360:text-xl'
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

export default PopUpNewPlanner;