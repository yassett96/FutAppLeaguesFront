"use client";
import React, { useState, useEffect, Suspense } from 'react';
import Timeline from './time_line/TimeLine';
import Result from './Result';
import Comments from './Comments';
import CustomButton from '@/components/components_generics/button/CustomButton';
import { useRouter } from 'next/navigation';
import { obtenerDatosUsuario } from '@/services/usuarioService';
import { obtenerEventosPorPartido } from '@/services/eventoService';
import { obtenerDesempate } from '@/services/desempateService';
import { RingLoader } from 'react-spinners';
import { EVENT_TYPES } from '@/constants';

const PartidoResumenCronologia: React.FC<PopUpTournamentDetailScorePlayerProps> = ({ detallesPartido, onClose }) => {
    return (
        <div className="min-h-screen bg-cream-faf9f6">
            <Suspense fallback={<div>Loading...</div>}>
                <PartidoResumenCronologiaContent detallesPartido={detallesPartido} onClose={onClose} />
            </Suspense>
        </div>
    );
};

interface PopUpTournamentDetailScorePlayerProps {
    detallesPartido: any;
    onClose?: () => void;
}

const PartidoResumenCronologiaContent: React.FC<PopUpTournamentDetailScorePlayerProps> = ({ detallesPartido, onClose }) => {
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
    const [datosDesempate, setDatosDesempate] = useState<any>(null);
    const [esDesempate, setEsDesempate] = useState<boolean>(false);
    const idPartido = detallesPartido[0].id_partido;

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchDatos = async () => {
            try {
                // Obtener datos del usuario
                const usuario = await obtenerDatosUsuario();
                setDatosUsuario(usuario);

                // Obtener los detalles del partido
                setDatosDetallesPartido(detallesPartido);

                // Obtener los eventos del partido
                const detallesPEventos = await obtenerEventosPorPartido(Number(idPartido));

                setDetallesEventosPartido(detallesPEventos.data);
                setIsLoading(false);

                let nombreEquipoLocal = detallesPartido[0].equipo_local;
                let nombreEquipoVisitante = detallesPartido[0].equipo_visitante;

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
                const [equipo1, equipo2] = equipos;
                const golesEquipo1 = golesPorEquipo[equipo1] || 0;
                const golesEquipo2 = golesPorEquipo[equipo2] || 0;

                // Actualizar estado local para los datos del partido
                if (detallesPartido) {
                    setPartidoData({
                        equipo_local: detallesPartido[0].equipo_local ?? "",
                        equipo_visitante: detallesPartido[0].equipo_visitante ?? "",
                        goles_local: golesEquipo1,
                        goles_visitante: golesEquipo2,
                        resultado_local: detallesPartido[0].resultado_local ?? "",
                        resultado_visitante: detallesPartido[0].resultado_visitante ?? "",
                        amonestaciones_local: detallesPartido[0].amonestaciones_local ?? "No amonestaciones",
                        amonestaciones_visitante: detallesPartido[0].amonestaciones_visitante ?? "No amonestaciones",
                        lesiones_local: detallesPartido[0].lesiones_local ?? "No lesiones",
                        lesiones_visitante: detallesPartido[0].lesiones_visitante ?? "No lesiones",
                        comentario_arbitro: detallesPartido[0].comentario_arbitro ?? "Sin comentarios del árbitro",
                        comentario_capitan_local: detallesPartido[0].comentario_capitan_local ?? "Sin comentarios",
                        comentario_capitan_visitante: detallesPartido[0].comentario_capitan_visitante ?? "Sin comentarios",
                    });
                    setNombreEquipoLocal(detallesPartido[0].equipo_local);
                    setNombreEquipoVisitante(detallesPartido[0].equipo_visitante);
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
    }, [router, idPartido, detallesPartido]);

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

    const handleCloseMatch = async () => {
        onClose();
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
                    'Gol': '/images/logos/Icono_Balon_Blanco.png',
                    'Asistencia': '/images/logos/Icono_Asistencia_Blanco.png',
                    'Tarjeta Amarilla': '/images/logos/Icono_Tarjeta_Amarilla.png',
                    'Tarjeta Roja': '/images/logos/Icono_Tarjeta_Roja.png',
                    'Lesión': '/images/logos/Icono_Lesiones.png',
                    'Sustitución Entra': '/images/logos/Icono_Jugador_Entrando.png',
                    'Sustitución Sale': '/images/logos/Icono_Jugador_Saliendo.png',
                    'Inicio del Partido': '/images/logos/Icono_Reloj.png',
                    'Fin del Partido': '/images/logos/Icono_Reloj.png',
                    'Fin del Primer Tiempo': '/images/logos/Icono_Reloj.png',
                    'Inicio del Segundo Tiempo': '/images/logos/Icono_Reloj.png',
                    'Auto-Gol': '/images/logos/Icono_Balon_Blanco.png',
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

    return (
        <div className='fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-30'>
            <div className="bg-[#1e3a8a] h-[900px] w-[80%] max-h-screen overflow-y-auto overflow-x-hidden rounded-xl p-4 custom-scrollbar">

                <Result
                    localTeam={partidoData.equipo_local}
                    visitorTeam={partidoData.equipo_visitante}
                    localGoals={partidoData.goles_local}
                    visitorGoals={partidoData.goles_visitante}
                />

                <Timeline events={transformedEvents || []} nombreEquipoLocal={nombreEquipoLocal} nombreEquipoVisitante={nombreEquipoVisitante} />

                <br />
                <br />

                {esDesempate && (
                    <>
                        <h2 className="flex items-center justify-center text-white flex-row text-4xl font-bold ml-[5%] xs340:ml-[0%] xs360:ml-[0%] xl-1100:ml-[4%]">Desempate</h2>
                        <div className="flex flex-row justify-center items-center mt-2 ml-[0%] w-[100%] text-white">
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
                    </>
                )}

                <br />
                <br />

                <Comments title={`Comentarios árbitros`} comments={partidoData.comentario_arbitro} icon='/images/logos/Icono_Arbitro_Blanco.png' />

                <Comments title={`Comentarios capitán ${partidoData.equipo_local}`} comments={partidoData.comentario_capitan_local} icon='/images/logos/Icono_Escudo_1_Blanco.png' />

                <Comments title={`Comentarios capitán ${partidoData.equipo_visitante}`} comments={partidoData.comentario_capitan_visitante} icon='/images/logos/Icono_Escudo_2_Blanco.png' />
                <br />
                <br />
                <div className='flex items-center justify-center'>
                    <CustomButton text="Cerrar" color="#22c55e" width="" height="" onClick={handleCloseMatch} className='flex-col lg:flex-row h-[80px] lg:h-[40px] w-[80%] sm750:w-[40%]' icon="/images/logos/Icono_Confirmar_Blanco.png" classNameText='text-2xl' classNameIcon='h-8 w-8' />
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

            </div>
        </div>
    );
};

export default PartidoResumenCronologia;