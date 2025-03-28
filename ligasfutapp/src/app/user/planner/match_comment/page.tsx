"use client";
import React, { useState, useEffect, Suspense } from 'react';
import SideBar from '../../../../components/components_generics/side_bar/SideBar';
import SearchBar from '../../../../components/components_generics/search_bar/SearchBar';
import Footer from '../../../../components/components_generics/footer/Footer';
import TitleWithImages from '../../../../components/components_generics/title_with_images/TitleWithImages';
import TabsAndComments from '../../../../components/user/planner/match_comment/TabsAndComments';
import CustomButton from '../../../../components/components_generics/button/CustomButton';
import { useSearchParams, useRouter } from 'next/navigation';
import { obtenerDatosUsuario } from '@/services/usuarioService';
import { menuOptionsPlanillero } from '../../../../components/components_generics/footer/menu_options/MenuOptions';
import { obtenerEquiposPorPartido } from '@/services/partidoService';
import { obtenerComentariosPorPartido, actualizarComentario } from '@/services/comentarioService';
import CustomAlert from '../../../../components/components_generics/custom_alert/CustomAlert';
import CustomAlertAcceptOrCancel from '@/components/components_generics/custom_alert/CustomAlertAcceptOrCancel';
import { RingLoader } from 'react-spinners';

const PartidoComentario: React.FC = () => {
    return (
        <div className="min-h-screen bg-cream-faf9f6">
            <Suspense fallback={<div>Loading...</div>}>
                <PartidoComentarioContent />
            </Suspense>
        </div>
    );
};

