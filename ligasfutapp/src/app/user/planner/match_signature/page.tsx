"use client"
import React, { useState, useEffect, Suspense, useCallback } from 'react';
import SideBar from '../../../../components/components_generics/side_bar/SideBar';
import SearchBar from '../../../../components/components_generics/search_bar/SearchBar';
import Footer from '../../../../components/components_generics/footer/Footer';
import TitleWithImages from '../../../../components/components_generics/title_with_images/TitleWithImages';
import TeamsGrids from '../../../../components/user/planner/match_signature/PlayersGrid';
import CustomButton from '../../../../components/components_generics/button/CustomButton';
import { useSearchParams, useRouter } from 'next/navigation';
import { obtenerDatosUsuario } from '@/services/usuarioService';
import { menuOptionsPlanillero } from '../../../../components/components_generics/footer/menu_options/MenuOptions';
import { obtenerEquiposPorPartido, obtenerJugadoresPorPartido } from '@/services/partidoService';
import { actualizarJugadorPartido } from '@/services/jugadorPartidoService';
import { RingLoader } from 'react-spinners';
import CustomAlert from '../../../../components/components_generics/custom_alert/CustomAlert';

const PartidoFirma: React.FC = () => {
    return (
        <div className="min-h-screen bg-cream-faf9f6">
            <Suspense fallback={<div>Loading...</div>}>
                <PartidoFirmaContent />
            </Suspense>
        </div>
    );
};

