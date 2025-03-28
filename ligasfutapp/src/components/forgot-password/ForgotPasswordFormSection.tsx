"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { forgotPassword } from '@/services/authService';
import CustomAlert from '../components_generics/custom_alert/CustomAlert';

const ForgotPasswordFormSection = () => {
    const [email, setEmail] = useState('');
    const [messageCustomAlert, setMessageCustomAlert] = useState(null);
    const [showCustomAlert, setShowCustomAlert] = useState(null);

    const router = useRouter();

    // Para llamar el login
    const handleLoginClick = () => {
        if (process.env.NODE_ENV === 'production') {
            router.push('/login.html');
        } else {
            router.push('/login');
        }
        // router.push('/login');
    };

    // Acción al enviar los datos del formulario
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
                
        const response = await forgotPassword(email);
        
        if(response.correoEnviado){
            setMessageCustomAlert(`Se ha enviado un correo a ${email}, revisar para recuperar tu contraseña`);
            setShowCustomAlert(true);
        }else{
            setMessageCustomAlert(`Este correo no existe, ingresa el correo al que quieres recuperar contraseña`);
            setShowCustomAlert(true);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center bg-white md:w-1/3 sm:w-full p-8">
            <div className='width-54perc'>
                <Image src="/images/logos/app-logo-primary-square.png" alt="Futapp Logo" className="width-40perc margin-bottom-m-100px move-to-left-2perc" width={100} height={100}/>
                <h1 className="text-2xl mb-2 text-center text-black float-left">¿Olvidate tu contraseña? 🔒</h1>
                <br></br>
                <br></br>
                <h2 className="text-xm mb-4 text-center text-black float-left text-justify">Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña</h2>
            </div>
            <form className="w-full max-w-sm" onSubmit={handleSubmit} autoComplete="off">                
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
                        autoComplete="new-email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='example@gmail.com'
                        
                    />
                </div>                
                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Reiniciar contraseña</button>
            </form>
            <p className="mt-4 text-gray-600"><a href="#" className="text-blue-600 hover:underline" onClick={handleLoginClick}> &larr; Volver al login</a></p>
            {showCustomAlert &&(
                <CustomAlert message={messageCustomAlert} show={showCustomAlert} onClose={() => setShowCustomAlert(false)} />
            )}
        </div>
    );
};

export default ForgotPasswordFormSection;