import React from 'react';

const HeroSectionInicio = () => {
    return (
        <section className="flex flex-col items-center justify-center height-720px bg-blue-700 text-white text-center p-4 border-bottom-left-radius-30px border-bottom-right-radius-30px">
            <div className='move-to-up-100px'>
                <h1 className="text-4xl mb-4 text-bolder move-to-up-10px">Lleva tu liga a otro nivel</h1>
                <p className="mb-8 text-bolder">Simplifica la gestión de tu liga y ofrece a tus equipos y jugadores una mejor experiencia.</p>
                <div>
                    <button className="hover-button-contactanos text-bolder mr-4 bg-white text-blue-700 px-4 py-2 rounded">Contáctanos</button>
                    <button className="hover-button-saberMas border-width-1px border-style-solid text-bolder bg-blue-700 text-white px-4 py-2 rounded">Saber más</button>
                </div>
            </div>
        </section>
    );
};

export default HeroSectionInicio;