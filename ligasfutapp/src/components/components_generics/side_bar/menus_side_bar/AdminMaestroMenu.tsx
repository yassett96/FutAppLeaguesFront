import React from 'react';
import { IoDocumentText } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const AdminMaestroMenu: React.FC<{ isOpen: boolean; isHovered: boolean; menuDisabled: boolean }> = ({ isOpen, isHovered, menuDisabled }) => {
    const router = useRouter();

    return (
        <>
            <button
                className={`text-xl flex items-center mb-3 px-4 py-2 text-left text-gray-200 hover:bg-blue-800 ${menuDisabled ? 'cursor-not-allowed opacity-50' : ''}`}
                disabled={menuDisabled}
                onClick={() => {
                    if (process.env.NODE_ENV === 'production') {
                        router.push('/user/admin_master/league_admin.html?role=Admin_Maestro')
                    } else {
                        router.push('/user/admin_master/league_admin/?role=Admin_Maestro')
                    }
                    // router.push('/user/admin_master/league_admin/?role=Admin_Maestro')
                }}
            >                
                <Image src="/images/logos/Icono_Liga_Blanco.png" alt="" className={`w-8 h-8 -translate-x-[3px] mr-2 ${isOpen || isHovered ? 'ml-0' : '-ml-2'}`} width={100} height={100} />
                <span className={`transition-opacity duration-300 ${isOpen || isHovered ? 'opacity-100' : 'opacity-0'}`}>
                    Liga
                </span>
            </button>            
        </>
    );
};

export default AdminMaestroMenu;