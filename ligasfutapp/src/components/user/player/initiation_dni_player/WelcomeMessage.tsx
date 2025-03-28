import React from 'react';

const WelcomeMessage = ({NamePlayer}) => {
    return (
        <div className="flex flex-col items-center justify-center text-center">
            <h2 className="text-2xl xxs:text-3xl font-bold mb-4 text-brown-7d7d7b text-shadow-lg">¡Bienvenido {NamePlayer}!</h2>
            <div className="p-6 rounded-lg shadow-md my-6 w-full md:w-2/3 bg-white">
                <p className="text-black opacity-50 text-justify w-full md:w-5/6 mx-auto text-[10px] xxs:text-xl sm590:text-2xl text-shadow-lg">
                    Nos alegra tenerte con nosotros en esta emocionante aventura. Antes de comenzar, te pediremos
                    que proporciones el DNI, para verificar que estamos registrando al jugador correspondiente que
                    registró el delegado.
                    <br />
                    <br />                    
                </p>
            </div>
        </div>
    );
};

export default WelcomeMessage;