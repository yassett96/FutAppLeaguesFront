import React from 'react';

interface WelcomeMessageProps {
    nombre: string;
}

const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ nombre }) => {
    return (
        <div className="flex flex-col justify-center items-center">
            <h2 className="text-2xl xxs:text-3xl mb-4 text-black text-shadow-lg text-center">
                ¡Bienvenido {nombre}! 👋🏻
            </h2>
            <div className="p-6 rounded-lg shadow-md my-6 w-[80%] sm590:w-full md:w-full bg-white">
                <p className="text-gray-600 text-justify w-full md:w-full mx-auto text-[10px] xxs:text-xl sm590:text-2xl text-shadow-lg">
                    Para comenzar la gestión de un partido sigue estos 4 simples pasos:<br /><br />
                    &nbsp;&nbsp;&nbsp;1. Elige la Liga (solo si estás en más de una).<br />
                    &nbsp;&nbsp;&nbsp;2. Elige el Torneo (solo si estás en más de uno).<br />
                    &nbsp;&nbsp;&nbsp;3. Elige la categoría (solo si estás en más de uno).<br />
                    &nbsp;&nbsp;&nbsp;4. Elige el partido a gestionar.<br /><br />
                    <span className="block text-center">¡Y listo, a jugar!</span>
                </p>
            </div>
        </div>
    );
};

export default WelcomeMessage;
