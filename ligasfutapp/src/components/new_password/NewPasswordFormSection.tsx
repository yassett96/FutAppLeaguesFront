"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import CustomAlert from '../components_generics/custom_alert/CustomAlert';
import { registrarPassword, obtenerUsuarioPorId } from '@/services/usuarioService';
import { login, decodeJWT } from '@/services/authService';
import { USER_ROLES } from '@/constants';

const NewPasswordFormSection = ({ idUsuario }) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [messageAlertCustom, setMessageAlertCustom] = useState('');
    const [showAlertCustom, setShowAlertCustom] = useState(false);
    const router = useRouter();

    // Para activar la visibilidad de la contraseña
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    // Verificar la fuerza de la contraseña
    const isPasswordStrong = (password) => {
        // const regex = /^(?=.*[A-ZÑ])(?=.*\d)[A-Za-zñÑ\d]{8,}$/;
        const regex = /^(?=.*[A-ZÑ])(?=.*\d)[A-Za-zñÑ\d]{8,}$/u;
        return regex.test(password);
    };

    // Para redirigir donde se debe si es un tipo de usuario
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Verificaciones
        if (!password || !confirmPassword) {
            setMessageAlertCustom('Por favor, completa ambos campos de contraseña.');
            setShowAlertCustom(true);
            return;
        }

        if (password !== confirmPassword) {
            setMessageAlertCustom('Las contraseñas no coinciden.');
            setShowAlertCustom(true);
            return;
        }

        if (!isPasswordStrong(password)) {
            setMessageAlertCustom('La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un número.');
            setShowAlertCustom(true);
            return;
        }

        try {
            const regPassword = await registrarPassword(idUsuario, password);

            if (regPassword) {
                const usuario = await obtenerUsuarioPorId(idUsuario);
                if (usuario && typeof usuario !== 'boolean') {
                    // Realizar login automáticamente después de registrar la contraseña
                    const data = await login(usuario.correo, password); // Asumiendo que `email` está disponible
                    localStorage.setItem('token', data.token); // Guardar el token en localStorage

                    // Decodificar el token para obtener el rol del usuario
                    const decodedToken = decodeJWT(data.token);                    
                    const userRole = decodedToken.roles[0];

                    setMessageAlertCustom(`¡Se ha registrado tu contraseña con éxito!, serás redirigido a tu cuenta de ${userRole}.`);
                    setShowAlertCustom(true);

                    setTimeout(() => {
                        // Redirigir según el rol del usuario
                        switch (userRole) {
                            case USER_ROLES.PLANILLERO:
                                if (process.env.NODE_ENV === 'production') {
                                    router.push('/user/planner/home_planner.html?role=Planillero');
                                } else {
                                    router.push('/user/planner/home_planner?role=Planillero');
                                }
                                // router.push('/user/planner/home_planner?role=Planillero');
                                break;
                            case USER_ROLES.JUGADOR:
                                if (process.env.NODE_ENV === 'production') {
                                    router.push('/user/player/initiation_dni_player.html?role=Jugador');
                                } else {
                                    router.push('/user/player/initiation_dni_player?role=Jugador');
                                }
                                // router.push('/user/player/initiation_dni_player?role=Jugador');
                                break;
                            case USER_ROLES.HINCHA:
                                if (process.env.NODE_ENV === 'production') {
                                    router.push('/user/hincha/home_hincha.html?role=Hincha');
                                } else {
                                    router.push('/user/hincha/home_hincha?role=Hincha');
                                }
                                // router.push('/user/hincha/home_hincha?role=Hincha');
                                break;
                            case USER_ROLES.DELEGADO:
                                if (process.env.NODE_ENV === 'production') {
                                    router.push('/user/player/initiation_dni_player.html?role=Delegado');
                                } else {
                                    router.push('/user/player/initiation_dni_player?role=Delegado');
                                }
                                // router.push('/user/player/initiation_dni_player?role=Delegado');
                                break;
                            case USER_ROLES.ADMIN_MAESTRO:
                                if (process.env.NODE_ENV === 'production') {
                                    router.push('/user/admin_master/league_admin.html?role=Admin_Maestro');
                                } else {
                                    router.push('/user/admin_master/league_admin?role=Admin_Maestro');
                                }
                                // router.push('/user/admin_master/league_admin?role=Admin_Maestro');
                                break;
                            case USER_ROLES.ADMIN_LIGA:
                                if (process.env.NODE_ENV === 'production') {
                                    router.push('/user/admin_league/category_admin.html?role=Admin_Liga');
                                } else {
                                    router.push('/user/admin_league/category_admin?role=Admin_Liga');
                                }
                                // router.push('/user/admin_league/category_admin?role=Admin_Liga');
                                break;
                            default:
                                alert('Rol no reconocido');
                        }
                    }, 4000);
                } else {
                    setMessageAlertCustom('¡El usuario se ha eliminado de la plataforma!');
                    setShowAlertCustom(true);
                }
            } else {
                setMessageAlertCustom('¡Ha ocurrido un problema en el momento de registrar la contraseña!');
                setShowAlertCustom(true);
            }
        } catch (error) {
            console.error('Error al iniciar sesión: ', error);
            alert('Error al iniciar sesión: ' + error);
        }
    };

    const handleCloseAlertCustom = () => {
        setShowAlertCustom(false);
    };

    return (
        <div className="flex flex-col items-center justify-center bg-white w-full p-8">
            <div className=''>
                <Image src="/images/logos/app-logo-primary-square.png" alt="Futapp Logo" className="width-40perc translate-y-[50px]" width={200} height={200} />
                <h1 className="text-2xl mb-2 text-center text-black float-left">Bienvenido a Ligas Futapp! 👋🏻</h1>
                <br></br>
                <br></br>
                <h2 className="text-xm mb-4 text-center text-black float-left">Registra tu nueva contraseña para ingresar a tu cuenta</h2>
            </div>
            <form className="w-[30%] mt-10" onSubmit={handleSubmit} autoComplete="on">
                <div className="mb-4">
                    <label className="block text-gray-700">Contraseña</label>
                    <div className="relative">
                        <input
                            type={passwordVisible ? "text" : "password"}
                            name="password"
                            className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
                            placeholder='Contraseña'
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
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
                    <label className="block text-gray-700">Confirma contraseña</label>
                    <div className="relative">
                        <input
                            type={confirmPasswordVisible ? "text" : "password"}
                            name="password"
                            className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
                            placeholder='Contraseña'
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            autoComplete="current-password"
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
                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Ingresar</button>
            </form>
            <CustomAlert
                message={messageAlertCustom}
                show={showAlertCustom}
                onClose={handleCloseAlertCustom}
            />
        </div>
    );
};

export default NewPasswordFormSection;