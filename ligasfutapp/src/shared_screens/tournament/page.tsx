"use client";
import React, { Suspense, useState, useEffect } from 'react';
import SideBar from '@/components/components_generics/side_bar/SideBar';
import SearchBar from '@/components/components_generics/search_bar/SearchBar';
import Footer from '@/components/components_generics/footer/Footer';
import TitleWithImages from '@/components/components_generics/title_with_images/TitleWithImages';
import SelectTournament from '@/components/user/player/tournament/SelectTournament';
import SelectCategory from '@/components/user/player/tournament/SelectCategory';
import InformationRow from '@/components/user/player/tournament/InformationRow';
import TournamentImage from '@/components/user/player/tournament/TournamentImage';
import PositionGrid from '@/components/user/player/tournament/PositionGrid';
import TopScoresGrid from '@/components/user/player/tournament/TopScoresGrid';
import SummonedTable from '@/components/user/player/tournament/SummonedTable';
import MatchesGrid from '@/components/user/player/tournament/MatchesGrid';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { obtenerDatosUsuario } from '@/services/usuarioService';
import { obtenerDatosJugadorPorUsuario, obtenerTorneosPorJugador } from '@/services/jugadorService';
import { obtenerCategoriasPorTorneoYJugador, obtenerTorneoInfoSegunCategoria, obtenerTablaPosicionesPorCategoria, obtenerTablaGoleadoresPorCategoria } from '@/services/torneoService';
import { obtenerTablaSancionadosPorCategoria } from '@/services/sancionadoService';
import { obtenerPartidosPorTorneoCategoriaYFecha, obtenerDetallesPartido } from '@/services/partidoService';
import Image from 'next/image';
import { Torneo } from '@/interfaces/torneo';
import { Categoria } from '@/interfaces/categoria';
import { InfoTablaGoleadores, InfoTablaPartido, InfoTablaPosiciones, InfoTablaSancionados } from '@/interfaces/tablas';
import { menuOptionsJugador, menuOptionsDelegado } from '@/components/components_generics/footer/menu_options/MenuOptions';
import { RingLoader } from 'react-spinners';
import MatchDays from '@/components/components_generics/match_days/MatchDays';
import { obtenerTorneoCategoriaSegunIdTorneoIdCategoria } from '@/services/torneoCategoriaService';
import { obtenerJornadasSegunTorneoCategoria } from '@/services/jornadaService';
import CustomAlert from '@/components/components_generics/custom_alert/CustomAlert';
import { USER_ROLES } from '@/constants';

interface TorneoJugadorProps {
    userRole: string;
}

const TorneoJugador: React.FC<TorneoJugadorProps> = ({ userRole }) => {
    return (
        <div className="min-h-screen bg-cream-faf9f6 text-black text-shadow-lg">
            <Suspense fallback={<div>Loading...</div>}>
                <InnerTorneoJugador userRole={userRole} />
            </Suspense>
        </div>
    );
};

