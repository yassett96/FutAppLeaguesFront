"use client";
import React, { useState, Suspense, useEffect } from 'react';
import SideBar from '../../../../components/components_generics/side_bar/SideBar';
import SearchBar from '../../../../components/components_generics/search_bar/SearchBar';
import Footer from '../../../../components/components_generics/footer/Footer';
import WelcomeMessage from '../../../../components/user/player/initiation_player/WelcomeMessage';
import PhotoUpload from '../../../../components/user/player/initiation_player/PhotoUpload';
import BirthDateInput from '../../../../components/user/player/initiation_player/BirthDateInput';
import NationalitySelect from '../../../../components/user/player/initiation_player/NationalitySelect';
import TermsAndConditions from '../../../../components/user/player/initiation_player/TermsAndConditions';
import CustomAlert from '../../../../components/components_generics/custom_alert/CustomAlert';
import { RingLoader } from 'react-spinners';
import { useRouter } from 'next/navigation';
import CustomButton from '../../../../components/components_generics/button/CustomButton';
import { useSearchParams } from 'next/navigation';
import { menuOptionsDelegado, menuOptionsJugador } from '../../../../components/components_generics/footer/menu_options/MenuOptions';
import { obtenerDatosUsuario, actualizarUsuarioIniciacionJugador } from '@/services/usuarioService';

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
    const [isOpen, setIsOpen] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const userRole = searchParams.get('role') ?? '';

    // Estados para almacenar los valores seleccionados
    const [selectedImage, setSelectedImage] = useState(null);
    const [birthDate, setBirthDate] = useState('');
    const [nationality, setNationality] = useState('');
    const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
    const [datosUsuario, setDatosUsuario] = useState<any>(null);
    const router = useRouter();
    const [showAlert, setShowAlert] = useState(false);
    const [showAlertSave, setShowAlertSave] = useState(false);

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
    }, [router, userRole]);

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

    const { id_usuario, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, dni, fecha_nacimiento, nacionalidad, foto } = datosUsuario;

    const handleShowAlert = () => {
        setShowAlert(true);
    };

    const handleCloseAlert = () => {
        setShowAlert(false);
    };

    const handleCloseAlertSave = () => {
        setShowAlertSave(false);
        if (process.env.NODE_ENV === 'production') {
            router.push(`/user/player/profile.html?role=${userRole}`);
        } else {
            router.push(`/user/player/profile?role=${userRole}`);
        }
        // router.push(`/user/player/profile?role=${userRole}`);
    };

    const handleImageChange = (image) => {
        setSelectedImage(image);
    };

    const handleBirthDateChange = (date) => {
        setBirthDate(date);
    };

    const handleNationalityChange = (nationality) => {
        setNationality(nationality);
    };

    const handleTermsChange = (accepted: boolean) => {
        setTermsAccepted(accepted);
    };

    const handleSidebarToggle = (state: boolean) => {
        setIsOpen(state);
    };

    const handleSidebarToggleMobile = (state: boolean) => {
        setIsMobileOpen(state);
    };

    const onSave = async () => {
        if (!selectedImage || !birthDate || !nationality || !termsAccepted) {
            handleShowAlert();
        } else {
            try {
                const response = await fetch(selectedImage);
                const blobImage = await response.blob();
                // const mimeType = blobImage.type; // Obtener el tipo MIME

                await actualizarUsuarioIniciacionJugador(id_usuario, blobImage, birthDate, nationality);

                setShowAlertSave(true);
            } catch (error) {
                console.error('Error al guardar el usuario:', error);
                alert('Hubo un error al guardar los cambios.');
            }
        }
    };

    var menuOptionsLeft;
    var menuOptionsRight;

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
            color: option.label === 'Comentarios' ? 'text-blue-500' : option.color
        }));
    }

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
            <br />
            <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                <div className="flex-grow w-[95%] mx-4 mt-[20px]">
                    <WelcomeMessage NamePlayer={primer_nombre + " " + primer_apellido} />
                </div>
            </div>
            <br />
            <br />
            <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                <div className="flex-grow w-[95%] mx-4 mt-[20px]">
                    <PhotoUpload onImageChange={handleImageChange} />
                </div>
            </div>
            <br />
            <br />
            <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                <div className="flex-grow w-[95%] mx-4 mt-[20px]">
                    <BirthDateInput onBirthDateChange={handleBirthDateChange} />
                </div>
            </div>
            <br />
            <br />
            <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                <div className="flex-grow w-[95%] mx-4 mt-[20px]">
                    <NationalitySelect onNationalityChange={handleNationalityChange} />
                </div>
            </div>
            <br />
            <br />
            <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                <div className="flex-grow mt-[20px]">
                    <TermsAndConditions onTermsChange={handleTermsChange} />
                </div>
            </div>
            <br />
            <br />
            <div className={`flex-1 flex flex-col justify-start items-center transition-all duration-300 ${isOpen ? 'lg:ml-[20.5%] xl:ml-[16.5%] 2xl:ml-[13.5%] 3xl:ml-[12.5%] 4xl:ml-[11%] ml-0' : 'lg:ml-[5%] ml-[0%]'}`}>
                <div className="flex-grow w-[95%] mx-4 mt-[20px] flex items-center justify-center">
                    <CustomButton text="Guardar" color="#24b364" width="" height="" onClick={onSave} className='flex-col w-[80%] sm750:w-[40%]' icon="/images/logos/Icono_Guardar_Blanco.png" />

                    <CustomAlert
                        message="¡Debe de aceptar los términos y condiciones y llenar todos los campos!"
                        show={showAlert}
                        onClose={handleCloseAlert}
                    />
                </div>
            </div>

            <CustomAlert
                message="¡Se han registrado los datos del usuario correctamente!"
                show={showAlertSave}
                onClose={handleCloseAlertSave}
            />
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

export default Iniciacion_Jugador;