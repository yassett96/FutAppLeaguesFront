"use client";
import React, { useState, Suspense, useTransition, useEffect } from 'react';
import SideBar from '../../../../components/components_generics/side_bar/SideBar';
import SearchBar from '../../../../components/components_generics/search_bar/SearchBar';
import Footer from '../../../../components/components_generics/footer/Footer';
import WelcomeMessage from '../../../../components/user/player/initiation_dni_player/WelcomeMessage';
import DNIInput from '../../../../components/user/player/initiation_dni_player/DNIInput';
import CustomButton from '../../../../components/components_generics/button/CustomButton';
import SelectLeague from '@/components/user/player/initiation_dni_player/SelectLeague';
import { RingLoader } from 'react-spinners';
import { useSearchParams, useRouter } from 'next/navigation';
import { menuOptionsDelegado, menuOptionsJugador } from '../../../../components/components_generics/footer/menu_options/MenuOptions';
import { obtenerDatosUsuario } from '@/services/usuarioService';
import { obtenerDatosJugadorPorUsuario, actualizarVerificacionJugador } from '@/services/jugadorService';
import { obtenerDatosLigaSegunIdJugador } from '@/services/ligaService';
import Image from 'next/image';
import CustomAlert from '../../../../components/components_generics/custom_alert/CustomAlert';
import { actualizarCodigoLigaSegunIdJugadorYIdLiga } from '@/services/jugadorLigaService';

const Iniciacion_Jugador: React.FC = () => {
    return (
        <div className="min-h-screen bg-cream-faf9f6">
            <Suspense fallback={<div>Loading...</div>}>
                <IniciacionJugadorContent />
            </Suspense>
        </div>
    );
};

