"use client"
import React, { useState, Suspense, useEffect, useCallback } from 'react';
import SideBar from '@/components/components_generics/side_bar/SideBar';
import SearchBar from '@/components/components_generics/search_bar/SearchBar';
import Footer from '@/components/components_generics/footer/Footer';
import TitleWithImages from '@/components/components_generics/title_with_images/TitleWithImages';
import SelectCategory from '@/components/user/admin_league/team_admin/SelectCategory';
import CustomButton from '@/components/components_generics/button/CustomButton';
import TeamGrid from '@/components/user/admin_league/team_admin/TeamGrid';
import PopUpAddNewTeam from '@/components/user/admin_league/team_admin/pop-up_add_new_team/page';
import PopUpEditTeam from '@/components/user/admin_league/team_admin/pop-up_edit_team/page';
import { menuOptionsAdminLeague } from '@/components/components_generics/footer/menu_options/MenuOptions';
import { useSearchParams, useRouter } from 'next/navigation';
import { obtenerDatosUsuario, obtenerUsuariosActivos } from '@/services/usuarioService';
import { obtenerCategoriasPorAdminLiga, obtenerEquiposPorLigaYCategoria } from '@/services/ligaCategoriaService';
import { obtenerLigasAsignadas } from '@/services/adminLigaLigaService';
import SelectLeague from '@/components/user/admin_league/team_admin/SelectLeague';
import CustomAlert from '@/components/components_generics/custom_alert/CustomAlert';
import Image from 'next/image';
import { RingLoader } from 'react-spinners';

interface Equipo_AdminProps {
    userRole: string;
}

