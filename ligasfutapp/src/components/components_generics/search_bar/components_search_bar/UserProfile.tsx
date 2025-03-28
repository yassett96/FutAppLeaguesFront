import React, { useState, useRef, useEffect } from 'react';
import { IoPersonCircle, IoSettings, IoLogOut, IoCard, IoHelpCircle, IoWallet } from 'react-icons/io5';
import Image from 'next/image';
import { useRouter } from 'next/navigation';  // Utilizamos el router para la redirección

const UserProfile: React.FC<{ avatarUrl?: string, userName: string, userRole: string, unreadNotifications: number }> = ({ avatarUrl, userName, userRole, unreadNotifications }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const router = useRouter();  // Declaramos useRouter directamente en el cuerpo del componente

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        // Nos aseguramos que estamos en el cliente (evitar errores en el servidor)
        if (typeof window !== 'undefined') {
            // Limpiamos el localStorage o realizamos cualquier acción necesaria
            localStorage.removeItem('authToken'); // Ejemplo: eliminamos el token de autenticación
            // Redirigimos al usuario a la página de inicio de sesión
            if (process.env.NODE_ENV === 'production') {
                router.push('/login.html');
            } else {
                router.push('/login');
            }
            // router.push('/login');  // Ruta correcta de redirección
        }
    };

    const handleMyProfile = () => {
        if (process.env.NODE_ENV === 'production') {
            router.push(`/user/player/profile.html?role=${userRole}`);
        } else {
            router.push(`/user/player/profile/?role=${userRole}`);
        }
        // router.push(`/user/player/profile/?role=${userRole}`);
    };

    return (
        <div className="relative" ref={menuRef}>
            <div onClick={toggleMenu} className="hover:cursor-pointer flex items-center justify-start overflow-x-hidden" style={{ width: '50px', height: '50px' }}>
                {avatarUrl ? (
                    <>
                        <Image
                            src={avatarUrl}
                            alt="avatar"
                            className="w-10 xxs:w-full h-10 xxs:h-full top-3 xxs:top-0 translate-x-[50%] xxs:translate-x-[0%] xxs:left-0 rounded-full"
                            width={50}
                            height={50}
                        />                        
                    </>
                ) : (
                    <IoPersonCircle className="text-gray-500 cursor-pointer" size={50} />
                )}
                <span className="absolute bottom-1 xxs:bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
            </div>

            {isOpen && (
                <div className="absolute right-6 xs260:right-0 mt-2 w-56 bg-white border rounded-lg shadow-lg z-50">
                    <div className="flex items-center p-4 border-b">
                        <div className="relative w-12 h-12 mr-3">
                            {avatarUrl ? (
                                <>
                                    <Image
                                        src={avatarUrl}
                                        alt="avatar"
                                        className="rounded-full max-h-[40px]"
                                        width={48}
                                        height={48}
                                    />
                                </>
                            ) : (
                                <IoPersonCircle className="text-gray-500" size={48} />
                            )}
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                        </div>
                        <div>
                            <div className="font-semibold text-gray-800">{userName}</div>
                            <div className="text-sm text-gray-500">{userRole}</div>
                        </div>
                    </div>

                    {(userRole === 'Jugador' || userRole === 'Delegado') && (
                        <div className="py-2 border-b">
                            <button className="flex items-center w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100" onClick={handleMyProfile}>
                                <IoPersonCircle
                                    className="mr-2 text-gray-800"
                                    size={20}
                                    style={{ fill: 'white', stroke: 'black', strokeWidth: '15' }}
                                />
                                Mi perfil
                            </button>
                        </div>
                    )}


                    {/* <button className="flex items-center w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100">
                            <IoSettings
                                className="mr-2 text-gray-800"
                                size={20}
                                style={{ fill: 'white', stroke: 'black', strokeWidth: '20' }}
                            />
                            Ajustes
                        </button>
                        <button className="flex items-center justify-between w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100">
                            <div className="flex items-center">
                                <IoCard
                                    className="mr-2 text-gray-800"
                                    size={20}
                                    style={{ fill: 'white', stroke: 'black', strokeWidth: '20' }}
                                />
                                Pagos
                            </div>
                            {unreadNotifications > 0 && (
                                <span className="bg-red-500 text-white text-xs font-semibold rounded-full px-2 py-1 ml-2">
                                    {unreadNotifications}
                                </span>
                            )}
                        </button> */}
                    {/* <div className="py-2">
                        <button className="flex items-center w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100">
                            <IoWallet
                                className="mr-2 text-gray-800"
                                size={20}
                                style={{ fill: 'white', stroke: 'black', strokeWidth: '20' }}
                            />
                            Precios
                        </button>
                        <button className="flex items-center w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100">
                            <IoHelpCircle
                                className="mr-2 text-gray-800"
                                size={20}
                                style={{ fill: 'white', stroke: 'black', strokeWidth: '20' }}
                            />
                            Ayuda
                        </button>
                    </div> */}
                    <div className="flex justify-center">
                        <button onClick={handleLogout} className="flex items-center justify-center w-3/4 px-4 py-2 mb-2 mt-2 text-left text-white hover:bg-red-700 bg-red-500 rounded-xl">
                            Cerrar sesión
                            <IoLogOut className="ml-2" size={20} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserProfile;