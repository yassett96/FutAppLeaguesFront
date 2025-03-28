"use client"
import React, { useState, Suspense, useEffect, useRef } from 'react';
import SideBar from '../../../../components/components_generics/side_bar/SideBar';
import SearchBar from '../../../../components/components_generics/search_bar/SearchBar';
import Footer from '../../../../components/components_generics/footer/Footer';
import TitleWithImages from '../../../../components/components_generics/title_with_images/TitleWithImages';
import LigasCarousel from '../../../../components/user/hincha/home_hincha/LigasCarousel';
import Torneo from '../../../../components/user/hincha/home_hincha/Torneo';
import Category from '../../../../components/user/hincha/home_hincha/Category';
import TournamentImage from '../../../../components/user/hincha/home_hincha/TournamentImage';
import InformationRow from '../../../../components/user/hincha/home_hincha/InformationRow';
import PositionGrid from '../../../../components/user/hincha/home_hincha/PositionGrid';
import TopScoresGrid from '../../../../components/user/hincha/home_hincha/TopScoresGrid';
import SummonedTable from '../../../../components/user/hincha/home_hincha/SummonedTable';
import MatchesGrid from '../../../../components/user/hincha/home_hincha/MatchesGrid';
import MatchDays from '@/components/components_generics/match_days/MatchDays';
import CustomButton from '../../../../components/components_generics/button/CustomButton';
import PopUpInviteLeague from '../../../../components/user/hincha/home_hincha/pop-up_invite_league/page';
import { menuOptionsHincha } from '../../../../components/components_generics/footer/menu_options/MenuOptions';
import Image from 'next/image';
import { IoMail } from 'react-icons/io5';
import { useSearchParams, useRouter } from 'next/navigation';
import { obtenerDatosUsuario } from '@/services/usuarioService';
import { obtenerLigasActivas } from '@/services/ligaService';
import {
    obtenerTorneosHinchaPorLiga,
    obtenerTorneoAnioLiga,
    obtenerTablaPosicionesPorCategoria,
    obtenerTablaGoleadoresPorCategoria
} from '@/services/torneoService';
import { obtenerTablaSancionadosPorCategoria } from '@/services/sancionadoService';
import { obtenerCategoriasHinchaPorLigaYTorneo } from '@/services/categoriaService';
import { obtenerPartidosPorTorneoCategoriaYFecha } from '@/services/partidoService';
import { RingLoader } from 'react-spinners';
import { USER_ROLES } from '@/constants';
import { obtenerJornadasSegunTorneoCategoria } from '@/services/jornadaService';

const Iniciacion_Hincha: React.FC = () => {
    return (
        <div className="min-h-screen bg-cream-faf9f6">
            <Suspense fallback={<div>Loading...</div>}>
                <Iniciacion_Jugador_Content />
            </Suspense>
        </div>
    );
};

