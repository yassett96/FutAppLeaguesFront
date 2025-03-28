"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { USER_ROLES } from '@/constants';
import { obtenerUsuarioPorCorreo } from '@/services/usuarioService';
import { validarEmail } from '@/utils/emailUtils';
import { registrarUsuarioHincha } from '@/services/usuarioRolService';
import CustomAlert from '../../components/components_generics/custom_alert/CustomAlert';

const RegisterFormSection = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [primerNombre, setPrimerNombre] = useState('');
    const [segundoNombre, setSegundoNombre] = useState('');
    const [primerApellido, setPrimerApellido] = useState('');
    const [segundoApellido, setSegundoApellido] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [showAlertCustom, setShowAlertCustom] = useState(false);
    const [messageAlertCustom, setMessageAlertCustom] = useState('');

    const router = useRouter();

    const handleLoginClick = () => {
        if (process.env.NODE_ENV === 'production') {
            router.push('/login.html');
        } else {
            router.push('/login');
        }
        // router.push('/login');
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible)
    };

    const toggleAcceptTerms = () => {
        setAcceptTerms(!acceptTerms);
    };

    // Acción al enviar los datos del formulario
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validar los campos
        if (primerNombre === '') {
            setMessageAlertCustom("¡Se debe de ingresar el primer nombre!");
            setShowAlertCustom(true);
            return;
        } else if (primerApellido === '') {
            setMessageAlertCustom("¡Se debe de ingresar el primero apellido!");
            setShowAlertCustom(true);
            return;
        } else if (email === '') {
            setMessageAlertCustom("¡Se debe de ingresar el correo electrónico!");
            setShowAlertCustom(true);
            return;
        } else if (!validarEmail(email)) {
            setMessageAlertCustom("¡Se debe de ingresar un correo electrónico válido Cambio!");
            setShowAlertCustom(true);
            return;
        } else if (password === '') {
            setMessageAlertCustom("¡Se debe de ingresar la contaseña!");
            setShowAlertCustom(true);
            return;
        } else if (confirmPassword === '') {
            setMessageAlertCustom("¡Se debe de confirmar la contraseña!");
            setShowAlertCustom(true);
            return;
        }

        // Validar las contraseñas coincidan
        if (password !== confirmPassword) {
            setMessageAlertCustom("Las contraseñas no coinciden");
            setShowAlertCustom(true);
            return;
        }

        // Validar que se han aceptado los términos
        if (acceptTerms) {
            try {

                const datosUsuario = {
                    correo: email,
                    password: password,
                    id_rol: USER_ROLES.HINCHA,
                    foto: '',
                    fecha_nacimiento: '',
                    nacionalidad: '',
                    primer_nombre: primerNombre,
                    segundo_nombre: segundoNombre,
                    primer_apellido: primerApellido,
                    segundo_apellido: segundoApellido,
                    activo: true,
                };

                const dataUsuarioCorreoExistente = await obtenerUsuarioPorCorreo(datosUsuario.correo);

                if (dataUsuarioCorreoExistente) {
                    setMessageAlertCustom('¡El correo ya existe, por favor ingresar uno diferente!');
                    setShowAlertCustom(true);
                } else {
                    //Llamamos al servicio de registro
                    const data = await registrarUsuarioHincha(datosUsuario);

                    // Si el registro es exitoso, redirigir al login
                    setMessageAlertCustom("Registro exitoso, Redirigiendo al inicio de sesión ...");
                    setShowAlertCustom(true);
                    setTimeout(() => {
                        if (process.env.NODE_ENV === 'production') {
                            router.push('/login.html');
                        } else {
                            router.push('/login');
                        }
                        // router.push('/login');
                    }, 4000);
                    // router.push('/login');
                }

            } catch (error) {
                console.error('Error al registrarse: ', error);
                alert('Error al registrarse: ' + error);
            }
        } else {
            setMessageAlertCustom("¡Se deben de aceptar los términos de seguridad!");
            setShowAlertCustom(true);
        }

    };

    const handleCloseAlertCustom = () => {
        setShowAlertCustom(false);
    };

    return (
        <div className="flex flex-col items-center justify-center bg-white md:w-1/3 w-full sm:w-full p-8">
            <div className='width-54perc'>
                <Image src="/images/logos/app-logo-primary-square.png" alt="Futapp Logo" className="width-40perc margin-bottom-m-100px move-to-left-2perc" width={100} height={100} />
                <h1 className="text-2xl mb-2 text-center text-black float-left">Comienza el desafío 🚀</h1>
                <br></br>
                <h2 className="text-xm mb-4 text-center text-black float-left">Empieza a seguir a tu equipo hoy mismo</h2>
            </div>
            <form className="w-full max-w-sm" onSubmit={handleSubmit} autoComplete="off">
                <div className="mb-4">
                    <label className="block text-gray-700">Primer nombre (*)</label>
                    <input
                        type="text"
                        name="primer_nombre"
                        className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
                        value={primerNombre}
                        onChange={(e) => setPrimerNombre(e.target.value)}
                        placeholder='Primer nombre'
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Segundo nombre</label>
                    <input
                        type="text"
                        name="segundo_nombre"
                        className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
                        value={segundoNombre}
                        onChange={(e) => setSegundoNombre(e.target.value)}
                        placeholder='Segundo nombre'
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Primer apellido (*)</label>
                    <input
                        type="text"
                        name="primer_apellido"
                        className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
                        value={primerApellido}
                        onChange={(e) => setPrimerApellido(e.target.value)}
                        placeholder='Primer apellido'
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Segundo apellido</label>
                    <input
                        type="text"
                        name="segundo_apellido"
                        className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
                        value={segundoApellido}
                        onChange={(e) => setSegundoApellido(e.target.value)}
                        placeholder='Segundo apellido'
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Email (*)</label>
                    <input
                        type="email"
                        name="email"
                        className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='example@gmail.com'
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Contraseña (*)</label>
                    <div className="relative">
                        <input
                            type={passwordVisible ? "text" : "password"}
                            name="new-password"
                            className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Contraseña'
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-2 top-2 text-gray-600"
                        >
                            {passwordVisible ? "Ocultar" : "Mostrar"}
                        </button>
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Confirmar contraseña (*)</label>
                    <div className="relative">
                        <input
                            type={confirmPasswordVisible ? "text" : "password"}
                            name="confirm-password"
                            className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder='Confirmar contraseña'
                        />
                        <button
                            type="button"
                            onClick={toggleConfirmPasswordVisibility}
                            className="absolute right-2 top-2 text-gray-600"
                        >
                            {confirmPasswordVisible ? "Ocultar" : "Mostrar"}
                        </button>
                    </div>
                </div>
                <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center">
                        <input type="checkbox" className="mr-2" onClick={toggleAcceptTerms} />
                        <label className="text-gray-700">Acepto los <a href="#" className="text-blue-600 hover:underline">términos de seguridad</a></label>
                    </div>
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Registrarse</button>
            </form>

            {/** Alertas de las acciones */}
            <CustomAlert message={messageAlertCustom} show={showAlertCustom} onClose={handleCloseAlertCustom} />

            <p className="mt-4 text-gray-600">¿Ya tienes una cuenta? <a href="#" className="text-blue-600 hover:underline" onClick={handleLoginClick}>Ingresar</a></p>
        </div>
    );
};

export default RegisterFormSection;