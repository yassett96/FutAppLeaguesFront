import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Select from "react-select";
import { obtenerUsuariosActivos } from '@/services/usuarioService';

const NewPlayerForm = ({ onFormChange, player }) => {
    const [datosUsuarios, setDatosUsuarios] = useState([]); // Lista de usuarios existentes
    const [opcionesUsuarios, setOpcionesUsuarios] = useState([]); // Usuario seleccionado
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        const fetchUsuariosActivos = async () => {
            const usuariosActivos = await obtenerUsuariosActivos();
            setDatosUsuarios(usuariosActivos);

            if (usuariosActivos) {
                const options = usuariosActivos.map((usuario) => ({
                    value: usuario.id_usuario,
                    label: `${usuario.correo} - ${usuario.primer_nombre} ${usuario.primer_apellido}`,
                }));
                setOpcionesUsuarios(options);
            }
        };

        fetchUsuariosActivos();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        // Llamar a onFormChange para actualizar el formData en el componente padre
        onFormChange({
            ...player,
            [name]: value, // Actualizar el campo correspondiente
        });
    };

    const handleUserChange = (selectedOption) => {
        const usuarioSeleccionado = datosUsuarios.find(
            (usuario) => usuario.id_usuario === selectedOption.value
        );

        if (usuarioSeleccionado) {
            // Actualizar todos los datos del usuario seleccionado
            onFormChange({
                primerNombre: usuarioSeleccionado.primer_nombre || '',
                segundoNombre: usuarioSeleccionado.segundo_nombre || '',
                primerApellido: usuarioSeleccionado.primer_apellido || '',
                segundoApellido: usuarioSeleccionado.segundo_apellido || '',
                email: usuarioSeleccionado.correo || '',
                dni: usuarioSeleccionado.dni || '',
                isSwitchActive: false,
                selectedUserId: selectedOption.value,
            });
        }

        setSelectedUser(selectedOption);
    };

    const handleSwitchNewPlayerChange = (e) => {
        const isActive = e.target.checked;
        // setIsSwitchNewPlayerActive(isActive);

        // Resetear valores si se activa el switch
        if (isActive) {
            onFormChange({
                primerNombre: '',
                segundoNombre: '',
                primerApellido: '',
                segundoApellido: '',
                email: '',
                dni: '',
                isSwitchActive: isActive,
                selectedUserId: null,
            });
        }
        onFormChange({ ...player, isSwitchActive: isActive });
    };

    return (
        <div className="p-4 mx-auto rounded-lg text-white text-shadow-lg max-w-xl">
            {/* Datos del jugador */}
            <div className="mb-4 flex flex-col items-center justify-center">
                <a className="text-white text-xl font-bold">Datos del jugador</a>
            </div>

            {/* Switch para nuevo usuario jugador */}
            <div className="flex items-center flex-col space-x-2">
                <span className="text-white text-xl font-medium">Nuevo usuario</span>
                <label className="relative inline-flex items-center cursor-pointer mt-2">
                    <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={player.isSwitchActive}
                        onChange={handleSwitchNewPlayerChange}
                    />
                    <div className="w-12 h-6 bg-gray-300 peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:bg-purple-500 peer-checked:shadow-lg transition-all duration-300"></div>
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-6"></div>
                </label>
            </div>
            <br />
            {!player.isSwitchActive ? (
                <>
                    <div className="mb-10 relative">
                        <label htmlFor="selectUsuario" className="text-xl font-bold text-white">
                            Buscar usuario:
                        </label>
                        <Select
                            className="w-full"
                            options={opcionesUsuarios}
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
                </>
            ) : (
                <>
                    {/* Primer Nombre */}
                    <div className="mb-4 flex flex-wrap items-center justify-center text-center">
                        <Image width={100} height={100} src="/images/logos/Icono_Nombres_Blanco.png" alt="First Name" className="mr-1 h-10 w-10 mt-2" />
                        <label className="text-xl font-bold w-full sm:w-auto">* Primer Nombre:</label>
                        <input
                            type="text"
                            name="primerNombre"
                            value={player.primerNombre}
                            onChange={handleInputChange}
                            className="border ml-2 p-2 rounded w-full sm:w-auto flex-1 mt-2 sm:mt-0 text-black"
                            placeholder="Primer nombre del jugador"
                        />
                    </div>

                    {/* Segundo Nombre */}
                    <div className="mb-4 flex flex-wrap items-center justify-center text-center">
                        <Image width={100} height={100} src="/images/logos/Icono_Nombres_Blanco.png" alt="Middle Name" className="mr-1 h-10 w-10 mt-2" />
                        <label className="text-xl font-bold w-full sm:w-auto">Segundo Nombre:</label>
                        <input
                            type="text"
                            name="segundoNombre"
                            value={player.segundoNombre || ''}
                            onChange={handleInputChange}
                            className="border ml-2 p-2 rounded w-full sm:w-auto flex-1 mt-2 sm:mt-0 text-black"
                            placeholder="Segundo nombre del jugador"
                        />
                    </div>

                    {/* Primer Apellido */}
                    <div className="mb-4 flex flex-wrap items-center justify-center text-center">
                        <Image width={100} height={100} src="/images/logos/Icono_Apellidos_Blanco.png" alt="First Last Name" className="mr-2 h-10 w-10 mt-2" />
                        <label className="text-xl font-bold w-full sm:w-auto">* Primer Apellido:</label>
                        <input
                            type="text"
                            name="primerApellido"
                            value={player.primerApellido || ''}
                            onChange={handleInputChange}
                            className="border ml-2 p-2 rounded w-full sm:w-auto flex-1 mt-2 sm:mt-0 text-black"
                            placeholder="Primer apellido del jugador"
                        />
                    </div>

                    {/* Segundo Apellido */}
                    <div className="mb-4 flex flex-wrap items-center justify-center text-center">
                        <Image width={100} height={100} src="/images/logos/Icono_Apellidos_Blanco.png" alt="Second Last Name" className="mr-2 h-10 w-10 mt-2" />
                        <label className="text-xl font-bold w-full sm:w-auto">Segundo Apellido:</label>
                        <input
                            type="text"
                            name="segundoApellido"
                            value={player.segundoApellido || ''}
                            onChange={handleInputChange}
                            className="border ml-2 p-2 rounded w-full sm:w-auto flex-1 mt-2 sm:mt-0 text-black"
                            placeholder="Segundo apellido del jugador"
                        />
                    </div>

                    {/* Correo */}
                    <div className="mb-4 flex flex-wrap items-center justify-center text-center">
                        <Image width={100} height={100} src="/images/logos/Icono_Correo_Blanco.png" alt="Email" className="mr-2 h-8 w-8 mt-2" />
                        <label className="text-xl font-bold w-full sm:w-auto">* Correo:</label>
                        <input
                            type="email"
                            name="correo"
                            value={player.correo || ''}
                            onChange={handleInputChange}
                            className={`border text-black ml-2 p-2 rounded w-full sm:w-auto flex-1 mt-2 sm:mt-0`}
                            placeholder="Correo del jugador"
                        />
                    </div>

                    {/* DNI */}
                    <div className="mb-4 flex flex-wrap items-center justify-center text-center">
                        <Image width={100} height={100} src="/images/logos/Icono_DNI_Blanco.png" alt="DNI" className="mr-2 h-10 w-10 mt-2" />
                        <label className="text-xl font-bold w-full sm:w-auto">* DNI:</label>
                        <input
                            type="text"
                            name="dni"
                            value={player.dni || ''}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                const value = e.target.value.replace(/[^A-Za-z0-9.\-]/g, ''); // Solo permite letras mayúsculas, números y guiones
                                handleInputChange({
                                    target: {
                                        name: e.target.name,
                                        value: value
                                    }
                                } as React.ChangeEvent<HTMLInputElement>); // Envía el evento con el valor filtrado
                            }}
                            className="border ml-2 p-2 rounded w-full sm:w-auto flex-1 mt-2 sm:mt-0 text-black"
                            placeholder="DNI del jugador"
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default NewPlayerForm;
