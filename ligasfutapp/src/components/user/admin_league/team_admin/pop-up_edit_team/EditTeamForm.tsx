"use client";
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Select from "react-select";

interface FormData {
  id_usuario: number;
  primerNombre: string;
  segundoNombre: string;
  primerApellido: string;
  segundoApellido: string;
  email: string;
  dni: string;
  equipo: {
    nombre_equipo: string;
    logo: string;
    activo: number;
  };
  isSwitchActive: boolean;
  selectedUserId: number;
}

interface EditTeamFormProps {
  formData: FormData; // Recibe los valores iniciales del formulario
  onFormChange: (updatedData: FormData) => void; // Para notificar cambios al padre
  usuariosActivos: any; // Lista de usuarios activos
}

// const FormularioEditarEquipo = ({ onFormChange, usuariosActivos }) => {
const EditTeamForm: React.FC<EditTeamFormProps> = ({ formData, onFormChange, usuariosActivos }) => {
  const [usuarios, setUsuarios] = useState([]); // Lista de usuarios existentes  
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    // Ejecutar la lógica solo si tenemos usuariosActivos y aún no se han generado las opciones (usuarios.length === 0)
    if (usuariosActivos && usuariosActivos.length > 0 && usuarios.length === 0) {
      // Crear opciones para el selector
      const options = usuariosActivos.map((usuario: any) => ({
        value: usuario.id_usuario,
        label: `${usuario.correo} - ${usuario.primer_nombre} ${usuario.primer_apellido}`,
      }));
      setUsuarios(options);

      // Encontrar el usuario seleccionado basado en `selectedUserId`
      const usuarioSeleccionado = usuariosActivos.find(
        (usuario: any) => usuario.id_usuario === formData.id_usuario
      );

      if (usuarioSeleccionado) {
        setSelectedUser({
          value: usuarioSeleccionado.id_usuario,
          label: `${usuarioSeleccionado.correo} - ${usuarioSeleccionado.primer_nombre} ${usuarioSeleccionado.primer_apellido}`,
        });
        onFormChange({
          ...formData,
          selectedUserId: usuarioSeleccionado.id_usuario,
        });
      } else {
        // Si no hay un usuario seleccionado en `formData`, limpiar el `selectedUser`
        setSelectedUser(null);
      }
    }
  }, [usuariosActivos, formData, onFormChange, usuarios.length]);

  const handleFieldChange = (field: string, value: string | number | boolean) => {
    if (field.startsWith("equipo.")) {
      // Actualizar campos dentro del equipo
      const equipoField = field.split(".")[1];
      onFormChange({
        ...formData,
        equipo: {
          ...formData.equipo,
          [equipoField]: value,
        },
      });
    } else {
      // Actualizar campos generales
      onFormChange({
        ...formData,
        [field]: value,
      });
    }
  };

  const handleUserChange = (selectedOption: any) => {
    setSelectedUser(selectedOption);
    onFormChange({
      ...formData,
      selectedUserId: selectedOption.value,
    });
  };

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isActive = e.target.checked;
    if (isActive) {
      formData.primerNombre = '';
      formData.primerApellido = '';
      formData.email = '';
    } else {
      // Encontrar el usuario seleccionado
      const usuarioSeleccionado = usuariosActivos.find(
        (usuario: any) => usuario.id_usuario === formData.id_usuario
      );

      formData.primerNombre = usuarioSeleccionado.primer_nombre;
      formData.primerApellido = usuarioSeleccionado.primer_apellido;
      formData.email = usuarioSeleccionado.correo;
    }
    onFormChange({
      ...formData,
      isSwitchActive: isActive,
    });
  };

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto p-4 rounded-lg text-shadow-lg text-xl sm590:text-2xl font-bold text-black">
      {/* Campo Equipo */}
      <div className="flex flex-col sm590:flex-row items-center mb-4">
        <div className="flex items-center mb-2 sm590:mb-0 sm590:mr-2">
          <Image
            src="/images/logos/Icono_Equipo_Blanco.png"
            alt="Ícono de Equipo"
            className="mr-2 w-9 sm750:w-11 h-9 sm750:h-11"
            width={100}
            height={100}
          />
          <label htmlFor="equipo" className="text-white text-xl sm590:text-2xl">Equipo:</label>
        </div>
        <input
          id="equipo"
          name="equipo"
          className="w-full sm590:w-auto border border-gray-300 rounded-md p-2 text-black text-sm sm590:text-2xl"
          placeholder="Nombre del equipo"
          value={formData.equipo.nombre_equipo}
          onChange={(e) => handleFieldChange("equipo.nombre_equipo", e.target.value)}
        />
      </div>

      {/* Datos del delegado */}
      <div className="mb-4 flex flex-col items-center justify-center">
        <a className="text-white text-xl font-bold">Datos del delegado</a>
      </div>

      {/* Switch para nuevo delegado */}
      <div className="flex items-center flex-col space-x-2">
        <span className="text-white text-xl sm590:text-2xl font-medium">Nuevo delegado</span>
        <label className="relative inline-flex items-center cursor-pointer mt-2">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={formData.isSwitchActive}
            onChange={handleSwitchChange}
          />
          <div className="w-12 h-6 bg-gray-300 peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:bg-purple-500 peer-checked:shadow-lg transition-all duration-300"></div>
          <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-6"></div>
        </label>
      </div>

      {/* Selectbox o formulario según el switch */}
      {!formData.isSwitchActive ? (
        <div className="mb-10 relative">
          <label htmlFor="selectUsuario" className="text-xl sm590:text-2xl font-bold text-white">
            Buscar usuario:
          </label>
          <Select
            className="w-full text-sm sm590:text-2xl"
            options={usuarios}
            value={selectedUser}
            onChange={handleUserChange}
            isSearchable
            placeholder="Escribe el correo del usuario para buscar"
            menuPortalTarget={document.body} // Renderiza el menú en el body
            styles={{
              menuPortal: (base) => ({ ...base, zIndex: 9999 }), // Asegura que el menú tenga un z-index alto
              menu: (base) => ({
                ...base,
                maxHeight: '200px', // Limita la altura del menú desplegable
                overflowY: 'auto', // Habilita el scroll interno del menú
                margin: 0, // Elimina cualquier margen extra que cause scroll
                boxShadow: 'none', // Remueve sombras innecesarias
              }),
              menuList: (base) => ({
                ...base,
                maxHeight: '108px', // Asegura que la lista tenga scroll si excede la altura
                overflowY: 'auto', // Habilita el scroll en el listado
                padding: 0, // Elimina padding que podría añadir scroll
              }),
              control: (base) => ({
                ...base,
                borderColor: 'gray-300', // Color del borde
                boxShadow: 'none', // Remueve el shadow por defecto
                '&:hover': { borderColor: 'gray-400' }, // Hover state
              }),
            }}
          />

        </div>
      ) : (
        <>
          {/* Formulario para registrar nuevo usuario */}
          {/* Estructura existente */}
          <div className="mb-4 flex flex-wrap items-center justify-center text-center">
            <Image width={100} height={100} src="/images/logos/Icono_Nombres_Blanco.png" alt="First Name" className="mr-1 h-10 w-10 mt-2" />
            <label className="block text-gray-700 text-white text-xl font-bold">Primer nombre (*)</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
              value={formData.primerNombre}
              onChange={(e) => handleFieldChange("primerNombre", e.target.value)}
              placeholder='Primer nombre'
            />
          </div>
          <div className="mb-4 flex flex-wrap items-center justify-center text-center">
            <Image width={100} height={100} src="/images/logos/Icono_Nombres_Blanco.png" alt="Middle Name" className="mr-1 h-10 w-10 mt-2" />
            <label className="block text-gray-700 text-white text-xl font-bold">Segundo nombre</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
              value={formData.segundoNombre}
              onChange={(e) => handleFieldChange("segundoNombre", e.target.value)}
              placeholder='Segundo nombre'
            />
          </div>
          <div className="mb-4 flex flex-wrap items-center justify-center text-center">
            <Image width={100} height={100} src="/images/logos/Icono_Apellidos_Blanco.png" alt="First Last Name" className="mr-2 h-10 w-10 mt-2" />
            <label className="block text-gray-700 text-white text-xl font-bold">Primer apellido (*)</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
              value={formData.primerApellido}
              onChange={(e) => handleFieldChange("primerApellido", e.target.value)}
              placeholder='Primer apellido'
            />
          </div>
          <div className="mb-4 flex flex-wrap items-center justify-center text-center">
            <Image width={100} height={100} src="/images/logos/Icono_Apellidos_Blanco.png" alt="Second Last Name" className="mr-2 h-10 w-10 mt-2" />
            <label className="block text-gray-700 text-white text-xl font-bold">Segundo apellido</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
              value={formData.segundoApellido}
              onChange={(e) => handleFieldChange("segundoApellido", e.target.value)}
              placeholder='Segundo apellido'
            />
          </div>
          <div className="mb-4 flex flex-wrap items-center justify-center text-center">
            <Image width={100} height={100} src="/images/logos/Icono_Correo_Blanco.png" alt="Email" className="mr-2 h-8 w-8 mt-2" />
            <label className="block text-gray-700 text-white text-xl font-bold">Email (*)</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
              value={formData.email}
              onChange={(e) => handleFieldChange("email", e.target.value)}
              placeholder='example@gmail.com'
            />
          </div>
          <div className="mb-4 flex flex-wrap items-center justify-center text-center">
            <Image
              width={100}
              height={100}
              src="/images/logos/Icono_DNI_Blanco.png"
              alt="DNI"
              className="mr-2 h-8 w-8 mt-2"
            />
            <label className="block text-gray-700 text-white text-xl font-bold">* DNI:</label>
            <input
              type="text"
              value={formData.dni} // Utiliza directamente el valor del estado 'league.dni'              
              onChange={(e) => {
                const value = e.target.value.replace(/[^A-Za-z0-9.\-]/g, '');
                handleFieldChange("dni", value);
              }}
              className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
              placeholder="DNI del jugador"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default EditTeamForm;
