"use client"
import React, { useState } from 'react';
import Header from './Header';
import NewTeamForm from './NewTeamForm';
import CustomButton from '../../../../components_generics/button/CustomButton';
import CustomAlert from '@/components/components_generics/custom_alert/CustomAlert';
import { validarEmail } from '@/utils/emailUtils';
import { obtenerUsuarioPorDNI } from '@/services/usuarioService';
import { obtenerUsuarioPorCorreo } from '@/services/usuarioService';
import { registrarEquipoConDelegado, registrarEquipoConDelegadoExistente } from '@/services/equipoService';
import { verificarRolDelegado, createUsuarioRol } from '@/services/usuarioRolService';
import { IDS_USER_ROLE } from '@/constants';

interface PageProps {
    onClose?: () => void;
    onSave?: () => void;
    usuariosActivos: any;
    equipos: any;
    idCategoriaSeleccionada: number;
    idLigaSeleccionada: number;
    setIsLoading: (isLoading: Boolean) => any;
}

interface EquipoData {
    nombre_equipo: string;
    logo: string;
    activo: number;
}

interface FormData {
    primerNombre: string;
    segundoNombre: string;
    primerApellido: string;
    segundoApellido: string;
    email: string;
    dni: string;
    equipo: EquipoData;
    isSwitchActive: Boolean,
    selectedUserId: number
}

