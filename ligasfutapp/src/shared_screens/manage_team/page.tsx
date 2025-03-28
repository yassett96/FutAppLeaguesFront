"use client";
import React, { Suspense, useState, useEffect, useCallback } from 'react';
import SideBar from '@/components/components_generics/side_bar/SideBar';
import SearchBar from '@/components/components_generics/search_bar/SearchBar';
import Footer from '@/components/components_generics/footer/Footer';
import { useSearchParams } from 'next/navigation';
import TitleWithImages from '@/components/components_generics/title_with_images/TitleWithImages';
import CustomButton from '@/components/components_generics/button/CustomButton';
import { RingLoader } from 'react-spinners';
import SelectTeam from '@/components/user/player/manage_team/SelectTeam';
import Image from 'next/image';
import PlayerGrid from '@/components/user/player/manage_team/PlayerGrid';
import PopUpNewPlayer from '@/components/user/player/manage_team/pop-up_new_player/page';
import PopUpManagePlayer from '@/components/user/player/manage_team/pop-up_manage_player/page';
import { menuOptionsJugador, menuOptionsDelegado, menuOptionsAdminLeague } from '@/components/components_generics/footer/menu_options/MenuOptions';
import { obtenerDatosUsuario } from '@/services/usuarioService';
import { obtenerDatosJugadorPorUsuario, obtenerJugadoresPorEquipoCategoria } from '@/services/jugadorService';
import { obtenerJugadoresEquipoDelegado, obtenerEquiposCategoriasDelegado, obtenerEquiposSegunIdTorneoCategoria } from '@/services/equipoService';
import { desactivarJugadorEquipoCategoria } from '@/services/jugadorEquipoCategoria';
import { useRouter } from 'next/navigation';
import CustomAlert from '@/components/components_generics/custom_alert/CustomAlert';
import CustomAlertAcceptOrCancel from '@/components/components_generics/custom_alert/CustomAlertAcceptOrCancel';
import { obtenerDatosLigaSegunIdJugador } from '@/services/ligaService';
import SelectLeague from '@/components/user/player/initiation_dni_player/SelectLeague';
import { obtenerLigasAsignadas } from '@/services/adminLigaLigaService';
import { obtenerTorneosCategoriaSegunIdLiga } from '@/services/torneoCategoriaService';
import { USER_ROLES } from '@/constants';

interface GestionarProps {
    userRole: string;
}

const Gestionar: React.FC<GestionarProps> = ({ userRole }) => {
    return (
        <div className="min-h-screen bg-cream-faf9f6">
            <Suspense fallback={<div>Loading...</div>}>
                <GestionarContent userRole={userRole} />
            </Suspense>
        </div>
    );
};

