"use client"
import React, { useState, Suspense, useEffect, useCallback } from 'react';
import SideBar from '@/components/components_generics/side_bar/SideBar';
import SearchBar from '@/components/components_generics/search_bar/SearchBar';
import Footer from '@/components/components_generics/footer/Footer';
import TitleWithImages from '@/components/components_generics/title_with_images/TitleWithImages';
import SelectCategory from '@/components/user/admin_league/sanctioned_admin/SelectCategory';
import SelectLeague from '@/components/user/admin_league/sanctioned_admin/SelectLeague';
import SanctionedPendentGrid from '@/components/user/admin_league/sanctioned_admin/SanctionedPendentGrid';
import SanctionedJudgeGrid from '@/components/user/admin_league/sanctioned_admin/SanctionedJudgeGrid';
import ExpelledGrid from '@/components/user/admin_league/sanctioned_admin/ExpelledGrid';
import PopUpAddSanctioned from '@/components/user/admin_league/sanctioned_admin/pop-up_add_sanctioned/page';
import PopUpSanctioned from '@/components/user/admin_league/sanctioned_admin/pop-up_sanctioned/page';
import CustomButton from '@/components/components_generics/button/CustomButton';
import { RingLoader } from 'react-spinners';
import { useSearchParams, useRouter } from 'next/navigation';
import { menuOptionsAdminLeague } from '@/components/components_generics/footer/menu_options/MenuOptions';
import { obtenerDatosUsuario, obtenerUsuariosActivos } from '@/services/usuarioService';
import { obtenerLigasAsignadas } from '@/services/adminLigaLigaService';
import { obtenerCategoriasPorAdminLiga } from '@/services/ligaCategoriaService';
import { obtenerSancionadosPendientesPorLigaYCategoria, obtenerSancionadosJuzgadosPorLigaYCategoria } from '@/services/sancionadoService';
import { obtenerExpulsadosPorLigaCategoria } from '@/services/expulsionService';
import Image from 'next/image';

interface Sancionado_AdminProps {
    userRole: string;
}

