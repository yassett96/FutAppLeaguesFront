"use client"
import React, { useState, Suspense, useEffect, useCallback } from 'react';
import SideBar from '../../../../components/components_generics/side_bar/SideBar';
import SearchBar from '../../../../components/components_generics/search_bar/SearchBar';
import Footer from '../../../../components/components_generics/footer/Footer';
import TitleWithImages from '../../../../components/components_generics/title_with_images/TitleWithImages';
import LeagueGrid from '../../../../components/user/admin_master/league_admin/LeagueGrid';
import { useSearchParams, useRouter } from 'next/navigation';
import PopUpAddLeague from '../../../../components/user/admin_master/league_admin/pop-up_add_league/page';
import PopUpEditLeague from '../../../../components/user/admin_master/league_admin/pop-up_edit_league/page';
import { menuOptionsAdminMaster } from '../../../../components/components_generics/footer/menu_options/MenuOptions';
import CustomButton from '../../../../components/components_generics/button/CustomButton';
import { obtenerDatosUsuario, obtenerUsuariosActivos } from '@/services/usuarioService';
import { obtenerLigasActivas, desactivarLiga } from '@/services/ligaService';
import CustomAlert from '../../../../components/components_generics/custom_alert/CustomAlert';
import CustomAlertAcceptOrCancel from '@/components/components_generics/custom_alert/CustomAlertAcceptOrCancel';
import { RingLoader } from 'react-spinners';

const Liga_AdminContent = () => {
    const [showPopupAddLeague, setShowPopupAddLeague] = useState(false);
    const [showPopupEditLeague, setShowPopupEditLeague] = useState(false);
    const searchParams = useSearchParams();
    const [datosUsuario, setDatosUsuario] = useState<any>(null);
    const [datosLigas, setDatosLigas] = useState<any>(null);
    const [datosUsuariosActivos, setDatosUsuariosActivos] = useState<any>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [selectedLiga, setSelectedLiga] = useState(null);
    const [showAlertCustom, setShowAlertCustom] = useState(false);
    const [messageAlertCustom, setMessageAlertCustom] = useState('');
    const [showAlertCustomAcceptOrCancel, setShowAlertCustomAcceptOrCancel] = useState(false);
    const [messageAlertCustomAcceptOrCancel, setMessageAlertCustomAcceptOrCancel] = useState('');
    const userRole = searchParams.get('role');
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleIsLoading = (isLoading: boolean) => {
        setIsLoading(isLoading);
    };

    const obtenerDatos = useCallback(async () => {
        try {
            // Obtener datos del usuario
            const usuario = await obtenerDatosUsuario();
            setDatosUsuario(usuario);

            // Obtener los usuarios activos
            const usuariosActivos = await obtenerUsuariosActivos();
            setDatosUsuariosActivos(usuariosActivos);

            // Obtenemos datos de las ligas
            const ligas = await obtenerLigasActivas();
            setDatosLigas(ligas);
        } catch (error) {
            console.error('Error al obtener los datos:', error);
            alert('Error: ' + error);
            if (process.env.NODE_ENV === 'production'){
                router.push('/login.html');
            }else{
                router.push('/login');
            } 
            // router.push('/login');
        }
    }, [router]);

    useEffect(() => {
        const fetchDatos = async () => {
            await obtenerDatos();
        };
        fetchDatos();
    }, [obtenerDatos, router]);

    if (!datosUsuario || !datosUsuariosActivos || !datosLigas) {
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

    const handleLigaSeleccionada = (liga) => {        
        setSelectedLiga(liga); // Actualiza el estado con la liga seleccionada
    };

    const onEditarLiga = () => {
        setShowPopupEditLeague(true);
    };

    const onEliminarLiga = async (liga) => {
        setMessageAlertCustomAcceptOrCancel(`¿Estás seguro que deseas eliminar la liga "${liga.nombre_liga}"? Esta acción eliminará también los torneos y partidos vinculados a esta liga. Esta acción no se puede deshacer.`);
        setShowAlertCustomAcceptOrCancel(true);
    };

    const handleCloseAlertCustom = () => {
        setShowAlertCustom(false);
    };

    const menuOptionsLeft = menuOptionsAdminMaster.left.map((option) => ({
        ...option,
        color: option.label === 'Liga' ? 'text-blue-500' : option.color
    }));

    const menuOptionsRight = menuOptionsAdminMaster.right.map((option) => ({
        ...option,
    }));

    const handleAcceptAlertCustomAcceptOrCancel = async () => {
        setShowAlertCustomAcceptOrCancel(false);
        try {
            setIsLoading(true);
            const response = await desactivarLiga(selectedLiga.id_liga);
            // FALTA DESACTIVAR LOS DATOS DE LOS TORNEOS Y PARTIDOS PARA ELIMINAR LA LIGA COMPLETAMENTE
            setIsLoading(false);
            if (response) {
                setMessageAlertCustom(`¡Se ha eliminado la Liga ${selectedLiga.nombre_liga} exitosamente!`);
                setShowAlertCustom(true);
                obtenerDatos();
            }
        } catch (error) {
            console.log("Error al desactivar la liga: ", error);
            alert("Error al desactivar la liga: " + error);
        }
    };

    const handleCancelAlertCustomAcceptOrCancel = () => {
        setShowAlertCustomAcceptOrCancel(false);
    };

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
            <div className={`flex-1 flex flex-col justify-center items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                <div className="flex flex-col sm850:flex-row justify-center items-center -translate-x-[13%] xs270:-translate-x-[0%]">
                    <TitleWithImages
                        leftImageSrc="/images/logos/Icono_Liga.png"
                        rightImageSrc="/images/logos/Icono_Liga.png"
                        titleText="Administración de Ligas"
                        leftImageOpacity={1}
                        rightImageOpacity={1}
                        titleOpacity={1}
                    />
                </div>
            </div>
            <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                <div className="flex-grow w-[95%] mx-4">
                    <LeagueGrid
                        ligas={datosLigas || []}
                        onSelectLiga={handleLigaSeleccionada}
                        onEditarLiga={onEditarLiga}
                        onEliminarLiga={onEliminarLiga}
                    />
                </div>
            </div>

            {/** Alertas de las acciones */}
            <CustomAlert message={messageAlertCustom} show={showAlertCustom} onClose={handleCloseAlertCustom} />
            <CustomAlertAcceptOrCancel message={messageAlertCustomAcceptOrCancel} onAccept={handleAcceptAlertCustomAcceptOrCancel} onCancel={handleCancelAlertCustomAcceptOrCancel} show={showAlertCustomAcceptOrCancel} />

            <div className={`flex-col sm500:flex-row flex-1 flex justify-center space-x-0 sm500:space-x-10 items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                <CustomButton text="Crear liga" color="#3b82f6" width="" height="" onClick={() => setShowPopupAddLeague(true)} className='flex-col w-[80%] flex-col sm500:w-[30%]' icon="/images/logos/Icono_Nuevo_Blanco.png" />
            </div>
            {showPopupAddLeague && <PopUpAddLeague onClose={() => setShowPopupAddLeague(false)} onSave={obtenerDatos} usuariosActivos={datosUsuariosActivos} setIsLoading={handleIsLoading} />}
            {showPopupEditLeague && <PopUpEditLeague onClose={() => setShowPopupEditLeague(false)} onSave={obtenerDatos} usuariosActivos={datosUsuariosActivos} ligaSeleccionada={selectedLiga} setIsLoading={handleIsLoading} />}
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

const Liga_Admin = () => {
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
            <Liga_AdminContent />
        </Suspense>
    );
};

export default Liga_Admin;