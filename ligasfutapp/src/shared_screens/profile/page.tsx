// "use client";
import React, { Suspense, useState, useEffect, useCallback } from 'react';
import SideBar from '@/components/components_generics/side_bar/SideBar';
import SearchBar from '@/components/components_generics/search_bar/SearchBar';
import Footer from '@/components/components_generics/footer/Footer';
import TitleWithImages from '@/components/components_generics/title_with_images/TitleWithImages';
import PlayerPhotoName from '@/components/user/player/profile/PlayerPhotoName';
import PlayerBasicInfo from '@/components/user/player/profile/PlayerBasicInfo';
import PlayerGoals from '@/components/user/player/profile/PlayerGoals';
import PlayerDetails from '@/components/user/player/profile/PlayerDetails';
import PopUpEditProfile from '@/components/user/player/profile/pop-up_edit_profile/page';
import CustomButton from '@/components/components_generics/button/CustomButton';
import { RingLoader } from 'react-spinners';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { menuOptionsJugador, menuOptionsDelegado } from '@/components/components_generics/footer/menu_options/MenuOptions';
import { obtenerDatosUsuario } from '@/services/usuarioService';
import { obtenerDatosJugadorPorUsuario } from '@/services/jugadorService';
import { obtenerDatosLigaSegunIdJugador } from '@/services/ligaService';
import SelectLeague from '@/components/user/player/initiation_dni_player/SelectLeague';
import Image from 'next/image';
import CustomAlert from '@/components/components_generics/custom_alert/CustomAlert';

interface PerfilJugadorProps {
    userRole: string;
}

const PerfilJugador: React.FC<PerfilJugadorProps> = ({ userRole }) => {
    return (
        <div className="min-h-screen bg-cream-faf9f6">
            <Suspense fallback={<div>Loading...</div>}>
                <InnerPerfilJugador userRole={userRole} />
            </Suspense>
        </div>
    );
};