const PartidoFirmaContent = () => {
    const [updatedPlayers, setUpdatedPlayers] = useState({ local: [], visitante: [] });
    const [isOpen, setIsOpen] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const router = useRouter();
    const [datosUsuario, setDatosUsuario] = useState<any>(null);
    const [datosEquipos, setDatosEquipos] = useState<any>(null);
    const [jugadores, setJugadores] = useState<any>([]);
    const searchParams = useSearchParams();
    const userRole = searchParams.get('role');
    const idPartido = searchParams.get('id_p');
    const [showAlertCustom, setShowAlertCustom] = useState(false);
    const [messageAlertCustom, setMessageAlertCustom] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleIsLoading = (isLoading: boolean) => {
        setIsLoading(isLoading);
    };

    const handlePlayersUpdate = useCallback((players) => {
        // Solo actualiza si los datos han cambiado realmente
        if (JSON.stringify(players) !== JSON.stringify(updatedPlayers)) {
            setUpdatedPlayers(players);
        }
    }, [updatedPlayers]);

    useEffect(() => {
        const fetchDatos = async () => {
            try {
                // Obtener datos del usuario
                const usuario = await obtenerDatosUsuario();
                setDatosUsuario(usuario);

                // Obtener datos de los equipos
                const equipos = await obtenerEquiposPorPartido(Number(idPartido));
                setDatosEquipos(equipos);

                // Obtener jugadores por partido
                const jugadoresData = await obtenerJugadoresPorPartido(Number(idPartido));
                const jugadoresLocal = jugadoresData.filter(j => j.equipo_tipo === 'local');
                const jugadoresVisitante = jugadoresData.filter(j => j.equipo_tipo === 'visitante');

                setJugadores({
                    local: jugadoresLocal,
                    visitante: jugadoresVisitante
                });

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

    const onAccept = async () => {
        try {
            setIsLoading(true);
            // Prepara los datos para enviar al backend
            const allPlayers = [...updatedPlayers.local, ...updatedPlayers.visitante].map(player => ({
                id_jugador: player.id_jugador,
                id_jugador_partido: player.id_jugador_partido,
                id_partido: idPartido,
                dorsal: player.dorsal || null,
                asistencia: player.dorsal ? true : false,
                capitan: 0,
                activo: 1
            }));
            var resultActualizar = '';

            try {
                resultActualizar = await actualizarJugadorPartido(allPlayers);
            } catch (updateError) {
                console.error(`Error al actualizar los jugadores: `, updateError);
            }

            setIsLoading(false);
            if (resultActualizar) {
                setMessageAlertCustom("¡Se ha registrado la asistencia de cada jugador con éxito!");
                setShowAlertCustom(true);
                setTimeout(() => {
                    if (process.env.NODE_ENV === 'production') {
                        router.push(`/user/planner/match_data.html?role=${userRole}&id_p=${idPartido}`);
                    } else {
                        router.push(`/user/planner/match_data?role=${userRole}&id_p=${idPartido}`);
                    }
                    // router.push(`/user/planner/match_data?role=${userRole}&id_p=${idPartido}`);
                }, 3000);
            }
        } catch (error) {
            setIsLoading(false);
            console.error('Error al registrar la asistencia:', error);
            alert('Error al registrar la asistencia');
        }
    };

    // Cerrar las alertas
    const handleCloseAlertCustom = () => {
        setShowAlertCustom(false);
    };

    // Generar dinámicamente las opciones del menú
    const menuOptionsLeft = menuOptionsPlanillero.left.map((option) => ({
        ...option,
        color: option.label === 'Firma' ? 'text-blue-500' : option.color
    }));

    const menuOptionsRight = menuOptionsPlanillero.right.map((option) => ({
        ...option,
    }));

    // Datos para los equipos, solo asigna si datosEquipos no es null
    const equipoLocal = datosEquipos
        ? {
            id_jugador_partido: datosEquipos.id_jugador_partido,
            nombre: datosEquipos.nombre_equipo_local,
            logo: datosEquipos.logo_equipo_local,
            jugadores: jugadores.local || []
        }
        : null;

    const equipoVisitante = datosEquipos
        ? {
            id_jugador_partido: datosEquipos.id_jugador_partido,
            nombre: datosEquipos.nombre_equipo_visitante,
            logo: datosEquipos.logo_equipo_visitante,
            jugadores: jugadores.visitante || []
        }
        : null;

    return (
        <div className="min-h-screen bg-cream-faf9f6 overflow-x-hidden">
            <div className={`${isOpen ? 'lg:ml-70 ml-0' : 'lg:ml-[0%] ml-[0%]'}`}>
                <SideBar userType='Planillero' menuDisabled={false} onToggleSidebar={handleSidebarToggle} onToggleSidebarMobile={handleSidebarToggleMobile} isMobileOpen={isMobileOpen} id_partido={Number(idPartido)} />
            </div>

            <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                <div className={`transition-all duration-300 ${isOpen ? 'lg:w-[75%] xl1500:w-[85%] lg:left-[21%] xl1500:left-[13%]' : 'w-[95%] xxs:w-[90%] xl1500:w-[95%] lg:left-[6.5%] xl1500:left-[3.5%]'}  mx-4 my-4 top-0 xxs:left-[3.6%] z-20`}>
                    <SearchBar onToggleSidebarMobile={handleSidebarToggleMobile} userType={userRole} userName={datosUsuario.primer_nombre + " " + datosUsuario.primer_apellido} userPhotoBlob={datosUsuario.foto} />
                </div>
            </div>

            <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                <div className="flex-grow w-[95%] mx-4 mt-[10px]">
                    <TitleWithImages
                        leftImageSrc="/images/logos/Logo_Lista.png"
                        rightImageSrc="/images/logos/soccer-player.png"
                        titleText="Firma"
                        leftImageOpacity={1}
                        rightImageOpacity={1}
                        titleOpacity={1}
                    />
                </div>
            </div>

            <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                {datosEquipos && (
                    <div className="flex-grow w-[95%] mx-4 mt-[50px]">
                        <TeamsGrids equipoLocal={equipoLocal} equipoVisitante={equipoVisitante} onPlayersUpdate={handlePlayersUpdate} />
                    </div>
                )}
            </div>

            <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                <div className="flex-grow w-[95%] mx-4 mt-[50px] mb-[60px] flex items-center justify-center">
                    <CustomButton text="Aceptar" color="#28c76f" width="" height="" onClick={onAccept} className='flex-col w-[60%] xxs:w-[30%] text-center text-4xl' classNameText='text-[16px]' classNameIcon='w-6 sm590:w-8 w-6 sm590:h-8' icon='/images/logos/Icono_Confirmar_Blanco.png' />
                </div>
            </div>

            {/** Alertas de las acciones */}
            <CustomAlert message={messageAlertCustom} show={showAlertCustom} onClose={handleCloseAlertCustom} />

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
                    userType='Planillero'
                    menuOptionsLeft={menuOptionsLeft}
                    menuOptionsRight={menuOptionsRight}
                    id_partido={Number(idPartido)}
                />
            </div>
        </div>
    );
};

export default PartidoFirma;