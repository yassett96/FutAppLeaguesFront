"use client";
import React, { useState, useEffect, Suspense } from 'react';
import SideBar from '../../../../components/components_generics/side_bar/SideBar';
import SearchBar from '../../../../components/components_generics/search_bar/SearchBar';
import Footer from '../../../../components/components_generics/footer/Footer';
import TitleWithImages from '../../../../components/components_generics/title_with_images/TitleWithImages';
import Timeline from '../../../../components/user/planner/match_resume_chronology/time_line/TimeLine';
import Result from '../../../../components/user/planner/match_resume_chronology/Result';
import Comments from '../../../../components/user/planner/match_resume_chronology/Comments';
import CustomButton from '../../../../components/components_generics/button/CustomButton';
import { useSearchParams, useRouter } from 'next/navigation';
import { obtenerDatosUsuario } from '@/services/usuarioService';
import { menuOptionsPlanillero } from '../../../../components/components_generics/footer/menu_options/MenuOptions';
import { obtenerDetallesPartido } from '@/services/partidoService';
import { obtenerEventosPorPartido } from '@/services/eventoService';
import { obtenerDesempate } from '@/services/desempateService';
import { finalizarPartido } from '@/services/resultadoService';
import CustomAlert from '../../../../components/components_generics/custom_alert/CustomAlert';
import CustomAlertAcceptOrCancel from '@/components/components_generics/custom_alert/CustomAlertAcceptOrCancel';
import { RingLoader } from 'react-spinners';
import { EVENT_TYPES } from '@/constants';

const PartidoResumenCronologia: React.FC = () => {
    return (
        <div className="min-h-screen bg-cream-faf9f6">
            <Suspense fallback={<div>Loading...</div>}>
                <PartidoResumenCronologiaContent />
            </Suspense>
        </div>
    );
};