const IniciacionJugadorContent: React.FC = () => {
    const searchParams = useSearchParams();
    const userRole = searchParams.get('role') ?? '';
    const [isOpen, setIsOpen] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [datosJugador, setDatosJugador] = useState<any>(null);
    const [datosUsuario, setDatosUsuario] = useState<any>(null);
    // const [datosLiga, setDatosLiga] = useState<any>(null);
    const [dniInput, setDni] = useState('');
    const [hayCodigoLiga, setHayCodigoLiga] = useState(null);
    const [datosLigas, setDatosLigas] = useState<any>(null);
    const [codigoLiga, setCodigoLiga] = useState('');
    const [nombreLiga, setNombreLiga] = useState<any>(null);
    const [showForm, setShowForm] = useState<any>(false);
    const [showAlertCustom, setShowAlertCustom] = useState(false);
    const [messageAlertCustom, setMessageAlertCustom] = useState('');
    const [showLigas, setShowLigas] = useState(false);
    const [selectedLeague, setSelectedLeague] = useState<number | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchDatos = async () => {
            try {
                // Obtener datos del usuario
                const usuario = await obtenerDatosUsuario();
                // console.log("usuario: ", usuario);
                setDatosUsuario(usuario);

                // Obtener datos del jugador según el ID del usuario
                const datosJugador = await obtenerDatosJugadorPorUsuario(usuario.id_usuario);
                // console.log("datosJugador: ", datosJugador);
                setDatosJugador(datosJugador);

                const datosLiga = await obtenerDatosLigaSegunIdJugador(datosJugador.id_jugador);
                // console.log("datosLiga: ", datosLiga);

                if (datosLiga.length > 0) {
                    if (datosLiga.length === 1) {
                        setSelectedLeague(datosLiga[0].id_liga);
                        setDatosLigas(datosLiga);
                        const codigoLigaNumero = Number(datosLiga[0].Liga.codigo_liga); // Para convertir el "0" a 0
                        setHayCodigoLiga(codigoLigaNumero !== 0);
                        setNombreLiga(datosLiga[0].Liga.nombre);
                        setShowForm(true);
                    } else {
                        setDatosLigas(datosLiga);
                        setShowLigas(true);
                    }
                } else {
                    alert("No hay ligas asociadas a este jugador");
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
        };

        fetchDatos();
    }, [router]);

    // Manejar la redirección si el jugador ya está verificado
    useEffect(() => {
        if (datosJugador?.verificado) {            
            if (process.env.NODE_ENV === 'production') {                
                router.replace(`/user/player/profile.html?role=${userRole}`);
            } else {
                router.replace(`/user/player/profile?role=${userRole}`);                
            }
        }
    }, [datosJugador, router, userRole]);

    if (!datosUsuario || !datosJugador || !datosLigas) {
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
    const { verificado, id_jugador } = datosJugador;

    const handleDniChange = (newDni: string) => {
        setDni(newDni);
    };

    const onCodigoLigaChange = (codigoLiga: string) => {
        setCodigoLiga(codigoLiga);
    };

    const handleButtonClick = async () => {
        console.log("codigoLiga: ", codigoLiga.replace(/[-.\s]/g, '').toUpperCase())
        // Validar si el DNI ingresado coincide con el del jugador
        if (dniInput.replace(/[-.\s]/g, '').toUpperCase() === dni.replace(/[-.\s]/g, '').toUpperCase()) {
            try {
                // Llamar al servicio para actualizar la verificación del jugador
                await actualizarVerificacionJugador(id_jugador);

                if (hayCodigoLiga) {
                    const data = {
                        id_jugador: id_jugador,
                        id_liga: selectedLeague,
                        codigo_liga: codigoLiga
                    };

                    await actualizarCodigoLigaSegunIdJugadorYIdLiga(data);
                }

                setMessageAlertCustom('Jugador verificado correctamente.');
                setShowAlertCustom(true);

                // Redirigir al perfil
                setTimeout(() => {
                    if (process.env.NODE_ENV === 'production') {
                        router.push(`/user/player/initiation_player.html?role=${userRole}`);
                    } else {
                        router.push(`/user/player/initiation_player/?role=${userRole}`);
                    }
                    // router.push(`/user/player/initiation_player/?role=${userRole}`);
                }, 2000);

            } catch (error) {
                console.error('Error al verificar el jugador:', error);
                alert('Error al verificar el jugador: ' + error);
            }
        } else {
            setMessageAlertCustom('El DNI ingresado no coincide.');
            setShowAlertCustom(true);
        }
    };

    const handleSidebarToggle = (state: boolean) => {
        setIsOpen(state);
    };

    const handleSidebarToggleMobile = (state: boolean) => {
        setIsMobileOpen(state);
    };

    // Cerrar las alertas
    const handleCloseAlertCustom = () => {
        setShowAlertCustom(false);
    };

    const handleLeagueChange = async (idLiga: number) => {
        if (idLiga === 0) {
            setSelectedLeague(null);
            return;
        }

        // Buscar el nombre de la liga en datosLigasAsignadas
        const ligaSeleccionada = datosLigas.find((liga: { id_liga: number; }) => liga.id_liga === idLiga);
        setNombreLiga(ligaSeleccionada.Liga.nombre);

        const codigoLigaNumero = Number(ligaSeleccionada.Liga.codigo_liga);
        setHayCodigoLiga(codigoLigaNumero);
        setSelectedLeague(idLiga);
        setShowForm(true);
    };

    var menuOptionsLeft, menuOptionsRight;

    if (userRole === 'Jugador') {
        // Generar dinámicamente las opciones del menú
        menuOptionsLeft = menuOptionsJugador.left.map((option) => ({
            ...option,
        }));

        menuOptionsRight = menuOptionsJugador.right.map((option) => ({
            ...option,
            color: option.label === 'Comentarios' ? 'text-blue-500' : option.color
        }));
    } else if (userRole === 'Delegado') {
        menuOptionsLeft = menuOptionsDelegado.left.map((option) => ({
            ...option,
        }));

        menuOptionsRight = menuOptionsDelegado.right.map((option) => ({
            ...option,
            // color: option.label === 'Comentarios' ? 'text-blue-500' : option.color
        }));
    }
    if (!datosJugador?.verificado) {
        return (
            <>
                <div className={`${isOpen ? 'lg:ml-70 ml-0' : 'lg:ml-[0%] ml-[0%]'}`}>
                    <SideBar userType={userRole} menuDisabled={false} onToggleSidebar={handleSidebarToggle} onToggleSidebarMobile={handleSidebarToggleMobile} isMobileOpen={isMobileOpen} />
                </div>

                <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                    <div className={`transition-all duration-300 ${isOpen ? 'lg:w-[75%] xl1500:w-[85%] lg:left-[21%] xl1500:left-[13%]' : 'w-[95%] xxs:w-[90%] xl1500:w-[95%] lg:left-[6.5%] xl1500:left-[3.5%]'}  mx-4 my-4 fixed top-0 xxs:left-[3.6%] z-20`}>
                        <SearchBar onToggleSidebarMobile={handleSidebarToggleMobile} userType={userRole} userName={primer_nombre + " " + primer_apellido} userPhotoBlob={foto} />
                    </div>
                </div>
                <br />
                <br />
                <br />
                <br />
                <br />
                <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                    <div className="flex-grow w-[95%] mx-4 mt-[20px]">
                        <WelcomeMessage NamePlayer={primer_nombre + " " + primer_apellido} />
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
                <br />

                {showForm && (
                    <>
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
                        <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                            <div className="flex-grow w-[95%] mx-4 mt-[20px]">
                                <DNIInput onDniChange={handleDniChange} />
                            </div>
                        </div>

                        {hayCodigoLiga && (
                            <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                                <div className="flex-grow w-[95%] mx-4 mt-[20px]">
                                    <div className="text-center mb-6">
                                        <div className="flex justify-center items-center mb-2">
                                            <Image width={100} height={100} src="/images/logos/Icono_DNI.png" alt="DNI Icon" className="w-6 sm70:w-10 h-6 sm750:h-10 mr-2 mt-1 opacity-50" />
                                            <h3 className="text-xl sm590:text-2xl font-bold text-black opacity-50">Código liga</h3>
                                        </div>
                                        <input
                                            type="text"
                                            className="w-[100%] sm500:w-[50%] xl1200:w-1/4 p-2 border border-gray-300 rounded mx-auto block text-sm sm750:text-2xl text-black"
                                            onChange={(e) => {
                                                const value = e.target.value.replace(/[^A-Za-z0-9.\-]/g, '');
                                                onCodigoLigaChange(value);
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        <br />
                        <br />
                        <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                            <div className="flex-grow w-[95%] mx-4 flex items-center justify-center">
                                <CustomButton text="Aceptar" color="#24b364" width="" height="" onClick={handleButtonClick} className='flex-col w-[80%] sm750:w-[40%]' icon="/images/logos/Icono_Confirmar_Blanco.png" classNameText='text-sm xs360:text-xl' classNameIcon='w-6 sm590:h-8 w-6 sm590:w-8' />
                            </div>
                        </div>
                    </>
                )}

                {/** Alertas de las acciones */}
                <CustomAlert message={messageAlertCustom} show={showAlertCustom} onClose={handleCloseAlertCustom} />

                <br />
                <br />
                <br />
                <Footer
                    userType={userRole}
                    menuOptionsLeft={menuOptionsLeft}
                    menuOptionsRight={menuOptionsRight}
                />
            </>
        );
    };
};

export default Iniciacion_Jugador;