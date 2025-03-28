"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { USER_ROLES } from '@/constants';
import { login, decodeJWT } from '@/services/authService';

const LoginFormSection = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [roles, setRoles] = useState([]);
    const [selectedRole, setSelectedRole] = useState(null);
    const router = useRouter();

    // Para llamar el register
    const handleRegisterClick = () => {
        if (process.env.NODE_ENV === 'production') {
            router.push('/register.html');
        } else {
            router.push('/register');
        }
        // router.push('/register');
    };

    // Para llamar a la página de olvidé la contraseña
    const handleForgotPasswordClick = () => {
        if (process.env.NODE_ENV === 'production') {
            router.push("/forgot-password.html");
        } else {
            router.push("/forgot-password");
        }
        // router.push("/forgot-password");
    };

    // Para activar la visibilidad de la contraseña
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    // Para redirigir donde se debe si es un tipo de usuario
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            // Llamamos al servicio de login
            const data = await login(email, password);

            // Guardamos el token en el localStorage
            localStorage.setItem('token', data.token);

            // Decodificar el token para obtener el rol del usuario
            const decodedToken = decodeJWT(data.token);
            const userRoles = decodedToken.roles;

            // PARA OBTENER EL TOKEN RÁPIDO
            // prompt("token: ", data.token);

            if (userRoles.length === 1) {
                // Redirigir según el rol del usuario
                redirigirSegunRolDeUsuario(userRoles[0]);                
            } else if (userRoles.length > 1) {
                if (selectedRole != null) {
                    // Redirigir según el rol del usuario
                    redirigirSegunRolDeUsuario(selectedRole);
                }
                setRoles(userRoles);
            }

        } catch (error) {
            console.error('Error al iniciar sesión: ', error);
            alert('Error al iniciar sesión: ' + error);
        }
    };

    /**
     * Para redirigir a la página de inicio correspondiente, según el role del usuario
     * @param role Role del usuario con el cual ingresa
     */
    const redirigirSegunRolDeUsuario = (role: any) => {
        switch (role) {
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
    }

    const handleRoleChange = (user: any) => {
        setSelectedRole(user);
    };

    return (
        <div className="flex flex-col items-center justify-center bg-white md:w-1/3 w-full sm:w-full p-8">
            <div className='width-54perc'>
                <Image src="/images/logos/app-logo-primary-square.png" alt="Futapp Logo" className="width-40perc margin-bottom-m-100px move-to-left-2perc" width={200} height={200} />
                <h1 className="text-2xl mb-2 text-center text-black float-left">Bienvenido a Ligas Futapp! 👋🏻</h1>
                <br></br>
                <br></br>
                <h2 className="text-xm mb-4 text-center text-black float-left">Ingresa a tu cuenta</h2>
            </div>
            <form className="w-full max-w-sm" onSubmit={handleSubmit} autoComplete="on">
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input type="email" name="email" className="w-full p-2 border border-gray-300 rounded mt-1 text-black" placeholder='Email del usuario'
                        onChange={(e) => setEmail(e.target.value)} autoComplete="username" />
                </div>
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
                <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <label className="text-gray-700">Recuérdame</label>
                    </div>
                    <a href="#" className="text-blue-600 hover:underline" onClick={handleForgotPasswordClick}>¿Olvidaste tu contraseña?</a>
                </div>
                {roles.length > 1 && (
                    <div className="mb-4">
                        <br />
                        <h1 className='flex justify-center items-center'>Seleccione el rol con el cual ingresar</h1>
                        <select
                            className="w-full p-2 border border-gray-300 rounded"
                            onChange={(e) => handleRoleChange(e.target.value)}
                        >
                            <option value="">Selecciona un rol</option>
                            {roles.map((role, index) => (
                                <option key={index} value={role}>
                                    {role}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Ingresar</button>
            </form>
            <p className="mt-4 text-gray-600">¿No tienes una cuenta? <a href="#" className="text-blue-600 hover:underline" onClick={handleRegisterClick}>Crea una cuenta nueva</a></p>
        </div>
    );
};

export default LoginFormSection;