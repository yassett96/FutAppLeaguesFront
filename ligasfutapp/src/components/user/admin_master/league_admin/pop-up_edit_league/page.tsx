"use client";
import React, { useState, useEffect } from 'react';
import Header from '../../../../../components/user/admin_master/league_admin/pop-up_edit_league/Header';
import ProfileForm from '../../../../../components/user/admin_master/league_admin/pop-up_edit_league/LeagueForm';
import CustomButton from '../../../../../components/components_generics/button/CustomButton';
import { validarEmail } from '@/utils/emailUtils';
import { obtenerUsuarioPorDNI } from '@/services/usuarioService';
import { editarLigaConUsuarioExistente, editarLigaConNuevoUsuario } from '@/services/adminLigaLigaService';
import { verificarRolAdminLiga, createUsuarioRol } from '@/services/usuarioRolService';
import { obtenerUsuarioPorCorreo } from '@/services/usuarioService';
import CustomAlert from '@/components/components_generics/custom_alert/CustomAlert';
import { IDS_USER_ROLE } from '@/constants';

interface PageProps {
  onClose?: () => void;
  onSave?: () => void;
  usuariosActivos: any;
  ligaSeleccionada: any;
  setIsLoading: (isLoading:Boolean)=>any;
}

interface LeagueData {
  id_liga: number;
  id_usuario_admin: number;
  nombre: string;
  logo: string;
  isCodeLeagueActive: Boolean,
  descripcion: string;
}

interface FormData {
  primerNombre: string;
  segundoNombre: string;
  primerApellido: string;
  segundoApellido: string;
  email: string;
  dni: string;
  league: LeagueData;
  isSwitchActive: Boolean,
  selectedUserId: number
}