const InnerPerfilJugador: React.FC<PerfilJugadorProps> = ({ userRole }) => {
    const [showPopup, setShowPopup] = useState(false);
    const searchParams = useSearchParams();
    const [isOpen, setIsOpen] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [datosUsuario, setDatosUsuario] = useState<any>(null);
    const [datosJugador, setDatosJugador] = useState<any>(null);
    const router = useRouter();
    const [showAlertCustom, setShowAlertCustom] = useState(false);
    const [messageAlertCustom, setMessageAlertCustom] = useState('');
    // const userRole = searchParams.get('role');
    const [isLoading, setIsLoading] = useState(false);
    const [hayCodigoLiga, setHayCodigoLiga] = useState(null);
    const [datosLigas, setDatosLigas] = useState<any>(null);
    const [codigoLiga, setCodigoLiga] = useState('');
    const [nombreLiga, setNombreLiga] = useState<any>(null);
    const [showLigas, setShowLigas] = useState(false);
    const [showCodigoLiga, setShowCodigoLiga] = useState(false);
    const [selectedLeague, setSelectedLeague] = useState<number | null>(null);
    const [ligaJugadorSeleccionada, setLigaJugadorSeleccionada] = useState<number | null>(null);

    const handleIsLoading = (isLoading: boolean) => {
        setIsLoading(isLoading);
    };

    const obtenerDatos = useCallback(async () => {
        try {
            // Obtener datos del usuario
            const usuario = await obtenerDatosUsuario();
            setDatosUsuario(usuario);

            // Obtener datos del jugador según el ID del usuario
            const datosJugador = await obtenerDatosJugadorPorUsuario(usuario.id_usuario);
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

            const datosLiga = await obtenerDatosLigaSegunIdJugador(datosJugador.id_jugador);

            if (datosLiga.length > 0) {
                if (datosLiga.length === 1) {
                    setLigaJugadorSeleccionada(datosLiga[0]);
                    setSelectedLeague(datosLiga[0].id_liga);
                    setDatosLigas(datosLiga);
                    const codigoLigaNumero = Number(datosLiga[0].Liga.codigo_liga); // Para convertir el "0" a 0
                    setHayCodigoLiga(codigoLigaNumero !== 0);
                    setNombreLiga(datosLiga[0].Liga.nombre);
                    setCodigoLiga(datosLiga[0].codigo_liga);
                    setShowCodigoLiga(true);
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
    }, [router, userRole]);

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
        setHayCodigoLiga(codigoLigaNumero);
        setLigaJugadorSeleccionada(ligaSeleccionada);
        setSelectedLeague(idLiga);
        setCodigoLiga(ligaSeleccionada.codigo_liga);
        setShowCodigoLiga(true);
    };

    useEffect(() => {
        obtenerDatos();
    }, [obtenerDatos]);

    if (!datosUsuario || !datosJugador) {
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

    const { id_usuario, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, dni, fecha_nacimiento, nacionalidad, foto } = datosUsuario;
    const { id_jugador, id_equipo, goles, asistencias, rojas, amarillas, lesiones, partidos_jugados, estado, id_admin, fecha_aprobacion, verificado, Activo } = datosJugador;

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
            color: option.label === 'Mi perfil' ? 'text-blue-500' : option.color
        }));

        menuOptionsRight = menuOptionsJugador.right.map((option) => ({
            ...option,
        }));
    } else if (userRole === 'Delegado') {
        menuOptionsLeft = menuOptionsDelegado.left.map((option) => ({
            ...option,
            color: option.label === 'Mi perfil' ? 'text-blue-500' : option.color
        }));

        menuOptionsRight = menuOptionsDelegado.right.map((option) => ({
            ...option,
        }));
    }

    const handleSave = async () => {
        await obtenerDatos();
    };

    return (
        <>
            <div className={`${isOpen ? 'lg:ml-70 ml-0' : 'lg:ml-[0%] ml-[0%]'}`}>
                <SideBar userType={userRole} menuDisabled={false} onToggleSidebar={handleSidebarToggle} onToggleSidebarMobile={handleSidebarToggleMobile} isMobileOpen={isMobileOpen} />
            </div>

            <div className={`mt-0 flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                <div className={`transition-all duration-300 ${isOpen ? 'lg:w-[75%] xl1500:w-[85%] lg:left-[21%] xl1500:left-[13%]' : 'w-[95%] xxs:w-[90%] xl1500:w-[95%] lg:left-[6.5%] xl1500:left-[3.5%]'}  mx-4 my-4 top-0 xxs:left-[3.6%] z-20`}>
                    <SearchBar onToggleSidebarMobile={handleSidebarToggleMobile} userType={userRole} userName={primer_nombre + " " + primer_apellido} userPhotoBlob={foto} />
                </div>
            </div>
            <br />

            <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                <div className="flex flex-col sm850:flex-row justify-center items-center -translate-x-[0%] sm500:-translate-x-[13%]">
                    <TitleWithImages
                        leftImageSrc="/images/logos/soccer-player.png"
                        rightImageSrc="/images/logos/soccer-player.png"
                        titleText="Mi perfil"
                        leftImageOpacity={1}
                        rightImageOpacity={1}
                        titleOpacity={1}
                    />
                </div>
            </div>
            <br />
            <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                <div className="flex flex-col sm850:flex-row justify-center items-center w-full">
                    {/* <EditProfileButton onEditProfile={() => setShowPopup(true)} /> */}
                    {showPopup && (
                        <PopUpEditProfile
                            onClose={() => setShowPopup(false)}
                            onSave={handleSave}
                            id_usuario={id_usuario}
                            primer_nombre={datosUsuario.primer_nombre}
                            segundo_nombre={datosUsuario.segundo_nombre}
                            primer_apellido={datosUsuario.primer_apellido}
                            segundo_apellido={datosUsuario.segundo_apellido}
                            foto={datosUsuario.foto}
                            dni={datosUsuario.dni}
                            fecha_nacimiento={new Date(datosUsuario.fecha_nacimiento).toISOString().split('T')[0]} // Formato YYYY-MM-DD
                            nacionalidad={datosUsuario.nacionalidad}
                            setIsLoading={handleIsLoading}
                            ligaJugadorSeleccionada={ligaJugadorSeleccionada}
                        />
                    )}

                    <CustomButton
                        text="Editar perfil"
                        color="#3b82f6"
                        width=""
                        height=""
                        onClick={() => setShowPopup(true)}
                        className='text-sm xs360:text-xl flex-col w-[80%] sm750:w-[20%] h-auto -translate-x-[3%] sm750:-translate-x-[7%]'
                        classNameIcon='w-6 sm590:h-8 w-6 sm590:w-8'
                        icon="/images/logos/Icono_Confirmar_Blanco.png"
                    />
                </div>
            </div>

            <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                <div className="flex-grow w-[95%] mx-4 mt-10">
                    <PlayerPhotoName name={primer_nombre + " " + primer_apellido} photo={foto} />
                </div>
            </div>

            <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                <div className="flex-grow w-[95%] mx-4 mt-[10px] lg:mt-[100px] translate-x-[0%] sm:translate-x-[2%] lg:translate-x-[0%]">
                    <PlayerBasicInfo
                        dni={dni || ''}
                        birthDate={fecha_nacimiento || ''}
                        nationality={nacionalidad || ''}
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

            <br />

            {selectedLeague !== null && (
                <div
                    className={`flex flex-1 flex-col justify-start items-center transition-all duration-300 opacity-[70%] ${isOpen
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

            {hayCodigoLiga && (
                <>
                    <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                        <div className="flex-grow w-[95%] mx-4 mt-[0px] sm750:mt-[10px]">
                            <div className="flex flex-col items-center  -translate-x-[2%] opacity-[70%]">
                                <div className="flex items-center">
                                    <Image width={100} height={100} src="/images/logos/Icono_Codigo_Liga.png" alt="codigo_liga" className="mr-2 h-6 sm750:h-10 w-6 sm750:w-10" />
                                    <p className="text-xl sm590:text-2xl font-bold">Código de liga</p>
                                </div>
                                <div className="border p-2 mt-1 rounded-xl shadow-xl border-2 border-black text-sm sm750:text-2xl">{codigoLiga}</div>
                            </div>
                        </div>
                    </div>
                    <br />
                </>
            )}

            <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                <div className="flex-grow w-[95%] mx-4 mt-[0px]">
                    <h2 className='w-full flex items-center justify-center text-xl sm750:text-2xl -translate-x-[2%]'><strong>Datos globales del jugador</strong></h2>
                </div>
            </div>

            <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                <div className="flex-grow w-[95%] mx-4 mt-[10px]">
                    <PlayerGoals goals={goles} />
                </div>
            </div>

            <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                <div className="flex-grow w-[95%] mx-4 mt-[10px]">
                    <PlayerDetails
                        matches={partidos_jugados}
                        goalAverage={
                            partidos_jugados === 0
                                ? "0.00"
                                : (goles / partidos_jugados).toFixed(2)
                        }
                        assists={asistencias}
                        redCards={rojas}
                        yellowCards={amarillas}
                        injuries={lesiones}
                    />
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
            <br />
            <br />
            <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                <Footer
                    userType={userRole}
                    menuOptionsLeft={menuOptionsLeft}
                    menuOptionsRight={menuOptionsRight}
                />
            </div>

            <CustomAlert message={messageAlertCustom} onClose={() => { setShowAlertCustom(false); }} show={showAlertCustom} />
        </>
    );
};

export default PerfilJugador;