const Equipo_AdminContent: React.FC<Equipo_AdminProps> = ({ userRole }) => {
    const [showPopupAddTeam, setShowPopupAddTeam] = useState(false);
    const [showPopupEditTeam, setShowPopupEditTeam] = useState(false);
    const [selectedLeague, setSelectedLeague] = useState<number | null>(null);
    const [idCategoriaSeleccionada, setIdCategoriaSeleccionada] = useState<number | null>(null);
    const [idLigaCategoriaSeleccionada, setIdLigaCategoriaSeleccionada] = useState<number | null>(null);
    const searchParams = useSearchParams();
    const [datosUsuario, setDatosUsuario] = useState<any>(null);
    const [datosLigasAsignadas, setDatosLigasAsignadas] = useState<any>(null);
    const [datosEquiposPorLigaYCategoria, setDatosEquiposPorLigaYCategoria] = useState<any>(null);
    const [datosEquipoAEditar, setDatosEquipoAEditar] = useState<any>(null);
    const [nombreLiga, setNombreLiga] = useState<any>(null);
    const [showGridEquipos, setShowGridEquipos] = useState(false);
    const [showLigas, setShowLigas] = useState(false);
    const [showCategorias, setShowCategorias] = useState(false);
    const [datosCategorias, setDatosCategorias] = useState<any>(null);
    const [datosUsuariosActivos, setDatosUsuariosActivos] = useState<any>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [showAlertCustom, setShowAlertCustom] = useState(false);
    const [messageAlertCustom, setMessageAlertCustom] = useState('');
    // const userRole = searchParams.get('role');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const obtenerEquipos = async (idLigaCategoria: number) => {
        const equiposPorLigaYCategoria = await obtenerEquiposPorLigaYCategoria(idLigaCategoria);
        setDatosEquiposPorLigaYCategoria(equiposPorLigaYCategoria.equipos);
    };

    const handleIsLoading = (isLoading: boolean) => {
        setIsLoading(isLoading);
    };

    const obtenerDatos = useCallback(async () => {
        setIsLoading(true);
        // Obtener datos del usuario
        const usuario = await obtenerDatosUsuario();
        setDatosUsuario(usuario);

        // Obtener los usuarios activos
        const usuariosActivos = await obtenerUsuariosActivos();
        setDatosUsuariosActivos(usuariosActivos);

        // Obtenemos las ligas a las que el usuario Admin_Liga tiene asignado        
        const ligasAsignadas = await obtenerLigasAsignadas(usuario.id_usuario);
        const ligasAsignadasArray = Array.isArray(ligasAsignadas) ? ligasAsignadas : [ligasAsignadas]
        setDatosLigasAsignadas(ligasAsignadasArray);

        // Verificamos si solo solo es una liga que se obtuvo, si no hacemos que seleccione primeramente la liga que quiere gestionar
        if (ligasAsignadasArray.length === 1) {
            setSelectedLeague(ligasAsignadasArray[0].id_liga);
            setNombreLiga(ligasAsignadasArray[0].nombre);

            const categorias = await obtenerDatosCategorias(ligasAsignadasArray[0].id_liga);
            if (categorias.length === 1) {
                setIdLigaCategoriaSeleccionada(categorias[0].id_liga_categoria);
                setIdCategoriaSeleccionada(categorias[0].id_categoria);
                await obtenerEquipos(categorias[0].id_liga_categoria);
                setShowGridEquipos(true);
                setIsLoading(false);
            } else {
                setShowCategorias(true);
                setIsLoading(false);
            }

        } else {
            setIsLoading(false);
            setShowLigas(true);
        }
    }, []);

    const obtenerDatosCategorias = async (idLiga: number) => {
        const categorias = await obtenerCategoriasPorAdminLiga(idLiga);
        setDatosCategorias(Array.isArray(categorias.categorias) ? categorias.categorias : [categorias.categorias]);
        return categorias.categorias;
    };

    useEffect(() => {
        const fetchDatos = async () => {
            try {
                await obtenerDatos();
            } catch (error) {
                console.error('Error al obtener los datos de la categoría:', error);
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

    // Función para manejar el cambio de liga seleccionado
    const handleLeagueChange = async (idLiga: number) => {
        if (idLiga === 0) {
            setSelectedLeague(null);
            return;
        }

        // Buscar el nombre de la liga en datosLigasAsignadas
        const ligaSeleccionada = datosLigasAsignadas.find((liga: { id_liga: number; }) => liga.id_liga === idLiga);
        setNombreLiga(ligaSeleccionada.nombre);

        setSelectedLeague(idLiga);
        setShowGridEquipos(true);

        try {
            await obtenerDatosCategorias(idLiga);
        } catch (error) {
            console.error('Error al obtener categorías:', error);
        }
    };

    const handleSelectCategory = async (selectedCategory: any) => {
        setIdLigaCategoriaSeleccionada(selectedCategory.id_liga_categoria);
        setIdCategoriaSeleccionada(selectedCategory.id_categoria);
        await obtenerEquipos(selectedCategory.id_liga_categoria);

        setShowGridEquipos(true);
    };

    const handleTeamDeleted = async () => {
        try {
            await obtenerEquipos(idLigaCategoriaSeleccionada);
            obtenerDatos();
        } catch (error) {
            console.error("Error al actualizar equipos tras eliminación:", error);
            setMessageAlertCustom("No se pudieron actualizar los equipos después de eliminar uno.");
            setShowAlertCustom(true);
        }
    };

    const handleTeamEdit = async (equipo: any) => {
        setDatosEquipoAEditar(equipo);
        setShowPopupEditTeam(true);
    };

    const handleCloseAlertCustom = () => {
        setShowAlertCustom(false);
    };

    const menuOptionsLeft = menuOptionsAdminLeague.left.map((option) => ({
        ...option,
        color: option.label === 'Equipo' ? 'text-blue-500' : option.color
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
                <div className="flex flex-col sm850:flex-row justify-center items-center -translate-x-[0%]">
                    <TitleWithImages
                        leftImageSrc="/images/logos/Icono_Equipo.png"
                        rightImageSrc="/images/logos/Icono_Equipo.png"
                        titleText="Equipos"
                        leftImageOpacity={1}
                        rightImageOpacity={1}
                        titleOpacity={1}
                    />
                </div>
            </div>
            {showLigas && (
                <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                    <SelectLeague
                        label="Liga"
                        icon={<Image src="/images/logos/Icono_Liga.png" width={100} height={100} alt='Icono Torneo' className='w-8 sm750:w-12 h-8 sm750:h-12' />}
                        options={datosLigasAsignadas ? datosLigasAsignadas.map(liga => ({ id: liga.id_liga, nombre: liga.nombre })) : []}
                        onChange={(value) => {
                            handleLeagueChange(value);
                        }}
                    />
                </div>
            )}

            <div
                className={`flex flex-1 flex-col justify-start items-center transition-all duration-300 ${isOpen
                    ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0'
                    : 'lg:ml-[5%] ml-[0%]'
                    }`}
            >
                <div className="flex items-center mb-5 mt-5 mr-[2%]">
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
            {showCategorias && (
                <div className={`mb-5 flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                    <SelectCategory
                        categorias={datosCategorias || []}
                        onCategoryChange={handleSelectCategory}
                    />
                </div>
            )}

            {showGridEquipos && (
                <>

                    <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                        <div className="flex-grow w-[95%] mx-4">
                            <TeamGrid
                                equipos={datosEquiposPorLigaYCategoria || []}
                                onTeamDeleted={handleTeamDeleted}
                                onTeamEdit={handleTeamEdit}
                                setIsLoading={handleIsLoading}
                            />
                        </div>
                    </div>
                    {/** Alertas de las acciones */}
                    <CustomAlert message={messageAlertCustom} show={showAlertCustom} onClose={handleCloseAlertCustom} />
                    <div className={`flex-col sm500:flex-row flex-1 flex justify-center space-x-0 sm500:space-x-10 items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                        <CustomButton
                            text="Agregar equipo"
                            color="#3b82f6"
                            width=""
                            height=""
                            onClick={() => setShowPopupAddTeam(true)}
                            className='flex-col h-auto w-[80%] sm750:w-[40%] mt-5 xs300:mt-0'
                            classNameText='text-sm xs360:text-xl'
                            classNameIcon='w-6 sm590:h-8 w-6 sm590:w-8'
                            icon="/images/logos/Icono_Nuevo_Blanco.png"
                        />
                    </div>
                    {showPopupAddTeam && (
                        <PopUpAddNewTeam
                            onClose={() => setShowPopupAddTeam(false)}
                            onSave={async () => {
                                await obtenerEquipos(idLigaCategoriaSeleccionada);
                                await obtenerDatos();
                            }}
                            usuariosActivos={datosUsuariosActivos}
                            equipos={datosEquiposPorLigaYCategoria}
                            idCategoriaSeleccionada={idCategoriaSeleccionada}
                            setIsLoading={handleIsLoading}
                            idLigaSeleccionada={selectedLeague}
                        />
                    )}

                    {showPopupEditTeam && (
                        <PopUpEditTeam
                            onClose={() => setShowPopupEditTeam(false)}
                            onSave={async () => {
                                await obtenerEquipos(idLigaCategoriaSeleccionada);
                                await obtenerDatos();
                            }}
                            usuariosActivos={datosUsuariosActivos}
                            equipos={datosEquiposPorLigaYCategoria}
                            idCategoriaSeleccionada={idCategoriaSeleccionada}
                            datosEquipoAEditar={datosEquipoAEditar}
                            setIsLoading={handleIsLoading}
                            idLigaSeleccionada={selectedLeague}
                        />
                    )}
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

const Equipo_Admin: React.FC<Equipo_AdminProps> = ({ userRole }) => {
    return (
        <Suspense fallback={
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
        }>
            <Equipo_AdminContent userRole={userRole} />
        </Suspense>
    );
};

export default Equipo_Admin;