const PopUpEditLeague: React.FC<PageProps> = ({ onClose, onSave, usuariosActivos, ligaSeleccionada, setIsLoading }) => {
  const [formData, setFormData] = useState<FormData>({
    primerNombre: '',
    segundoNombre: '',
    primerApellido: '',
    segundoApellido: '',
    email: '',
    dni: '',
    league: {
      id_liga: 0,
      id_usuario_admin: 0,
      nombre: '',
      logo: '',
      isCodeLeagueActive: false,
      descripcion: '',
    },
    isSwitchActive: false,
    selectedUserId: 0
  });
  const [showAlertCustom, setShowAlertCustom] = useState(false);
  const [messageAlertCustom, setMessageAlertCustom] = useState('');

  useEffect(() => {    
    if (ligaSeleccionada) {
      setFormData({
        primerNombre: ligaSeleccionada.primer_nombre || '',
        segundoNombre: ligaSeleccionada.segundo_nombre || '',
        primerApellido: ligaSeleccionada.primer_apellido || '',
        segundoApellido: ligaSeleccionada.segundo_apellido || '',
        email: ligaSeleccionada.correo || '',
        dni: ligaSeleccionada.dni || '',
        league: {
          id_liga: ligaSeleccionada.id_liga,
          id_usuario_admin: ligaSeleccionada.id_usuario_admin,
          nombre: ligaSeleccionada.nombre_liga || '',          
          logo: ligaSeleccionada.logo || '',
          isCodeLeagueActive: ligaSeleccionada.isCodeLeagueActive,
          descripcion: ligaSeleccionada.descripcion || '',
        },
        isSwitchActive: false,
        selectedUserId: ligaSeleccionada.id_usuario || 0,
      });
    }
  }, [ligaSeleccionada]);

  // Callback para recibir datos del formulario desde el hijo
  const handleFormChange = (updatedData: FormData) => {
    setFormData(updatedData);
  };

  const modificarLigaConUsuarioExistente = async () => {
    const leagueData = {
      nombre: formData.league.nombre,
      descripcion: formData.league.descripcion,
      isCodeLeagueActive: formData.league.isCodeLeagueActive,
      logo: formData.league.logo,
    };

    const insercionRegistroConUsuarioExistente = await editarLigaConUsuarioExistente(formData.league.id_liga, formData.selectedUserId, leagueData);

    if (insercionRegistroConUsuarioExistente) {
      setMessageAlertCustom("¡Se ha registrado la liga y se ha asociado el usuario seleccionado exitosamente!");
      setShowAlertCustom(true);
    }
  };

  const validarCamposDeRegistro = () => {
    if (formData.league.nombre.trim() === '') {
      setMessageAlertCustom("¡Se debe de ingresar el nombre de la liga!");
      setShowAlertCustom(true);
      return false;
    }

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
              const id_liga = formData.league.id_liga;

              const usuarioData = {
                primerNombre: formData.primerNombre,
                segundoNombre: formData.segundoNombre,
                primerApellido: formData.primerApellido,
                segundoApellido: formData.segundoApellido,
                email: formData.email,
                dni: dniSinGuiones,
              };

              const ligaData = {
                nombre: formData.league.nombre,
                descripcion: formData.league.descripcion,
                isCodeLeagueActive: formData.league.isCodeLeagueActive,
                logo: formData.league.logo,
              };

              const response = await editarLigaConNuevoUsuario(id_liga, usuarioData, ligaData);
              setIsLoading(false);
              if (response.success) {
                setMessageAlertCustom("¡Liga registrada exitosamente!. Se ha enviado un correo al administrador de la liga con sus credenciales.");
                setShowAlertCustom(true);

                notificarGuardadoyCerrar();
              } else {
                setIsLoading(false);
                console.error('Error en el registro:', response.message);
              }
            } else {
              setIsLoading(false);
              setMessageAlertCustom("!Este DNI ya está registrado a nombre de: ");
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
      const rolAdminLiga = await verificarRolAdminLiga(formData.selectedUserId, IDS_USER_ROLE.ADMIN_LIGA);

      // Ver si el usuario ya tiene el rol de Admin_Liga
      if (rolAdminLiga.hasRole) {
        await modificarLigaConUsuarioExistente();
        setIsLoading(false);

        setTimeout(()=>{
          notificarGuardadoyCerrar();
        }, 3000);        
      } else {
        const usuarioRolData = {
          id_usuario: formData.selectedUserId,
          id_rol: IDS_USER_ROLE.ADMIN_LIGA,
          fecha_asignacion: new Date().toISOString().split('T')[0],
        };

        const crearUsuarioRol = await createUsuarioRol(usuarioRolData);        
        if (crearUsuarioRol) {
          await modificarLigaConUsuarioExistente();
          setIsLoading(false);
          setTimeout(()=>{
            notificarGuardadoyCerrar();
          }, 3000);
        }
      }
    }
  };

  const notificarGuardadoyCerrar = () => {
    // Notificar al padre que se ha guardado la liga
    if (onSave) {
      onSave();
    }

    // Cerrar el popup
    if (onClose) {
      onClose();
    }
  };

  const handleCloseAlertCustom = () => {
    setShowAlertCustom(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-30 w-full">
      <div className="bg-blue-900 rounded-lg overflow-hidden w-[96%] max-w-3xl max-h-[90vh] overflow-y-auto p-5">
        <Header />
        {/* Pasamos el callback al formulario */}
        <ProfileForm
          onFormChange={handleFormChange}
          usuariosActivos={usuariosActivos}
          ligaSeleccionada={ligaSeleccionada}
        />
        <div className="flex flex-col space-y-4 sm500:flex-row sm500:space-y-0 sm500:space-x-5 items-center justify-center mb-5">
          <CustomButton
            text="Cancelar"
            color="#ef4444"
            width="100%"
            height=""
            onClick={onClose}
            className="flex-col w-full sm500:w-[40%]"
            icon="/images/logos/Icono_Cancelar_Blanco.png"
          />
          <CustomButton
            text="Guardar"
            color="#3b82f6"
            width="100%"
            height=""
            onClick={handleSave}
            className="flex-col w-full sm500:w-[40%] mt-4 sm500:mt-0"
            icon="/images/logos/Icono_Guardar_Blanco.png"
          />
        </div>
      </div>
      {/** Alertas de las acciones */}
      <CustomAlert message={messageAlertCustom} show={showAlertCustom} onClose={handleCloseAlertCustom} />
    </div>
  );
};

export default PopUpEditLeague;
