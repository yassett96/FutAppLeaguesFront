"use client";
import React, { Suspense, useState, useEffect, useRef } from 'react';
import SideBar from '@/components/components_generics/side_bar/SideBar';
import SearchBar from '@/components/components_generics/search_bar/SearchBar';
import Footer from '@/components/components_generics/footer/Footer';
import TitleWithImages from '@/components/components_generics/title_with_images/TitleWithImages';
import SelectTournament from '@/components/user/player/team/SelectTournament';
import SelectCategory from '@/components/user/player/team/SelectCategory';
import TeamBadge from '@/components/user/player/team/TeamBadge';
import CurrentPosition from '@/components/user/player/team/CurrentPosition';
import StatsRow1 from '@/components/user/player/team/StatsRow1';
import StatsRow2 from '@/components/user/player/team/StatsRow2';
import StatsRow3 from '@/components/user/player/team/StatsRow3';
import EvolutionChart from '@/components/user/player/team/EvolutionChart';
import { RingLoader } from 'react-spinners';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { menuOptionsJugador, menuOptionsDelegado } from '@/components/components_generics/footer/menu_options/MenuOptions';
import { obtenerDatosUsuario } from '@/services/usuarioService';
import { obtenerDatosJugadorPorUsuario, obtenerTorneosPorJugador } from '@/services/jugadorService';
import { obtenerCategoriasPorTorneoYJugador, obtenerTorneosSegunIdEquipoCategoriaIdJugadorIdLiga } from '@/services/torneoService';
import { obtenerDatosLigaSegunIdJugador } from '@/services/ligaService';
import { obtenerEvolucionPosicion, obtenerInfoEquiposSegunIdJugadorIdLiga, obtenerInfoEquipoSegunIdTorneoCategoriaIdEquipoIdLiga } from '@/services/equipoService';
import CustomAlert from '@/components/components_generics/custom_alert/CustomAlert';
import SelectLeague from '@/components/user/player/team/SelectLeague';
import SelectTeam from '@/components/user/player/team/SelectTeam';

interface MiEquipoProps {
    userRole: string;
}

const MiEquipo: React.FC<MiEquipoProps> = ({ userRole }) => {
    return (
        <div className="min-h-screen bg-cream-faf9f6 text-black text-shadow-lg">
            <Suspense fallback={<div>Loading...</div>}>
                <InnerEquipoJugador userRole={userRole} />
            </Suspense>
        </div>
    );
};

interface Categoria {
    id: number;
    nombre: string;
}

