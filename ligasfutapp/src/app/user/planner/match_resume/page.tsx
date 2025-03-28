"use client";
import React, { useState, useEffect, Suspense } from 'react';
import SideBar from '../../../../components/components_generics/side_bar/SideBar';
import SearchBar from '../../../../components/components_generics/search_bar/SearchBar';
import Footer from '../../../../components/components_generics/footer/Footer';
import Result from '../../../../components/user/planner/match_resume/Result';
import Goals from '../../../../components/user/planner/match_resume/Goals';
import Warnings from '../../../../components/user/planner/match_resume/Warnings';
import Injuries from '../../../../components/user/planner/match_resume/Injuries';
import Comments from '../../../../components/user/planner/match_resume/Comments';
import CustomButton from '../../../../components/components_generics/button/CustomButton';
import { RingLoader } from 'react-spinners';
import { useSearchParams, useRouter } from 'next/navigation';
import { obtenerDatosUsuario } from '@/services/usuarioService';
import { menuOptionsPlanillero } from '../../../../components/components_generics/footer/menu_options/MenuOptions';
import { obtenerDetallesPartido } from '@/services/partidoService';

const PartidoResumen: React.FC = () => {
    return (
        <div className="min-h-screen bg-cream-faf9f6">
            <Suspense fallback={<div>Loading...</div>}>
                <PartidoResumenContent />
            </Suspense>
        </div>
    );
};

