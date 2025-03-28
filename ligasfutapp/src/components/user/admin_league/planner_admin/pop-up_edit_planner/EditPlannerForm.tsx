"use client";
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface FormData {
  id_usuario: number;
  primerNombre: string;
  segundoNombre: string;
  primerApellido: string;
  segundoApellido: string;
  email: string;
  dni: string;
  isSwitchActive: boolean;
  selectedUserId: number;
}

interface EditPlannerFormProps {
  formData: FormData; // Recibe los valores iniciales del formulario
  onFormChange: (updatedData: FormData) => void; // Para notificar cambios al padre
  usuariosActivos: any; // Lista de usuarios activos
}

// const FormularioEditarEquipo = ({ onFormChange, usuariosActivos }) => {
const EditPlannerForm: React.FC<EditPlannerFormProps> = ({ formData, onFormChange, usuariosActivos }) => {
  const [usuarios, setUsuarios] = useState([]); // Lista de usuarios existentes  
  const [selectedUser, setSelectedUser] = useState(null);

  // Cargar usuarios activos solo cuando cambien
  useEffect(() => {
    if (usuariosActivos && usuariosActivos.length > 0) {
      // Crear opciones para el selector
      const options = usuariosActivos.map((usuario: any) => ({
        value: usuario.id_usuario,
        label: `${usuario.correo} - ${usuario.primer_nombre} ${usuario.primer_apellido}`,
      }));
      setUsuarios(options);
    }
  }, [usuariosActivos]);

  // Actualizar el usuario seleccionado solo si cambia el id_usuario
  useEffect(() => {
    const usuarioSeleccionado = usuariosActivos.find(
      (usuario: any) => usuario.id_usuario === formData.id_usuario
    );

    // Solo actualizar si el usuario seleccionado es diferente
    if (usuarioSeleccionado && usuarioSeleccionado.id_usuario !== selectedUser?.value) {
      setSelectedUser({
        value: usuarioSeleccionado.id_usuario,
        label: `${usuarioSeleccionado.correo} - ${usuarioSeleccionado.primer_nombre} ${usuarioSeleccionado.primer_apellido}`,
      });

      // Solo llamar a onFormChange si el usuario ha cambiado
      onFormChange({
        ...formData,
        selectedUserId: usuarioSeleccionado.id_usuario,
      });
    }
  }, [formData, usuariosActivos, onFormChange, selectedUser]);

  const handleFieldChange = (field: string, value: string | number | boolean) => {
    onFormChange({
      ...formData,
      [field]: value,
    });
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

      {/* Datos del planillero */}
      <div className="mb-4 flex flex-col items-center justify-center">
        <a className="text-white text-xl sm590:text-2xl font-bold">Datos del planillero</a>
      </div>

      {/* Formulario para registrar nuevo usuario */}
      {/* Estructura existente */}
      <div className="mb-4 flex flex-wrap items-center justify-center text-center">
        <Image width={100} height={100} src="/images/logos/Icono_Nombres_Blanco.png" alt="First Name" className="mr-1 h-8 sm750:h-10 w-8 sm750:w-10 mt-2" />
        <label className="block text-gray-700 text-white text-xl sm590:text-2xl font-bold">Primer nombre (*)</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded mt-1 text-black text-sm sm750:text-2xl"
          value={formData.primerNombre}
          onChange={(e) => handleFieldChange("primerNombre", e.target.value)}
          placeholder='Primer nombre'
        />
      </div>
      <div className="mb-4 flex flex-wrap items-center justify-center text-center">
        <Image width={100} height={100} src="/images/logos/Icono_Nombres_Blanco.png" alt="Middle Name" className="mr-1 h-8 sm750:h-10 w-8 sm750:w-10 mt-2" />
        <label className="block text-gray-700 text-white text-xl sm590:text-2xl font-bold">Segundo nombre</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded mt-1 text-black text-sm sm750:text-2xl"
          value={formData.segundoNombre}
          onChange={(e) => handleFieldChange("segundoNombre", e.target.value)}
          placeholder='Segundo nombre'
        />
      </div>
      <div className="mb-4 flex flex-wrap items-center justify-center text-center">
        <Image width={100} height={100} src="/images/logos/Icono_Apellidos_Blanco.png" alt="First Last Name" className="mr-1 h-8 sm750:h-10 w-8 sm750:w-10 mt-2" />
        <label className="block text-gray-700 text-white text-xl sm590:text-2xl font-bold">Primer apellido (*)</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded mt-1 text-black text-sm sm750:text-2xl"
          value={formData.primerApellido}
          onChange={(e) => handleFieldChange("primerApellido", e.target.value)}
          placeholder='Primer apellido'
        />
      </div>
      <div className="mb-4 flex flex-wrap items-center justify-center text-center">
        <Image width={100} height={100} src="/images/logos/Icono_Apellidos_Blanco.png" alt="Second Last Name" className="mr-1 h-8 sm750:h-10 w-8 sm750:w-10 mt-2" />
        <label className="block text-gray-700 text-white text-xl sm590:text-2xl font-bold">Segundo apellido</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded mt-1 text-black text-sm sm750:text-2xl"
          value={formData.segundoApellido}
          onChange={(e) => handleFieldChange("segundoApellido", e.target.value)}
          placeholder='Segundo apellido'
        />
      </div>
      <div className="mb-4 flex flex-wrap items-center justify-center text-center">
        <Image width={100} height={100} src="/images/logos/Icono_Correo_Blanco.png" alt="Email" className="mr-1 h-6 sm750:h-8 w-6 sm750:w-8 mt-2" />
        <label className="block text-gray-700 text-white text-xl sm590:text-2xl font-bold">Email (*)</label>
        <input
          type="email"
          className="w-full p-2 border border-gray-300 rounded mt-1 text-black text-sm sm750:text-2xl"
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
          className="mr-1 h-6 sm750:h-8 w-6 sm750:w-8 mt-2"
        />
        <label className="block text-gray-700 text-white text-xl sm590:text-2xl font-bold">* DNI:</label>
        <input
          type="text"
          value={formData.dni} // Utiliza directamente el valor del estado 'league.dni'
          onChange={(e) => {
            const value = e.target.value.replace(/[^A-Za-z0-9.\-]/g, '');
            handleFieldChange("dni", value);
          }}
          className="w-full p-2 border border-gray-300 rounded mt-1 text-black text-sm sm750:text-2xl"
          placeholder="DNI del jugador"
        />
      </div>
    </div>
  );
};

export default EditPlannerForm;