const PopUpNuevoEquipo: React.FC<PageProps> = ({ onClose, onSave, usuariosActivos, equipos, idCategoriaSeleccionada, idLigaSeleccionada, setIsLoading }) => {
    const [formData, setFormData] = useState<FormData>({
        primerNombre: '',
        segundoNombre: '',
        primerApellido: '',
        segundoApellido: '',
        email: '',
        dni: '',
        equipo: {
            nombre_equipo: '',
            logo: '',
            activo: 0,
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
            equipo: {
                ...prevData.equipo,
                ...updatedData.equipo, // Asegúrate de no sobrescribir todo el objeto equipo
            },
            selectedUserId: updatedData.selectedUserId || prevData.selectedUserId, // Actualiza el ID del usuario seleccionado
        }));
    };

    const validarCamposDeRegistro = () => {
        if (formData.equipo.nombre_equipo.trim() === '') {
            setMessageAlertCustom("¡Se debe de ingresar el nombre del equipo!");
            setShowAlertCustom(true);
            setIsLoading(false);
            return false;
        }

        // Validar los campos restantes
        if (formData.primerNombre.trim() === '') {
            setMessageAlertCustom("¡Se debe de ingresar el primer nombre!");
            setShowAlertCustom(true);
            setIsLoading(false);
            return false;
        }

        if (formData.primerApellido.trim() === '') {
            setMessageAlertCustom("¡Se debe de ingresar el primer apellido!");
            setShowAlertCustom(true);
            setIsLoading(false);
            return false;
        }

        if (formData.email.trim() === '') {
            setMessageAlertCustom("¡Se debe de ingresar el correo electrónico!");
            setShowAlertCustom(true);
            setIsLoading(false);
            return false;
        }

        if (!validarEmail(formData.email)) {
            setMessageAlertCustom("¡Se debe de ingresar un correo electrónico válido, por ejemplo: example@gmail.com!");
            setShowAlertCustom(true);
            setIsLoading(false);
            return false;
        }

        if (formData.dni.trim() === '') {
            setMessageAlertCustom("¡Se debe de ingresar el DNI!");
            setShowAlertCustom(true);
            setIsLoading(false);
            return false;
        }

        return true;
    };

    const insertarEquipoConUsuarioExistente = async () => {
        const existeNombreEquipo = equipos.some((equipo: EquipoData) =>
            equipo.nombre_equipo.trim() === formData.equipo.nombre_equipo.trim()
        );

        const data = {
            nombre_equipo: formData.equipo.nombre_equipo,
            logo: formData.equipo.logo,
            id_categoria: idCategoriaSeleccionada,
            id_usuario: formData.selectedUserId,
        };

        formData.selectedUserId, formData.equipo

        if (!existeNombreEquipo) {
            const insercionRegistroConUsuarioExistente = await registrarEquipoConDelegadoExistente(data, idLigaSeleccionada);

            if (insercionRegistroConUsuarioExistente.success) {
                setIsLoading(false);
                setMessageAlertCustom("¡Se ha registrado el equipo y se ha asociado el usuario seleccionado exitosamente!");
                setShowAlertCustom(true);
                setTimeout(() => {
                    if (onSave) onSave(); // Notificar al componente padre
                    onClose(); // Cerrar el popup
                }, 4000);
            }
        } else {
            setIsLoading(false);
            setMessageAlertCustom("¡Este nombre de equipo ya existe, no se puede registrar uno con el mismo nombre!");
            setShowAlertCustom(true);
        }
    };

    // Función para manejar el clic en "Guardar"
    const handleSave = async () => {
        setIsLoading(true);
        // Vemos si es un nuevo administrador
        if (formData.isSwitchActive) {
            if (validarCamposDeRegistro()) {
                try {
                    // Verificar si el nombre del equipo ya existe en la lista de equipos
                    const existeNombreEquipo = equipos.some((equipo: EquipoData) =>
                        equipo.nombre_equipo.trim() === formData.equipo.nombre_equipo.trim()
                    );

                    if (existeNombreEquipo) {
                        setIsLoading(false);
                        setMessageAlertCustom("¡Este nombre de equipo ya existe en esta categoría, elige otro nombre!");
                        setShowAlertCustom(true);
                        return;
                    }

                    const existeUsuarioCorreo = await obtenerUsuarioPorCorreo(formData.email);

                    if (!existeUsuarioCorreo) {
                        const dniSinGuiones = formData.dni.trim().replace(/-/g, '');
                        const existeUsuarioPorDNI = await obtenerUsuarioPorDNI(dniSinGuiones);

                        if (!existeUsuarioPorDNI) {

                            const equipoData = {
                                nombre_equipo: formData.equipo.nombre_equipo,
                                logo: formData.equipo.logo,
                                id_categoria: idCategoriaSeleccionada,
                                delegado: {
                                    primer_nombre: formData.primerNombre,
                                    segundo_nombre: formData.segundoNombre,
                                    primer_apellido: formData.primerApellido,
                                    segundo_apellido: formData.segundoApellido,
                                    email: formData.email,
                                    dni: dniSinGuiones,
                                },
                            };

                            const resRegistrarEquipoConDelegado = await registrarEquipoConDelegado(equipoData, idLigaSeleccionada);

                            setIsLoading(false);

                            if (resRegistrarEquipoConDelegado.success) {
                                setMessageAlertCustom("¡Se ha registrado el equipo con el jugador delegado correctamente!");
                                setShowAlertCustom(true);
                                setTimeout(() => {
                                    if (onSave) onSave();
                                    onClose();
                                }, 3000);
                            }
                        } else {
                            setIsLoading(false);
                            setMessageAlertCustom("!Este DNI ya está registrado a nombre de: " + existeUsuarioPorDNI.primer_nombre + " " + existeUsuarioPorDNI.primer_apellido);
                            setShowAlertCustom(true);
                        }
                    } else {
                        setIsLoading(false);
                        setMessageAlertCustom("¡Este correo ya se encuentra registrado, vincular con otro correo!");
                        setShowAlertCustom(true);
                    }
                } catch (error) {
                    setIsLoading(false);
                    console.error('Error:', error);
                }
            }
        } else {
            if (formData.equipo.nombre_equipo.trim() === '') {
                setIsLoading(false);
                setMessageAlertCustom("¡Se debe de ingresar el nombre del equipo!");
                setShowAlertCustom(true);
                return false;
            }

            if (formData.selectedUserId === 0) {
                setIsLoading(false);
                setMessageAlertCustom("¡Se debe de seleccionar el usuario a vincular a este equipo!");
                setShowAlertCustom(true);
                return false;
            }

            const rolAdminDelegado = await verificarRolDelegado(formData.selectedUserId, IDS_USER_ROLE.DELEGADO);

            // Ver si el usuario ya tiene el rol de DELEGADO
            if (rolAdminDelegado.hasRole) {
                await insertarEquipoConUsuarioExistente();
            } else {
                const usuarioRolData = {
                    id_usuario: formData.selectedUserId,
                    id_rol: IDS_USER_ROLE.DELEGADO,
                    fecha_asignacion: new Date().toISOString().split('T')[0],
                };

                const crearUsuarioRol = createUsuarioRol(usuarioRolData);

                if (crearUsuarioRol) {
                    await insertarEquipoConUsuarioExistente();
                }
            }
        }
    };

    const handleCloseAlertCustom = () => {
        setShowAlertCustom(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative bg-blue-900 rounded-lg p-6 w-[95%] z-30 overflow-auto max-h-[90vh]">
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
                        classNameText='text-sm sm590:text-xl'
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
                        classNameText='text-sm sm590:text-xl'
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

export default PopUpNuevoEquipo;