const InnerTorneoJugador: React.FC<TorneoJugadorProps> = ({ userRole }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedTournament, setSelectedTournament] = useState<number | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [datosUsuario, setDatosUsuario] = useState<any>(null);
    const [datosJugador, setDatosJugador] = useState<any>(null);
    const [datosTorneosInscrito, setDatosTorneosInscrito] = useState<any[]>([]);
    const [Torneo, setTorneo] = useState<Torneo | null>(null);
    const [infoTablaPosiciones, setInfoTablaPosiciones] = useState<InfoTablaPosiciones[]>([]);
    const [infoTablaGoleadores, setInfoTablaGoleadores] = useState<InfoTablaGoleadores[]>([]);
    const [infoTablaSancionados, setInfoTablasSancionados] = useState<InfoTablaSancionados[]>([]);
    const [infoTablaPartidos, setInfoTablasPartidos] = useState<InfoTablaPartido[]>([]);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [idTorneoCategoria, setIdTorneoCategoria] = useState<number>(0);
    const [datosJornadas, setDatosJornadas] = useState(null);
    const [tipoTorneo, setTipoTorneo] = useState(null);
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);
    const [showAlertCustom, setShowAlertCustom] = useState(false);
    const [messageAlertCustom, setMessageAlertCustom] = useState('');
    // Para mostrar los campos de selección
    const [showSelectTorneo, setShowSelectTorneo] = useState(false);
    const [showSelectCategoria, setShowSelectCategoria] = useState(false);
    const router = useRouter();
    // const userRole = searchParams.get('role');

    const handleSidebarToggle = (state: boolean) => {
        setIsOpen(state);
    };

    const handleSidebarToggleMobile = (state: boolean) => {
        setIsMobileOpen(state);
    };

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

                // Si el jugador está no está verificado, redirigir al iniciación del jugador
                if (!datosJugador.verificado) {
                    if (process.env.NODE_ENV === 'production') {
                        router.push(`/user/player/initiation_dni_player.html?role=${userRole}`);
                    } else {
                        router.push(`/user/player/initiation_dni_player/?role=${userRole}`);
                    }
                    // router.push(`/user/player/profile/?role=${userRole}`);
                }

                // Obtener los torneos en los que está inscrito el jugador                
                const datosTorneosNoArray = await obtenerTorneosPorJugador(datosJugador.id_jugador);
                const datosTorneos = Array.isArray(datosTorneosNoArray) ? datosTorneosNoArray : [datosTorneosNoArray];

                if (datosTorneos.length > 0) {
                    if (datosTorneos.length === 1) {
                        setDatosTorneosInscrito(datosTorneos);
                        setSelectedTournament(datosTorneos[0].id_torneo);
                        setTipoTorneo(datosTorneos[0].tipo_torneo);
                        setShowSelectTorneo(false);

                        const categorias = await obtenerCategoriasPorTorneoYJugador(datosTorneos[0].id_torneo, datosJugador.id_jugador);

                        if (categorias.length === 1) {
                            setCategorias(categorias.map((cat: { id_categoria: number; nombre_categoria: string; }) => ({
                                id: cat.id_categoria,
                                nombre: cat.nombre_categoria,
                            })));

                            setSelectedCategory(categorias[0].id_categoria);
                            setShowSelectCategoria(false);
                            obtenerDatosEvolucionEquipo(datosTorneos[0].id_torneo, categorias[0].id_categoria);

                            const idTorneoCategoria = await obtenerTorneoCategoriaSegunIdTorneoIdCategoria(datosTorneos[0].id_torneo, categorias[0].id_categoria);
                            setIdTorneoCategoria(idTorneoCategoria.data[0].id_torneo_categoria);

                            const datosJornadas = await obtenerJornadasSegunTorneoCategoria(idTorneoCategoria);
                            setDatosJornadas(datosJornadas.data);

                            setIsLoading(false);
                        } else {
                            setCategorias(categorias.map((cat: { id_categoria: number; nombre_categoria: string; }) => ({
                                id: cat.id_categoria,
                                nombre: cat.nombre_categoria,
                            })));
                            setShowSelectCategoria(true);
                            setIsLoading(false);
                        }

                    } else {
                        setIsLoading(false);
                        setDatosTorneosInscrito(datosTorneos);
                        setShowSelectTorneo(true);
                    }
                } else {
                    alert("!No estás inscrito en ningún torneo, espera a que los organizadores te introduzcan a uno!");
                    setMessageAlertCustom("!No estás inscrito en ningún torneo, espera a que los organizadores te introduzcan a uno!");
                    setShowAlertCustom(true);
                    setIsLoading(false);
                }

            } catch (error) {
                setIsLoading(false);
                console.error('Error al obtener los datos:', error);
                alert('Error al obtener los datos del usuario: ' + error);
                if (process.env.NODE_ENV === 'production') {
                    router.push('/login.html');
                } else {
                    router.push('/login');
                }
                // router.push('/login');
            }
        };

        fetchDatos();
    }, [router, userRole]);

    // Función para manejar el cambio de torneo seleccionado
    const handleTournamentChange = async (idTorneo: any) => {
        const torneoSeleccionado = datosTorneosInscrito.find(torneo => torneo.id_torneo === idTorneo);
        const tipoTorneo = torneoSeleccionado.tipo_torneo;

        setTipoTorneo(tipoTorneo);

        if (idTorneo === 0) {
            setSelectedTournament(null);
            return;
        }

        setSelectedTournament(idTorneo);

        try {
            const categorias = await obtenerCategoriasPorTorneoYJugador(idTorneo, datosJugador.id_jugador);
            // const torneoCategoria = await obtenerTorneoCategoriaSegunIdTorneoIdCategoria(idTorneo, selectedCategory);

            setSelectedTournament(idTorneo);

            setCategorias(categorias.map((cat: { id_categoria: number; nombre_categoria: string; }) => ({
                id: cat.id_categoria,
                nombre: cat.nombre_categoria,
            })));

            if (categorias.length === 1) {
                setSelectedCategory(categorias[0].id_categoria);
                setShowSelectCategoria(false);
                await obtenerDatosEvolucionEquipo(idTorneo, categorias[0].id_categoria);

                const idTorneoCategoria = await obtenerTorneoCategoriaSegunIdTorneoIdCategoria(idTorneo, categorias[0].id_categoria);
                setIdTorneoCategoria(idTorneoCategoria.data[0].id_torneo_categoria);

                const datosJornadas = await obtenerJornadasSegunTorneoCategoria(idTorneoCategoria.data[0].id_torneo_categoria);
                setDatosJornadas(datosJornadas.data.data);

                setIsLoading(false);
            } else if (categorias.length > 1) {
                setShowSelectCategoria(true);
                setIsLoading(false);
            }
            setIsLoading(false);
        } catch (error) {
            console.error('Error al obtener categorías:', error);
        }
    };

    // Función para manejar cambio de categoría seleccionada
    const handleCategoryChange = async (idCategory: number) => {
        if (idCategory == 0) {
            setSelectedCategory(null);
            return;
        }

        setSelectedCategory(idCategory);

        const torneoCategoria = await obtenerTorneoCategoriaSegunIdTorneoIdCategoria(selectedTournament, idCategory);
        setIdTorneoCategoria(torneoCategoria.data[0].id_torneo_categoria);

        const datosJornadas = await obtenerJornadasSegunTorneoCategoria(torneoCategoria.data[0].id_torneo_categoria);
        setDatosJornadas(datosJornadas.data)

        try {
            await obtenerDatosEvolucionEquipo(selectedTournament, idCategory);
        } catch (error) {
            console.log('Error al obtener los datos de la evolución del equipo: ', error);
        }
    };

    // Función para obtener la información del equipo en el torneo
    const obtenerDatosEvolucionEquipo = async (idTournament: number, idCategory: number) => {
        try {
            const consultaTorneo = await obtenerTorneoInfoSegunCategoria(idTournament, idCategory);
            setTorneo(consultaTorneo);

            const consultaInfoTablaPosiciones = await obtenerTablaPosicionesPorCategoria(idTournament, idCategory);
            setInfoTablaPosiciones(Array.isArray(consultaInfoTablaPosiciones) ? consultaInfoTablaPosiciones : [consultaInfoTablaPosiciones]);

            const consultaInfoTablaGoleadores = await obtenerTablaGoleadoresPorCategoria(idTournament, idCategory);
            setInfoTablaGoleadores(Array.isArray(consultaInfoTablaGoleadores) ? consultaInfoTablaGoleadores : [consultaInfoTablaGoleadores]);

            const consultaInfoTablaSancionados = await obtenerTablaSancionadosPorCategoria(idTournament, idCategory);
            setInfoTablasSancionados(Array.isArray(consultaInfoTablaSancionados) ? consultaInfoTablaSancionados : [consultaInfoTablaSancionados]);

            const consultaInfoTablaPartidos = await obtenerPartidosPorTorneoCategoriaYFecha(idTournament, idCategory, '2024-08-22'); //o usar obtenerFechaActual()
            setInfoTablasPartidos(Array.isArray(consultaInfoTablaPartidos) ? consultaInfoTablaPartidos : [consultaInfoTablaPartidos]);

        } catch (error) {
            console.log('Error al obtener los datos de la evolución del equipo: ', error);
        }
    };

    if (!datosUsuario || !infoTablaPartidos)
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

    var menuOptionsLeft;
    var menuOptionsRight;

    if (userRole === 'Jugador') {
        // Generar dinámicamente las opciones del menú
        menuOptionsLeft = menuOptionsJugador.left.map((option) => ({
            ...option,
            color: option.label === 'Torneo' ? 'text-blue-500' : option.color
        }));

        menuOptionsRight = menuOptionsJugador.right.map((option) => ({
            ...option,
        }));
    } else if (userRole === 'Delegado') {
        menuOptionsLeft = menuOptionsDelegado.left.map((option) => ({
            ...option,
            color: option.label === 'Torneo' ? 'text-blue-500' : option.color
        }));

        menuOptionsRight = menuOptionsDelegado.right.map((option) => ({
            ...option,
        }));
    }

    // Función que manejará el cambio de fecha
    const handleDateChange = async (nuevaFecha: string) => {
        try {
            // Realiza la consulta solo si el torneo y la categoría están seleccionados
            if (selectedTournament && selectedCategory) {
                const consultaInfoTablaPartidos = await obtenerPartidosPorTorneoCategoriaYFecha(
                    selectedTournament,
                    selectedCategory,
                    nuevaFecha
                );
                setInfoTablasPartidos(
                    Array.isArray(consultaInfoTablaPartidos)
                        ? consultaInfoTablaPartidos
                        : [consultaInfoTablaPartidos]
                );
            }
        } catch (error) {
            console.error('Error al obtener los partidos:', error);
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
            <div className={`-mb-[20px] flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                <div className="flex flex-col sm850:flex-row justify-center items-center -translate-x-[15%] xs248:-translate-x-[0%]">
                    <TitleWithImages
                        leftImageSrc="/images/logos/Icono_Torneos.png"
                        rightImageSrc="/images/logos/Icono_Torneos.png"
                        titleText="Torneo"
                        leftImageOpacity={1}
                        rightImageOpacity={1}
                        titleOpacity={1}
                    />
                </div>
            </div>
            {showSelectTorneo && (
                <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                    <SelectTournament
                        label="Selecciona tu torneo inscrito"
                        icon={<Image src="/images/logos/Icono_Torneos.png" width={100} height={100} alt='Icono Torneo' className='w-10 sm590:w-12 h-10 sm590:h-12' />}
                        options={datosTorneosInscrito ? datosTorneosInscrito.map(torneo => ({ id: torneo.id_torneo, nombre: torneo.torneo_nombre })) : []}
                        onChange={(value) => {
                            handleTournamentChange(value);
                        }}
                    />
                </div>
            )}

            {showSelectCategoria && (
                <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                    <SelectCategory
                        label="Selecciona tu categoría inscrita en torneo"
                        icon={<Image src="/images/logos/Icono_Categoria.png" width={100} height={100} alt='Icono Categoria' className='h-8 sm750:w-12 h-8 sm750:h-12' />}
                        options={categorias}
                        onChange={(value) => handleCategoryChange(value)}
                        isVisible={selectedTournament !== null}
                    />
                </div>
            )}

            {selectedCategory && Torneo && (
                <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                    <div className="team-info w-full ">
                        <TournamentImage tournamentName={Torneo.nombre_torneo} badgeUrl={Torneo.logo_torneo} />
                        <InformationRow año={Torneo.anio_torneo} liga={Torneo.nombre_liga} />
                        <br />
                        <br />
                        <PositionGrid posiciones={infoTablaPosiciones} />
                        <br />
                        <br />
                        <TopScoresGrid goleadores={infoTablaGoleadores} idTorneo={selectedTournament} idCategoria={selectedCategory} />
                        <br />
                        <br />
                        <SummonedTable sancionados={infoTablaSancionados} />
                        <br />
                        <br />
                        {/* <MatchesGrid partidos={infoTablaPartidos} onDateChange={handleDateChange} idTorneo={selectedTournament} idCategoria={selectedCategory} /> */}
                        <MatchDays idTorneoCategoria={idTorneoCategoria} jornadas={datosJornadas} tipoUsuario={USER_ROLES.DELEGADO} tipoTorneo={tipoTorneo} />
                    </div>
                </div>
            )}
            <br />
            <br />
            <CustomAlert message={messageAlertCustom} onClose={() => { setShowAlertCustom(false); }} show={showAlertCustom} />
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

export default TorneoJugador;