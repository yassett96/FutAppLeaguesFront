import React from "react";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { USER_ROLES } from "@/constants";

interface MenuOption {
    label: string;
    path: string;
    color?: string;
    disabled?: boolean;
}

interface FooterProps {
    userType: string;
    menuOptionsLeft: MenuOption[];
    menuOptionsRight: MenuOption[];
    id_partido?: number;
}

const Footer: React.FC<FooterProps> = ({ userType, menuOptionsLeft, menuOptionsRight, id_partido }) => {
    const router = useRouter();

    // Función para manejar los clicks en las opciones del menú
    const handleMenuClick = (path: string, disabled: boolean | undefined) => {
        if (userType === USER_ROLES.JUGADOR) {
            if (process.env.NODE_ENV === 'production') {
                path += `.html?role=${userType}`;
            } else {
                path += `/?role=${userType}`;
            }
            // path += `/?role=${userType}`;
        }
        else if (userType === USER_ROLES.DELEGADO) {
            if (process.env.NODE_ENV === 'production') {
                path += `.html?role=${userType}`;
            } else {
                path += `/?role=${userType}`;
            }
            // path += `/?role=${userType}`;
        }
        else if (userType === USER_ROLES.PLANILLERO) {
            if (process.env.NODE_ENV === 'production') {
                path += `.html?role=${userType}&id_p=${id_partido}`;
            } else {
                path += `/?role=${userType}&id_p=${id_partido}`;
            }
            // path += `/?role=${userType}&id_p=${id_partido}`;
        }
        else if (userType === USER_ROLES.ADMIN_MAESTRO) {
            if (process.env.NODE_ENV === 'production') {
                path += `.html?role=${userType}`;
            } else {
                path += `/?role=${userType}`;
            }
            // path += `/?role=${userType}`;
        }
        else if (userType === USER_ROLES.ADMIN_LIGA) {
            if (process.env.NODE_ENV === 'production') {
                path += `.html?role=${userType}`;
            } else {
                path += `/?role=${userType}`;
            }
            // path += `/?role=${userType}`;
        }

        if (!disabled) {
            router.push(path);
        }
    };

    return (
        <footer className="py-4 bg-transparent border-t border-gray-300 w-full sm670:w-3/4 mx-auto">
            <div className="container mx-auto px-4 flex flex-col xxs:flex-row justify-between items-start xxs:items-center">
                <div className="flex items-center flex-col xxs:flex-row mb-4">
                    <Image
                        width={1000}
                        height={1000}
                        src="/images/logos/app-logo-primary-v2.png"
                        alt="Logo Futapp"
                        className="w-1/3 mb-4 xxs:mb-0"
                    />
                    <div className="flex space-x-4 ml-2 mt-4 xxs:mt-0">
                        <a href="#"><Image width={100} height={100} src="/images/logos/Logo_Instagram.png" alt="Instagram" className="w-6 h-6 shadow-md" /></a>
                        <a href="#"><Image width={100} height={100} src="/images/logos/Logo_Youtube.png" alt="YouTube" className="w-6 h-6 shadow-md" /></a>
                        <a href="#"><Image width={100} height={100} src="/images/logos/Logo_Facebook.png" alt="Facebook" className="w-8 h-8" /></a>
                    </div>
                </div>

                {/* Menú genérico con opciones dependiendo del usuario */}
                <div className="flex flex-col xxs:flex-row justify-between w-full xxs:w-full mt-4 xxs:mt-0">
                    {/* Opciones de la izquierda */}
                    <ul className="space-y-2 xxs:w-1/2 w-full xxs:mr-0">
                        {menuOptionsLeft.map((option, index) => (
                            <li key={index} onClick={() => handleMenuClick(option.path, option.disabled)}>
                                <a
                                    href="#"
                                    className={`text-sm sm590:text-xl text-shadow-lg hover:underline ${option.disabled ? 'cursor-not-allowed opacity-50' : option.color}`}
                                >
                                    {option.label}
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* Opciones de la derecha */}
                    <ul className="space-y-2 mt-5 xxs:mt-0 xxs:w-1/2 w-full xxs:ml-4">
                        {menuOptionsRight.map((option, index) => (
                            <li key={index} onClick={() => handleMenuClick(option.path, option.disabled)}>
                                <a
                                    href="#"
                                    className={`text-sm sm590:text-xl text-shadow-lg hover:underline ${option.disabled ? 'cursor-not-allowed opacity-50' : option.color}`}
                                >
                                    {option.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="text-center mt-20">
                <p className="text-gray-500 text-shadow-lg">Ligas Futapp © 2024</p>
            </div>
        </footer>
    );
};

export default Footer;