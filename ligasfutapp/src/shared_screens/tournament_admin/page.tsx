"use client"
import React, { createContext, useContext, useState, Suspense, useEffect, useCallback } from 'react';
import SideBar from '@/components/components_generics/side_bar/SideBar';
import SearchBar from '@/components/components_generics/search_bar/SearchBar';
import Footer from '@/components/components_generics/footer/Footer';
import TitleWithImages from '@/components/components_generics/title_with_images/TitleWithImages';
import TournamentGrid from '@/components/user/admin_league/tournament_admin/TournamentGrid';
import PopUpManageMatch from '@/components/user/admin_league/tournament_admin/pop-up_manage_match_admin/page';
import PopUpInitTournament from '@/components/user/admin_league/tournament_admin/pop-up_init_tournament/page';
// import PopUpEditTournament from '@/user/admin_league/tournament_admin/pop-up_edit_tournament/page';
import SelectLeague from '@/components/user/admin_league/tournament_admin/SelectLeague';
import SelectCategory from '@/components/user/admin_league/tournament_admin/SelectCategory';
import Image from 'next/image';
import CustomButton from '@/components/components_generics/button/CustomButton';
import { obtenerCategoriasPorAdminLiga } from '@/services/ligaCategoriaService';
import { RingLoader } from 'react-spinners';
import { obtenerDatosUsuario } from '@/services/usuarioService';
import { useSearchParams, useRouter } from 'next/navigation';
import { menuOptionsAdminLeague } from '@/components/components_generics/footer/menu_options/MenuOptions';
import { obtenerLigasAsignadas } from '@/services/adminLigaLigaService';
import { obtenerTorneosPorAdminLigaCategoria } from '@/services/torneoService';

// Contexto de Scroll
const ScrollContext = createContext(null);
// Hook para contexto de Scroll
const useScroll = () => useContext(ScrollContext);

interface Torneo_AdminProps {
    userRole: string;
}

