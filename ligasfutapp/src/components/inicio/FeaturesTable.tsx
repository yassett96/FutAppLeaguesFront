import React from 'react';

const FeaturesTable = () => {
    const features = [
        { name: 'Ver tabla de posiciones', player: true, planillero: true, organizer: true },
        { name: 'Ver tabla de goleadores', player: true, planillero: true, organizer: true },
        { name: 'Ver fixture', player: true, planillero: true, organizer: true },
        { name: 'Ver sancionados', player: true, planillero: true, organizer: true },
        { name: 'Cargar partido', player: false, planillero: true, organizer: true },
        { name: 'Crear fixture', player: false, planillero: false, organizer: true },
        { name: 'Crear equipo', player: false, planillero: false, organizer: true },
        { name: 'Invitar jugador', player: false, planillero: false, organizer: true },
        { name: 'Editar jugador', player: false, planillero: false, organizer: true },
        { name: 'Editar equipo', player: false, planillero: false, organizer: true },
        { name: 'Actualizar sancionados', player: false, planillero: true, organizer: true },
        { name: 'Estadísticas del equipo', player: true, planillero: true, organizer: true },
        { name: 'Palmarés del equipo', player: true, planillero: true, organizer: true },
        { name: 'Estadísticas del jugador', player: true, planillero: false, organizer: true },
    ];

    return (
        <section className="py-12 bg-white-f7f7f7">
            <div className=" ml-1 mx-0 xs:mx-auto px-0 xs:px-4 w-[98%]">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-600">Principales Funcionalidades</h2>
                    <p className="text-gray-400 text-1xl">Funcionalidades para diferentes roles: administradores, jugadores y planilleros</p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-[-80%] md:w-4/5 lg:w-3/5 min-w-full bg-white border-gray-300 border-style-solid border-radius-10px">
                        <thead>
                            <tr className='rounded-t-lg'>
                                <th className="py-2 px-4 border-b text-black">FUNCIONALIDAD</th>
                                <th className="py-2 px-4 border-b text-black">JUGADOR</th>
                                <th className="py-2 px-4 border-b text-black">PLANILLERO</th>
                                <th className="py-2 px-4 border-b text-black">ORGANIZADOR</th>
                            </tr>
                        </thead>
                        <tbody>
                            {features.map((feature, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                                    <td className="text-xs md:text-sm lg:text-base py-2 px-4 border-b text-black">{feature.name}</td>
                                    <td className="text-xs md:text-sm lg:text-base py-2 px-4 border-b text-center">
                                        {feature.player ? <span className="inline-block w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs">✔️</span> : <span className="inline-block w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs">❌</span>}
                                    </td>
                                    <td className="text-xs md:text-sm lg:text-base py-2 px-4 border-b text-center">
                                        {feature.planillero ? <span className="inline-block w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs">✔️</span> : <span className="inline-block w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs">❌</span>}
                                    </td>
                                    <td className="text-xs md:text-sm lg:text-base py-2 px-4 border-b text-center">
                                        {feature.organizer ? <span className="inline-block w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs">✔️</span> : <span className="inline-block w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs">❌</span>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default FeaturesTable;