const GestionarContent: React.FC<GestionarProps> = ({ userRole }) => {
    const [showPopUpNewPlayer, setShowPopUpNewPlayer] = useState<boolean>(false);
    const [showPopUpManagePlayer, setShowPopUpManagePlayer] = useState<boolean>(false);
    const [selectedPlayer, setSelectedPlayer] = useState<any>(null);
    const [selectedRow, setSelectedRow] = useState<number | null>(null);
    const searchParams = useSearchParams();
    const [isOpen, setIsOpen] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    // const userRole = searchParams.get('role');
    const [datosUsuario, setDatosUsuario] = useState<any>(null);
    const [datosTorneosCategoria, setDatosTorneosCategoria] = useState<any>(null);
    const [datosJugador, setDatosJugador] = useState<any>(null);
    const [datosJugadoresEquipo, setDatosJugadoresEquipo] = useState<any>(null);
    const [datosEquipos, setDatosEquipos] = useState<any>(null);
    const [datosEquipoSeleccionado, setDatosEquipoSeleccionado] = useState<any>(null);
    const [showAlertCustom, setShowAlertCustom] = useState(false);
    const [messageAlertCustom, setMessageAlertCustom] = useState('');
    const [showAlertCustomAcceptOrCancel, setShowAlertCustomAcceptOrCancel] = useState(false);
    const [messageAlertCustomAcceptOrCancel, setMessageAlertCustomAcceptOrCancel] = useState('');
    const [showSelectTeam, setShowSelectTeam] = useState<boolean>(false);
    const [mostrarTablaJugadores, setMostrarTablasJugadores] = useState<boolean>(false);
    const [idEquipoCategoriaSeleccionado, setIdEquipoCategoriaSeleccionado] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(false);
    const [datosLigas, setDatosLigas] = useState<any>(null);
    const [nombreLiga, setNombreLiga] = useState<any>(null);
    const [nombreEquipo, setNombreEquipo] = useState("");
    const [selectedLeague, setSelectedLeague] = useState<number | null>(null);
    const [setSelectedTeam, setSetSelectedTeam] = useState<boolean | null>(false);
    const [ligaJugadorSeleccionada, setLigaJugadorSeleccionada] = useState<any | null>(null);
    const [showSelectTournament, setShowSelectTournament] = useState<boolean>(false);
    const [showLigas, setShowLigas] = useState(false);

    const handleIsLoading = (isLoading: boolean) => {
        setIsLoading(isLoading);
    };

    const router = useRouter();

    const handleSidebarToggle = (state: boolean) => {
        setIsOpen(state);
    };

    const handleSidebarToggleMobile = (state: boolean) => {
        setIsMobileOpen(state);
    };

    const handleEliminarJugador = async () => {
        if (!selectedPlayer) {
            setMessageAlertCustom('¡Por favor selecciona un jugador para eliminar!');
            setShowAlertCustom(true);
        } else {
            setMessageAlertCustomAcceptOrCancel("¿Estás seguro de que deseas eliminar a este jugador?");
            setShowAlertCustomAcceptOrCancel(true);
        }
    };

    const obtenerDatosRolAdminLiga = async () => {
        console.log("Entramos otra vez");
        // Obtener los datos de los usuarios
        const datosUsuarios = await obtenerDatosUsuario();
        // console.log("datosUsuarios: ", datosUsuarios);
        // console.log("datosUsuarios.id_usuario: ", datosUsuarios.id_usuario);
        setDatosUsuario(datosUsuarios);

        // Obtener los datos de las ligas que pertenece el Admin_Liga según el usuario
        const ligasAsignadas = await obtenerLigasAsignadas(datosUsuarios.id_usuario);
        const ligasAsignadasArray = Array.isArray(ligasAsignadas) ? ligasAsignadas : [ligasAsignadas]
        setDatosLigas(ligasAsignadasArray);
        setLigaJugadorSeleccionada(ligasAsignadasArray);

        // Verificamos si solo solo es una liga que se obtuvo, si no hacemos que seleccione primeramente la liga que quiere gestionar
        if (ligasAsignadasArray.length === 1) {
            setSelectedLeague(ligasAsignadasArray[0].id_liga);
            setNombreLiga(ligasAsignadasArray[0].nombre);

            const torneosCategoriaNoArray = await obtenerTorneosCategoriaSegunIdLiga(ligasAsignadasArray[0].id_liga);
            const torneosCategoria = Array.isArray(torneosCategoriaNoArray.data) ? torneosCategoriaNoArray.data : [torneosCategoriaNoArray.data];

            if (torneosCategoria.length > 0 && torneosCategoriaNoArray.success) {
                setDatosTorneosCategoria(torneosCategoria);

                if (torneosCategoria.length === 1) {

                } else {
                    setShowSelectTournament(true);
                }

            } else {
                setMessageAlertCustom("¡Aún no se han creado torneos para esta Liga, espera a que creen alguno para ver la información del equipo que desees!")
                setShowAlertCustom(true);
            }


            // const consultaDatosEquipoCategoriaDelegado = await obtenerEquiposCategoriasDelegado(datosJugador.id_usuario, ligasAsignadasArray[0].id_liga);
            // setDatosEquipos(consultaDatosEquipoCategoriaDelegado);
            // setSetSelectedTeam(true);
            // setDatosEquipoSeleccionado(consultaDatosEquipoCategoriaDelegado[0]);

            // setNombreEquipo(consultaDatosEquipoCategoriaDelegado[0].nombre_equipo);

            // if (consultaDatosEquipoCategoriaDelegado.length === 1) {
            //     const consultaDatosJugadoresEquipoDelegadoNoArray = await obtenerJugadoresEquipoDelegado(datosUsuarios.id_usuario, consultaDatosEquipoCategoriaDelegado[0].id_equipo_categoria);
            //     const consultaDatosJugadoresEquipoDelegado = Array.isArray(consultaDatosJugadoresEquipoDelegadoNoArray) ? consultaDatosJugadoresEquipoDelegadoNoArray : [consultaDatosJugadoresEquipoDelegadoNoArray];

            //     setDatosJugadoresEquipo(consultaDatosJugadoresEquipoDelegado);
            //     setMostrarTablasJugadores(true);
            // } else if (consultaDatosEquipoCategoriaDelegado.length === 0) {
            //     setMessageAlertCustom("No se obtuvieron datos de los equipos y categorías que gestiona el delegado");
            //     setShowAlertCustom(true);
            // } else if (consultaDatosEquipoCategoriaDelegado.length > 1) {
            //     setShowSelectTeam(true);
            // }

            // await obtenerDatosCategorias(ligasAsignadasArray[0].id_liga);
            // setShowGridCategoria(true);
        } else {
            setShowLigas(true);
            // setShowGridCategoria(false);
        }
    };

    const obtenerJugadoresEquipos = async (id_usuario: number, id_equipo_categoria: number) => {
        let consultaDatosJugadores = null;
        if (userRole === USER_ROLES.JUGADOR || userRole === USER_ROLES.DELEGADO) {
            consultaDatosJugadores = await obtenerJugadoresEquipoDelegado(id_usuario, id_equipo_categoria);
        } else if (userRole === USER_ROLES.ADMIN_LIGA) {
            consultaDatosJugadores = await obtenerJugadoresPorEquipoCategoria(id_equipo_categoria);
        }
        console.log("consultaDatosJugadores: ", consultaDatosJugadores);
        return consultaDatosJugadores;
    };

    const obtenerDatosRolJugadorDelegado = async () => {
        // Obtener datos del usuario
        const datosUsuario = await obtenerDatosUsuario();
        setDatosUsuario(datosUsuario);

        // Obtener datos del jugador según el ID del usuario
        const datosJugador = await obtenerDatosJugadorPorUsuario(datosUsuario.id_usuario);
        setDatosJugador(datosJugador);

        const datosLiga = await obtenerDatosLigaSegunIdJugador(datosJugador.id_jugador);

        if (datosLiga.length > 0) {
            if (datosLiga.length === 1) {
                setLigaJugadorSeleccionada(datosLiga[0]);
                setSelectedLeague(datosLiga[0].id_liga);
                setDatosLigas(datosLiga);
                const codigoLigaNumero = Number(datosLiga[0].Liga.codigo_liga); // Para convertir el "0" a 0                                
                setNombreLiga(datosLiga[0].Liga.nombre);

                const consultaDatosEquipoCategoriaDelegado = await obtenerEquiposCategoriasDelegado(datosJugador.id_usuario, datosLiga[0].id_liga);
                setDatosEquipos(consultaDatosEquipoCategoriaDelegado);
                setSetSelectedTeam(true);
                setDatosEquipoSeleccionado(consultaDatosEquipoCategoriaDelegado[0]);

                setNombreEquipo(consultaDatosEquipoCategoriaDelegado[0].nombre_equipo);
                setIdEquipoCategoriaSeleccionado(consultaDatosEquipoCategoriaDelegado[0].id_equipo_categoria);

                if (consultaDatosEquipoCategoriaDelegado.length === 1) {
                    console.log("datosUsuario.id_usuario: ", datosUsuario.id_usuario);
                    console.log("consultaDatosEquipoCategoriaDelegado[0].id_equipo_categoria: ", consultaDatosEquipoCategoriaDelegado[0].id_equipo_categoria);
                    const consultaDatosJugadoresEquipoDelegadoNoArray = await obtenerJugadoresEquipos(datosUsuario.id_usuario, consultaDatosEquipoCategoriaDelegado[0].id_equipo_categoria);
                    console.log("consultaDatosJugadoresEquipoDelegadoNoArray: ", consultaDatosJugadoresEquipoDelegadoNoArray);
                    const consultaDatosJugadoresEquipoDelegado = Array.isArray(consultaDatosJugadoresEquipoDelegadoNoArray.data) ? consultaDatosJugadoresEquipoDelegadoNoArray.data : [consultaDatosJugadoresEquipoDelegadoNoArray.data];

                    setDatosJugadoresEquipo(consultaDatosJugadoresEquipoDelegado);
                    setMostrarTablasJugadores(true);
                } else if (consultaDatosEquipoCategoriaDelegado.length === 0) {
                    setMessageAlertCustom("No se obtuvieron datos de los equipos y categorías que gestiona el delegado");
                    setShowAlertCustom(true);
                } else if (consultaDatosEquipoCategoriaDelegado.length > 1) {
                    setShowSelectTeam(true);
                }
            } else {
                setDatosLigas(datosLiga);
                setShowLigas(true);
            }
        } else {
            setMessageAlertCustom("Este jugador no está vinculado a ninguna Liga.")
            setShowAlertCustom(true);

            setTimeout(() => {
                // if (process.env.NODE_ENV === 'production') {
                //     router.push('/login.html');
                // } else {
                //     router.push('/login');
                // }
                // router.push('/login');
            }, 2000);
        }
    }

    const obtenerDatos = useCallback(async () => {
        if (userRole === USER_ROLES.JUGADOR || userRole === USER_ROLES.DELEGADO) {
            await obtenerDatosRolJugadorDelegado();
        }
        else if (userRole === USER_ROLES.ADMIN_LIGA) {
            await obtenerDatosRolAdminLiga();
        }

    }, []);

    const handleLeagueChange = async (idLiga: number) => {
        if (idLiga === 0) {
            setLigaJugadorSeleccionada(null);
            setSelectedLeague(null);
            return;
        }

        // Buscar el nombre de la liga en datosLigasAsignadas
        const ligaSeleccionada = datosLigas.find((liga: { id_liga: number; }) => liga.id_liga === idLiga);
        setNombreLiga(ligaSeleccionada.Liga.nombre);

        const codigoLigaNumero = Number(ligaSeleccionada.Liga.codigo_liga);
        setLigaJugadorSeleccionada(ligaSeleccionada);
        setSelectedLeague(idLiga);
    };

    // Función para cerrar el PopUp y volver a obtener los jugadores
    const handleClosePopUpNewPlayer = async () => {
        setShowPopUpNewPlayer(false);
        const jugadoresEquipo = await obtenerJugadoresEquipos(datosUsuario.id_usuario, idEquipoCategoriaSeleccionado);
        setDatosJugadoresEquipo(jugadoresEquipo.data);
    };

    // Cuando se selecciona un jugador en PlayerGrid
    const handleSelectPlayer = (jugador: any) => {
        setSelectedPlayer(jugador);
    };

    // Al hacer clic en el botón "Gestionar Jugador"
    const handleManagePlayer = () => {
        if (!selectedPlayer) {
            setMessageAlertCustom('Por favor selecciona un jugador para gestionar.');
            setShowAlertCustom(true);
        } else {
            setShowPopUpManagePlayer(true);
        }
    };

    // Al actualizar el jugador
    const handleUpdatePlayer = async () => {
        console.log("datosUsuario.id_usuario: ", datosUsuario.id_usuario);
        console.log("idEquipoCategoriaSeleccionado: ", idEquipoCategoriaSeleccionado);
        const jugadoresEquipo = await obtenerJugadoresEquipos(datosUsuario.id_usuario, idEquipoCategoriaSeleccionado);
        setDatosJugadoresEquipo(jugadoresEquipo.data);

        setShowPopUpManagePlayer(false);
        setSelectedPlayer(null);
        setSelectedRow(null);
    }

    useEffect(() => {
        const fetchDatos = async () => {
            try {
                await obtenerDatos();
            } catch (error) {
                console.error('Error al obtener los datos:', error);
                alert('Error: ' + error);
                // if (process.env.NODE_ENV === 'production') {
                //     router.push('/login.html');
                // } else {
                //     router.push('/login');
                // }
                // router.push('/login');
            }
        };

        fetchDatos();
    }, [router, userRole, obtenerDatos]);

    if (userRole === USER_ROLES.JUGADOR || userRole === USER_ROLES.DELEGADO) {
        if (!datosUsuario || !datosJugador)
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
    }

    if (userRole === USER_ROLES.ADMIN_LIGA) {
        if (!datosUsuario)
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
    }

    // Cerrar las alertas
    const handleCloseAlertCustom = () => {
        setShowAlertCustom(false);
    };

    var menuOptionsLeft: any;
    var menuOptionsRight: any;

    // Función para manejar el cambio de equipo seleccionado
    const handleTeamChange = async (equipo: any) => {
        console.log("equipo: ", equipo);
        setDatosEquipoSeleccionado(equipo);
        const idEquipoCategoria = equipo.id_equipo_categoria;
        console.log("idEquipoCategoria: ", idEquipoCategoria);
        if (idEquipoCategoria === 0) {
            setIdEquipoCategoriaSeleccionado(null);
            return;
        }

        setIdEquipoCategoriaSeleccionado(idEquipoCategoria);

        try {
            let consultaDatosJugadores = await obtenerJugadoresEquipos(datosUsuario.id_usuario, idEquipoCategoria);

            setDatosJugadoresEquipo(consultaDatosJugadores.data);
            setMostrarTablasJugadores(true);
        } catch (error) {
            console.error('Error al obtener categorías:', error);
        }
    };

    if (userRole === USER_ROLES.JUGADOR) {
        // Generar dinámicamente las opciones del menú
        menuOptionsLeft = menuOptionsJugador.left.map((option) => ({
            ...option,
        }));

        menuOptionsRight = menuOptionsJugador.right.map((option) => ({
            ...option,
        }));
    } else if (userRole === USER_ROLES.DELEGADO) {
        menuOptionsLeft = menuOptionsDelegado.left.map((option) => ({
            ...option,
        }));

        menuOptionsRight = menuOptionsDelegado.right.map((option) => ({
            ...option,
            color: option.label === 'Gestionar' ? 'text-blue-500' : option.color
        }));
    } else if (userRole === USER_ROLES.ADMIN_LIGA) {
        menuOptionsLeft = menuOptionsAdminLeague.left.map((option) => ({
            ...option,
        }));

        menuOptionsRight = menuOptionsAdminLeague.right.map((option) => ({
            ...option,
            color: option.label === 'Gestionar' ? 'text-blue-500' : option.color
        }));
    }

    const handleCancelAlertAcceptOrCancel = () => {
        setShowAlertCustomAcceptOrCancel(false);
    };

    const handleAcceptAlertAcceptOrCancel = async () => {
        setShowAlertCustomAcceptOrCancel(false);
        setIsLoading(true);
        const eliminate = await desactivarJugadorEquipoCategoria(selectedPlayer.id_jugador_equipo_categoria);
        if (eliminate) {
            setIsLoading(false);
            setMessageAlertCustom("¡Se ha eliminado el jugador exitosamente!");
            setShowAlertCustom(true);

            setSelectedPlayer(null);
            setSelectedRow(null);
            
            const datosJugadores = await obtenerJugadoresEquipos(datosUsuario.id_usuario, idEquipoCategoriaSeleccionado);
            setDatosJugadoresEquipo(datosJugadores.data);
        }
    };

    const handleChangeTournament = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        setMostrarTablasJugadores(false);
        const idTorneoCategoria = e.target.value;
        // Buscar en el array el torneo cuyo id coincida
        const selectedTournament = datosTorneosCategoria.find(
            (option) => option.TorneoCategoria[0].id_torneo_categoria.toString() === idTorneoCategoria
        );

        const equipos = await obtenerEquiposSegunIdTorneoCategoria(selectedTournament.TorneoCategoria[0].id_torneo_categoria);

        if (equipos.success) {
            const equiposArray = Array.isArray(equipos.data.data) ? equipos.data.data : [equipos.data.data];
            if (equiposArray.length === 1) {

            } else {
                setDatosEquipos(equiposArray);
                setShowSelectTeam(true);
            }
        } else {
            setMessageAlertCustom("¡Este torneo no tiene equipos inscritos aún!");
            setShowAlertCustom(true);
        }
    };

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
            <br />
            <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                <div className="flex flex-col sm850:flex-row justify-center items-center -translate-x-[2%] xs360:-translate-x-[7%]">
                    <TitleWithImages
                        leftImageSrc="/images/logos/Icono_Gestionar.png"
                        rightImageSrc="/images/logos/Icono_Gestionar.png"
                        titleText="Gestionar"
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
                        icon={<Image src="/images/logos/Icono_Liga.png" width={100} height={100} alt='Icono Torneo' className='w-8 sm750:w-12 h-8 sm750:h-12' />}
                        options={datosLigas ? datosLigas.map(liga => ({ id: liga.id_liga, nombre: liga.Liga.nombre })) : []}
                        onChange={(value) => {
                            handleLeagueChange(value);
                        }}
                    />
                </div>
            )}

            <br />

            {selectedLeague !== null && (
                <div
                    className={`flex flex-1 flex-col justify-start items-center transition-all duration-300 ${isOpen
                        ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0'
                        : 'lg:ml-[5%] ml-[0%]'
                        }`}
                >
                    <div className="flex items-center mb-5 mr-[2%]">
                        <span className="text-xl xs340:text-3xl sm500:text-4xl font-bold">Liga &nbsp;</span>
                        <a className="text-xl xs340:text-3xl sm500:text-4xl font-bold">&#39;</a>
                        <h3
                            className="text-xl xs340:text-3xl sm500:text-4xl font-bold"
                            style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}
                        >
                            {nombreLiga}
                        </h3>
                        <a className="text-xl xs340:text-3xl sm500:text-4xl font-bold">&#39;</a>
                    </div>
                </div>
            )}

            {showSelectTournament && (
                <>
                    <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                        <div className="select-box flex flex-col items-center justify-center mt-10 text-4xl w-[80%] sm590:w-[80%]">
                            <label className="select-box-label flex items-center mb-2 text-center text-xl sm590:text-2xl">
                                <Image src="/images/logos/Icono_Torneos.png" width={100} height={100} alt='Icono Torneo' className='w-8 sm750:w-12 h-8 sm750:h-12' />
                                Selecciona el torneo
                            </label>
                            <select
                                onChange={handleChangeTournament}
                                className="select-box-select p-2 rounded w-[100%] shadow-lg font-bold text-sm sm750:text-2xl"
                            >
                                <option value="">Selecciona un torneo</option>
                                {datosTorneosCategoria.map((option, key) => (
                                    <option key={key} value={option.TorneoCategoria[0].id_torneo_categoria}>
                                        {option.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </>
            )}

            {showSelectTeam && (
                <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                    <SelectTeam
                        label="Selecciona el equipo inscrito"
                        icon={<Image src="/images/logos/Icono_Equipo.png" width={100} height={100} alt='Icono Torneo' className='w-8 sm750:w-12 h-8 sm750:h-12' />}
                        options={datosEquipos ? datosEquipos.map((equipo) => ({ id_equipo_categoria: equipo.id_equipo_categoria, nombre: equipo.nombre })) : []}
                        onChange={(selectedTeam) => {
                            console.log("selectedTeam: ", selectedTeam);
                            handleTeamChange(selectedTeam);
                        }}
                    />
                </div>
            )}
            {setSelectedTeam && (
                <div
                    className={`flex flex-1 flex-col justify-start items-center transition-all duration-300 ${isOpen
                        ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0'
                        : 'lg:ml-[5%] ml-[0%]'
                        }`}
                >
                    <div className="flex items-center mb-5 mr-[2%]">
                        <span className="text-xl xs340:text-3xl sm500:text-4xl font-bold">Equipo &nbsp;</span>
                        <a className="text-xl xs340:text-3xl sm500:text-4xl font-bold">&#39;</a>
                        <h3
                            className="text-xl xs340:text-3xl sm500:text-4xl font-bold"
                            style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}
                        >
                            {nombreEquipo}
                        </h3>
                        <a className="text-xl xs340:text-3xl sm500:text-4xl font-bold">&#39;</a>
                    </div>
                </div>
            )}
            {mostrarTablaJugadores && (
                <>
                    <br />
                    <br />
                    <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                        <div className="flex flex-col sm850:flex-row justify-center items-center w-full mr-[3%]">
                            <CustomButton
                                text="Agregar Jugador"
                                color="#24b364"
                                width=""
                                height=""
                                onClick={() => setShowPopUpNewPlayer(true)}
                                className='flex-col w-[80%] xs360:w-[60%] lg:w-[20%]'
                                classNameText='text-sm xs360:text-xl'
                                classNameIcon='w-6 sm590:h-8 w-6 sm590:w-8'
                                icon="/images/logos/Icono_Nuevo_Blanco.png"
                            />
                            {showPopUpNewPlayer &&
                                <PopUpNewPlayer
                                    onClose={handleClosePopUpNewPlayer}
                                    idEquipoCategoria={datosEquipoSeleccionado.id_equipo_categoria}
                                    setIsLoading={handleIsLoading}
                                    ligaJugadorSeleccionada={ligaJugadorSeleccionada}
                                />}
                        </div>
                    </div>
                    <br />
                    <br />
                    <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                        <div className="team-info w-full ">
                            {datosJugadoresEquipo && (
                                <PlayerGrid jugadores={datosJugadoresEquipo} selectedRow={selectedRow} setSelectedRow={setSelectedRow} onSelectPlayer={handleSelectPlayer} />
                            )}
                        </div>
                    </div>
                    <br />
                    <br />
                    <div className={`flex-1 flex sm590:flex-row justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                        <div className='w-full flex items-center justify-center flex-col sm590:flex-row'>
                            <CustomButton
                                text="Eliminar Jugador"
                                color="#ef4444"
                                width=""
                                height=""
                                onClick={handleEliminarJugador}
                                className='flex-col w-[70%] sm590:w-[30%] xl1200:w-[15%] -translate-x-[0%] sm590:-translate-x-[20%]'
                                classNameText='text-sm xs360:text-xl'
                                classNameIcon='w-6 sm590:h-8 w-6 sm590:w-8'
                                icon="/images/logos/Icono_Cancelar_Blanco.png"
                            />
                            <CustomButton
                                text="Editar Jugador"
                                color="#20c997"
                                width=""
                                height=""
                                onClick={handleManagePlayer}
                                className='flex-col w-[70%] sm590:w-[30%] xl1200:w-[15%] mt-8 sm590:mt-0 ml-0 sm590:ml-10'
                                classNameText='text-sm xs360:text-xl'
                                classNameIcon='w-6 sm590:h-8 w-6 sm590:w-8'
                                icon="/images/logos/Icono_Editar_Blanco.png"
                            />
                            {showPopUpManagePlayer &&
                                <PopUpManagePlayer
                                    jugador={selectedPlayer}
                                    onClose={() => setShowPopUpManagePlayer(false)}
                                    onUpdate={handleUpdatePlayer}
                                    setIsLoading={handleIsLoading}
                                    idEquipoCategoria={datosEquipoSeleccionado.id_equipo_categoria}
                                    ligaJugadorSeleccionada={ligaJugadorSeleccionada}
                                />}
                        </div>
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

            {/** Alertas de las acciones */}
            <CustomAlert message={messageAlertCustom} show={showAlertCustom} onClose={handleCloseAlertCustom} />
            <CustomAlertAcceptOrCancel message={messageAlertCustomAcceptOrCancel} onAccept={handleAcceptAlertAcceptOrCancel} onCancel={handleCancelAlertAcceptOrCancel} show={showAlertCustomAcceptOrCancel} />

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

export default Gestionar;