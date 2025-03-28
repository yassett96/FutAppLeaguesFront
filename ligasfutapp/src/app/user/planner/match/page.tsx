"use client";
import React, { useState, useEffect, Suspense } from 'react';
import SideBar from '../../../../components/components_generics/side_bar/SideBar';
import SearchBar from '../../../../components/components_generics/search_bar/SearchBar';
import Instructions from '../../../../components/user/planner/match/Instructions';
import CustomButton from '../../../../components/components_generics/button/CustomButton';
import Footer from '../../../../components/components_generics/footer/Footer';
import { RingLoader } from 'react-spinners';
import { IoDocumentText, IoPeople, IoChatbox, IoList } from 'react-icons/io5';
import { useSearchParams, useRouter } from 'next/navigation';
import { obtenerDatosUsuario } from '@/services/usuarioService';
import { menuOptionsPlanillero } from '../../../../components/components_generics/footer/menu_options/MenuOptions';

const Partido: React.FC = () => {
    return (
        <div className="min-h-screen bg-cream-faf9f6">
            <Suspense fallback={<div>Loading...</div>}>
                <PartidoContent />
            </Suspense>
        </div>
    );
};

const PartidoContent: React.FC = () => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [datosUsuario, setDatosUsuario] = useState<any>(null);
    const searchParams = useSearchParams();
    const userRole = searchParams.get('role');
    const idPartido = searchParams.get('id_p');

    useEffect(() => {
        const fetchDatos = async () => {
            try {
                // Obtener datos del usuario
                const usuario = await obtenerDatosUsuario();
                setDatosUsuario(usuario);
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

    // Generar dinámicamente las opciones del menú
    const menuOptionsLeft = menuOptionsPlanillero.left.map((option) => ({
        ...option,
    }));

    const menuOptionsRight = menuOptionsPlanillero.right.map((option) => ({
        ...option,
    }));

    // Redirección hacia las otras pantalals
    const handleButtonFirmaClick = () => {
        if (process.env.NODE_ENV === 'production') {
            router.push(`/user/planner/match_signature.html?role=` + userRole + `&id_p=${idPartido}`);
        } else {
            router.push(`/user/planner/match_signature/?role=` + userRole + `&id_p=${idPartido}`);
        }
        // router.push(`/user/planner/match_signature/?role=` + userRole + `&id_p=${idPartido}`);
    };

    const handleButtonDatosClick = () => {
        if (process.env.NODE_ENV === 'production') {
            router.push(`/user/planner/match_data.html?role=` + userRole + `&id_p=${idPartido}`);
        } else {
            router.push(`/user/planner/match_data/?role=` + userRole + `&id_p=${idPartido}`);
        }
        // router.push(`/user/planner/match_data/?role=` + userRole + `&id_p=${idPartido}`);
    };

    const handleButtonComentarioClick = () => {
        if (process.env.NODE_ENV === 'production') {
            router.push('/user/planner/match_comment.html?role=' + userRole + `&id_p=${idPartido}`);
        } else {
            router.push('/user/planner/match_comment/?role=' + userRole + `&id_p=${idPartido}`);
        }
        // router.push('/user/planner/match_comment/?role=' + userRole + `&id_p=${idPartido}`);
    };

    const handleButtonResumenClick = () => {
        if (process.env.NODE_ENV === 'production') {
            router.push(`/user/planner/match_resume_chronology.html?role=` + userRole + `&id_p=${idPartido}`);
        } else {
            router.push(`/user/planner/match_resume_chronology/?role=` + userRole + `&id_p=${idPartido}`);
        }
        // router.push(`/user/planner/match_resume_chronology/?role=` + userRole + `&id_p=${idPartido}`);
    };

    return (
        <div className="min-h-screen bg-cream-faf9f6 overflow-x-hidden">
            <div className={`${isOpen ? 'lg:ml-70 ml-0' : 'lg:ml-[0%] ml-[0%]'}`}>
                <SideBar userType={userRole} menuDisabled={false} onToggleSidebar={handleSidebarToggle} onToggleSidebarMobile={handleSidebarToggleMobile} isMobileOpen={isMobileOpen} id_partido={Number(idPartido)} />
            </div>

            <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                <div className={`transition-all duration-300 ${isOpen ? 'lg:w-[75%] xl1500:w-[85%] lg:left-[21%] xl1500:left-[13%]' : 'w-[95%] xxs:w-[90%] xl1500:w-[95%] lg:left-[6.5%] xl1500:left-[3.5%]'} mx-4 my-4 xxs:left-[3.6%] z-20`}>
                    <SearchBar onToggleSidebarMobile={handleSidebarToggleMobile} userType={userRole} userName={datosUsuario.primer_nombre + " " + datosUsuario.primer_apellido} userPhotoBlob={datosUsuario.foto} />
                </div>
            </div>

            <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                <div className="flex-grow w-[95%] mx-4">
                    <Instructions />
                </div>
            </div>

            <div className={`mt-5 flex-1 flex flex-col justify-center items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                <div className="flex flex-col space-y-4 xs360:flex-row xs360:space-y-0 xs360:space-x-4">
                    <CustomButton
                        text="Firma Jugadores"
                        color="#1e3a8a"
                        width=""
                        height=""
                        onClick={handleButtonFirmaClick}
                        className='flex-col h-[90px] w-[200px] xs260:w-[160px]'
                        classNameText='text-[16px]'
                        icon={<IoDocumentText />}
                    />
                    <CustomButton
                        text="Datos del Partido"
                        color="#1e3a8a"
                        width=""
                        height=""
                        onClick={handleButtonDatosClick}
                        className='flex-col h-[90px] w-[200px] xs260:w-[160px]'
                        classNameText='text-[16px]'
                        icon={<IoPeople />}
                    />
                </div>
            </div>

            <div className={`mt-5 flex-1 flex flex-col justify-center items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                <div className="flex flex-col space-y-4 xs360:flex-row xs360:space-y-0 xs360:space-x-4">
                    <CustomButton
                        text="Comentarios Post-Partido"
                        color="#1e3a8a"
                        width=""
                        height=""
                        onClick={handleButtonComentarioClick}
                        className='flex-col w-[200px] xs260:w-[160px] h-[90px]'
                        classNameText='text-[16px]'
                        icon={<IoChatbox />}
                    />
                    <CustomButton
                        text="Resumen Partido"
                        color="#1e3a8a"
                        width=""
                        height=""
                        onClick={handleButtonResumenClick}
                        className='flex-col h-[90px] w-[200px] xs260:w-[160px]'
                        classNameText='text-[16px]'
                        icon={<IoList />}
                    />
                </div>
            </div>

            <br />
            <br />
            <br />
            <br />
            <br />
            <br />

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

export default Partido;