const Sancionado_AdminContent: React.FC<Sancionado_AdminProps> = ({ userRole }) => {
    const [showPopupAddSanctioned, setShowPopupAddSanctioned] = useState(false);
    const [showPopupSanctioned, setShowPopupSanctioned] = useState(false);
    const [datosLigasAsignadas, setDatosLigasAsignadas] = useState<any>(null);
    const [selectedLeague, setSelectedLeague] = useState<number | null>(null);
    const searchParams = useSearchParams();
    const [nombreLiga, setNombreLiga] = useState<any>(null);
    const [showGridSanctioned, setShowGridSanctioned] = useState(false);
    const [showCategorias, setShowCategorias] = useState(false);
    const [datosCategorias, setDatosCategorias] = useState<any>(null);
    const [datosUsuariosActivos, setDatosUsuariosActivos] = useState<any>(null);
    const [datosUsuario, setDatosUsuario] = useState<any>(null);
    const [datosSancionadosPendientes, setDatosSancionadosPendientes] = useState<any>(null);
    const [datosSancionadosJuzgados, setDatosSancionadosJuzgados] = useState<any>(null);
    const [datosExpulsados, setDatosExpulsados] = useState<any>(null);
    const [idCategoriaSeleccionada, setIdCategoriaSeleccionada] = useState<number | null>(null);
    const [idLigaCategoriaSeleccionada, setIdLigaCategoriaSeleccionada] = useState<number | null>(null);
    const [datosSancionadoSeleccionado, setDatosSancionadoSeleccionado] = useState<any>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [showLigas, setShowLigas] = useState(false);
    const [pathImageLogo, setPathImageLogo] = useState('');
    const [titlePopUp, setTitlePopUp] = useState('');
    // const userRole = searchParams.get('role');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleIsLoading = (isLoading: boolean) => {
        setIsLoading(isLoading);
    };

    const obtenerSancionadosYExpulsados = async (idLigaCategoria: number) => {
        const sancionadosPendientesPorLigaYCategoria = await obtenerSancionadosPendientesPorLigaYCategoria(idLigaCategoria);
        setDatosSancionadosPendientes(sancionadosPendientesPorLigaYCategoria.data);

        const sancionadosJuzgadosPorLigaYCategoria = await obtenerSancionadosJuzgadosPorLigaYCategoria(idLigaCategoria);
        setDatosSancionadosJuzgados(sancionadosJuzgadosPorLigaYCategoria.data);

        const expulsados = await obtenerExpulsadosPorLigaCategoria(idLigaCategoria);
        setDatosExpulsados(expulsados);
    };

    const obtenerDatos = useCallback(async () => {
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
                // await obtenerEquipos(categorias[0].id_liga_categoria);
                await obtenerSancionadosYExpulsados(categorias[0].id_liga_categoria);
                setShowGridSanctioned(true);
            } else {
                setShowCategorias(true);
            }

        } else {
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
                setIsLoading(true);
                // Obtener datos del usuario
                await obtenerDatos();
                setIsLoading(false);
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
        setShowGridSanctioned(true);
    };

    const handleSelectCategory = async (selectedCategory: any) => {
        setIdLigaCategoriaSeleccionada(selectedCategory.id_liga_categoria);
        setIdCategoriaSeleccionada(selectedCategory.id_categoria);
        await obtenerSancionadosYExpulsados(selectedCategory.id_liga_categoria);

        setShowGridSanctioned(true);
    };

    const handleOnSave = async () => {
        obtenerSancionadosYExpulsados(idLigaCategoriaSeleccionada);
        setShowPopupAddSanctioned(false);
    }

    const handleOnEdit = async () => {
        obtenerSancionadosYExpulsados(idLigaCategoriaSeleccionada);
        setShowPopupSanctioned(false);
    }

    // Función para manejar la edición
    const handleJudgeSanctioned = (sancionado: any) => {
        setDatosSancionadoSeleccionado(sancionado); // Guarda el sancionado seleccionado
        setTitlePopUp("Juzgar sancionado");
        setPathImageLogo("/images/logos/Icono_Sancionado_Blanco.png");
        setShowPopupSanctioned(true); // Abre el popup
    };

    const handleEditSanctioned = (sancionado: any) => {
        setDatosSancionadoSeleccionado(sancionado); // Guarda el sancionado seleccionado
        setTitlePopUp("Editar sancionado");
        setPathImageLogo("/images/logos/Icono_Editar_Blanco.png");
        setShowPopupSanctioned(true); // Abre el popup
    };

    const handleEditExpelled = () => {
        return;
    };

    // Función para manejar la eliminación
    const handleDeleteSanctioned = () => {
        obtenerSancionadosYExpulsados(idLigaCategoriaSeleccionada);
    };

    const handleDeleteExpelled = () => {
        return;
    };

    const menuOptionsLeft = menuOptionsAdminLeague.left.map((option) => ({
        ...option,
        color: option.label === 'Torneo' ? 'text-blue-500' : option.color
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
                        leftImageSrc="/images/logos/Icono_Sancionado.png"
                        rightImageSrc="/images/logos/Icono_Sancionado.png"
                        titleText="Sancionado"
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
                <div className="flex items-center mb-0 mt-5 mr-[2%]">
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
                <div className={`mb-0 flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                    <SelectCategory
                        categorias={datosCategorias || []}
                        onCategoryChange={handleSelectCategory}
                    />
                </div>
            )}
            <br />
            {showGridSanctioned && (
                <>
                    <div className={`flex-col sm500:flex-row flex-1 flex justify-center space-x-0 sm500:space-x-10 items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                        <div className='w-full flex items-center justify-center'>
                            <CustomButton
                                text="Agregar sanción"
                                color="#3b82f6"
                                width=""
                                height=""
                                onClick={() => setShowPopupAddSanctioned(true)}
                                className='flex-col w-[80%] sm750:w-[40%] mt-5 xs300:mt-0'
                                classNameText='text-sm xs360:text-xl'
                                classNameIcon='w-6 sm590:h-8 w-6 sm590:w-8'
                                icon="/images/logos/Icono_Nuevo_Blanco.png"
                            />
                        </div>
                    </div>
                    <br />
                    <br />
                    <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                        <div className="flex-grow w-[95%] mx-4">
                            <SanctionedPendentGrid
                                onEditSanctioned={handleJudgeSanctioned}
                                sancionados={datosSancionadosPendientes ? datosSancionadosPendientes.data : []}
                                onDeleteSanctioned={handleDeleteSanctioned}
                                setIsLoading={handleIsLoading}
                            />
                        </div>
                    </div>
                    <br />
                    <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                        <div className="flex-grow w-[95%] mx-4">
                            <SanctionedJudgeGrid
                                onEditSanctioned={handleEditSanctioned}
                                sancionados={datosSancionadosJuzgados ? datosSancionadosJuzgados.data : []}
                                onDeleteSanctioned={handleDeleteSanctioned}
                                setIsLoading={handleIsLoading}
                            />
                        </div>
                    </div>
                    {showPopupAddSanctioned &&
                        <PopUpAddSanctioned
                            onClose={() => setShowPopupAddSanctioned(false)}
                            onSave={handleOnSave}
                            idLigaSeleccionada={selectedLeague}
                            id_liga_categoria={idLigaCategoriaSeleccionada}
                            setIsLoading={handleIsLoading}
                        />}
                    <br />
                    {showPopupSanctioned && <PopUpSanctioned
                        onClose={() => setShowPopupSanctioned(false)}
                        onEdit={handleOnEdit}
                        idLigaSeleccionada={selectedLeague}
                        id_liga_categoria={idLigaCategoriaSeleccionada}
                        datosSancionado={datosSancionadoSeleccionado} // Pasa los datos aquí
                        pathImageLogo={pathImageLogo}
                        titlePopUp={titlePopUp}
                        setIsLoading={handleIsLoading}
                    />}
                    <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                        <div className="flex-grow w-[95%] mx-4">
                            <ExpelledGrid onEditExpelled={handleEditExpelled} expulsados={datosExpulsados ? datosExpulsados.data.expulsados : []} onDeleteExpelled={handleDeleteExpelled} />
                        </div>
                    </div>
                    <br />

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

const Sancionado_Admin: React.FC<Sancionado_AdminProps> = ({ userRole }) => {
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
            <Sancionado_AdminContent userRole={userRole} />
        </Suspense>
    );
};

export default Sancionado_Admin;