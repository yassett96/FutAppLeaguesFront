"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { API_URL } from '@/constants';

const HeaderInicio = () => {
    const router = useRouter();

    // Para llamar el login
    const handleLoginClick = () => {
        if (process.env.NODE_ENV === 'production'){
            router.push('/login.html');
        }else{
            router.push('/login');
        }        
    };

    // Para llamar el register
    const handleRegisterClick = () => {
        if (process.env.NODE_ENV === 'production') {
            router.push('/register.html');
        } else {
            router.push('/register');
        }
        // router.push('/register');
    };

    return (
        <header className="flex justify-between items-center p-4 bg-blue-700 text-white">
            <section className="fixed top-4 left-1/2 transform -translate-x-1/2 w-full sm:w-[80%] md:w-8/12 h-[90px] xxxs:h-16 bg-white rounded-lg shadow-md z-50 flex flex-col xxxs:flex-row items-center justify-between p-0 xxxs:p-4 h-65px">

                <div className="flex items-center justify-center h-[50px] xxxs:h-full">
                    <Image
                        src="/images/logos/app-logo-primary-square.png"
                        alt="Futapp Logo"
                        className="h-5px w-5px"
                        width={100}
                        height={100}
                    />
                </div>

                <div className="flex flex-row text-sm xxxs:text-md -mr-0 xs410:-mr-0 -space-x-0 xs410:space-x-4 mb-10 xxxs:mb-0 items-center justify-center">
                    <button onClick={handleRegisterClick} className="hover:bg-gray-200 text-blue-600 border-radius-10px font-bold h-10 w-36">
                        Registrarse
                    </button>
                    <button onClick={handleLoginClick} className="hover:bg-gray-200 text-blue-600 font-bold border-radius-10px h-10 w-[50%] xs410:w-36">
                        Ingresar
                    </button>
                </div>
            </section>
        </header>
    );
};

export default HeaderInicio;