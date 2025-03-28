import React from 'react';
import Image from 'next/image';

const FooterInicio = () => {
    return (
        <footer className="bg-black text-white py-12 border-radius-top-80px">
            <div className="container mx-auto px-4 text-center">
                <div className="mb-8 leading-relaxed">
                    <span className="text-white bg-black-282828 px-2 py-1 rounded">Contacto</span>
                    <h2 className="text-3xl font-bold my-3">¿Aún tienes dudas?</h2>
                    <p className="text-gray-400">Si tienes preguntas puedes enviarnos un mensaje a nuestro correo electrónico</p>
                </div>
                <div className="mb-8 flex flex-col items-center">
                    <div className="flex items-center mb-4">
                        <span className="inline-block w-12 h-12 bg-black-2a2a2a rounded-md flex items-center justify-center">
                            <svg className="w-6 h-6 text-white bg-black-2a2a2a" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2 4h20c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H2c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm0 2v.51l10 6.99 10-6.99V6H2zm0 12h20V8l-10 7-10-7v10z" />
                            </svg>
                        </span>
                    </div>
                    <p className="text-lg">contacto.futapp@gmail.com</p>
                    <p className="text-gray-400">Te responderemos lo antes posible</p>
                </div>
                <div className="border-t border-gray-700 pt-8">
                    <div className="flex justify-center items-center mb-4 space-x-2">
                        <Image src='/images/logos/app-logo-white.png' className='w-18 h-10' width={100} height={100} alt='Imagen Logo Blanco' />
                        <p>&copy; 2024</p>
                    </div>
                    <div className="flex justify-center space-x-4">
                        <a href="#" className="text-gray-400 hover:text-white">Privacy</a>
                        <a href="#" className="text-gray-400 hover:text-white">Terms</a>
                        <a href="#" className="text-gray-400 hover:text-white">Contact</a>
                        <a href="#" className="text-gray-400 hover:text-white">About Us</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default FooterInicio;