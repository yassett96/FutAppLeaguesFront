"use client"
import React, { useState } from 'react';
import Header from './Header';
import EditTeamForm from './EditTeamForm';
import CustomButton from '../../../../components_generics/button/CustomButton';
import CustomAlert from '@/components/components_generics/custom_alert/CustomAlert';
import { validarEmail } from '@/utils/emailUtils';
import { obtenerUsuarioPorDNI } from '@/services/usuarioService';
import { obtenerUsuarioPorCorreo } from '@/services/usuarioService';
import { actualizarEquipoConDelegadoExistente, actualizarEquipoConDelegadoNuevo } from '@/services/equipoService';
import { verificarRolDelegado, createUsuarioRol } from '@/services/usuarioRolService';
import { IDS_USER_ROLE } from '@/constants';

interface PageProps {
    onClose?: () => void;
    onSave?: () => void;
    usuariosActivos: any;
    equipos: any;
    idCategoriaSeleccionada: number;
    datosEquipoAEditar: any;
    idLigaSeleccionada: number;
    setIsLoading: (isLoading: Boolean) => any;
}

interface EquipoData {
    id_equipo: number;
    nombre_equipo: string;
    logo: string;
    activo: number;
}

interface FormData {
    id_usuario: number;
    primerNombre: string;
    segundoNombre: string;
    primerApellido: string;
    segundoApellido: string;
    email: string;
    dni: string;
    equipo: EquipoData;
    isSwitchActive: boolean,
    selectedUserId: number
}