const Iniciacion_Jugador_Content: React.FC = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [showTorneos, setShowTorneos] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [datosUsuario, setDatosUsuario] = useState<any>(null);
    const [idLigaSeleccionada, setIdLigaSeleccionada] = useState(null);
    const [idTorneoSeleccionado, setIdTorneoSeleccionado] = useState(null);
    const [idTorneoCategoriaSeleccionado, setIdTorneoCategoriaSeleccionado] = useState(null);
    const [datosJornadas, setDatosJornadas] = useState(null);
    const [tipoTorneo, setTipoTorneo] = useState(null);
    const [idCategoriaSeleccionada, setIdCategoriaSeleccionada] = useState(null);
    const [datosLigasHincha, setDatosLigasHincha] = useState<any>(null);
    const [datosTorneosHinchaLiga, setDatosTorneosHinchaLiga] = useState<any[]>([]);
    const [datosCategoriasTorneoLiga, setDatosCategoriasTorneoLiga] = useState<any>(null);
    const [datosTorneosAnioLiga, setDatosTorneosAnioLiga] = useState<any>(null);
    const [datosTablaPosiciones, setDatosTablaPosiciones] = useState<any>(null);
    const [datosTablaGoleadores, setDatosTablaGoleadores] = useState<any>(null);
    const [datosTablaSancionados, setDatosTablaSancionados] = useState<any>(null);
    const [datosTablaPartidos, setDatosTablaPartidos] = useState<any>(null);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const searchParams = useSearchParams();
    const userRole = searchParams.get('role');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleIsLoading = (isLoading: boolean) => {
        setIsLoading(isLoading);
    };

    // References for scrolling
    const torneosRef = useRef<HTMLDivElement>(null);
    const categoryRef = useRef<HTMLDivElement>(null);
    const matchesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchDatos = async () => {
            try {
                // Obtener datos del usuario
                const usuario = await obtenerDatosUsuario();
                setDatosUsuario(usuario);

                // Obtener las ligas del planillero
                const ligasHincha = await obtenerLigasActivas();
                setDatosLigasHincha(ligasHincha);

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
    }, [router]);

    if (!datosUsuario) {
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

    const handleLigasSelect = async (id_liga: number) => {
        if (id_liga > 0) {
            setIdLigaSeleccionada(id_liga);
            const torneosHinchaPorLiga = await obtenerTorneosHinchaPorLiga(id_liga);
            setDatosTorneosHinchaLiga(torneosHinchaPorLiga);

            setShowTorneos(true);
            setTimeout(() => {
                if (torneosRef.current) {
                    torneosRef.current.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }
    };

    const handleTournamentSelect = async (torneo: any) => {
        const id_torneo = torneo.id_torneo;
        const tipoTorneo = torneo.nombre;

        if (id_torneo > 0) {
            setIdTorneoSeleccionado(id_torneo);
            setTipoTorneo(tipoTorneo);
            const consultaCategoriasHincha = await obtenerCategoriasHinchaPorLigaYTorneo(idLigaSeleccionada, id_torneo);

            setDatosCategoriasTorneoLiga(consultaCategoriasHincha);

            setTimeout(() => {
                if (categoryRef.current) {
                    categoryRef.current.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }
    };

    const handleCategorySelect = async (id_category: number) => {
        if (id_category > 0) {
            setIdCategoriaSeleccionada(id_category)

            // Obtenemos la información del torneo según la liga, el torneo y la categoría
            const consultaTorneosAnioLiga = await obtenerTorneoAnioLiga(idLigaSeleccionada, idTorneoSeleccionado, id_category);
            setIdTorneoCategoriaSeleccionado(consultaTorneosAnioLiga[0].id_torneo_categoria);

            setDatosTorneosAnioLiga(consultaTorneosAnioLiga);

            // Obtenemos la información de la tabla de posiciones
            const consultaTablaPosiciones = await obtenerTablaPosicionesPorCategoria(idTorneoSeleccionado, idLigaSeleccionada);
            setDatosTablaPosiciones(consultaTablaPosiciones);

            // Obtenemos la información de la tabla de goleadores
            const consultaInfoTablaGoleadores = await obtenerTablaGoleadoresPorCategoria(idTorneoSeleccionado, idLigaSeleccionada);
            setDatosTablaGoleadores(Array.isArray(consultaInfoTablaGoleadores) ? consultaInfoTablaGoleadores : [consultaInfoTablaGoleadores]);

            // Obtenemos la información de la tabla de sancionados
            const consultaInfoTablaSancionados = await obtenerTablaSancionadosPorCategoria(idTorneoSeleccionado, id_category);
            setDatosTablaSancionados(Array.isArray(consultaInfoTablaSancionados) ? consultaInfoTablaSancionados : [consultaInfoTablaSancionados]);

            // Obtenemos la información de los partidos
            const consultaInfoTablaPartidos = await obtenerPartidosPorTorneoCategoriaYFecha(idTorneoSeleccionado, idCategoriaSeleccionada, '2024-08-22'); //o usar obtenerFechaActual()
            setDatosTablaPartidos(Array.isArray(consultaInfoTablaPartidos) ? consultaInfoTablaPartidos : [consultaInfoTablaPartidos]);

            // Obtenemos las jornadas que están en este Torneo
            const datosJornadas = await obtenerJornadasSegunTorneoCategoria(consultaTorneosAnioLiga[0].id_torneo_categoria);
            setDatosJornadas(datosJornadas.data.data);

            setTimeout(() => {
                if (matchesRef.current) {
                    const elementPosition = matchesRef.current.getBoundingClientRect().top + window.scrollY;
                    const offset = -50;
                    window.scrollTo({
                        top: elementPosition + offset,
                        behavior: 'smooth',
                    });
                }
            }, 100);
        }
    };

    const handleSidebarToggle = (state: boolean) => {
        setIsOpen(state);
    };

    const handleSidebarToggleMobile = (state: boolean) => {
        setIsMobileOpen(state);
    };

    const handleClosePopup = (state: boolean) => {
        setShowPopup(state);
    };

    // Generar dinámicamente las opciones del menú
    const menuOptionsLeft = menuOptionsHincha.left.map((option) => ({
        ...option,
        color: option.label === 'Ligas' ? 'text-blue-500' : option.color
    }));

    const menuOptionsRight = menuOptionsHincha.right.map((option) => ({
        ...option,
    }));

    // Función que manejará el cambio de fecha
    const handleDateChange = async (nuevaFecha: string) => {
        try {
            // Realiza la consulta solo si el torneo y la categoría están seleccionados
            if (idTorneoSeleccionado && idCategoriaSeleccionada) {
                const consultaInfoTablaPartidos = await obtenerPartidosPorTorneoCategoriaYFecha(
                    idTorneoSeleccionado,
                    idCategoriaSeleccionada,
                    nuevaFecha
                );
                setDatosTablaPartidos(
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
        <div className="min-h-screen bg-cream-faf9f6">
            <div className={`${isOpen ? 'lg:ml-70 ml-0' : 'lg:ml-[0%] ml-[0%]'}`}>
                <SideBar userType='Hincha' menuDisabled={false} onToggleSidebar={handleSidebarToggle} onToggleSidebarMobile={handleSidebarToggleMobile} isMobileOpen={isMobileOpen} />
            </div>

            <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                <div className={`transition-all duration-300 ${isOpen ? 'lg:w-[75%] xl1500:w-[85%] lg:left-[21%] xl1500:left-[13%]' : 'w-[95%] xxs:w-[90%] xl1500:w-[95%] lg:left-[6.5%] xl1500:left-[3.5%]'}  mx-4 my-4 top-0 xxs:left-[3.6%] z-20`}>
                    <SearchBar onToggleSidebarMobile={handleSidebarToggleMobile} userType={userRole} userName={datosUsuario ? `${datosUsuario.primer_nombre} ${datosUsuario.primer_apellido}` : ''} userPhotoBlob={datosUsuario ? datosUsuario.foto : ''} />
                </div>
            </div>

            <div className="flex flex-row md:flex-row justify-center items-center">
                <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[15.5%] xl:ml-[11.5%] 2xl:ml-[8.5%] 3xl:ml-[7.5%] 4xl:ml-[6%] ml-0' : 'lg:ml-[0%] ml-[0%]'}`}>
                    <div className="flex flex-col justify-center items-center w-[60%] xl1500:w-[50%]">
                        <div className=''>
                            <TitleWithImages
                                leftImageSrc="/images/logos/Icono_Liga.png"
                                rightImageSrc="/images/logos/Icono_Liga.png"
                                titleText="Ligas"
                                leftImageOpacity={1}
                                rightImageOpacity={1}
                                titleOpacity={1}
                            />
                        </div>
                        <br />
                        <CustomButton
                            text="Invita tu liga"
                            color="#1e3a8a"
                            width=""
                            height=""
                            onClick={() => setShowPopup(true)}
                            className='flex-col -translate-x-[0%] w-full xs:w-[60%] xl1100:w-full xl1500:w-[25%] text-center'
                            classNameText='text-sm xs360:text-xl'
                            classNameIcon='w-6 sm590:h-8 w-6 sm590:w-8'
                            icon={<IoMail />}
                        />
                    </div>
                </div>
            </div>
            {showPopup && <PopUpInviteLeague onClose={() => handleClosePopup(false)} id_usuario={datosUsuario.id_usuario} setIsLoading={handleIsLoading} />}
            <br />
            <div className='flex items-center justify-center'>
                <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                    <LigasCarousel ligas={datosLigasHincha} onSelectLiga={handleLigasSelect} />
                </div>
            </div>
            <br />
            {showTorneos && (
                <>
                    <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                        <div ref={torneosRef} className="flex items-center mb-0">
                            <Image src="/images/pages/Icono_Torneos.png"
                                className='h-10 sm750:h-20 w-10 sm750:w-20'
                                alt="Icono Torneo"
                                width={100}
                                height={100}
                            />
                            <h3 className="text-xl sm590:text-2xl font-bold text-black opacity-50 mr-1 text-blue-003366 text-shadow-lg">Torneos</h3>
                        </div>
                    </div>
                    <div className='flex items-center justify-center h-[100px]'>
                        <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                            <Torneo torneos={datosTorneosHinchaLiga} onTorneoSeleccionado={handleTournamentSelect} />
                        </div>
                    </div>
                </>
            )}

            {idTorneoSeleccionado && (
                <div ref={categoryRef} className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                    <Category
                        categorias={datosCategoriasTorneoLiga?.data || []}
                        onCategoriaSeleccionada={handleCategorySelect}
                    />
                </div>
            )}

            {idCategoriaSeleccionada && datosTorneosAnioLiga && datosTablaPosiciones &&
                datosTablaGoleadores && datosTablaSancionados && datosTablaPartidos &&
                idCategoriaSeleccionada && (
                    <>
                        <br />
                        <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                            <div className="team-info text-black text-shadow-lg w-full" ref={matchesRef}>
                                <TournamentImage
                                    teamName={datosTorneosAnioLiga[0].nombre_torneo}
                                    badgeUrl="/images/logos/Icono_Foto.png"
                                />
                                <br />
                                <InformationRow
                                    año={datosTorneosAnioLiga[0].anio_torneo}
                                    liga={datosTorneosAnioLiga[0].nombre_liga}
                                />
                                <PositionGrid posiciones={datosTablaPosiciones} />
                                <TopScoresGrid goleadores={datosTablaGoleadores} idTorneo={idTorneoSeleccionado} idCategoria={idCategoriaSeleccionada} />
                                <SummonedTable sancionados={datosTablaSancionados} />
                                {/* <MatchesGrid partidos={datosTablaPartidos} onDateChange={handleDateChange} idTorneo={idTorneoSeleccionado} idCategoria={idCategoriaSeleccionada} /> */}
                                <div className=" overflow-x-auto w-full">
                                    <div className='flex items-center justify-center text-shadow-lg'>
                                        <Image width={100} height={100} alt="Logo Categorías" src="/images/pages/Icono_Partido.png" className='h-6 sm750:h-10 w-6 sm750:w-10' />
                                        <a className='text-black text-xl xs340:text-3xl sm500:text-4xl font-bold opacity-60'>Partidos</a>
                                    </div>
                                    <MatchDays
                                        idTorneoCategoria={idTorneoCategoriaSeleccionado}
                                        jornadas={datosJornadas}
                                        tipoUsuario={USER_ROLES.HINCHA}
                                        // onPlanillar={handleOnPlanillar}
                                        tipoTorneo={tipoTorneo}
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                )}

            <br />
            <br />

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
                    userType='Hincha'
                    menuOptionsLeft={menuOptionsLeft}
                    menuOptionsRight={menuOptionsRight}
                />
            </div>
        </div>
    );
};

export default Iniciacion_Hincha;