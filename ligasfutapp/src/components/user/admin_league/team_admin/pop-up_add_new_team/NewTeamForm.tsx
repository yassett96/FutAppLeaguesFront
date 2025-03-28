"use client";
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Select from "react-select";

const FormularioNuevoEquipo = ({ onFormChange, usuariosActivos }) => {
  const [primerNombre, setPrimerNombre] = useState('');
  const [segundoNombre, setSegundoNombre] = useState('');
  const [primerApellido, setPrimerApellido] = useState('');
  const [segundoApellido, setSegundoApellido] = useState('');
  const [email, setEmail] = useState('');
  const [dni, setDni] = useState('');
  const [equipo, setEquipo] = useState({
    nombre_equipo: '',
    logo: '',
    activo: 0
  });

  const [isSwitchActive, setIsSwitchActive] = useState(false);
  const [usuarios, setUsuarios] = useState([]); // Lista de usuarios existentes
  const [selectedUserId, setSelectedUserId] = useState(""); // Usuario seleccionado
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    if (usuariosActivos) {
      const options = usuariosActivos.map((usuario) => ({
        value: usuario.id_usuario,
        label: `${usuario.correo} - ${usuario.primer_nombre} ${usuario.primer_apellido}`,
      }));
      setUsuarios(options);
    }
  }, [usuariosActivos]);

  const handleFieldChange = (field, value) => {
    // Actualiza el estado local
    switch (field) {
      case "primerNombre":
        setPrimerNombre(value);
        break;
      case "segundoNombre":
        setSegundoNombre(value);
        break;
      case "primerApellido":
        setPrimerApellido(value);
        break;
      case "segundoApellido":
        setSegundoApellido(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "dni":
        setDni(value);
        break;
      case "equipoNombre":
        setEquipo((prevEquipo) => ({ ...prevEquipo, nombre_equipo: value }));
        break;
      case "equipoLogo":
        setEquipo((prevEquipo) => ({ ...prevEquipo, logo: value }));
        break;
      default:
        break;
    }

    // Llama a onFormChange con el valor actualizado directamente
    onFormChange({
      primerNombre: field === "primerNombre" ? value : primerNombre,
      segundoNombre: field === "segundoNombre" ? value : segundoNombre,
      primerApellido: field === "primerApellido" ? value : primerApellido,
      segundoApellido: field === "segundoApellido" ? value : segundoApellido,
      email: field === "email" ? value : email,
      dni: field === "dni" ? value : dni,
      equipo: {
        ...equipo,
        nombre_equipo: field === "equipoNombre" ? value : equipo.nombre_equipo,
        logo: field === "equipoLogo" ? value : equipo.logo,
      },
    });
  };

  const handleUserChange = (selectedOption) => {
    setSelectedUserId(selectedOption.value);
    setSelectedUser(selectedOption);
    onFormChange({
      primerNombre,
      segundoNombre,
      primerApellido,
      segundoApellido,
      email,
      dni,
      equipo,
      isSwitchActive,
      selectedUserId: selectedOption.value, // Asegúrate de enviar el ID seleccionado
    });
  };

  const handleSwitchChange = (e) => {
    const isActive = e.target.checked;
    setIsSwitchActive(isActive);
    onFormChange({
      isSwitchActive: isActive,
      selectedUser: isActive ? null : selectedUserId,
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
          value={equipo.nombre_equipo}
          onChange={(e) => handleFieldChange("equipoNombre", e.target.value)}
        />
      </div>

      {/* Datos del delegado */}
      <div className="mb-4 flex flex-col items-center justify-center">
        <a className="text-white text-xl font-bold">Datos del delegado</a>
      </div>

      {/* Switch para nuevo usuario delegado */}
      <div className="flex items-center flex-col space-x-2">
        <span className="text-white text-xl sm590:text-2xl font-medium">Nuevo delegado</span>
        <label className="relative inline-flex items-center cursor-pointer mt-2">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={isSwitchActive}
            onChange={handleSwitchChange}
          />
          <div className="w-12 h-6 bg-gray-300 peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:bg-purple-500 peer-checked:shadow-lg transition-all duration-300"></div>
          <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-6"></div>
        </label>
      </div>

      {/* Selectbox o formulario según el switch */}
      {!isSwitchActive ? (
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
              name="primer_nombre"
              className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
              value={primerNombre}
              onChange={(e) => handleFieldChange("primerNombre", e.target.value)}
              placeholder='Primer nombre'
            />
          </div>
          <div className="mb-4 flex flex-wrap items-center justify-center text-center">
            <Image width={100} height={100} src="/images/logos/Icono_Nombres_Blanco.png" alt="Middle Name" className="mr-1 h-10 w-10 mt-2" />
            <label className="block text-gray-700 text-white text-xl font-bold">Segundo nombre</label>
            <input
              type="text"
              name="segundo_nombre"
              className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
              value={segundoNombre}
              onChange={(e) => handleFieldChange("segundoNombre", e.target.value)}
              placeholder='Segundo nombre'
            />
          </div>
          <div className="mb-4 flex flex-wrap items-center justify-center text-center">
            <Image width={100} height={100} src="/images/logos/Icono_Apellidos_Blanco.png" alt="First Last Name" className="mr-2 h-10 w-10 mt-2" />
            <label className="block text-gray-700 text-white text-xl font-bold">Primer apellido (*)</label>
            <input
              type="text"
              name="primer_apellido"
              className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
              value={primerApellido}
              onChange={(e) => handleFieldChange("primerApellido", e.target.value)}
              placeholder='Primer apellido'
            />
          </div>
          <div className="mb-4 flex flex-wrap items-center justify-center text-center">
            <Image width={100} height={100} src="/images/logos/Icono_Apellidos_Blanco.png" alt="Second Last Name" className="mr-2 h-10 w-10 mt-2" />
            <label className="block text-gray-700 text-white text-xl font-bold">Segundo apellido</label>
            <input
              type="text"
              name="segundo_apellido"
              className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
              value={segundoApellido}
              onChange={(e) => handleFieldChange("segundoApellido", e.target.value)}
              placeholder='Segundo apellido'
            />
          </div>
          <div className="mb-4 flex flex-wrap items-center justify-center text-center">
            <Image width={100} height={100} src="/images/logos/Icono_Correo_Blanco.png" alt="Email" className="mr-2 h-8 w-8 mt-2" />
            <label className="block text-gray-700 text-white text-xl font-bold">Email (*)</label>
            <input
              type="email"
              name="email"
              className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
              value={email}
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
              name="dni"
              value={dni} // Utiliza directamente el valor del estado 'league.dni'
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

export default FormularioNuevoEquipo;