const PopUpEditarEquipo: React.FC<PageProps> = ({ onClose, onSave, usuariosActivos, equipos, idCategoriaSeleccionada, datosEquipoAEditar, idLigaSeleccionada, setIsLoading }) => {
    const [formData, setFormData] = useState<FormData>({
        id_usuario: datosEquipoAEditar?.id_usuario || 0,
        primerNombre: datosEquipoAEditar?.delegado_primer_nombre || '',
        segundoNombre: datosEquipoAEditar?.delegado_segundo_nombre || '',
        primerApellido: datosEquipoAEditar?.delegado_primer_apellido || '',
        segundoApellido: datosEquipoAEditar?.delegado_segundo_apellido || '',
        email: datosEquipoAEditar?.delegado_correo || '',
        dni: datosEquipoAEditar?.delegado_dni || '',
        equipo: {
            id_equipo: datosEquipoAEditar?.id_equipo || 0,
            nombre_equipo: datosEquipoAEditar?.nombre_equipo || '',
            logo: datosEquipoAEditar?.logo || '',
            activo: datosEquipoAEditar?.activo || 0,
        },
        isSwitchActive: false,
        selectedUserId: datosEquipoAEditar?.id_delegado || 0, // ID del delegado ya existente
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
                ...updatedData.equipo,
            },
            selectedUserId: updatedData.selectedUserId || prevData.selectedUserId,
        }));
    };

    const validarCamposDeRegistro = () => {
        if (formData.equipo.nombre_equipo.trim() === '') {
            setIsLoading(false);
            setMessageAlertCustom("¡Se debe de ingresar el nombre del equipo!");
            setShowAlertCustom(true);
            return false;
        }

        // Validar los campos restantes
        if (formData.primerNombre.trim() === '') {
            setIsLoading(false);
            setMessageAlertCustom("¡Se debe de ingresar el primer nombre!");
            setShowAlertCustom(true);
            return false;
        }

        if (formData.primerApellido.trim() === '') {
            setIsLoading(false);
            setMessageAlertCustom("¡Se debe de ingresar el primer apellido!");
            setShowAlertCustom(true);
            return false;
        }

        if (formData.email.trim() === '') {
            setIsLoading(false);
            setMessageAlertCustom("¡Se debe de ingresar el correo electrónico!");
            setShowAlertCustom(true);
            return false;
        }

        if (!validarEmail(formData.email)) {
            setIsLoading(false);
            setMessageAlertCustom("¡Se debe de ingresar un correo electrónico válido, por ejemplo: example@gmail.com!");
            setShowAlertCustom(true);
            return false;
        }

        if (formData.dni.trim() === '') {
            setIsLoading(false);
            setMessageAlertCustom("¡Se debe de ingresar el DNI!");
            setShowAlertCustom(true);
            return false;
        }

        return true;
    };

    const actualizarEquipoConUsuarioExistente = async (data: any) => {
        // Filtrar el equipo que se está editando
        const equiposSinElEditado = equipos.filter(
            (equipo: EquipoData) => equipo.nombre_equipo.trim() !== datosEquipoAEditar.nombre_equipo.trim()
        );

        // Verificar si el nombre del equipo ya existe en otros equipos
        const existeNombreEquipo = equiposSinElEditado.some(
            (equipo: EquipoData) => equipo.nombre_equipo.trim() === formData.equipo.nombre_equipo.trim()
        );

        if (!existeNombreEquipo) {
            const insercionRegistroConUsuarioExistente = await actualizarEquipoConDelegadoExistente(data, idLigaSeleccionada);

            if (insercionRegistroConUsuarioExistente.success) {
                setMessageAlertCustom("¡Se ha actualizado el equipo y se ha asociado el usuario seleccionado exitosamente!");
                setShowAlertCustom(true);

                setTimeout(() => {
                    if (onSave) onSave(); // Notificar al componente padre
                    onClose(); // Cerrar el popup
                }, 2000);
            }
        } else {
            setMessageAlertCustom("¡Este nombre de equipo ya existe, no se puede registrar uno con el mismo nombre!");
            setShowAlertCustom(true);
        }
    };

    const actualizarEquipoConUsuarioNuevo = async (data: any) => {
        // Filtrar el equipo que se está editando
        const equiposSinElEditado = equipos.filter(
            (equipo: EquipoData) => equipo.nombre_equipo.trim() !== datosEquipoAEditar.nombre_equipo.trim()
        );

        // Verificar si el nombre del equipo ya existe en otros equipos
        const existeNombreEquipo = equiposSinElEditado.some(
            (equipo: EquipoData) => equipo.nombre_equipo.trim() === formData.equipo.nombre_equipo.trim()
        );

        if (!existeNombreEquipo) {
            const insercionRegistroConUsuarioExistente = await actualizarEquipoConDelegadoNuevo(data, idLigaSeleccionada);

            if (insercionRegistroConUsuarioExistente.success) {
                setMessageAlertCustom("¡Se ha actualizado el equipo y se ha asociado el usuario nuevo exitosamente!");
                setShowAlertCustom(true);

                setTimeout(() => {
                    if (onSave) onSave(); // Notificar al componente padre
                    onClose(); // Cerrar el popup
                }, 2000);

            }
        } else {
            setMessageAlertCustom("¡Este nombre de equipo ya existe, no se puede registrar uno con el mismo nombre!");
            setShowAlertCustom(true);
        }
    };

    // Función para manejar el clic en "Guardar"
    const handleUpdate = async () => {
        setIsLoading(true);
        // Vemos si es un nuevo administrador
        if (formData.isSwitchActive) {
            if (validarCamposDeRegistro()) {
                try {
                    // Verificar si el nombre del equipo ya existe en la lista de equipos
                    const existeNombreEquipo = equipos.some((equipo: EquipoData) =>
                        equipo.nombre_equipo.trim() === formData.equipo.nombre_equipo.trim() &&
                        equipo.id_equipo !== datosEquipoAEditar.id_equipo
                    );

                    if (existeNombreEquipo) {
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
                                id_equipo: datosEquipoAEditar.id_equipo,
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
                            await actualizarEquipoConUsuarioNuevo(equipoData);
                            setIsLoading(false);
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

            // Verificar si el usuario tiene el rol de DELEGADO
            const rolAdminDelegado = await verificarRolDelegado(formData.selectedUserId, IDS_USER_ROLE.DELEGADO);

            // Ver si el usuario ya tiene el rol de DELEGADO
            if (rolAdminDelegado.hasRole) {
                await actualizarEquipo();
                setIsLoading(false);
            } else {
                const usuarioRolData = {
                    id_usuario: formData.selectedUserId,
                    id_rol: IDS_USER_ROLE.DELEGADO,
                    fecha_asignacion: new Date().toISOString().split('T')[0],
                };

                const crearUsuarioRol = await createUsuarioRol(usuarioRolData);

                if (crearUsuarioRol) {
                    await actualizarEquipo();
                    setIsLoading(false);
                }
            }
        }
    };

    const actualizarEquipo = async () => {
        const data = {
            id_equipo: datosEquipoAEditar.id_equipo,
            nombre_equipo: formData.equipo.nombre_equipo,
            logo: formData.equipo.logo,
            id_categoria: idCategoriaSeleccionada,
            id_usuario: formData.selectedUserId,
        };

        await actualizarEquipoConUsuarioExistente(data);
    }

    const handleCloseAlertCustom = () => {
        setShowAlertCustom(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative bg-blue-900 rounded-lg p-6 w-[95%] max-w-3xl z-30 overflow-auto max-h-[90vh]">
                <Header />
                <EditTeamForm formData={formData} onFormChange={handleFormChange} usuariosActivos={usuariosActivos} />
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
                        onClick={handleUpdate}
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

export default PopUpEditarEquipo;