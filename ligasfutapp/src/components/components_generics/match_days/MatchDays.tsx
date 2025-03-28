import React, { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MatchesGrid from './MatchesGrid';
import Image from 'next/image';
import CustomButton from '@/components/components_generics/button/CustomButton';
import PopUpEditMatch from './pop-up_edit_match/page';
import { actualizarPartido } from '@/services/partidoService';
import { obtenerFixturesPorJornadaTorneoPlayoff, obtenerFixturesPorJornadaTorneoLiga, obtenerFixturesPorJornadaTorneoLigaPlayOff } from '@/services/fixtureService';
import { obtenerSeriePartidosSegunFixture } from '@/services/fixturesOrigenService';
import { obtenerEquipoEnDescanso } from '@/services/equipoService';
import { TIPOS_TORNEOS, USER_ROLES } from '@/constants';
import CustomAlert from '../custom_alert/CustomAlert';
import { RingLoader } from 'react-spinners';

const MatchDays = ({ idTorneoCategoria, jornadas, tipoUsuario, tipoTorneo, onPlanillar = (fixture: any) => { } }) => {

    const [showPopupEditMatch, setShowPopupEditMatch] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const [datosJornadas, setDatosJornadas] = useState(null);
    const [jornadaActual, setJornadaActual] = useState(null);
    const [totalJornadas, setTotalJornadas] = useState(null);
    const [datosFixtures, setDatosFixtures] = useState<any>([]);
    const [equipoEnDescanso, setEquipoEnDescanso] = useState(null);
    const [datosPartidoAEditar, setDatosPartidoAEditar] = useState<any>(null);
    const [idPartidoSeleccionado, setIdPartidoSeleccionado] = useState<number | null>(null);
    const [nombreEtapaActual, setNombreEtapaActual] = useState(null);
    const [nombreEncuentro, setNombreEncuentro] = useState(null);
    const [editarFixture, setEditarFixture] = useState(false);
    const [showAlertCustom, setShowAlertCustom] = useState(false);
    const [messageAlertCustom, setMessageAlertCustom] = useState('');
    const router = useRouter();

    const obtenerFixturesSegunJornada = useCallback(async (idTorneoCategoria: number, idJornada: any) => {
        try {
            let posicionActual = window.scrollY;

            if (tipoTorneo === TIPOS_TORNEOS.PLAY_OFF) {
                const fixturesPorJornadasYTorneoCategoria = await obtenerFixturesPorJornadaTorneoPlayoff(idTorneoCategoria, idJornada);
                console.log("fixturesPorJornadasYTorneoCategoria: ", fixturesPorJornadasYTorneoCategoria);
                const nombreEtapa = fixturesPorJornadasYTorneoCategoria.data.data[0].etapa;
                const primeraPalabraEtapa = nombreEtapa.split(" ")[0]; // Para obtener solo la primera palabra del nombre de la etapa

                const seriePartidos = await obtenerSeriePartidosSegunFixture(fixturesPorJornadasYTorneoCategoria.data.data[0].id_fixture);
                let nombreEncuentro = '';

                window.scrollTo({ top: posicionActual, behavior: "instant" });

                if (seriePartidos.success && seriePartidos.data.length > 1) {
                    const posicion = seriePartidos.data.findIndex(partido => partido.id_fixture === fixturesPorJornadasYTorneoCategoria.data.data[0].id_fixture);

                    if (seriePartidos.data.length === 2) {
                        if (posicion === 0) {
                            nombreEncuentro = '(Ida)'
                        } else if (posicion === 1) {
                            nombreEncuentro = '(Vuelta)'
                        }
                    } else {
                        nombreEncuentro = '(Encuentro ' + posicion + ")";
                    }
                }
                setDatosFixtures(fixturesPorJornadasYTorneoCategoria.data.data || []);
                setNombreEtapaActual(primeraPalabraEtapa);
                setNombreEncuentro(nombreEncuentro);
            } else if (tipoTorneo === TIPOS_TORNEOS.LIGA) {
                const fixturesPorJornadasYTorneoCategoria = await obtenerFixturesPorJornadaTorneoLiga(idTorneoCategoria, idJornada);
                console.log("fixturesPorJornadasYTorneoCategoria: ", fixturesPorJornadasYTorneoCategoria);
                const equipoEnDescanso = await obtenerEquipoEnDescanso(idTorneoCategoria, idJornada);
                setEquipoEnDescanso(equipoEnDescanso.message.data[0] || []);
                window.scrollTo({ top: posicionActual, behavior: "instant" });

                setDatosFixtures(fixturesPorJornadasYTorneoCategoria.data.data || []);

            } else if (tipoTorneo === TIPOS_TORNEOS.LIGA_PLAY_OFF) {
                const fixturesPorJornadasYTorneoCategoria = await obtenerFixturesPorJornadaTorneoLigaPlayOff(idTorneoCategoria, idJornada);
                console.log("fixturesPorJornadasYTorneoCategoria: ", fixturesPorJornadasYTorneoCategoria);

                const nombreEtapa = fixturesPorJornadasYTorneoCategoria.data.data[0].nombre_etapa;
                const primeraPalabraEtapa = nombreEtapa !== null ? nombreEtapa.split(" ")[0] : ""; // Para obtener solo la primera palabra del nombre de la etapa
                const equipoEnDescanso = await obtenerEquipoEnDescanso(idTorneoCategoria, idJornada);

                setEquipoEnDescanso(
                    Array.isArray(equipoEnDescanso?.message?.data)
                        ? (equipoEnDescanso.message.data[0] || [])
                        : []
                );

                window.scrollTo({ top: posicionActual, behavior: "instant" });

                setDatosFixtures(fixturesPorJornadasYTorneoCategoria.data.data || []);
                setNombreEtapaActual(primeraPalabraEtapa);
                setNombreEncuentro(nombreEncuentro);
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
    }, [router, tipoTorneo, nombreEncuentro]);

    useEffect(() => {
        const fetchDatos = async () => {
            if (jornadas && jornadas.length > 0 && !jornadaActual) {
                setDatosJornadas(jornadas);
                setJornadaActual(jornadas[0]);
                setTotalJornadas(jornadas.length);
                await obtenerFixturesSegunJornada(idTorneoCategoria, jornadas[0].id_jornada);
            }
        };

        fetchDatos();
    }, [jornadas, jornadaActual, idTorneoCategoria, obtenerFixturesSegunJornada]);

    if (!equipoEnDescanso) {

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

    const handleSaveMatch = async (updatedMatch: any) => {
        // Agregar idPartidoSeleccionado al objeto updatedMatch
        const updatedMatchWithId = {
            ...updatedMatch,
            id_partido: idPartidoSeleccionado, // Asegúrate de que coincide con la clave esperada
            id_torneo_categoria: datosPartidoAEditar.id_torneo_categoria,
            id_fixture: datosPartidoAEditar.id_fixture,
        };

        // Extraer equipoLocal y equipoVisitante, y dejar el resto en cleanedMatch
        const { equipoLocal, equipoVisitante, ...cleanedMatch } = updatedMatchWithId;

        const resActualizarPartido = await actualizarPartido(idPartidoSeleccionado, cleanedMatch);

        if (resActualizarPartido.success) {
            setMessageAlertCustom("¡El partido se ha actualizado correctamente!");
            setShowAlertCustom(true);
            setShowPopupEditMatch(false);

            obtenerFixturesSegunJornada(idTorneoCategoria, jornadaActual.id_jornada);
        } else {
            alert("¡Error al actualizar el partido!");
        }
    };

    const handlePrevRound = async () => {
        let posicionActual = window.scrollY;

        setShowLoading(true);
        if (jornadaActual.numero > 1) {
            setJornadaActual(datosJornadas[jornadaActual.numero - 2])
            await obtenerFixturesSegunJornada(idTorneoCategoria, datosJornadas[jornadaActual.numero - 2].id_jornada);

            // Esto porque el Suspense cuando se activa hace que la pantalla aparezca en el inicio.
            setTimeout(() => {
                window.scrollTo({ top: posicionActual, behavior: "instant" });
            }, 800);
        }
        setShowLoading(false);
    };

    const handleNextRound = async () => {
        let posicionActual = window.scrollY;

        setShowLoading(true);
        if (jornadaActual.numero < totalJornadas) {
            setJornadaActual(datosJornadas[jornadaActual.numero]);

            await obtenerFixturesSegunJornada(idTorneoCategoria, datosJornadas[jornadaActual.numero].id_jornada);

            // Esto porque el Suspense cuando se activa hace que la pantalla aparezca en el inicio.
            setTimeout(() => {
                window.scrollTo({ top: posicionActual, behavior: "instant" });
            }, 800);

        }
        setShowLoading(false);
    };

    const handleEditar = (idFixture: number, editar: boolean) => {
        // Busca los datos del partido seleccionado
        const partidoSeleccionado = datosFixtures.find((partido: { id_fixture: number; }) => partido.id_fixture === idFixture);

        if (partidoSeleccionado) {
            // Puedes guardar estos datos en un estado o procesarlos
            setIdPartidoSeleccionado(partidoSeleccionado.id_partido);
            setDatosPartidoAEditar(partidoSeleccionado);
            setEditarFixture(editar);

            setShowPopupEditMatch(true);
        } else {
            console.error("Partido no encontrado con id:", partidoSeleccionado.id_partido);
        }
    };

    const handleOnPlanillar = (fixture: number) => {
        onPlanillar(fixture);
    };

    return (
        <div>
            <div className="flex flex-col xs410:flex-row items-center justify-center px-6 py-0 xs410:py-4 h-[85px]">
                <div className="flex items-center">
                    <Image
                        width={100}
                        height={100}
                        src={`${(tipoUsuario === USER_ROLES.PLANILLERO || tipoUsuario === USER_ROLES.DELEGADO || tipoUsuario === USER_ROLES.JUGADOR || tipoUsuario === USER_ROLES.HINCHA) ? '/images/logos/Icono_Calendario.png' : '/images/logos/Icono_Calendario_Blanco.png'}`}
                        className="shadow-lg h-10 w-10 mt-1 mr-2"
                        alt="Icono Tabla"
                    />
                    <h2 className={`text-xl sm590:text-2xl sm670:text-3xl font-semibold tracking-tight ${(tipoUsuario === USER_ROLES.PLANILLERO || tipoUsuario === USER_ROLES.DELEGADO || tipoUsuario === USER_ROLES.JUGADOR || tipoUsuario === USER_ROLES.HINCHA) ? 'text-black' : 'text-white'} text-center`}>Jornadas de partidos</h2>
                </div>
            </div>

            {/* Selección de jornada */}
            <div className="flex items-center flex items-center justify-center text-center">
                <IconButton onClick={handlePrevRound} disabled={!jornadaActual || jornadaActual.numero === 1}>
                    <ArrowBackIcon className={`${(tipoUsuario === USER_ROLES.PLANILLERO || tipoUsuario === USER_ROLES.JUGADOR || tipoUsuario === USER_ROLES.DELEGADO || tipoUsuario === USER_ROLES.HINCHA) ? 'text-black' : 'text-white'} ${!jornadaActual || jornadaActual.numero === 1 ? 'opacity-50 cursor-default' : ''}`} />
                </IconButton>

                <span className={`text-3xl font-bold ${(tipoUsuario === USER_ROLES.PLANILLERO || tipoUsuario === USER_ROLES.DELEGADO || tipoUsuario === USER_ROLES.JUGADOR || tipoUsuario === USER_ROLES.HINCHA) ? 'text-black' : 'text-white'} mx-4`}>
                    {jornadaActual
                        ? `${jornadaActual.nombre}${(tipoTorneo !== TIPOS_TORNEOS.LIGA)
                            ? `${tipoTorneo === TIPOS_TORNEOS.LIGA_PLAY_OFF
                                ?
                                `${(nombreEtapaActual !== "" && nombreEtapaActual !== null) ? `: ${nombreEtapaActual}` : ""} ${nombreEncuentro !== null ? nombreEncuentro : ""}`
                                :
                                ""}`
                            :
                            ""}`
                        : "Cargando..."}
                </span>

                <IconButton onClick={handleNextRound} disabled={!jornadaActual || jornadaActual.numero === totalJornadas}>
                    <ArrowForwardIcon className={`${(tipoUsuario === USER_ROLES.PLANILLERO || tipoUsuario === USER_ROLES.DELEGADO || tipoUsuario === USER_ROLES.JUGADOR || tipoUsuario === USER_ROLES.HINCHA) ? 'text-black' : 'text-white'} ${!jornadaActual || jornadaActual.numero === totalJornadas ? 'opacity-50 cursor-default' : ''}`} />
                </IconButton>
            </div>
            <br />
            <MatchesGrid fixtures={datosFixtures} onEditar={handleEditar} tipoUsuario={tipoUsuario} onPlanillar={handleOnPlanillar} tipoTorneo={tipoTorneo} />
            {
                showPopupEditMatch && <PopUpEditMatch
                    onCancel={() => setShowPopupEditMatch(false)}
                    partidoAEditar={datosPartidoAEditar}
                    onSave={handleSaveMatch}
                    editar={editarFixture}
                    tipoUsuario={tipoUsuario}
                />
            }

            {(tipoTorneo === TIPOS_TORNEOS.LIGA && equipoEnDescanso?.id_equipo) && (
                <p className={`text-3xl ${(tipoUsuario === USER_ROLES.PLANILLERO || tipoUsuario === USER_ROLES.JUGADOR || tipoUsuario === USER_ROLES.DELEGADO || tipoUsuario === USER_ROLES.HINCHA) ? 'text-black' : 'text-white'} text-sm sm590:text-xl sm670:text-2xl flex items-center justify-center`}>Equipo en descanso: &nbsp; <strong>{equipoEnDescanso.equipo_descanso}</strong></p>
            )}

            {(tipoTorneo === TIPOS_TORNEOS.LIGA_PLAY_OFF && equipoEnDescanso?.id_equipo) && (
                <p className={`text-3xl ${(tipoUsuario === USER_ROLES.PLANILLERO || tipoUsuario === USER_ROLES.JUGADOR || tipoUsuario === USER_ROLES.DELEGADO || tipoUsuario === USER_ROLES.HINCHA) ? 'text-black' : 'text-white'} text-sm sm590:text-xl sm670:text-2xl flex items-center justify-center`}>Equipo en descanso: &nbsp; <strong>{equipoEnDescanso.equipo_descanso} </strong> &nbsp; del &nbsp; <strong>{equipoEnDescanso.nombre_grupo}</strong> </p>
            )}

            <CustomAlert message={messageAlertCustom} onClose={() => setShowAlertCustom(false)} show={showAlertCustom} />
        </div>
    );

};

export default MatchDays;
