import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Select from "react-select";
import { obtenerJugadoresPorEquipoCategoria } from '@/services/jugadorService';
import EventsGrid from './EventsGrid';
import Comments from './Comments';
import { obtenerPartidosPorLigaCategoriaYEquipo } from '@/services/partidoService';
import { obtenerEventosPorPartido } from '@/services/eventoService';
import { RingLoader } from 'react-spinners';
import { obtenerDetallesPartido } from '@/services/partidoService';

const FormularioSancionado = ({ datosEquipos, onFormChange, idLigaCategoria, datosIniciales }) => {
    const [equipoSeleccionado, setEquipoSeleccionado] = useState(datosIniciales.equipoSeleccionado || null);
    const [datosJugadores, setDatosJugadores] = useState<any>(null);
    const [datosPartidos, setDatosPartidos] = useState<any>(null);
    const [jugadorSeleccionado, setJugadorSeleccionado] = useState(datosIniciales.jugadorSeleccionado || null);
    const [fechaSancion, setFechaSancion] = useState(datosIniciales.fechaSancion || new Date().toISOString().split('T')[0]);
    const [comentario, setComentario] = useState(datosIniciales.comentario || '');
    const [fechasSancionadas, setFechasSancionadas] = useState(datosIniciales.fechasSancionadas || '');
    const opcionesEquipos = (datosEquipos || []).map((equipo: any) => ({
        value: equipo.id_equipo,
        label: equipo.nombre_equipo,
    }));
    const [isSwitchActiveVincularPartido, setIsSwitchActiveVincularPartido] = useState(false);
    const [isSwitchActiveExpulsarJugador, setIsSwitchActiveExpulsarJugador] = useState(false);
    const [motivoExpulsion, setMotivoExpulsion] = useState('');
    const [expulsarJugador, setExpulsarJugador] = useState(false);
    const [partidoSeleccionado, setPartidoSeleccionado] = useState(null);
    const [idPartido, setIdPartido] = useState(datosIniciales.id_partido || null);
    const [partidoData, setPartidoData] = useState({
        equipo_local: "",
        equipo_visitante: "",
        goles_local: 0,
        goles_visitante: 0,
        resultado_local: 0,
        resultado_visitante: 0,
        amonestaciones_local: "No amonestaciones",
        amonestaciones_visitante: "No amonestaciones",
        lesiones_local: "No lesiones",
        lesiones_visitante: "No lesiones",
        comentario_arbitro: "Sin comentarios del árbitro",
        comentario_capitan_local: "Sin comentarios",
        comentario_capitan_visitante: "Sin comentarios",
    });
    const [tipoExpulsionSeleccionado, setTipoExpulsionSeleccionado] = useState('torneo');
    const [datosEventos, setDatosEventos] = useState<any>([]);
    const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const cargarDatosIniciales = async () => {
            setIsLoading(true);
            if (!datosIniciales || !Array.isArray(datosEquipos) || datosEquipos.length === 0) return;

            // Solo ejecutar si el equipo seleccionado aún no ha sido configurado
            if (!equipoSeleccionado) {
                setFechaSancion(
                    datosIniciales.fecha_sancion && datosIniciales.fecha_sancion !== ''
                        ? datosIniciales.fecha_sancion.split('T')[0]
                        : new Date().toISOString().split('T')[0]
                );
                setFechasSancionadas(datosIniciales.fechas_sancionadas || '');
                setComentario(datosIniciales.comentario || '');

                const equipoEncontrado = datosEquipos.find(
                    (eq: any) => eq.nombre_equipo === datosIniciales.equipo
                );
                if (equipoEncontrado && !equipoSeleccionado) {  // Evita actualizar el estado si ya está seleccionado
                    setEquipoSeleccionado(equipoEncontrado);
                }

                const consultaDatosEventos = await obtenerEventosPorPartido(Number(idPartido));
                setDatosEventos(consultaDatosEventos);

                // Obtener los detalles del partido
                const detallesP = await obtenerDetallesPartido(Number(idPartido));

                // Actualizar estado local para los datos del partido
                if (detallesP) {
                    setPartidoData({
                        equipo_local: detallesP.equipo_local ?? "",
                        equipo_visitante: detallesP.equipo_visitante ?? "",
                        goles_local: 0,
                        goles_visitante: 0,
                        resultado_local: detallesP.resultado_local ?? "",
                        resultado_visitante: detallesP.resultado_visitante ?? "",
                        amonestaciones_local: detallesP.amonestaciones_local ?? "No amonestaciones",
                        amonestaciones_visitante: detallesP.amonestaciones_visitante ?? "No amonestaciones",
                        lesiones_local: detallesP.lesiones_local ?? "No lesiones",
                        lesiones_visitante: detallesP.lesiones_visitante ?? "No lesiones",
                        comentario_arbitro: detallesP.comentario_arbitro ?? "Sin comentarios del árbitro",
                        comentario_capitan_local: detallesP.comentario_capitan_local ?? "Sin comentarios",
                        comentario_capitan_visitante: detallesP.comentario_capitan_visitante ?? "Sin comentarios",
                    });
                }
                setIsLoading(false);
            }
            setIsLoading(false);
        };

        cargarDatosIniciales();
    }, [datosIniciales, datosEquipos, equipoSeleccionado, idPartido]);

    useEffect(() => {
        if (!equipoSeleccionado) return; // Evita ejecución si no hay equipo seleccionado

        // Ahora este useEffect solo se ejecuta después de que equipoSeleccionado cambie
        const cargarJugadoresYPartidos = async () => {
            try {
                const response = await obtenerJugadoresPorEquipoCategoria(equipoSeleccionado.id_equipo_categoria);
                const jugadores = response.data || [];
                const opcionesJugadores = jugadores.map((jugador: any) => ({
                    value: jugador.id_jugador,
                    label: `${jugador.primer_nombre} ${jugador.primer_apellido}`,
                }));
                setDatosJugadores(opcionesJugadores);

                // Preseleccionar jugador
                if (datosIniciales.id_jugador) {
                    const jugadorSeleccionadoInicial = opcionesJugadores.find(
                        (j: any) => j.value === datosIniciales.id_jugador
                    );
                    setJugadorSeleccionado(jugadorSeleccionadoInicial || null);
                }

                // Obtener partidos y preseleccionar partido
                if (datosIniciales.id_partido) {
                    const responsePartidos = await obtenerPartidosPorLigaCategoriaYEquipo(
                        idLigaCategoria,
                        equipoSeleccionado.id_equipo
                    );
                    const partidos = responsePartidos.data || [];
                    setDatosPartidos(partidos);

                    const partidoSeleccionadoInicial = partidos.find(
                        (p: any) => p.id_partido === datosIniciales.id_partido
                    );
                    if (partidoSeleccionadoInicial) {
                        setPartidoSeleccionado(partidoSeleccionadoInicial);
                        setIsSwitchActiveVincularPartido(true);
                    }
                }
            } catch (error) {
                console.error("Error al obtener datos:", error);
                setDatosJugadores([]);
                setDatosPartidos([]);
            }
        };

        cargarJugadoresYPartidos();
    }, [equipoSeleccionado, datosIniciales, idLigaCategoria]);


    const notifyChange = (campoActualizado: Partial<any>) => {
        onFormChange({
            id_sancion: datosIniciales.id_sancion,
            equipoSeleccionado,
            jugadorSeleccionado,
            fechaSancion,
            fechasSancionadas,
            comentario,
            partidoSeleccionado,
            expulsarJugador,
            tipoExpulsionSeleccionado,
            motivoExpulsion,
            ...campoActualizado, // Sobrescribe solo el campo cambiado
        });
    };

    // Función para cuando se necesita vincular un partido
    const handleSwitchExpulsarJugador = async (event: any) => {
        setIsSwitchActiveExpulsarJugador(event);
        setExpulsarJugador(event);
        notifyChange({ expulsarJugador: event });
    };

    return (
        <div className="flex flex-col w-full mx-auto p-0 xs360:p-4 rounded-lg text-shadow-lg font-bold text-white">
            <br/>
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
                        onChange={(option) => {
                            const equipo = datosEquipos.find((eq) => eq.id_equipo === option.value);
                            setEquipoSeleccionado(equipo);
                            notifyChange({ equipoSeleccionado: equipo }); // Pasar el valor actualizado
                        }}
                        isSearchable
                        isDisabled={true}
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
                    onChange={(e) => {
                        const nuevaFecha = e.target.value;
                        setFechaSancion(nuevaFecha);
                        notifyChange({ fechaSancion: nuevaFecha });
                    }}
                />
            </div>

            {/* {isSwitchActiveVincularPartido ? (
                <>
                    <div className="w-full flex items-center justify-center">
                        <Comments title={`Comentarios árbitros`} comments={partidoData.comentario_arbitro} icon='/images/logos/Icono_Arbitro_Blanco.png' />
                    </div>

                    <div className="w-full flex items-center justify-center">
                        <Comments title={`Comentarios capitán ${partidoData.equipo_local}`} comments={partidoData.comentario_capitan_local} icon='/images/logos/Icono_Escudo_1_Blanco.png' />
                    </div>

                    <div className="w-full flex items-center justify-center">
                        <Comments title={`Comentarios capitán ${partidoData.equipo_visitante}`} comments={partidoData.comentario_capitan_visitante} icon='/images/logos/Icono_Escudo_2_Blanco.png' />
                    </div>
                    <br />
                    <div className="flex-grow w-full">
                        <EventsGrid events={datosEventos} onSelectedRow={setSelectedEventId} />
                    </div>
                </>
            ) : (
                <></>
            )}             */}

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
                            <label className="text-white text-center text-xl sm590:text-2xl">Fechas sancionadas:</label>
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
            {/* Animación de carga */}
            {isLoading && (
                <div
                    style={{
                        position: 'fixed',
                        top: '0',
                        left: '0',
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Fondo semitransparente
                        zIndex: '9999', // Para asegurarse de que se muestre sobre otros elementos
                    }}
                    className="flex items-center justify-center"
                >
                    <RingLoader color="#007bff" />
                </div>
            )}
        </div>
    );
};

export default FormularioSancionado;