const InnerEquipoJugador: React.FC<MiEquipoProps> = ({ userRole }) => {
    const [selectedTournament, setSelectedTournament] = useState<number | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const searchParams = useSearchParams();
    const [isOpen, setIsOpen] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [datosUsuario, setDatosUsuario] = useState<any>(null);
    const [datosJugador, setDatosJugador] = useState<any>(null);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [infoEquipo, setInfoEquipo] = useState<any>(null);
    // Para los datos de la evolución del equipo
    const [fechas, setFechas] = useState<string[]>([]);
    const [posiciones, setPosiciones] = useState<number[]>([]);

    // Para mostrar los campos de selección
    const [showSelectTorneo, setShowSelectTorneo] = useState(false);
    const [showSelectCategoria, setShowSelectCategoria] = useState(false);
    const [ligaJugadorSeleccionada, setLigaJugadorSeleccionada] = useState<any | null>(null);
    const [showLigas, setShowLigas] = useState(false);
    const [showEquipos, setShowEquipos] = useState(false);
    const [showTorneos, setShowTorneos] = useState(false);
    const [selectedLeague, setSelectedLeague] = useState<number | null>(null);
    const [datosLigas, setDatosLigas] = useState<any>(null);
    const [datosEquipos, setDatosEquipos] = useState<any>(null);
    const [datosTorneos, setDatosTorneos] = useState<any[]>([]);
    const [nombreLiga, setNombreLiga] = useState<any>(null);
    const [nombreEquipo, setNombreEquipo] = useState<any>(null);
    const [nombreTorneo, setNombreTorneo] = useState<any>(null);
    const [equipoSeleccionado, setEquipoSeleccionado] = useState(null);
    const [torneoSeleccionado, setTorneoSeleccionado] = useState(null);
    const [showAlertCustom, setShowAlertCustom] = useState(false);
    const [messageAlertCustom, setMessageAlertCustom] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    // const userRole = searchParams.get('role');

    // Ref para almacenar la propiedad id_equipo_categoria
    const equipoCategoriaRef = useRef(null);

    useEffect(() => {
        if (equipoSeleccionado && equipoSeleccionado.id_equipo_categoria) {
            equipoCategoriaRef.current = equipoSeleccionado.id_equipo_categoria;
        }
    }, [equipoSeleccionado]);

    useEffect(() => {
        const fetchDatos = async () => {
            try {
                setIsLoading(true);
                // Obtener datos del usuario
                const datosUsuario = await obtenerDatosUsuario();
                setDatosUsuario(datosUsuario);

                // Obtener datos del jugador según el ID del usuario
                const datosJugador = await obtenerDatosJugadorPorUsuario(datosUsuario.id_usuario);
                setDatosJugador(datosJugador);

                // Si el jugador no está verificado, redirigir al inicio
                if (!datosJugador.verificado) {
                    if (process.env.NODE_ENV === 'production') {
                        router.push(`/user/player/initiation_dni_player.html?role=${userRole}`);
                    } else {
                        router.push(`/user/player/initiation_dni_player/?role=${userRole}`);
                    }
                    // router.push(`/user/player/profile/?role=${userRole}`);
                }

                const datosLiga = await obtenerDatosLigaSegunIdJugador(datosJugador.id_jugador);

                if (datosLiga.length > 0) {
                    if (datosLiga.length === 1) {
                        setLigaJugadorSeleccionada(datosLiga[0]);
                        setSelectedLeague(datosLiga[0].id_liga);
                        setDatosLigas(datosLiga);
                        const codigoLigaNumero = Number(datosLiga[0].Liga.codigo_liga); // Para convertir el "0" a 0
                        setNombreLiga(datosLiga[0].Liga.nombre);

                        // Obtenemos los datos de los equipos a los que pertenece el Jugador
                        const datosEquipos = await obtenerInfoEquiposSegunIdJugadorIdLiga(datosLiga[0].id_liga, datosJugador.id_jugador);
                        const datosEquiposArray = Array.isArray(datosEquipos) ? datosEquipos : [datosEquipos];
                        setDatosEquipos(datosEquiposArray);

                        if (datosEquiposArray.length >= 1) {
                            if (datosEquiposArray.length === 1) {
                                const id_equipo_categoria = datosEquiposArray[0].id_equipo_categoria;
                                setEquipoSeleccionado(datosEquiposArray[0]);
                                setNombreEquipo(datosEquiposArray[0].nombre_equipo);

                                // Obtenemos los torneos a los que pertenece el equipo
                                const datosTorneos = await obtenerTorneosSegunIdEquipoCategoriaIdJugadorIdLiga(id_equipo_categoria, datosJugador.id_jugador, datosLiga[0].id_liga);
                                const datosTorneosArray = Array.isArray(datosTorneos) ? datosTorneos : [datosTorneos];
                                setDatosTorneos(datosTorneosArray);

                                if (datosTorneosArray.length > 0) {
                                    if (datosTorneosArray.length === 1) {
                                        setTorneoSeleccionado(datosTorneosArray[0]);
                                        setNombreTorneo(datosTorneosArray[0].nombre);

                                        setIsLoading(true);

                                        try {
                                            const infoEquipo = await obtenerInfoEquipoSegunIdTorneoCategoriaIdEquipoIdLiga(selectedLeague, datosTorneosArray[0].id_torneo_categoria, equipoCategoriaRef.current, datosJugador.id_jugador);

                                            setSelectedTournament(datosTorneosArray[0].id_torneo_categoria);
                                            setInfoEquipo(infoEquipo);

                                            const data = await obtenerEvolucionPosicion(infoEquipo.id_equipo_categoria, infoEquipo.id_torneo_categoria);

                                            // Forzar a que `data` siempre sea un array, incluso si es un solo objeto
                                            const dataArray = Array.isArray(data) ? data : [data];
                                            const fechas = dataArray.map((item) => item.fecha);
                                            const posiciones = dataArray.map((item) => item.posicion_actual);

                                            setFechas(fechas);
                                            setPosiciones(posiciones);

                                        } catch (error) {
                                            console.error('Error al obtener información del equipo:', error);
                                        }
                                        setIsLoading(false);

                                    } else {
                                        setShowTorneos(true);
                                    }
                                } else {
                                    alert("¡El equipo aún no está asignado a ninguna liga, esperar ser asignada a una para ver los detalles de su equipo!");
                                    setMessageAlertCustom("¡El equipo aún no está asignado a ninguna liga, esperar ser asignada a una para ver los detalles de su equipo!");
                                    setShowAlertCustom(true);
                                }
                            } else {
                                setShowEquipos(true);
                            }

                        } else {
                            // setMessageAlertCustom("¡Este jugador no está asignado a ningún equipo, revisar o avisar a contacto FutAppLeagues!");
                            // setShowAlertCustom(true);
                            alert("¡Este jugador no está asignado a ningún equipo, revisar o avisar a contacto FutAppLeagues!");
                        }
                    } else {
                        setDatosLigas(datosLiga);
                        setShowLigas(true);
                    }
                } else {
                    setMessageAlertCustom("Este jugador no está vinculado a ninguna Liga.")
                    setShowAlertCustom(true);

                    setTimeout(() => {
                        if (process.env.NODE_ENV === 'production') {
                            router.push('/login.html');
                        } else {
                            router.push('/login');
                        }
                        // router.push('/login');
                    }, 2000);
                }

                setIsLoading(false);

            } catch (error) {
                console.error('Error al obtener los datos:', error);
                alert('Error: ' + error);
                if (process.env.NODE_ENV === 'production') {
                    router.push('/login.html');
                } else {
                    router.push('/login');
                }
                // router.push('/login');
            }
        };

        fetchDatos();
    }, [router, userRole, selectedLeague]);

    const handleLeagueChange = async (idLiga: number) => {
        if (idLiga === 0) {
            setLigaJugadorSeleccionada(null);
            setSelectedLeague(null);
            return;
        }

        // Buscar el nombre de la liga en datosLigasAsignadas
        const ligaSeleccionada = datosLigas.find((liga: { id_liga: number; }) => liga.id_liga === idLiga);

        setLigaJugadorSeleccionada(ligaSeleccionada);
        setSelectedLeague(idLiga);
        setNombreLiga(ligaSeleccionada.Liga.nombre);

        // Obtenemos los datos de los equipos a los que pertenece el Jugador
        const datosEquipos = await obtenerInfoEquiposSegunIdJugadorIdLiga(ligaSeleccionada.id_liga, datosJugador.id_jugador);
        const datosEquiposArray = Array.isArray(datosEquipos) ? datosEquipos : [datosEquipos];
        setDatosEquipos(datosEquiposArray);

        if (datosEquiposArray.length >= 1) {
            if (datosEquiposArray.length === 1) {
                const id_equipo_categoria = datosEquiposArray[0].id_equipo_categoria;
                setEquipoSeleccionado(datosEquiposArray[0]);
                setNombreEquipo(datosEquiposArray[0].nombre_equipo);

                // Obtenemos los torneos a los que pertenece el equipo
                const datosTorneos = await obtenerTorneosSegunIdEquipoCategoriaIdJugadorIdLiga(id_equipo_categoria, datosJugador.id_jugador, ligaSeleccionada.id_liga);
                const datosTorneosArray = Array.isArray(datosTorneos) ? datosTorneos : [datosTorneos];
                setDatosTorneos(datosTorneosArray);

                if (datosTorneosArray.length > 0) {
                    if (datosTorneosArray.length === 1) {
                        setTorneoSeleccionado(datosTorneosArray[0]);
                        setNombreTorneo(datosTorneosArray[0].nombre);

                        setIsLoading(true);

                        try {
                            const infoEquipo = await obtenerInfoEquipoSegunIdTorneoCategoriaIdEquipoIdLiga(selectedLeague, datosTorneosArray[0].id_torneo_categoria, equipoCategoriaRef.current, datosJugador.id_jugador);

                            setSelectedTournament(datosTorneosArray[0].id_torneo_categoria);
                            setInfoEquipo(infoEquipo);

                            const data = await obtenerEvolucionPosicion(infoEquipo.id_equipo_categoria, infoEquipo.id_torneo_categoria);

                            // Forzar a que `data` siempre sea un array, incluso si es un solo objeto
                            const dataArray = Array.isArray(data) ? data : [data];
                            const fechas = dataArray.map((item) => item.fecha);
                            const posiciones = dataArray.map((item) => item.posicion_actual);

                            setFechas(fechas);
                            setPosiciones(posiciones);

                        } catch (error) {
                            console.error('Error al obtener información del equipo:', error);
                        }
                        setIsLoading(false);

                    } else {
                        setShowTorneos(true);
                    }
                } else {
                    // alert("¡El equipo aún no está asignado a ninguna liga, esperar ser asignada a una para ver los detalles de su equipo!");
                    setMessageAlertCustom("¡El equipo aún no está asignado a ninguna liga, esperar ser asignada a una para ver los detalles de su equipo!");
                    setShowAlertCustom(true);
                }
            } else {
                setShowEquipos(true);
            }

        } else {
            // setMessageAlertCustom("¡Este jugador no está asignado a ningún equipo, revisar o avisar a contacto FutAppLeagues!");
            // setShowAlertCustom(true);
            alert("¡Este jugador no está asignado a ningún equipo, revisar o avisar a contacto FutAppLeagues!");
        }
    };

    const handleTeamChange = async (idEquipoCategoria: number) => {
        const id_equipo_categoria = idEquipoCategoria;
        const equipoSeleccionado = datosEquipos.filter(equipo => equipo.id_equipo_categoria === idEquipoCategoria);
        setEquipoSeleccionado(equipoSeleccionado);
        setNombreEquipo(equipoSeleccionado.nombre_equipo);

        // Obtenemos los torneos a los que pertenece el equipo
        const datosTorneos = await obtenerTorneosSegunIdEquipoCategoriaIdJugadorIdLiga(id_equipo_categoria, datosJugador.id_jugador, ligaJugadorSeleccionada.id_liga);
        const datosTorneosArray = Array.isArray(datosTorneos) ? datosTorneos : [datosTorneos];
        setDatosTorneos(datosTorneosArray);

        if (datosTorneosArray.length > 0) {
            if (datosTorneosArray.length === 1) {
                setTorneoSeleccionado(datosTorneosArray[0]);
                setNombreTorneo(datosTorneosArray[0].nombre);

                setIsLoading(true);

                try {
                    const infoEquipo = await obtenerInfoEquipoSegunIdTorneoCategoriaIdEquipoIdLiga(selectedLeague, datosTorneosArray[0].id_torneo_categoria, equipoCategoriaRef.current, datosJugador.id_jugador);

                    setSelectedTournament(datosTorneosArray[0].id_torneo_categoria);
                    setInfoEquipo(infoEquipo);

                    const data = await obtenerEvolucionPosicion(infoEquipo.id_equipo_categoria, infoEquipo.id_torneo_categoria);

                    // Forzar a que `data` siempre sea un array, incluso si es un solo objeto
                    const dataArray = Array.isArray(data) ? data : [data];
                    const fechas = dataArray.map((item) => item.fecha);
                    const posiciones = dataArray.map((item) => item.posicion_actual);

                    setFechas(fechas);
                    setPosiciones(posiciones);

                } catch (error) {
                    console.error('Error al obtener información del equipo:', error);
                }
                setIsLoading(false);

            } else {
                setShowTorneos(true);
            }
        } else {
            // alert("¡El equipo aún no está asignado a ninguna liga, esperar ser asignada a una para ver los detalles de su equipo!");
            setMessageAlertCustom("¡El equipo aún no está asignado a ninguna liga, esperar ser asignada a una para ver los detalles de su equipo!");
            setShowAlertCustom(true);
        }
    };

    // Función para manejar el cambio de torneo seleccionado
    const handleTournamentChange = async (idTorneoCategoria: number) => {
        const torneo = datosTorneos.filter(torneo => torneo.id_torneo_categoria === idTorneoCategoria);
        const nombreTorneo = torneo[0].nombre_torneo;

        setNombreTorneo(nombreTorneo);
        setTorneoSeleccionado(torneo[0]);
        setIsLoading(true);
        if (idTorneoCategoria === 0) {
            setSelectedTournament(null);
            return;
        }
        // setTorneoSeleccionado()

        try {
            const infoEquipo = await obtenerInfoEquipoSegunIdTorneoCategoriaIdEquipoIdLiga(selectedLeague, idTorneoCategoria, equipoCategoriaRef.current, datosJugador.id_jugador);

            setSelectedTournament(idTorneoCategoria);
            setInfoEquipo(infoEquipo);

            const data = await obtenerEvolucionPosicion(infoEquipo.id_equipo_categoria, infoEquipo.id_torneo_categoria);

            // Forzar a que `data` siempre sea un array, incluso si es un solo objeto
            const dataArray = Array.isArray(data) ? data : [data];
            const fechas = dataArray.map((item) => item.fecha);
            const posiciones = dataArray.map((item) => item.posicion_actual);

            setFechas(fechas);
            setPosiciones(posiciones);

        } catch (error) {
            console.error('Error al obtener información del equipo:', error);
        }
        setIsLoading(false);
    };


    if (!datosUsuario || !datosJugador || !datosEquipos)
        return <div
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
        </div>;

    const handleSidebarToggle = (state: boolean) => {
        setIsOpen(state);
    };

    const handleSidebarToggleMobile = (state: boolean) => {
        setIsMobileOpen(state);
    };

    var menuOptionsLeft;
    var menuOptionsRight;

    if (userRole === 'Jugador') {
        // Generar dinámicamente las opciones del menú
        menuOptionsLeft = menuOptionsJugador.left.map((option) => ({
            ...option,
            color: option.label === 'Mi equipo' ? 'text-blue-500' : option.color
        }));

        menuOptionsRight = menuOptionsJugador.right.map((option) => ({
            ...option,
        }));
    } else if (userRole === 'Delegado') {
        menuOptionsLeft = menuOptionsDelegado.left.map((option) => ({
            ...option,
            color: option.label === 'Mi equipo' ? 'text-blue-500' : option.color
        }));

        menuOptionsRight = menuOptionsDelegado.right.map((option) => ({
            ...option,
        }));
    }

    return (
        <>
            <div className={`${isOpen ? 'lg:ml-70 ml-0' : 'lg:ml-[0%] ml-[0%]'}`}>
                <SideBar userType={userRole} menuDisabled={false} onToggleSidebar={handleSidebarToggle} onToggleSidebarMobile={handleSidebarToggleMobile} isMobileOpen={isMobileOpen} />
            </div>
            <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                <div className={`transition-all duration-300 ${isOpen ? 'lg:w-[75%] xl1500:w-[85%] lg:left-[21%] xl1500:left-[13%]' : 'w-[95%] xxs:w-[90%] xl1500:w-[95%] lg:left-[6.5%] xl1500:left-[3.5%]'}  mx-4 my-4 top-0 xxs:left-[3.6%] z-20`}>
                    <SearchBar onToggleSidebarMobile={handleSidebarToggleMobile} userType={userRole} userName={datosUsuario.primer_nombre + " " + datosUsuario.primer_apellido} userPhotoBlob={datosUsuario.foto} />
                </div>
            </div>
            <br></br>
            <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                <div className="flex flex-col sm850:flex-row justify-center items-center -translate-x-[15%] xs248:-translate-x-[0%]">
                    <TitleWithImages
                        leftImageSrc="/images/logos/Icono_Equipo.png"
                        rightImageSrc="/images/logos/Icono_Equipo.png"
                        titleText="Mi equipo"
                        leftImageOpacity={1}
                        rightImageOpacity={1}
                        titleOpacity={1}
                    />
                </div>
            </div>

            {showLigas && (
                <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                    <SelectLeague
                        label="Liga"
                        icon={<Image src="/images/logos/Icono_Liga.png" width={100} height={100} alt='Icono Torneo' className='w-12 h-12' />}
                        options={datosLigas ? datosLigas.map(liga => ({ id: liga.id_liga, nombre: liga.Liga.nombre })) : []}
                        onChange={(value) => {
                            handleLeagueChange(value);
                        }}
                    />
                </div>
            )}

            {selectedLeague !== null && (
                <div
                    className={`flex flex-1 flex-col justify-start items-center transition-all duration-300 ${isOpen
                        ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0'
                        : 'lg:ml-[5%] ml-[0%]'
                        }`}
                >
                    <div className="flex items-center mb-5 mr-[2%]">
                        <span className="text-xl sm750:text-2xl font-bold">Liga &nbsp;</span>
                        <a className="text-xl sm750:text-2xl font-bold">&#39;</a>
                        <h3
                            className="text-xl sm750:text-2xl font-bold"
                            style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}
                        >
                            {nombreLiga}
                        </h3>
                        <a className="text-xl sm750:text-2xl font-bold">&#39;</a>
                    </div>
                </div>
            )}

            {showEquipos && (
                <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                    <SelectTeam
                        label="Equipos"
                        icon={<Image src="/images/logos/Icono_Equipo.png" width={100} height={100} alt='Icono Torneo' className='w-12 h-12' />}
                        options={datosEquipos ? datosEquipos.map(equipo => ({ id: equipo.id_equipo_categoria, nombre: equipo.nombre })) : []}
                        onChange={(value) => {
                            handleTeamChange(value);
                        }}
                    />
                </div>
            )}

            {equipoSeleccionado !== null && (
                <div
                    className={`flex flex-1 flex-col justify-start items-center transition-all duration-300 ${isOpen
                        ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0'
                        : 'lg:ml-[5%] ml-[0%]'
                        }`}
                >
                    <div className="flex items-center mb-5 mr-[2%]">
                        <span className="text-xl sm750:text-2xl font-bold">Equipo &nbsp;</span>
                        <a className="text-xl sm750:text-2xl font-bold">&#39;</a>
                        <h3
                            className="text-xl sm750:text-2xl font-bold"
                            style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}
                        >
                            {nombreEquipo}
                        </h3>
                        <a className="text-xl sm750:text-2xl font-bold">&#39;</a>
                    </div>
                </div>
            )}

            {showTorneos && (
                <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                    <SelectTournament
                        label="Torneo"
                        icon={<Image src="/images/logos/Icono_Torneo.png" width={100} height={100} alt='Icono Torneo' className='w-8 sm750:w-12 h-8 sm750:h-12' />}
                        options={datosTorneos ? datosTorneos.map(torneo => ({ id: torneo.id_torneo_categoria, nombre: (torneo.nombre_torneo + ' (Cat: ' + torneo.nombre_categoria + ')') })) : []}
                        onChange={(value) => {
                            handleTournamentChange(value);
                        }}
                    />
                </div>
            )}

            {torneoSeleccionado !== null && (
                <>
                    <br />
                    <div
                        className={`flex flex-1 flex-col justify-start items-center transition-all duration-300 ${isOpen
                            ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0'
                            : 'lg:ml-[5%] ml-[0%]'
                            }`}
                    >
                        <div className="flex items-center w-[90%] items-center justify-center text-center">
                            <span className="text-xl sm750:text-3xl font-bold">Torneo &nbsp;</span>
                            <a className="text-xl sm750:text-3xl font-bold">&#39;</a>
                            <h3
                                className="text-xl sm750:text-3xl font-bold"
                                style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}
                            >
                                {nombreTorneo}
                            </h3>
                            <a className="text-xl sm750:text-3xl font-bold">&#39;</a>
                        </div>
                    </div>
                </>
            )}

            <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                {selectedTournament && (
                    <div className="team-info w-full">
                        <TeamBadge teamName={infoEquipo.nombre_equipo} badgeUrl={infoEquipo.logo_equipo} />
                        <CurrentPosition position={infoEquipo.posicion_actual} />
                        <StatsRow1 goalsFor={infoEquipo.victorias} goalsAgainst={infoEquipo.goles_en_contra} victories={infoEquipo.victorias} />
                        <StatsRow2 draws={infoEquipo.empates} losses={infoEquipo.derrotas} redCards={infoEquipo.tarjetas_rojas} />
                        <StatsRow3 yellowCards={infoEquipo.tarjetas_amarillas} injuries={infoEquipo.lesiones} />

                        <div className='flex items-center justify-center mt-20 h-[500px] mb-[100px]'>
                            <div className='w-[96%] sm480:w-[50%] h-[500px]'>
                                <EvolutionChart labels={fechas} dataPoints={posiciones} />
                            </div>
                        </div>
                    </div>
                )}
            </div>

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

            <CustomAlert message={messageAlertCustom} onClose={() => { setShowAlertCustom(false); }} show={showAlertCustom} />
            <br />
            <br />
            <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                <Footer
                    userType={userRole}
                    menuOptionsLeft={menuOptionsLeft}
                    menuOptionsRight={menuOptionsRight}
                />
            </div>
        </>
    );
};

export default MiEquipo;