const PartidoComentarioContent: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const router = useRouter();
    const [comentariosPartido, setComentariosPartido] = useState<any>(null);
    const [updatedComments, setUpdatedComments] = useState<any>(null);
    const [datosUsuario, setDatosUsuario] = useState<any>(null);
    const [datosEquiposPorPartido, setDatosEquiposPorPartido] = useState<any>(null);
    const searchParams = useSearchParams();
    const userRole = searchParams.get('role');
    const idPartido = searchParams.get('id_p');
    const [showAlertCustom, setShowAlertCustom] = useState(false);
    const [messageAlertCustom, setMessageAlertCustom] = useState('');
    const [showAlertCustomAcceptOrCancel, setShowAlertCustomAcceptOrCancel] = useState(false);
    const [messageAlertCustomAcceptOrCancel, setMessageAlertCustomAcceptOrCancel] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchDatos = async () => {
            try {
                // Obtener datos del usuario
                const usuario = await obtenerDatosUsuario();
                setDatosUsuario(usuario);

                // Obtener información de los equipos por partido
                const consultaEquiposPorPartido = await obtenerEquiposPorPartido(Number(idPartido));
                setDatosEquiposPorPartido(consultaEquiposPorPartido);

                // Obtener comentarios del partido
                const consultaComentariosPartido = await obtenerComentariosPorPartido(Number(idPartido));
                setComentariosPartido(consultaComentariosPartido.data);
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

    const handleCommentsChange = (newComments) => {
        setUpdatedComments(newComments);
    };

    const handleSaveAndConfirm = async () => {
        setMessageAlertCustomAcceptOrCancel("¿Deseas guardar y confirmar los comentarios?");
        setShowAlertCustomAcceptOrCancel(true);
    };

    const handleCloseAlertCustom = () => {
        setShowAlertCustom(false);
    };

    const handleCancelAlertCustomAcceptOrCancel = () => {
        setShowAlertCustomAcceptOrCancel(false);
    };

    const handleAcceptAlertCustomAcceptOrCancel = async () => {
        setIsLoading(true);
        setShowAlertCustomAcceptOrCancel(false);
        // Construir el objeto con los comentarios
        const comentarioData = {
            id_comentario: comentariosPartido.id_comentario ? comentariosPartido.id_comentario : 0,
            comentario_arbitro: updatedComments['Árbitro'],
            comentario_capitan_local: updatedComments[`Capitán ${datosEquiposPorPartido?.nombre_equipo_local}`],
            comentario_capitan_visitante: updatedComments[`Capitán ${datosEquiposPorPartido?.nombre_equipo_visitante}`],
        };

        try {
            const ejecucionActualizarComentario = await actualizarComentario(
                Number(idPartido),
                comentarioData
            );
            setIsLoading(false);
            if (ejecucionActualizarComentario.success) {
                setMessageAlertCustom('Los comentarios se guardaron y confirmaron correctamente.');
                setShowAlertCustom(true);

                setTimeout(() => {
                    if (process.env.NODE_ENV === 'production') {
                        router.push(`/user/planner/match_resume_chronology.html?role=${userRole}&id_p=${idPartido}`);
                    } else {
                        router.push(`/user/planner/match_resume_chronology/?role=${userRole}&id_p=${idPartido}`);
                    }
                    // router.push(`/user/planner/match_resume_chronology/?role=${userRole}&id_p=${idPartido}`);
                }, 3000);
            } else {
                alert('Hubo un problema al guardar los comentarios.');
            }
        } catch (error) {
            console.error('Error al guardar los comentarios:', error);
            alert('Ocurrió un error al guardar los comentarios.');
        }
    };

    // Generar dinámicamente las opciones del menú
    const menuOptionsLeft = menuOptionsPlanillero.left.map((option) => ({
        ...option,
    }));

    const menuOptionsRight = menuOptionsPlanillero.right.map((option) => ({
        ...option,
        color: option.label === 'Comentarios' ? 'text-blue-500' : option.color
    }));

    return (
        <div className="min-h-screen bg-cream-faf9f6">

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
                        leftImageSrc="/images/logos/Icono_Comment.png"
                        rightImageSrc="/images/logos/Icono_Balon.png"
                        titleText="Comentarios"
                        leftImageOpacity={1}
                        rightImageOpacity={1}
                        titleOpacity={1}
                    />
                </div>
            </div>
            <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                <div className="flex-grow w-[95%] mx-4">
                    <p className="text-center text-black text-sm sm590:text-xl font-bold opacity-50">Indique cualquier observación que crea pertinente respecto al desarrollo del partido</p>
                    <br />
                    <TabsAndComments
                        equipoLocal={datosEquiposPorPartido?.nombre_equipo_local || 'Equipo Local'}
                        equipoVisitante={datosEquiposPorPartido?.nombre_equipo_visitante || 'Equipo Visitante'}
                        initialComments={comentariosPartido || {
                            comentarioArbitro: '',
                            comentarioCapitanLocal: '',
                            comentarioCapitanVisitante: ''
                        }}
                        onCommentsChange={(comment) => { handleCommentsChange(comment) }}
                    />
                </div>
            </div>
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
                <div className="flex-grow w-[95%] mx-4 flex items-center justify-center">
                    <CustomButton
                        text="Guardar y Confirmar"
                        color="#24b364"
                        width=""
                        height=""
                        onClick={handleSaveAndConfirm}
                        className='flex-col w-[80%] sm750:w-[40%]'
                        icon="/images/logos/Icono_Confirmar_Blanco.png"
                        classNameText='text-sm xs360:text-xl'
                        classNameIcon='w-6 sm590:h-8 w-6 sm590:w-8'
                    />
                </div>
            </div>
            <CustomAlert
                message={messageAlertCustom}
                show={showAlertCustom}
                onClose={handleCloseAlertCustom}
            />
            <CustomAlertAcceptOrCancel message={messageAlertCustomAcceptOrCancel} show={showAlertCustomAcceptOrCancel} onCancel={handleCancelAlertCustomAcceptOrCancel} onAccept={handleAcceptAlertCustomAcceptOrCancel} />
            <br />
            <br />
            <Footer
                userType='Planillero'
                menuOptionsLeft={menuOptionsLeft}
                menuOptionsRight={menuOptionsRight}
                id_partido={Number(idPartido)}
            />
        </div>
    );
};

export default PartidoComentario;