"use client";
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Select from "react-select";

const LeagueForm = ({ onFormChange, usuariosActivos, ligaSeleccionada }) => {
  const [primerNombre, setPrimerNombre] = useState('');
  const [segundoNombre, setSegundoNombre] = useState('');
  const [primerApellido, setPrimerApellido] = useState('');
  const [segundoApellido, setSegundoApellido] = useState('');
  const [email, setEmail] = useState('');
  const [dni, setDni] = useState('');
  const [isCodeLeagueActive, setIsCodeLeagueActive] = useState(false); // Controla si se activa el código de liga
  const [league, setLeague] = useState({
    id_liga: 0,
    id_usuario_admin: 0,
    nombre: '',
    logo: '/images/logos/Icono_Foto.png',
    descripcion: '',
    isCodeLeagueActive: ligaSeleccionada.codigo_liga,
  });

  const [isSwitchActive, setIsSwitchActive] = useState(false); // Controla si se activa el formulario para nuevo usuario
  const [usuarios, setUsuarios] = useState([]); // Lista de usuarios existentes
  const [selectedUserId, setSelectedUserId] = useState(""); // Usuario seleccionado
  const [selectedUser, setSelectedUser] = useState(null);

  // Guardamos la función en un ref para usar siempre la misma referencia
  const onFormChangeRef = useRef(onFormChange);
  onFormChangeRef.current = onFormChange; // Actualizamos el ref en cada render si es necesario

  useEffect(() => {
    if (usuariosActivos) {
      const options = usuariosActivos.map((usuario) => ({
        value: usuario.id_usuario,
        label: `${usuario.correo} - ${usuario.primer_nombre} ${usuario.primer_apellido}`,
      }));
      setUsuarios(options);
    }
  }, [usuariosActivos]);

  // Sincronizar datos de ligaSeleccionada con los estados
  useEffect(() => {
    if (ligaSeleccionada) {
      setPrimerNombre(ligaSeleccionada.primer_nombre || "");
      setSegundoNombre(ligaSeleccionada.segundo_nombre || "");
      setPrimerApellido(ligaSeleccionada.primer_apellido || "");
      setSegundoApellido(ligaSeleccionada.segundo_apellido || "");
      setEmail(ligaSeleccionada.correo || "");
      setDni(ligaSeleccionada.dni || "");
      setIsCodeLeagueActive(ligaSeleccionada.codigo_liga);
      setLeague({
        id_liga: ligaSeleccionada.id_liga,
        id_usuario_admin: ligaSeleccionada.id_usuario_admin || 0,
        nombre: ligaSeleccionada.nombre_liga || "",
        logo: ligaSeleccionada.logo || "/images/logos/Icono_Foto.png",
        isCodeLeagueActive: ligaSeleccionada.codigo_liga,
        descripcion: ligaSeleccionada.descripcion || "",
      });
      setSelectedUserId(ligaSeleccionada.id_usuario_admin || "");
      setSelectedUser(
        usuarios.find((user) => user.value === ligaSeleccionada.id_usuario_admin) || null
      );
    }
  }, [ligaSeleccionada, usuarios]);

  useEffect(() => {
    onFormChangeRef.current({
      primerNombre,
      segundoNombre,
      primerApellido,
      segundoApellido,
      email,
      dni,
      league,
      isSwitchActive,
      selectedUserId,
    });
  }, [
    primerNombre,
    segundoNombre,
    primerApellido,
    segundoApellido,
    email,
    dni,
    league,
    isSwitchActive,
    selectedUserId,
  ]);

  const handleInputChange = (e) => {
    // const { name, value } = e.target;
    // setLeague({ ...league, [name]: value });
    const { name, type, value, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    if(name === 'isCodeLeagueActive'){
      setIsCodeLeagueActive(newValue);
    }
    setLeague({ ...league, [name]: newValue });
  };

  const fileInputRef = useRef(null);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        if (typeof result === 'string') {
          setLeague({ ...league, logo: result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoClick = () => {
    fileInputRef.current.click();
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
      league,
      isSwitchActive,
      selectedUserId: selectedOption.value,
    });
  };

  const handleNuevoAdministrador = (checked: any) => {
    setPrimerNombre('');
    setPrimerApellido('');
    setIsSwitchActive(checked);
  };

  return (
    <div className="p-4 mx-auto rounded-lg opacity-90 text-white text-shadow-lg w-full max-w-4xl">
      {/* League form */}
      <div className="mb-4 flex flex-col items-center">
        <div className="flex flex-col items-center mb-2">
          <Image
            src="/images/logos/Icono_Liga_Blanco.png"
            alt="Name"
            className="h-10 w-10"
            width={100}
            height={100}
          />
          <label className="text-xl font-bold mt-2">Nombre:</label>
        </div>
        <input
          type="text"
          name="nombre"
          value={league.nombre}
          onChange={handleInputChange}
          className="border p-2 rounded text-shadow-default text-black w-full"
          placeholder="Nombre de la liga"
        />
      </div>

      {/* Logo */}
      <div className="mb-4 flex flex-col items-center">
        <div className="flex flex-col items-center mb-2">
          <Image
            src="/images/logos/Icono_Foto2_Blanco.png"
            alt="Photo"
            className="h-10 w-10"
            width={100}
            height={100}
          />
          <label className="text-xl font-bold mt-2">Logo:</label>
        </div>
        <div
          className="border p-2 rounded w-32 h-32 flex items-center justify-center bg-gray-200 cursor-pointer"
          onClick={handlePhotoClick}
        >
          {league.logo ? (
            <Image
              src={league.logo || ''}
              alt="Player"
              className="w-full h-full object-cover"
              width={100}
              height={100}
            />
          ) : (
            <span className="text-gray-500">No image</span>
          )}
        </div>
        <input
          type="file"
          accept=".jpeg"
          onChange={handlePhotoChange}
          ref={fileInputRef}
          className="hidden"
        />
      </div>

      {/* Descripción */}
      <div className="flex flex-col items-center mb-4">
        <div className="flex flex-col items-center mb-2">
          <Image
            src="/images/logos/Icono_Descripcion_Blanco.png"
            alt="Descripcion"
            className="h-10 w-10"
            width={100}
            height={100}
          />
          <label className="text-xl font-bold mt-2">Descripción:</label>
        </div>
        <textarea
          name="descripcion"
          value={league.descripcion}
          onChange={handleInputChange}
          className="border p-2 rounded text-shadow-default text-black w-full h-[150px]"
          placeholder="Descripción de la liga"
        />
      </div>

      {/* Switch para habilitar si es existe código de liga */}
      <div className="flex items-center flex-col space-x-2">
        <span className="text-white text-xl font-medium">Código Liga</span>
        <label className="relative inline-flex items-center cursor-pointer mt-2">
          <input
            name="isCodeLeagueActive"
            type="checkbox"
            className="sr-only peer"
            checked={isCodeLeagueActive}
            onChange={(e) => handleInputChange(e)}
          />
          <div className="w-12 h-6 bg-gray-300 peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:bg-purple-500 peer-checked:shadow-lg transition-all duration-300"></div>
          <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-6"></div>
        </label>
      </div>
      <br/>
      {/* Datos del administrador */}
      <div className="mb-4 flex flex-col items-center justify-center">
        <a className="text-center text-white text-xl font-bold">Datos del administrador de la liga</a>
      </div>

      {/* Switch para nuevo administrador */}
      <div className="flex items-center flex-col space-x-2">
        <span className="text-white text-xl font-medium">Nuevo administrador</span>
        <label className="relative inline-flex items-center cursor-pointer mt-2">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={isSwitchActive}
            // onChange={(e) => setIsSwitchActive(e.target.checked)}
            onChange={(e) => handleNuevoAdministrador(e.target.checked)}
          />
          <div className="w-12 h-6 bg-gray-300 peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:bg-purple-500 peer-checked:shadow-lg transition-all duration-300"></div>
          <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-6"></div>
        </label>
      </div>

      {/* Selectbox o formulario según el switch */}
      {!isSwitchActive ? (
        <div className="mb-10 relative">
          <label htmlFor="selectUsuario" className="text-xl font-bold text-white">
            Buscar Usuario Existente:
          </label>
          <Select
            className="w-full z-50"
            options={usuarios}
            value={selectedUser}
            onChange={handleUserChange}
            isSearchable
            placeholder="Escribe para buscar..."
            menuPortalTarget={document.body} // Renderiza el menú en el body
            styles={{
              menuPortal: (base) => ({ ...base, zIndex: 9999 }), // Asegura un z-index alto
              menu: (base) => ({
                ...base,
                maxHeight: '108px', // Limita la altura del menú
                overflowY: 'auto',  // Permite el scroll si excede la altura máxima
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
              onChange={(e) => setPrimerNombre(e.target.value)}
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
              onChange={(e) => setSegundoNombre(e.target.value)}
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
              onChange={(e) => setPrimerApellido(e.target.value)}
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
              onChange={(e) => setSegundoApellido(e.target.value)}
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
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const value = e.target.value.replace(/[^A-Za-z0-9.\-]/g, '');
                setDni(value)
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

export default LeagueForm;
