"use client"
import React, { useState, Suspense, useEffect, useCallback } from 'react';
import SideBar from '@/components/components_generics/side_bar/SideBar';
import SearchBar from '@/components/components_generics/search_bar/SearchBar';
import Footer from '@/components/components_generics/footer/Footer';
import TitleWithImages from '@/components/components_generics/title_with_images/TitleWithImages';
import SelectLeague from '@/components/user/admin_league/planner_admin/SelectLeague';
import PlannerGrid from '@/components/user/admin_league/planner_admin/PlannerGrid';
import PopUpNewPlanner from '@/components/user/admin_league/planner_admin/pop-up_add_new_planner/page';
import PopUpEditPlanner from '@/components/user/admin_league/planner_admin/pop-up_edit_planner/page';
import CustomButton from '@/components/components_generics/button/CustomButton';
import { RingLoader } from 'react-spinners';
import Image from 'next/image';
import { obtenerDatosUsuario, obtenerUsuariosActivos } from '@/services/usuarioService';
import { useSearchParams, useRouter } from 'next/navigation';
import { menuOptionsAdminLeague } from '@/components/components_generics/footer/menu_options/MenuOptions';
import { obtenerLigasAsignadas } from '@/services/adminLigaLigaService';
import { obtenerLigasPlanillero } from '@/services/planilleroLigaService';

interface Planillero_AdminProps {
    userRole: string;
}

const Planillero_AdminContent: React.FC<Planillero_AdminProps> = ({ userRole }) => {
    const [planilleroSeleccionado, setPlanilleroSeleccionado] = useState(null);
    const [idLigaSeleccionada, setIdLigaSeleccionada] = useState<number | null>(null);
    const [showPopupAddPlanner, setShowPopupAddPlanner] = useState(false);
    const [showPopupEditPlanner, setShowPopupEditPlanner] = useState(false);
    const [nombreLiga, setNombreLiga] = useState<any>(null);
    const [showSelectLiga, setShowSelectLiga] = useState(false);
    const [showGridPlanillero, setShowGridPlanillero] = useState(false);
    const [datosLigasAsignadas, setDatosLigasAsignadas] = useState<any>(null);
    const [datosPlanilleroLiga, setDatosPlanilleroLiga] = useState<any>(null);
    const [datosUsuariosActivos, setDatosUsuariosActivos] = useState<any>(null);
    const [datosPlanilleroAEditar, setDatosPlanilleroAEditar] = useState<any>(null);
    const searchParams = useSearchParams();
    const [datosUsuario, setDatosUsuario] = useState<any>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    // const userRole = searchParams.get('role');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const obtenerDatosPlanillero = async (id_liga: number) => {
        try {
            console.log("id_liga: ", id_liga);
            const consultaPlanilleros = await obtenerLigasPlanillero(id_liga);
            if (consultaPlanilleros.success) {
                console.log("consultaPlanilleros: ", consultaPlanilleros.data);
                setDatosPlanilleroLiga(consultaPlanilleros.data);
            }

        } catch (error) {
            console.error('Error al obtener categorías:', error);
        }
    }

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
            setIdLigaSeleccionada(ligasAsignadasArray[0].id_liga);
            setNombreLiga(ligasAsignadasArray[0].nombre);
            setShowSelectLiga(false);
            setShowGridPlanillero(true);

            await obtenerDatosPlanillero(ligasAsignadasArray[0].id_liga);
            setIsLoading(false);
        } else {
            setShowSelectLiga(true);
            setIsLoading(false);
            // setShowGridCategoria(false);
        }
    }, []);

    useEffect(() => {
        const fetchDatos = async () => {
            try {
                await obtenerDatos();
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
        await obtenerDatosPlanillero(idLiga);
        setShowGridPlanillero(true);
    };

    const handleEditarPlanillero = (planillero: any) => {
        console.log("planillero: ", planillero);
        setPlanilleroSeleccionado(planillero);
        setDatosPlanilleroAEditar(planillero);
        setShowPopupEditPlanner(true);
    };

    const handleIsLoading = (isLoading: boolean) => {
        setIsLoading(isLoading);
    };

    const menuOptionsLeft = menuOptionsAdminLeague.left.map((option) => ({
        ...option,
    }));

    const menuOptionsRight = menuOptionsAdminLeague.right.map((option) => ({
        ...option,
        color: option.label === 'Planillero' ? 'text-blue-500' : option.color
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
                        leftImageSrc="/images/logos/Icono_Planillero.png"
                        rightImageSrc="/images/logos/Icono_Planillero.png"
                        titleText="Planillero"
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
                        icon={<Image src="/images/logos/Icono_Liga.png" width={100} height={100} alt='Icono Torneo' className='w-9 sm750:w-12 h-9 sm750:h-12' />}
                        options={datosLigasAsignadas ? datosLigasAsignadas.map(liga => ({ id: liga.id_liga, nombre: liga.nombre })) : []}
                        onChange={(value) => {
                            handleLeagueChange(value);
                        }}
                    />
                </div>
            )}
            {showGridPlanillero && (
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
                        <div className="flex-grow w-[95%] mx-4">
                            <PlannerGrid onEditPlanner={handleEditarPlanillero} planilleros={datosPlanilleroLiga || []} onPlannerDeleted={obtenerDatos} setIsLoading={handleIsLoading} />
                        </div>
                    </div>
                    <br />
                    <br />
                    <div className={`flex-col sm500:flex-row flex-1 flex justify-center space-x-0 sm500:space-x-10 items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                        <CustomButton
                            text="Agregar planillero"
                            color="#3b82f6"
                            width=""
                            height=""
                            onClick={() => { setShowPopupAddPlanner(true); }}
                            className='flex-col w-[80%] sm750:w-[40%]'
                            classNameText='text-sm xs360:text-xl'
                            classNameIcon='w-6 sm590:h-8 w-6 sm590:w-8'
                            icon="/images/logos/Icono_Nuevo_Blanco.png"
                        />
                    </div>
                    <br />

                    {showPopupAddPlanner && (
                        <PopUpNewPlanner
                            onClose={() => { setShowPopupAddPlanner(false); }}
                            onSave={() => { setShowPopupAddPlanner(false); obtenerDatos(); }}
                            usuariosActivos={datosUsuariosActivos}
                            idLigaSeleccionada={idLigaSeleccionada}
                            planilleros={[]}
                            setIsLoading={handleIsLoading}
                        />
                    )}

                    {showPopupEditPlanner && (
                        <PopUpEditPlanner
                            onClose={() => { setShowPopupEditPlanner(false); }}
                            onSave={() => { setShowPopupEditPlanner(false); obtenerDatos(); }}
                            usuariosActivos={datosUsuariosActivos}
                            idLigaSeleccionada={idLigaSeleccionada}
                            planilleros={[]}
                            datosPlanilleroAEditar={datosPlanilleroAEditar}
                            setIsLoading={handleIsLoading}
                        />
                    )}
                </>
            )}

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
        </div>
    );
};

const Planillero_Admin: React.FC<Planillero_AdminProps> = ({ userRole }) => {
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
            <Planillero_AdminContent userRole={userRole} />
        </Suspense>
    );
};

export default Planillero_Admin;