const PartidoResumenCronologiaContent: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const router = useRouter();
    const [datosUsuario, setDatosUsuario] = useState<any>(null);
    const [datosDetallesPartido, setDatosDetallesPartido] = useState<any>(null);
    const [detallesEventosPartido, setDetallesEventosPartido] = useState<any>(null);
    const [nombreEquipoLocal, setNombreEquipoLocal] = useState<any>(null);
    const [nombreEquipoVisitante, setNombreEquipoVisitante] = useState<any>(null);
    const [partidoData, setPartidoData] = useState({
        equipo_local: "",
        equipo_visitante: "",
        goles_local: [],
        goles_visitante: [],
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
    const [datosEventosPartido, setDatosEventosPartido] = useState<any>(null);
    const searchParams = useSearchParams();
    const userRole = searchParams.get('role');
    const idPartido = searchParams.get('id_p');
    const [datosDesempate, setDatosDesempate] = useState<any>(null);
    const [esDesempate, setEsDesempate] = useState<boolean>(false);
    const [showAlertCustom, setShowAlertCustom] = useState(false);
    const [messageAlertCustom, setMessageAlertCustom] = useState('');
    const [showAlertCustomAcceptOrCancel, setShowAlertCustomAcceptOrCancel] = useState(false);
    const [messageAlertCustomAcceptOrCancel, setMessageAlertCustomAcceptOrCancel] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchDatos = async () => {
            try {
                // Obtener datos del usuario
                const usuario = await obtenerDatosUsuario();
                setDatosUsuario(usuario);

                // Obtener los detalles del partido
                const detallesP = await obtenerDetallesPartido(Number(idPartido));
                setDatosDetallesPartido(Array.isArray(detallesP) ? detallesP : [detallesP]);

                // Obtener los eventos del partido
                const detallesPEventos = await obtenerEventosPorPartido(Number(idPartido));
                setDetallesEventosPartido(detallesPEventos);
                setIsLoading(false);

                let nombreEquipoLocal = detallesP.equipo_local;
                let nombreEquipoVisitante = detallesP.equipo_visitante;

                // Obtener desempate si lo hay
                const consultaDesempate = await obtenerDesempate(Number(idPartido));

                if (consultaDesempate.data.desempates.length != 0) {
                    setDatosDesempate(consultaDesempate.data.desempates[0]);
                    setEsDesempate(true);
                } else {
                    setDatosDesempate([]);
                }

                let golesPorEquipo = 0;

                if (detallesPEventos.success) {
                    // Agrupar y contar los goles (incluyendo Auto-Goles) por equipo
                    golesPorEquipo = detallesPEventos.data.reduce((acc, evento) => {
                        if (evento.tipo_evento === EVENT_TYPES.GOL) {
                            // Sumar al equipo que anotó                        
                            acc[evento.nombre_equipo] = (acc[evento.nombre_equipo] || 0) + 1;
                        } else if (evento.tipo_evento === EVENT_TYPES.AUTO_GOL) {
                            // Sumar al equipo contrario                        
                            const equipoContrario = evento.nombre_equipo === nombreEquipoLocal ? nombreEquipoVisitante : nombreEquipoLocal;
                            acc[equipoContrario] = (acc[equipoContrario] || 0) + 1;
                        }
                        return acc;
                    }, {});
                }

                // Obtener los equipo y sus respectivos goles
                const equipos = Object.keys(golesPorEquipo);
                const [equipoLocal, equipoVisitante] = equipos;
                const golesEquipoVisitante = golesPorEquipo[equipoVisitante] || 0;
                const golesEquipoLocal = golesPorEquipo[equipoLocal] || 0;

                // Actualizar estado local para los datos del partido
                if (detallesP) {
                    setPartidoData({
                        equipo_local: detallesP.equipo_local ?? "",
                        equipo_visitante: detallesP.equipo_visitante ?? "",
                        goles_local: golesEquipoLocal,
                        goles_visitante: golesEquipoVisitante,
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
                    setNombreEquipoLocal(detallesP.equipo_local);
                    setNombreEquipoVisitante(detallesP.equipo_visitante);
                }

                // Obtener los eventos del partido
                const detallesE = await obtenerEventosPorPartido(Number(idPartido));
                if (detallesE.success) {
                    setDatosEventosPartido(detallesE.data);
                } else {
                    setDatosEventosPartido([]);
                }

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
    }, [router, idPartido]);

    if (!datosUsuario || !datosDetallesPartido || !detallesEventosPartido) {
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

    const handleSidebarToggle = (state: boolean) => {
        setIsOpen(state);
    };

    const handleSidebarToggleMobile = (state: boolean) => {
        setIsMobileOpen(state);
    };

    // Generar dinámicamente las opciones del menú
    const menuOptionsLeft = menuOptionsPlanillero.left.map((option) => ({
        ...option,
    }));

    const menuOptionsRight = menuOptionsPlanillero.right.map((option) => ({
        ...option,
        color: option.label === 'Resumen' ? 'text-blue-500' : option.color
    }));

    const handleCloseMatch = async () => {
        setMessageAlertCustomAcceptOrCancel('¿Está seguro que desea cerrar el partido?');
        setShowAlertCustomAcceptOrCancel(true);
    };

    let transformedEvents = [];

    if (datosEventosPartido && datosEventosPartido.length > 0) {
        transformedEvents = datosEventosPartido.map(event => {
            const isAutogol = event.tipo_evento === EVENT_TYPES.AUTO_GOL;
            const teamBenefited = isAutogol
                ? event.nombre_equipo === nombreEquipoLocal
                    ? nombreEquipoVisitante
                    : nombreEquipoLocal
                : event.nombre_equipo;

            const isSubstitution = event.tipo_evento === 'Sustitución';

            return {
                time: event.minuto ?? 'N/A',
                team: teamBenefited ?? 'Sin equipo',
                type: event.tipo_evento,
                player: !isSubstitution && event.primer_nombre && event.primer_apellido
                    ? `${event.primer_nombre} ${event.primer_apellido}`
                    : null,
                eventIcon: {
                    'Gol': '/images/logos/Icono_Balon.png',
                    'Asistencia': '/images/logos/Icono_Asistencia.png',
                    'Tarjeta Amarilla': '/images/logos/Icono_Tarjeta_Amarilla.png',
                    'Tarjeta Roja': '/images/logos/Icono_Tarjeta_Roja.png',
                    'Lesión': '/images/logos/Icono_Lesiones.png',
                    'Sustitución Entra': '/images/logos/Icono_Jugador_Entrando.png',
                    'Sustitución Sale': '/images/logos/Icono_Jugador_Saliendo.png',
                    'Inicio del Partido': '/images/logos/Icono_Reloj.png',
                    'Fin del Partido': '/images/logos/Icono_Reloj.png',
                    'Fin del Primer Tiempo': '/images/logos/Icono_Reloj.png',
                    'Inicio del Segundo Tiempo': '/images/logos/Icono_Reloj.png',
                    'Autogol': '/images/logos/Icono_Balon.png',
                }[event.tipo_evento] || '/images/logos/Icono_No_Data.png',
                playerOut: event.tipo_evento === 'Sustitución Sale'
                    ? `${event.primer_nombre} ${event.primer_apellido}`
                    : null,
                playerIn: event.tipo_evento === 'Sustitución Entra'
                    ? `${event.primer_nombre} ${event.primer_apellido}`
                    : null,
            };
        });
    } else {
        transformedEvents = [
            {
                time: 'N/A',
                team: 'No hay eventos registrados',
                type: null,
                player: null,
                eventIcon: '/images/logos/Icono_No_Data.png',
                playerOut: null,
                playerIn: null,
            },
        ];
    }

    // Cerrar las alertas
    const handleCloseAlertCustom = () => {
        setShowAlertCustom(false);
    };

    const handleAcceptAlertCustomAcceptOrCancel = async () => {
        setIsLoading(true);
        const dataPartido = {
            resultado_local: partidoData.goles_local, // Total de goles anotados por el equipo local
            resultado_visitante: partidoData.goles_visitante, // Total de goles anotados por el equipo visitante
            eventos: datosEventosPartido.map(evento => ({
                id_jugador_partido: evento.id_jugador_partido, // ID único del jugador en el partido
                equipo: evento.nombre_equipo, // Nombre del equipo
                tipo_evento: evento.tipo_evento, // Tipo de evento
                minuto: evento.minuto, // Minuto en el que ocurrió el evento
                observacion: evento.observacion, // Observación adicional del evento
            })),
        }

        try {
            const response = await finalizarPartido(Number(idPartido), dataPartido);
            setIsLoading(false);
            setMessageAlertCustom('Partido finalizado correctamente.');
            setShowAlertCustom(true);

            setTimeout(() => {
                if (process.env.NODE_ENV === 'production') {
                    router.push(`/user/planner/home_planner.html?role=${userRole}`);
                } else {
                    router.push(`/user/planner/home_planner/?role=${userRole}`);
                }
                // router.push(`/user/planner/home_planner/?role=${userRole}`);
            }, 4000);
        } catch (error) {
            setIsLoading(false);
            console.error('Error al actualizar el partido:', error);
            alert(`Error al actualizar el partido: ${error.message}`);
        }
        setShowAlertCustomAcceptOrCancel(false);
    };

    const handleCancelAlertCustomAcceptOrCancel = () => {
        setShowAlertCustomAcceptOrCancel(false);
    };

    return (
        <div className="min-h-screen bg-cream-faf9f6">
            <div className={`${isOpen ? 'lg:ml-70 ml-0' : 'lg:ml-[0%] ml-[0%]'}`}>
                <SideBar userType='Planillero' menuDisabled={false} onToggleSidebar={handleSidebarToggle} onToggleSidebarMobile={handleSidebarToggleMobile} isMobileOpen={isMobileOpen} id_partido={Number(idPartido)} />
            </div>
            <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                <div className={`transition-all duration-300 ${isOpen ? 'lg:w-[75%] xl1500:w-[85%] lg:left-[21%] xl1500:left-[13%]' : 'w-[95%] xxs:w-[90%] xl1500:w-[95%] lg:left-[6.5%] xl1500:left-[3.5%]'}  mx-4 my-4 top-0 xxs:left-[3.6%] z-20`}>
                    <SearchBar onToggleSidebarMobile={handleSidebarToggleMobile} userType={userRole} userName={datosUsuario.primer_nombre + " " + datosUsuario.primer_apellido} userPhotoBlob={datosUsuario.foto} />
                </div>
            </div>
            <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                <div className="flex-grow mx-4 mt-[10px] mr-[7%]">
                    <TitleWithImages
                        leftImageSrc="/images/logos/Icono_Resumen.png"
                        rightImageSrc="/images/logos/Icono_Balon.png"
                        titleText="Resumen"
                        leftImageOpacity={1}
                        rightImageOpacity={1}
                        titleOpacity={1}
                    />
                </div>
            </div>
            <br />
            <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                <div className="w-full flex items-center justify-center">
                    <Result
                        localTeam={partidoData.equipo_local}
                        visitorTeam={partidoData.equipo_visitante}
                        localGoals={partidoData.goles_local}
                        visitorGoals={partidoData.goles_visitante}
                    />
                </div>
            </div>
            <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[15.5%] xl:ml-[11.5%] 2xl:ml-[8.5%] 3xl:ml-[7.5%] 4xl:ml-[6%] ml-0' : 'lg:ml-[0%] ml-[0%]'}`}>
                <Timeline events={transformedEvents || []} nombreEquipoLocal={nombreEquipoLocal} nombreEquipoVisitante={nombreEquipoVisitante} />
            </div>
            {esDesempate && (
                <>
                    <br />
                    <br />
                    <div className={`-translate-x-[4%] flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                        <h2 className="flex items-center justify-center flex-row text-4xl font-bold ml-[5%] xs340:ml-[0%] xs360:ml-[0%] xl-1100:ml-[4%]">Desempate</h2>
                        <div className="flex flex-row justify-center items-center mt-2 ml-[0%] w-[80%]">
                            {/* Contenedor para el equipo local */}
                            <div className="flex flex-col items-center justify-end w-full xs360:w-auto text-center sm480:text-left xs360:text-right mr-[5%]">
                                <p className="text-3xl md:text-5xl text-center">{partidoData.equipo_local}</p>
                                <p className="text-3xl md:text-5xl font-bold">{datosDesempate.goles_penales_local}</p>
                            </div>

                            {/* Separador de guion */}
                            <div className="mx-4 text-5xl">-</div>

                            {/* Contenedor para el equipo visitante */}
                            <div className="flex flex-col items-center justify-start w-full xs360:w-auto text-center sm480:text-left xs360:text-left ml-[5%]">
                                <p className="text-3xl md:text-5xl text-center">{partidoData.equipo_visitante}</p>
                                <p className="text-3xl md:text-5xl font-bold">{datosDesempate.goles_penales_visitante}</p>
                            </div>
                        </div>
                    </div>
                    <br />
                    <br />
                </>
            )}
            <div className={`w-[99%] translate-x-[1%] flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[15.5%] xl:ml-[11.5%] 2xl:ml-[7.5%] 3xl:ml-[7.5%] 4xl:ml-[6%] ml-0' : 'lg:ml-[0%] ml-[0%]'}`}>
                <div className="w-[98%] flex items-center justify-center">
                    <Comments title={`Comentarios árbitros`} comments={partidoData.comentario_arbitro} icon='/images/logos/Icono_Arbitro.png' />
                </div>
            </div>
            <div className={`w-[99%] translate-x-[1%] flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[15.5%] xl:ml-[11.5%] 2xl:ml-[7.5%] 3xl:ml-[7.5%] 4xl:ml-[6%] ml-0' : 'lg:ml-[0%] ml-[0%]'}`}>
                <div className="w-[98%] flex items-center justify-center">
                    <Comments title={`Comentarios capitán ${partidoData.equipo_local}`} comments={partidoData.comentario_capitan_local} icon='/images/logos/Icono_Escudo_1.png' />
                </div>
            </div>
            <div className={`w-[99%] translate-x-[1%] flex-1 flex flex-col justify-center items-center transition-all duration-300 ${isOpen ? 'lg:ml-[15.5%] xl:ml-[11.5%] 2xl:ml-[8.5%] 3xl:ml-[7.5%] 4xl:ml-[6%] ml-0' : 'lg:ml-[0%] ml-[0%]'}`}>
                <div className="w-[98%] flex items-center justify-center">
                    <Comments title={`Comentarios capitán ${partidoData.equipo_visitante}`} comments={partidoData.comentario_capitan_visitante} icon='/images/logos/Icono_Escudo_2.png' />
                </div>
            </div>
            <br />
            <br />
            <div className='flex items-center justify-center'>
                <CustomButton
                    text="Cerrar partido"
                    color="#22c55e"
                    width=""
                    height=""
                    onClick={handleCloseMatch}
                    className='flex-col w-[80%] sm750:w-[40%]'
                    icon="/images/logos/Icono_Confirmar_Blanco.png"
                    classNameText='text-sm xs360:text-xl'
                    classNameIcon='w-6 sm590:h-8 w-6 sm590:w-8'
                />
            </div>

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
            <CustomAlertAcceptOrCancel message={messageAlertCustomAcceptOrCancel} show={showAlertCustomAcceptOrCancel} onAccept={handleAcceptAlertCustomAcceptOrCancel} onCancel={handleCancelAlertCustomAcceptOrCancel} />

            <br />
            <br />
            <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                <Footer
                    userType='Planillero'
                    menuOptionsLeft={menuOptionsLeft}
                    menuOptionsRight={menuOptionsRight}
                    id_partido={Number(idPartido)}
                />
            </div>
        </div>
    );
};

export default PartidoResumenCronologia;