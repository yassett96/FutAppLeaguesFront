"use client";
import React, { useState, useEffect, Suspense, useRef, useCallback } from 'react';
import SideBar from '../../../../components/components_generics/side_bar/SideBar';
import SearchBar from '../../../../components/components_generics/search_bar/SearchBar';
import Footer from '../../../../components/components_generics/footer/Footer';
import TitleWithImages from '../../../../components/components_generics/title_with_images/TitleWithImages';
import CustomButton from '../../../../components/components_generics/button/CustomButton';
import Timer from '../../../../components/user/planner/match_data/Timer';
import EventsGrid from '../../../../components/user/planner/match_data/EventsGrid';
import PopUpAddEvent from '../../../../components/user/planner/match_data/pop-up_add_event/page';
// import PopUpAddEvent from '@/components/components_generics/match_days/pop-up_edit_match/pop-up_add_event/page';
import PopUpAddTiebreaker from '@/components/user/planner/match_data/pop-up_tiebreaker/page';
import { RingLoader } from 'react-spinners';
import { useSearchParams, useRouter } from 'next/navigation';
import { obtenerDatosUsuario } from '@/services/usuarioService';
import { menuOptionsPlanillero } from '../../../../components/components_generics/footer/menu_options/MenuOptions';
import { crearEvento, obtenerEventosPorPartido, desactivarEvento } from '@/services/eventoService';
import { obtenerDetallesPartido } from '@/services/partidoService';
import { obtenerEquiposPorPartido } from '@/services/partidoService';
import { EVENT_TYPES } from '@/constants';
import CustomAlert from '../../../../components/components_generics/custom_alert/CustomAlert';
import CustomAlertAcceptOrCancel from '@/components/components_generics/custom_alert/CustomAlertAcceptOrCancel';

const PartidoDatos: React.FC = () => {
    return (
        <div className="min-h-screen bg-cream-faf9f6">
            <Suspense fallback={<div>Loading...</div>}>
                <PartidoDatosContent />
            </Suspense>
        </div>
    );
};

