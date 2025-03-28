import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Select from "react-select";
import { obtenerJugadoresPorEquipoCategoria } from '@/services/jugadorService';
import MatchesGrid from './MatchesGrid';
import { obtenerPartidosPorLigaCategoriaYEquipo } from '@/services/partidoService';

const FormularioSancionado = ({ datosEquipos, onFormChange, idLigaCategoria }) => {
    const [equipoSeleccionado, setEquipoSeleccionado] = useState<any>(null);
    const [datosJugadores, setDatosJugadores] = useState<any>(null);
    const [datosPartidos, setDatosPartidos] = useState<any>(null);
    const [jugadorSeleccionado, setJugadorSeleccionado] = useState<any>(null);
    const [fechaSancion, setFechaSancion] = useState<string>('');
    const [comentario, setComentario] = useState<string>('');
    const [fechasSancionadas, setFechasSancionadas] = useState<number | ''>('');
    const opcionesEquipos = (datosEquipos || []).map((equipo: any) => ({
        value: equipo.id_equipo,
        label: equipo.nombre_equipo,
    }));
    const [isSwitchActive, setIsSwitchActive] = useState(false); // Controla si se activa la grid para vincular partido
    const [isSwitchActiveExpulsarJugador, setIsSwitchActiveExpulsarJugador] = useState(false);
    const [partidoSeleccionado, setPartidoSeleccionado] = useState(null);
    const [motivoExpulsion, setMotivoExpulsion] = useState('');
    const [expulsarJugador, setExpulsarJugador] = useState(false);

    const handlePartidoSeleccionado = (partido) => {
        setPartidoSeleccionado(partido);
        notifyChange({ partidoSeleccionado: partido }); // Actualiza el padre
    };

    const notifyChange = useCallback((newData: any) => {
        // Pasar el estado actualizado al componente padre conservando los valores anteriores
        onFormChange && onFormChange((prevData: any) => ({
            ...prevData,
            equipoSeleccionado,
            jugadorSeleccionado,
            fechaSancion,
            fechasSancionadas,
            comentario,
            motivoExpulsion,
            ...newData,
        }));
    }, [comentario, equipoSeleccionado, fechaSancion, fechasSancionadas, jugadorSeleccionado, onFormChange, motivoExpulsion]);

    useEffect(() => {
        // Obtener la fecha actual
        const hoy = new Date();
        const formatoFecha = hoy.toISOString().split('T')[0];
        setFechaSancion(formatoFecha);
        notifyChange({ fechaActual: formatoFecha });
    }, [notifyChange]);

    // Función para manejar el cambio de selección
    const handleEquipoChange = async (option: any) => {
        const idEquipo = option.value;
        setJugadorSeleccionado(null);

        // Buscar el equipo seleccionado en los datos
        const equipo = datosEquipos.find((eq) => eq.id_equipo === idEquipo);
        setEquipoSeleccionado(equipo);
        await obtenerPartidos(equipo.id_equipo);

        // Obtener los jugadores del equipo seleccionado
        try {
            const response = await obtenerJugadoresPorEquipoCategoria(equipo.id_equipo_categoria);
            const jugadores = response.data || [];

            // Mapea jugadores a la estructura esperada por react-select
            const opcionesJugadores = jugadores.map((jugador: any) => ({
                value: jugador.id_jugador, // Aquí se asigna el ID del jugador
                label: jugador.primer_nombre + " " + jugador.primer_apellido, // Aquí el nombre del jugador
            }));
            setDatosJugadores(opcionesJugadores); // Guarda opciones formateadas            
        } catch (error) {
            console.error("Error al obtener jugadores:", error);
            setDatosJugadores([]);
        }

        notifyChange({ equipoSeleccionado: equipo });
    };

    const obtenerPartidos = async (idEquipo: number) => {
        try {
            const partidos = await obtenerPartidosPorLigaCategoriaYEquipo(idLigaCategoria, idEquipo);
            setDatosPartidos(partidos.data);
        } catch (error) {
            console.error("Error al obtener partidos:", error);
            setDatosPartidos([]);
        }
    };

    // Función para cuando se necesita vincular un partido
    const handleSwitchExpulsarJugador = async (event: any) => {
        setIsSwitchActiveExpulsarJugador(event);
        setExpulsarJugador(event);
        notifyChange({ expulsarJugador: event });
    };

    return (
        <div className="flex flex-col mx-auto p-4 rounded-lg text-shadow-lg font-bold text-white">
            {/* Equipo */}
            <div className="flex flex-col sm:flex-row items-center mb-4">
                <div className="flex items-center justify-center w-full sm:w-1/4 mb-2 sm:mb-0">
                    <Image src="/images/logos/Icono_Equipo_Blanco.png" alt="Ícono de Equipo" className="mr-2 w-9 sm750:w-11 h-9 sm750:h-11" width={100} height={100} />
                    <label htmlFor="equipo" className="text-white text-xl sm590:text-2xl">Equipo:</label>
                </div>
                {datosEquipos ? (
                    <Select
                        className="w-full text-sm sm590:text-2xl"
                        options={opcionesEquipos}
                        value={opcionesEquipos.find((op) => op.value === equipoSeleccionado?.id_equipo) || null}
                        onChange={(option) => handleEquipoChange(option)}
                        isSearchable
                        placeholder="Escribe el nombre del equipo para buscar"
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
                ) : (
                    <p>Cargando equipos...</p>
                )}
            </div>

            {/* Jugador */}
            <div className="flex flex-col sm:flex-row items-center mb-4">
                <div className="flex items-center justify-center w-full sm:w-1/4 mb-2 sm:mb-0">
                    <Image src="/images/logos/Icono_Categoria_Blanco.png" alt="Ícono de Jugador" className="mr-2 w-9 sm750:w-11 h-9 sm750:h-11" width={100} height={100} />
                    <label htmlFor="jugador" className="text-white text-xl sm590:text-2xl">Jugador:</label>
                </div>

                {datosJugadores ? (
                    <Select
                        className="w-full text-sm sm590:text-2xl"
                        options={datosJugadores}
                        value={jugadorSeleccionado}
                        onChange={(option) => {
                            setJugadorSeleccionado(option);
                            notifyChange({ jugadorSeleccionado: option });
                        }}
                        isSearchable
                        placeholder="Escribe el nombre del jugador del equipo seleccinado para buscar"
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
                ) : (
                    <Select
                        className="w-full text-sm sm590:text-2xl"
                        placeholder="¡Primero elije un equipo!"
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
                )}
            </div>

            {isSwitchActive ? (
                <MatchesGrid partidos={datosPartidos || []} onPartidoSeleccionado={handlePartidoSeleccionado} />
            ) : (
                <></>
            )}


            {/* Fecha de sanción */}
            <div className="flex flex-col sm:flex-row items-center mb-4">
                <div className="flex items-center justify-center w-full sm:w-1/4 mb-2 sm:mb-0">
                    <Image src="/images/logos/Icono_Calendario_Blanco.png" alt="Ícono de Fecha de Sanción" className="mr-2 w-9 sm750:w-11 h-9 sm750:h-11" width={100} height={100} />
                    <label className="text-white text-xl sm590:text-2xl">Fecha sanción:</label>
                </div>
                <input
                    type="date"
                    id="fecha"
                    name="fecha"
                    className="w-full sm:w-3/4 border border-gray-300 rounded-md p-2 text-black text-sm sm590:text-2xl"
                    value={fechaSancion}
                    onChange={(e) => setFechaSancion(e.target.value)}
                />
            </div>

            {/* Switch para expulsar jugador */}
            <div className="flex items-center flex-col space-x-2 mb-[15px]">
                <span className="text-white text-xl sm590:text-2xl text-center font-medium">Expulsión permanente de la liga</span>
                <label className="relative inline-flex items-center cursor-pointer mt-2">
                    <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={isSwitchActiveExpulsarJugador}
                        onChange={(e) => handleSwitchExpulsarJugador(e.target.checked)}
                    />
                    <div className="w-12 h-6 bg-gray-300 peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:bg-purple-500 peer-checked:shadow-lg transition-all duration-300"></div>
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-6"></div>
                </label>
            </div>

            {isSwitchActiveExpulsarJugador ? (
                <>
                    {/* Campo de Motivo de Expulsión */}
                    <div className="flex flex-col items-center space-y-2 mt-5">
                        <label htmlFor="motivo-expulsion" className="text-white text-xl sm590:text-2xl font-bold">
                            Motivo expulsión
                        </label>
                        <textarea
                            id="motivo-expulsion"
                            name="motivo-expulsion"
                            className="w-[80%] p-2 rounded-md border border-gray-300 text-black text-sm sm590:text-2xl"
                            placeholder="Escribe el motivo de la expulsión aquí..."
                            value={motivoExpulsion}
                            onChange={(e) => {
                                setMotivoExpulsion(e.target.value);
                                notifyChange({ motivoExpulsion: e.target.value });
                            }}
                        />
                    </div>
                </>
            ) : (
                <>
                    {/* Fechas sancionadas */}
                    <div className="flex flex-col sm:flex-row items-center mb-4">
                        <div className="flex items-center justify-center w-full sm:w-1/4 mb-2 sm:mb-0">
                            <Image src="/images/logos/Icono_Fecha_blanco.png" alt="Ícono de Fechas Sancionadas" className="mr-2 w-9 sm750:w-11 h-9 sm750:h-11" width={100} height={100} />
                            <label className="text-white text-xl sm590:text-2xl text-center">Fechas sancionadas:</label>
                        </div>
                        <input
                            type="number"
                            id="fechas_sancionadas"
                            name="fechas_sancionadas"
                            className="w-full sm:w-3/4 border border-gray-300 rounded-md p-2 text-black text-sm sm590:text-2xl"
                            value={fechasSancionadas}
                            onChange={(e) => {
                                const nuevasFechas = e.target.value === '' ? '' : parseInt(e.target.value, 10);
                                setFechasSancionadas(nuevasFechas);
                                notifyChange({ fechasSancionadas: nuevasFechas }); // Pasar el valor actualizado
                            }}
                        />
                    </div>

                    {/* Comentario del comité disciplinario */}
                    <div className="flex flex-col sm:flex-row items-center mb-4">
                        <div className="flex items-center justify-center w-full sm:w-1/4 mb-2 sm:mb-0">
                            <Image src="/images/logos/Icono_Comment_Blanco.png" alt="Ícono de Fechas Sancionadas" className="mr-2 w-9 sm750:w-11 h-9 sm750:h-11" width={100} height={100} />
                            <label className="text-white text-xl sm590:text-2xl">Comentario:</label>
                        </div>
                        <textarea
                            id="comentario"
                            name="comentario"
                            className="w-full sm:w-3/4 border border-gray-300 rounded-md p-2 text-black h-20 text-sm sm590:text-2xl"
                            style={{ textAlign: 'start', verticalAlign: 'top' }}
                            value={comentario}
                            onChange={(e) => {
                                const nuevoComentario = e.target.value;
                                setComentario(nuevoComentario);
                                notifyChange({ comentario: nuevoComentario });
                            }}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default FormularioSancionado;