const Torneo_AdminContent: React.FC<Torneo_AdminProps> = ({ userRole }) => {
    const { setScrollY } = useScroll();
    const [showPopupManageMatch, setShowPopupManageMatch] = useState(false);
    const [showPopupInitTournamnent, setShowPopupInitTournament] = useState(false);
    const [showPopupEditFixture, setShowPopupEditFixture] = useState(false);
    const [selectedTournamentId, setSelectedTournamentId] = useState(null);
    const [tipoTorneo, setTipoTorneo] = useState(null);
    const [idLigaSeleccionada, setIdLigaSeleccionada] = useState<number | null>(null);
    const [nombreLiga, setNombreLiga] = useState<any>(null);
    const [showSelectLiga, setShowSelectLiga] = useState(false);
    const [showGridTorneo, setShowGridTorneo] = useState(false);
    const [datosLigasAsignadas, setDatosLigasAsignadas] = useState<any>(null);
    const [datosCategorias, setDatosCategorias] = useState<any>(null);
    const [idLigaCategoriaSeleccionada, setIdLigaCategoriaSeleccionada] = useState<any>(null);
    const [idCategoriaSeleccionada, setIdCategoriaSeleccionada] = useState<any>(null);
    const [datosTorneosAdminLiga, setDatosTorneosAdminLiga] = useState<any>(null);
    const searchParams = useSearchParams();
    const [datosUsuario, setDatosUsuario] = useState<any>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    // const userRole = searchParams.get('role');
    const [isLoading, setIsLoading] = useState(false);
    const [showSelectCategory, setShowSelectCategory] = useState(false);
    const router = useRouter();

    const handleIsLoading = (isLoading: boolean) => {
        setIsLoading(isLoading);
    };

    const obtenerDatosTorneo = async (id_liga: number) => {
        try {
            const consultaTorneos = await obtenerTorneosPorAdminLigaCategoria(id_liga);
            if (consultaTorneos.success) {
                setDatosTorneosAdminLiga(consultaTorneos.torneos);
            }

        } catch (error) {
            console.error('Error al obtener categorías:', error);
        }
    }

    const obtenerDatos = useCallback(async () => {
        // Obtener datos del usuario
        const usuario = await obtenerDatosUsuario();
        setDatosUsuario(usuario);

        // Obtenemos las ligas a las que el usuario Admin_Liga tiene asignado        
        const ligasAsignadas = await obtenerLigasAsignadas(usuario.id_usuario);
        const ligasAsignadasArray = Array.isArray(ligasAsignadas) ? ligasAsignadas : [ligasAsignadas]
        setDatosLigasAsignadas(ligasAsignadasArray);

        // Verificamos si solo solo es una liga que se obtuvo, si no hacemos que seleccione primeramente la liga que quiere gestionar
        if (ligasAsignadasArray.length === 1) {
            setIdLigaSeleccionada(ligasAsignadasArray[0].id_liga);
            setNombreLiga(ligasAsignadasArray[0].nombre);
            setShowSelectLiga(false);
            setShowGridTorneo(true);

            const categoriasPorLiga = await obtenerCategoriasPorAdminLiga(ligasAsignadasArray[0].id_liga);
            setDatosCategorias(categoriasPorLiga.categorias);

            if (categoriasPorLiga.categorias.length === 1) {
                setIdCategoriaSeleccionada(categoriasPorLiga.categorias[0].id_categoria);
                setIdLigaCategoriaSeleccionada(categoriasPorLiga.categorias[0].id_liga_categoria);

                await obtenerDatosTorneo(ligasAsignadasArray[0].id_liga);
            } else {
                setShowSelectCategory(true);
            }

        } else {
            setShowSelectLiga(true);
            // setShowGridCategoria(false);
        }
    }, []);

    // useEffect para que no se mueva la pantalla si se activa el Suspense
    useEffect(() => {
        // Guardamos la posición del scroll antes de la carga
        setScrollY(window.scrollY);
    }, [setScrollY]);

    useEffect(() => {
        const fetchDatos = async () => {
            try {
                setIsLoading(true);
                await obtenerDatos();
                setIsLoading(false);
            } catch (error) {
                console.error('Error al obtener los datos:', error);
                alert('Error: ' + error)

                if (process.env.NODE_ENV === 'production') {
                    router.push('/login.html');
                } else {
                    router.push('/login');
                }
                // router.push('/login');
            }
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

    // Función para manejar el cambio de torneo seleccionado
    const handleLeagueChange = async (idLiga: number) => {
        if (idLiga === 0) {
            setIdLigaSeleccionada(null);
            return;
        }

        // Buscar el nombre de la liga en datosLigasAsignadas
        const ligaSeleccionada = datosLigasAsignadas.find((liga: { id_liga: number; }) => liga.id_liga === idLiga);
        setNombreLiga(ligaSeleccionada.nombre);

        setIdLigaSeleccionada(idLiga);
        await obtenerDatosTorneo(idLiga);
        setShowGridTorneo(true);
    };

    const handleGestionarPartidos = (torneo: any) => {
        setSelectedTournamentId(torneo.id_torneo_categoria);
        setTipoTorneo(torneo.tipo_torneo);
        setShowPopupManageMatch(true);
    };

    const handleSelectCategory = async (selectedCategory: any) => {
        setIdCategoriaSeleccionada(selectedCategory.id_categoria);
        setIdLigaCategoriaSeleccionada(selectedCategory.id_liga_categoria);
        const response = await obtenerTorneosPorAdminLigaCategoria(selectedCategory.id_liga_categoria);
        setDatosTorneosAdminLiga(response.torneos);
    };

    const handlecreatedTournament = async () => {
        await obtenerDatosTorneo(idLigaSeleccionada);
        setShowPopupInitTournament(false);
    }

    const menuOptionsLeft = menuOptionsAdminLeague.left.map((option) => ({
        ...option,
        color: option.label === 'Torneos' ? 'text-blue-500' : option.color
    }));

    const menuOptionsRight = menuOptionsAdminLeague.right.map((option) => ({
        ...option,
    }));

    return (
        <div className="min-h-screen bg-cream-faf9f6">
            <div className={`${isOpen ? 'lg:ml-70 ml-0' : 'lg:ml-[0%] ml-[0%]'}`}>
                <SideBar userType={userRole} menuDisabled={false} onToggleSidebar={handleSidebarToggle} onToggleSidebarMobile={handleSidebarToggleMobile} isMobileOpen={isMobileOpen} />
            </div>

            <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                <div className={`transition-all duration-300 ${isOpen ? 'lg:w-[75%] xl1500:w-[85%] lg:left-[21%] xl1500:left-[13%]' : 'w-[95%] xxs:w-[90%] xl1500:w-[95%] lg:left-[6.5%] xl1500:left-[3.5%]'}  mx-4 my-4 top-0 xxs:left-[3.6%] z-20`}>
                    <SearchBar onToggleSidebarMobile={handleSidebarToggleMobile} userType={userRole} userName={datosUsuario.primer_nombre + " " + datosUsuario.primer_apellido} userPhotoBlob={datosUsuario.foto} />
                </div>
            </div>
            <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                <div className="flex flex-col sm850:flex-row justify-center items-center -translate-x-[10%] xxxs:-translate-x-[0%]">
                    <TitleWithImages
                        leftImageSrc="/images/logos/Icono_Torneo.png"
                        rightImageSrc="/images/logos/Icono_Torneo.png"
                        titleText="Torneos"
                        leftImageOpacity={1}
                        rightImageOpacity={1}
                        titleOpacity={1}
                    />
                </div>
            </div>
            {showSelectLiga && (
                <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                    <SelectLeague
                        label="Liga"
                        icon={<Image src="/images/logos/Icono_Liga.png" width={100} height={100} alt='Icono Torneo' className='w-12 h-12' />}
                        options={datosLigasAsignadas ? datosLigasAsignadas.map(liga => ({ id: liga.id_liga, nombre: liga.nombre })) : []}
                        onChange={(value) => {
                            handleLeagueChange(value);
                        }}
                    />
                </div>
            )}
            {showSelectCategory && (
                <div className={`mb-0 flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                    <SelectCategory
                        categorias={datosCategorias || []}
                        onCategoryChange={handleSelectCategory}
                    />
                </div>
            )}
            {showGridTorneo && (
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
                    {idLigaCategoriaSeleccionada && (
                        <>
                            <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                                <div className="flex-grow w-[95%] mx-4">
                                    <TournamentGrid
                                        onManageMatch={handleGestionarPartidos}
                                        torneos={datosTorneosAdminLiga || []}
                                        onTournamentDeleted={() => { obtenerDatosTorneo(idLigaSeleccionada) }}
                                        setIsLoading={handleIsLoading}
                                    />
                                </div>
                            </div>
                            <br />
                            <div className={`flex-col sm500:flex-row flex-1 flex justify-center space-x-0 sm500:space-x-10 items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                                <CustomButton
                                    text="Crear Nuevo Torneo"
                                    color="#3b82f6"
                                    width=""
                                    height=""
                                    onClick={() => setShowPopupInitTournament(true)}
                                    className='flex-col w-[80%] sm750:w-[40%] mt-5 xs300:mt-0'
                                    classNameText='text-sm xs360:text-xl'
                                    classNameIcon='w-6 sm590:h-8 w-6 sm590:w-8'
                                    icon="/images/logos/Icono_Nuevo_Blanco.png"
                                />
                            </div>
                        </>
                    )}

                    {showPopupInitTournamnent &&
                        <PopUpInitTournament
                            id_liga={idLigaSeleccionada}
                            id_categoria={idCategoriaSeleccionada}
                            onCancel={() => setShowPopupInitTournament(false)}
                            setIsLoading={handleIsLoading}
                            onCreatedTournament={handlecreatedTournament}
                        />
                    }
                    {showPopupManageMatch && <PopUpManageMatch idTorneoCategoria={selectedTournamentId} onAccept={() => setShowPopupManageMatch(false)} tipoTorneo={tipoTorneo} />}

                    {/* {showPopupEditFixture && <PopUpEditTournament onClose={() => setShowPopupEditFixture(false)} />} */}
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
                    userType={userRole}
                    menuOptionsLeft={menuOptionsLeft}
                    menuOptionsRight={menuOptionsRight}
                />
            </div>
        </div>
    );
};

const Torneo_Admin: React.FC<Torneo_AdminProps> = ({ userRole }) => {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        // Restaurar la posición del scroll después de que el componente se renderice
        window.scrollTo(0, scrollY);
    }, [scrollY]);

    return (
        <ScrollContext.Provider value={{ setScrollY }}>
            <Suspense
                fallback={
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
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            zIndex: '9999',
                        }}
                        className="flex items-center justify-center"
                    >
                        <RingLoader color="#007bff" />
                    </div>
                }
            >
                <Torneo_AdminContent userRole={userRole} />
            </Suspense>
        </ScrollContext.Provider>
    );
};

export default Torneo_Admin;