const PartidoDatosContent: React.FC = () => {
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [startTimer, setStartTimer] = useState(false);
    const timerResetRef = useRef(null);
    const timerHalfResetRef = useRef(null);
    const [currentTime, setCurrentTime] = useState(0);
    const currentTimeRef = useRef(0);
    const router = useRouter();
    const [datosUsuario, setDatosUsuario] = useState<any>(null);
    const [datosEventos, setDatosEventos] = useState<any>([]);
    const [datosEquipos, setDatosEquipos] = useState<any>([]);
    const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
    const [isFirstHalfFinished, setIsFirstHalfFinished] = useState<boolean>(false);
    const [isMatchStarted, setIsMatchStarted] = useState<boolean>(false);
    const [isSecondHalfStarted, setIsSecondHalfStarted] = useState<boolean>(false);
    const [isMatchFinished, setIsMatchFinished] = useState<boolean>(false);
    const searchParams = useSearchParams();
    const userRole = searchParams.get('role');
    const idPartido = searchParams.get('id_p');
    const [showAlertCustom, setShowAlertCustom] = useState(false);
    const [messageAlertCustom, setMessageAlertCustom] = useState('');
    const [showAlertCustomAcceptOrCancel, setShowAlertCustomAcceptOrCancel] = useState(false);
    const [messageAlertCustomAcceptOrCancel, setMessageAlertCustomAcceptOrCancel] = useState('');
    const [actionToDo, setActionToDo] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPopUpAgregarDesempate, setShowPopUpAgregarDesempate] = useState(false);
    const [segundoTiempo, setSegundoTiempo] = useState(false);

    const cntDesempate = 'Desempate';
    const cntIniciarPartido = 'Iniciar partido';
    const cntFinalizarPrimerTiempo = 'Finalizar primer tiempo';
    const cntIniciarSegundoTiempo = 'Iniciar primero tiempo';
    const cntFinalizarPartido = 'Finalizar partido';
    const cntEliminarEvento = 'Eliminar evento';

    const onTimeUpdate = (time) => {
        currentTimeRef.current = time;
        setCurrentTime(time);
    };

    useEffect(() => {
        // Sincronizar el valor de la referencia con el estado en momentos clave
        const syncCurrentTime = () => setCurrentTime(currentTimeRef.current);
        if (startTimer) {
            syncCurrentTime(); // Asegura que el estado está sincronizado al iniciar
        }
    }, [startTimer]);

    const verificarEventosEstadosBotones = (datosEventos: any) => {
        if (datosEventos.length > 0) {
            // Filtrar los eventos relevantes
            const inicioPartido = datosEventos.find(evento => evento.tipo_evento === EVENT_TYPES.INICIO_DEL_PARTIDO);
            const finPrimerTiempo = datosEventos.find(evento => evento.tipo_evento === EVENT_TYPES.FIN_DEL_PRIMER_TIEMPO);
            const inicioSegundoTiempo = datosEventos.find(evento => evento.tipo_evento === EVENT_TYPES.INICIO_DEL_SEGUNDO_TIEMPO);
            const finPartido = datosEventos.find(evento => evento.tipo_evento === EVENT_TYPES.FIN_DEL_PARTIDO);

            // Establecer el estado de los botones con base en la presencia de los eventos
            setIsMatchStarted(!!inicioPartido && !finPartido);
            setIsFirstHalfFinished(!!finPrimerTiempo);
            setIsSecondHalfStarted(!!inicioSegundoTiempo);
            setIsMatchFinished(!!finPartido);

            // Configurar el temporizador
            setStartTimer(!!inicioPartido && !finPartido && (!!inicioSegundoTiempo || !finPrimerTiempo));
        }
    };

    const obtenerDatos = useCallback(async () => {
        try {
            // Obtener datos del usuario
            const usuario = await obtenerDatosUsuario();
            setDatosUsuario(usuario);

            // Obtener los eventos actuales del partido
            const consultaDatosEventos = await obtenerEventosPorPartido(Number(idPartido));
            setDatosEventos(consultaDatosEventos.data || []);

            // Obtener los datos de los equipos del partido
            const consultaDatosEquipos = await obtenerEquiposPorPartido(Number(idPartido));
            setDatosEquipos(consultaDatosEquipos);

            return consultaDatosEventos.data;
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
    }, [idPartido, router]);

    useEffect(() => {
        const fetchDatos = async () => {
            const consultaDatosEventos = await obtenerDatos();
            verificarEventosEstadosBotones(consultaDatosEventos);
        };
        fetchDatos();
    }, [obtenerDatos, router]);

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

    const handleSidebarToggle = (state: boolean) => {
        setIsOpen(state);
    };

    const handleSidebarToggleMobile = (state: boolean) => {
        setIsMobileOpen(state);
    };

    const onEliminate = async () => {
        if (selectedEventId !== null) {
            setActionToDo(cntEliminarEvento);
            setMessageAlertCustomAcceptOrCancel("¿Estás seguro de que deseas eliminar este evento?");
            setShowAlertCustomAcceptOrCancel(true);
        } else {
            setMessageAlertCustom("¡Se debe de seleccionar un evento para eliminarlo!");
            setShowAlertCustom(true);
        }
    };

    const onInitGame = async () => {
        setActionToDo(cntIniciarPartido);
        setMessageAlertCustomAcceptOrCancel("¿Quieres iniciar el partido?");
        setShowAlertCustomAcceptOrCancel(true);
    }

    const onFinishFirstTime = async () => {
        setActionToDo(cntFinalizarPrimerTiempo);
        setMessageAlertCustomAcceptOrCancel("¿Quieres finalizar el primer tiempo?");
        setShowAlertCustomAcceptOrCancel(true);
    };

    const onInitSecondTime = async () => {
        setActionToDo(cntIniciarSegundoTiempo);
        setMessageAlertCustomAcceptOrCancel("¿Quieres iniciar el segundo tiempo?");
        setShowAlertCustomAcceptOrCancel(true);
    };

    const onFinishGame = async () => {
        setActionToDo(cntFinalizarPartido);
        setMessageAlertCustomAcceptOrCancel("¿Quieres finalizar partido?");
        setShowAlertCustomAcceptOrCancel(true);
    };

    const onConfirm = async () => {
        try {
            setIsLoading(true);
            // Obtener los detalles del partido
            const detallesP = await obtenerEventosPorPartido(Number(idPartido));
            setIsLoading(false);

            let nombreEquipoLocal = datosEquipos.nombre_equipo_local;
            let nombreEquipoVisitante = datosEquipos.nombre_equipo_visitante;

            // Agrupar y contar los goles (incluyendo Auto-Goles) por equipo
            const golesPorEquipo = detallesP.data.reduce((acc, evento) => {
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

            // Obtener los equipo y sus respectivos goles
            const equipos = Object.keys(golesPorEquipo);
            const [equipo1, equipo2] = equipos;
            const golesEquipo1 = golesPorEquipo[equipo1] || 0;
            const golesEquipo2 = golesPorEquipo[equipo2] || 0;

            console.log("golesEquipo1: ", golesEquipo1);
            console.log("golesEquipo2: ", golesEquipo2);

            // Verificar si hay empate
            if (golesEquipo1 === golesEquipo2) {
                setActionToDo(cntDesempate);
                setMessageAlertCustomAcceptOrCancel("¡El partido quedó empatado!. ¿Habrá desempate en penales?");
                setShowAlertCustomAcceptOrCancel(true);
            } else {
                setTimeout(() => {
                    if (process.env.NODE_ENV === 'production') {
                        router.push(`/user/planner/match_comment.html?role=${userRole}&id_p=${idPartido}`);
                    } else {
                        router.push(`/user/planner/match_comment/?role=${userRole}&id_p=${idPartido}`);
                    }
                    // router.push(`/user/planner/match_comment/?role=${userRole}&id_p=${idPartido}`);
                }, 2000)
            }
        } catch (error) {
            console.log("Error al obtener los detalles del partido: ", error);
            alert("Error al obtener los detalles del partido: " + error);
        }
    };

    const handleOnCloseAddEvent = async () => {
        setShowPopup(false);

        const consultaDatosEventos = await obtenerDatos();
        verificarEventosEstadosBotones(consultaDatosEventos);
    };

    // Cerrar las alertas
    const handleCloseAlertCustom = () => {
        setShowAlertCustom(false);
    };

    const registrarEvento = async (tipoEvento, minuto, minutos_extra) => {
        const eventoData = {
            id_partido: idPartido,
            tipo_evento: tipoEvento,
            minuto: minuto,
            minutos_extra: minutos_extra,
            observacion: ""
        };

        try {
            const registroEvento = await crearEvento(eventoData);

            return registroEvento;
        } catch (error) {
            console.error("Error al registrar el evento: ", error);
            alert("Error al crear el evento de inicio del partido.");
        }
    };

    const handleAcceptAlertAcceptOrCancel = async () => {
        let minuto = 0;
        let minutos_extra = 0;

        setShowAlertCustomAcceptOrCancel(false);
        if (actionToDo === cntDesempate) {
            setShowPopUpAgregarDesempate(true);
        }

        if (!segundoTiempo) {
            currentTime > 45 ? (minuto = 45, minutos_extra = (Math.floor(currentTime / 60) - 45)) : minuto = Math.floor(currentTime / 60);
        } else {
            currentTime > 90 ? (minuto = 90, minutos_extra = (Math.floor(currentTime / 60) - 90)) : minuto = Math.floor(currentTime / 60);
        }

        if (actionToDo === cntIniciarPartido) {

            const registroInicioPartido = await registrarEvento(EVENT_TYPES.INICIO_DEL_PARTIDO, 0, 0);

            if (registroInicioPartido.success) {
                setMessageAlertCustom("¡El partido ha comenzado!");
                setShowAlertCustom(true);

                setIsMatchStarted(true);
                setIsFirstHalfFinished(false);
                setStartTimer(true);
                const consultaDatosEventos = await obtenerDatos();
                verificarEventosEstadosBotones(consultaDatosEventos);
            } else {
                alert("Hubo un problema al iniciar el partido");
            }
        }

        if (actionToDo === cntFinalizarPrimerTiempo) {
            const registroFinalizarPrimerTiempo = await registrarEvento(EVENT_TYPES.FIN_DEL_PRIMER_TIEMPO, minuto, minutos_extra);

            if (registroFinalizarPrimerTiempo.success) {
                setMessageAlertCustom("¡Se ha finalizado el primer tiempo");
                setShowAlertCustom(true);

                setIsFirstHalfFinished(true);
                setStartTimer(false);
                setCurrentTime(2700);
                onTimeUpdate(2700);
                localStorage.setItem('matchTimerTime', '2700');

                const consultaDatosEventos = await obtenerDatos();
                verificarEventosEstadosBotones(consultaDatosEventos);
            } else {
                alert("Hubo un problema al finalizar el primer tiempo");
            }

            // Resetear el temporizador
            if (timerHalfResetRef.current) {
                timerHalfResetRef.current();
            }
        }

        if (actionToDo === cntIniciarSegundoTiempo) {

            const registroIniciarSegundoTiempo = await registrarEvento(EVENT_TYPES.INICIO_DEL_SEGUNDO_TIEMPO, 45, 0);

            if (registroIniciarSegundoTiempo.success) {
                setMessageAlertCustom("¡El segundo tiempo ha comenzado!");
                setShowAlertCustom(true);

                setIsSecondHalfStarted(true);
                setStartTimer(true);
                const consultaDatosEventos = await obtenerDatos();
                verificarEventosEstadosBotones(consultaDatosEventos);
                setSegundoTiempo(true);
            } else {
                alert("Hubo un problema al iniciar el segundo tiempo");
            }
        }

        if (actionToDo === cntFinalizarPartido) {
            const resgitroFinalPartido = await registrarEvento(EVENT_TYPES.FIN_DEL_PARTIDO, minuto, minutos_extra);

            if (resgitroFinalPartido.success) {
                setMessageAlertCustom("¡Ha finalizado el partido!");
                setShowAlertCustom(true);

                setIsMatchFinished(true);
                setStartTimer(false);
                setCurrentTime(0);
                onTimeUpdate(0);
                localStorage.setItem('matchTimerTime', '0');
                const consultaDatosEventos = await obtenerDatos();
                verificarEventosEstadosBotones(consultaDatosEventos);
            } else {
                alert("Hubo un problema al finalizar el partido");
            }

            // Resetear el temporizador
            if (timerResetRef.current) {
                timerResetRef.current();
            }
        }

        if (actionToDo === cntEliminarEvento) {
            const eventEliminado = await desactivarEvento(selectedEventId);

            if (eventEliminado && eventEliminado.success) {
                setMessageAlertCustom("¡Evento eliminado exitosamente!");
                setShowAlertCustom(true);
                const consultaDatosEventos = await obtenerDatos();
                verificarEventosEstadosBotones(consultaDatosEventos);
            }
        }
    };

    const handleCancelAlertAceptOrCancel = () => {
        setShowAlertCustomAcceptOrCancel(false);
        setTimeout(() => {
            if (process.env.NODE_ENV === 'production') {
                router.push(`/user/planner/match_comment.html?role=${userRole}&id_p=${idPartido}`);
            } else {
                router.push(`/user/planner/match_comment/?role=${userRole}&id_p=${idPartido}`);
            }
            // router.push(`/user/planner/match_comment/?role=${userRole}&id_p=${idPartido}`);
        }, 2000)
    };

    const handleClosePopUpAddTiebreaker = () => {
        setShowPopUpAgregarDesempate(false);
    };

    const handleSavePopUpAddTiebreaker = () => {

    };

    // Generar dinámicamente las opciones del menú
    const menuOptionsLeft = menuOptionsPlanillero.left.map((option) => ({
        ...option,
        color: option.label === 'Datos' ? 'text-blue-500' : option.color
    }));

    const menuOptionsRight = menuOptionsPlanillero.right.map((option) => ({
        ...option,
    }));

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
            <br />
            <br />
            <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                <div className="flex-grow w-[95%] mx-4 mt-[100px]">
                    <TitleWithImages
                        leftImageSrc="/images/logos/Icono_Datos_Partido.png"
                        rightImageSrc="/images/logos/Icono_Balon.png"
                        titleText="Datos del partido"
                        leftImageOpacity={1}
                        rightImageOpacity={1}
                        titleOpacity={1}
                    />
                </div>
            </div>

            <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                <div className="flex-col sm750:flex-row w-[95%] mx-4 mt-[50px] mb-[60px] flex items-center justify-center sm750:space-x-10">
                    <CustomButton
                        text="Agregar Evento"
                        color="#3b82f6"
                        width=""
                        height=""
                        onClick={() => setShowPopup(true)}
                        disabled={!isMatchStarted || (isFirstHalfFinished && !isSecondHalfStarted) || isMatchFinished}
                        className={`flex-col w-[90%] xs360:w-[70%] sm750:w-[30%] text-center ${(!isMatchStarted || (isFirstHalfFinished && !isSecondHalfStarted) || isMatchFinished) ? 'opacity-50 cursor-not-allowed' : ''}`}
                        icon="/images/logos/Icono_Confirmar_Blanco.png"
                        classNameText="text-sm sm590:text-xl"
                        classNameIcon='h-6 sm590:h-8 h-6 sm590:w-8'
                    />
                    <CustomButton
                        text="Eliminar Evento"
                        color="#ef4444"
                        width=""
                        height=""
                        onClick={onEliminate}
                        className='flex-col w-[90%] xs360:w-[70%] sm750:w-[30%] text-center translate-y-[20px] sm750:translate-y-[0px]'
                        icon='/images/logos/Icono_Confirmar_Blanco.png'
                        classNameText='text-sm sm590:text-xl'
                        classNameIcon='h-6 sm590:h-8 h-6 sm590:w-8'
                    />
                </div>
            </div>
            {showPopup && <PopUpAddEvent onClose={handleOnCloseAddEvent} equipos={datosEquipos} idPartido={Number(idPartido)} currentMinute={Math.floor(currentTime / 60)} segundoTiempo={segundoTiempo} />}

            {/** Alertas de las acciones */}
            <CustomAlert message={messageAlertCustom} show={showAlertCustom} onClose={handleCloseAlertCustom} />

            <CustomAlertAcceptOrCancel message={messageAlertCustomAcceptOrCancel} onAccept={handleAcceptAlertAcceptOrCancel} onCancel={handleCancelAlertAceptOrCancel} show={showAlertCustomAcceptOrCancel} />
            {showPopUpAgregarDesempate && <PopUpAddTiebreaker id_partido={Number(idPartido)} onClose={handleClosePopUpAddTiebreaker} onSave={handleSavePopUpAddTiebreaker} datosEquipos={datosEquipos} userRole={userRole} />}

            <Timer
                startTimer={startTimer}
                onTimeUpdate={onTimeUpdate}
                onResetRef={(resetFn) => { timerResetRef.current = resetFn; }}
                onResetHalfTime={(resetFn) => { timerHalfResetRef.current = resetFn; }}
                startTimerHalf={segundoTiempo}
            />

            <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                <div className="flex-grow w-[95%] mx-4">
                    <EventsGrid events={datosEventos} onSelectedRow={setSelectedEventId} />
                </div>
            </div>

            <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                <div className="flex-col xl1200:flex-row w-[95%] mx-4 mt-[0px] xl1200:mt-[50px] mb-[60px] flex items-center justify-center xl1200:space-x-10">
                    {!(isMatchStarted || isMatchFinished) && (
                        <CustomButton
                            text="Iniciar Partido"
                            color="#E69500"
                            width=""
                            height=""
                            onClick={onInitGame}
                            disabled={isMatchStarted || isMatchFinished}
                            className={`flex-col w-[100%] xs270:w-[80%] xl1200:w-[30%] text-center mt-10 xl1200:mt-0 ${(isMatchStarted || isMatchFinished) ? 'opacity-50' : ''}`}
                            icon='/images/logos/Icono_Finalizar_Blanco.png'
                            classNameText='text-sm xs360:text-x'
                            classNameIcon='w-6 sm590:h-8 w-6 sm590:w-8'
                        />
                    )}

                    {!(!isMatchStarted || isFirstHalfFinished) && (
                        <CustomButton
                            text="Finalizar Primer Tiempo"
                            color="#E69500"
                            width=""
                            height=""
                            onClick={onFinishFirstTime}
                            disabled={!isMatchStarted || isFirstHalfFinished}
                            className={`flex-col w-[100%] xs270:w-[80%] xl1200:w-[30%] text-center mt-10 xl1200:mt-0 ${(!isMatchStarted || isFirstHalfFinished) ? 'opacity-50' : ''}`}
                            icon='/images/logos/Icono_Finalizar_Blanco.png'
                            classNameText='text-sm xs360:text-x'
                            classNameIcon='w-6 sm590:h-8 w-6 sm590:w-8'
                        />
                    )}

                    {!(!isFirstHalfFinished || isSecondHalfStarted) && (
                        <CustomButton
                            text="Iniciar Segundo Tiempo"
                            color="#E69500"
                            width=""
                            height=""
                            onClick={onInitSecondTime}
                            disabled={!isFirstHalfFinished || isSecondHalfStarted}
                            className={`flex-col w-[100%] xs270:w-[80%] xl1200:w-[30%] text-center mt-10 xl1200:mt-0 ${(!isFirstHalfFinished || isSecondHalfStarted) ? 'opacity-50' : ''}`}
                            icon='/images/logos/Icono_Finalizar_Blanco.png'
                            classNameText='text-sm xs360:text-x'
                            classNameIcon='w-6 sm590:h-8 w-6 sm590:w-8'
                        />
                    )}

                    {!(!isSecondHalfStarted || isMatchFinished) && (
                        <CustomButton
                            text="Finalizar Partido"
                            color="#E69500"
                            width=""
                            height=""
                            onClick={onFinishGame}
                            disabled={!isSecondHalfStarted || isMatchFinished}
                            className={`flex-col w-[100%] xs270:w-[80%] xl1200:w-[30%] text-center mt-10 xl1200:mt-0 ${(!isSecondHalfStarted || isMatchFinished) ? 'opacity-50' : ''}`}
                            icon='/images/logos/Icono_Finalizar_Blanco.png'
                            classNameText='text-sm xs360:text-x'
                            classNameIcon='w-6 sm590:h-8 w-6 sm590:w-8'
                        />
                    )}

                </div>
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

            <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                <div className="flex-grow w-[95%] mx-4 flex items-center justify-center">
                    <CustomButton
                        text="CONFIRMAR"
                        color="#22c55e"
                        width=""
                        height=""
                        onClick={onConfirm}
                        className='flex-col w-[100%] xs270:w-[80%] sm750:w-[30%] text-center'
                        icon='/images/logos/Icono_Confirmar_Blanco.png'
                        classNameText='text-sm xs360:text-x'
                        classNameIcon='w-6 sm590:h-8 w-6 sm590:w-8'
                    />
                </div>
            </div>
            <br />
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

export default PartidoDatos;