const PartidoResumenContent: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const router = useRouter();
    const [datosUsuario, setDatosUsuario] = useState<any>(null);
    const [datosDetallesPartido, setDatosDetallesPartido] = useState<any>(null);
    // Estados para los datos del partido
    const [equipoLocal, setEquipoLocal] = useState('');
    const [equipoVisitante, setEquipoVisitante] = useState('');
    const [golesLocal, setGolesLocal] = useState([]);
    const [golesVisitante, setGolesVisitante] = useState([]);
    const [amonestacionesLocal, setAmonestacionesLocal] = useState('No amonestaciones');
    const [amonestacionesVisitante, setAmonestacionesVisitante] = useState('No amonestaciones');
    const [lesionesLocal, setLesionesLocal] = useState('No lesiones');
    const [lesionesVisitante, setLesionesVisitante] = useState('No lesiones');
    const [comentarioArbitro, setComentarioArbitro] = useState('Sin comentarios del árbitro');
    const [comentarioCapitanLocal, setComentarioCapitanLocal] = useState('Sin comentarios');
    const [comentarioCapitanVisitante, setComentarioCapitanVisitante] = useState('Sin comentarios');

    const searchParams = useSearchParams();
    const userRole = searchParams.get('role');
    const idPartido = searchParams.get('id_p');

    useEffect(() => {
        const fetchDatos = async () => {
            try {
                // Obtener datos del usuario
                const usuario = await obtenerDatosUsuario();
                setDatosUsuario(usuario);

                // Obtener los detalles del partido
                const detallesP = await obtenerDetallesPartido(Number(idPartido));
                setDatosDetallesPartido(Array.isArray(detallesP) ? detallesP : [detallesP]);

                // Actualizar los estados con los detalles del partido
                setEquipoLocal(detallesP?.equipo_local ?? '');
                setEquipoVisitante(detallesP?.equipo_visitante ?? '');
                setGolesLocal(detallesP?.goles_local ?? []);
                setGolesVisitante(detallesP?.goles_visitante ?? []);
                setAmonestacionesLocal(detallesP?.amonestaciones_local ?? 'No amonestaciones');
                setAmonestacionesVisitante(detallesP?.amonestaciones_visitante ?? 'No amonestaciones');
                setLesionesLocal(detallesP?.lesiones_local ?? 'No lesiones');
                setLesionesVisitante(detallesP?.lesiones_visitante ?? 'No lesiones');
                setComentarioArbitro(detallesP?.comentario_arbitro ?? 'Sin comentarios del árbitro');
                setComentarioCapitanLocal(detallesP?.comentario_capitan_local ?? 'Sin comentarios');
                setComentarioCapitanVisitante(detallesP?.comentario_capitan_visitante ?? 'Sin comentarios');
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
    }, [idPartido, router]);

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
        color: option.label === 'Resumen' ? 'text-blue-500' : option.color
    }));

    const localTeam = "Equipo local";
    const visitorTeam = "Equipo visitante";
    const localGoals = [
        { player: 'Juan Pérez', count: 2 },
        { player: 'Pedro Ramírez', count: 1 },
    ];
    const visitorGoals = [
        { player: 'Diego Rodríguez', count: 2 },
    ];
    const localWarnings = [
        { player: "Elena López", card: "🔴" },
    ];
    const visitorWarnings = [
        { player: "María Gonzáles", card: "🟨" }
    ];
    const localInjuries = [
        { player: "Elena López" },
    ];
    const visitorInjuries = [
        { player: "María Gonzáles" }
    ];
    const comments = {
        referee: "Árbitro central: Comentarios de ejemplo ...",
        captainLocal: "Comentarios de ejemplo ...",
        captainVisitor: "Comentarios de ejemplo ..."
    };

    const handleCloseMatch = () => {
        const confirmed = window.confirm('¿Está seguro que desea cerrar el partido?');
        if (confirmed) {
            if (process.env.NODE_ENV === 'production') {
                router.push(`/user/planner/home_planner.html?role=${userRole}`);
            } else {
                router.push(`/user/planner/home_planner/?role=${userRole}`);
            }
            // Lógica para cerrar el partido
            // router.push(`/user/planner/home_planner/?role=${userRole}`);
        }
    };

    return (
        <div className="min-h-screen bg-cream-faf9f6">
            <div className={`${isOpen ? 'lg:ml-70 ml-0' : 'lg:ml-[0%] ml-[0%]'}`}>
                <SideBar userType='Planillero' menuDisabled={false} onToggleSidebar={handleSidebarToggle} onToggleSidebarMobile={handleSidebarToggleMobile} isMobileOpen={isMobileOpen} id_partido={Number(idPartido)} />
            </div>
            <br />
            <br />
            <br />
            <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                <div className={`transition-all duration-300 ${isOpen ? 'lg:w-[75%] xl1500:w-[85%] lg:left-[21%] xl1500:left-[13%]' : 'w-[95%] xxs:w-[90%] xl1500:w-[95%] lg:left-[6.5%] xl1500:left-[3.5%]'}  mx-4 my-4 fixed top-0 xxs:left-[3.6%] z-20`}>
                    <SearchBar onToggleSidebarMobile={handleSidebarToggleMobile} userType={userRole} userName={datosUsuario.primer_nombre + " " + datosUsuario.primer_apellido} userPhotoBlob={datosUsuario.foto} />
                </div>
            </div>
            <br />
            <br />
            <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                <div className="w-full flex items-center justify-center">
                    <Result localTeam={localTeam} visitorTeam={visitorTeam} localGoals={localGoals.length} visitorGoals={visitorGoals.length} />
                </div>
            </div>
            <br />
            <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                <div className="w-full flex items-center justify-center">
                    <Goals localGoals={localGoals} visitorGoals={visitorGoals} />
                </div>
            </div>
            <br />
            <br />
            <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                <div className="w-full flex items-center justify-center">
                    <Warnings localWarnings={localWarnings} visitorWarnings={visitorWarnings} />
                </div>
            </div>
            <br />
            <br />
            <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                <div className="w-full flex items-center justify-center">
                    <Injuries localInjuries={localInjuries} visitorInjuries={visitorInjuries} />
                </div>
            </div>
            <br />
            <br />
            <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                <div className="w-full flex items-center justify-center">
                    <Comments title="Comentarios árbitros" comments={comments.referee} icon='/images/logos/Icono_Arbitro.png' />
                </div>
            </div>
            <br />
            <br />
            <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                <div className="w-full flex items-center justify-center">
                    <Comments title="Comentarios capitán Equipo local" comments={comments.captainLocal} icon='/images/logos/Icono_Escudo_1.png' />
                </div>
            </div>
            <br />
            <br />
            <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                <div className="w-full flex items-center justify-center">
                    <Comments title="Comentarios capitán Equipo visitante" comments={comments.captainVisitor} icon='/images/logos/Icono_Escudo_2.png' />
                </div>
            </div>
            <br />
            <br />
            <div className='flex items-center justify-center'>
                <CustomButton text="Cerrar partido" color="#22c55e" width="" height="" onClick={handleCloseMatch} className='flex-col w-[80%] sm750:w-[40%] -translate-x-[5%]' icon="/images/logos/Icono_Confirmar_Blanco.png" classNameText='text-2xl' classNameIcon='h-8 w-8' />
            </div>
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

export default PartidoResumen;