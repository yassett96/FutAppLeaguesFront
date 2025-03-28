import React from 'react';
import Image from 'next/image';

const features = [
    {
        id: 1,
        icon: '/images/pages/Icono_Comunicaciones.png',
        title: 'Comunicaciones',
        description: 'Conecta con los delegados y jugadores para comunicar los distintos eventos de tu liga',
    },
    {
        id: 2,
        icon: '/images/pages/Icono_Gestion_Liga.png',
        title: 'Gestión Liga',
        description: 'Facilita la organización y desarrollo de la liga o torneo, automatizando creación de fixture y cálculo de tablas',
    },
    {
        id: 3,
        icon: '/images/pages/Icono_Ingreso_Resultados.png',
        title: 'Ingreso Resultados',
        description: 'Planilleros ingresan resultados al instante digitalmente, no más planillas y papeleo',
    },
    {
        id: 4,
        icon: '/images/pages/Icono_Informacion_Resultado.png',
        title: 'Información Online',
        description: 'Jugadores obtienen información online de goles, resultados, actualización de tablas y sancionados',
    },
    {
        id: 5,
        icon: '/images/pages/Icono_Datos_Historicos.png',
        title: 'Datos Históricos',
        description: 'Registro histórico de la liga, palmarés, estadísticas, comparativas de desempeño a nivel equipo o jugador',
    },
    {
        id: 6,
        icon: '/images/pages/Icono_Fidelizacion.png',
        title: 'Fidelización',
        description: 'Mantén a tu audiencia conectada y cultiva lealtad hacia tu liga',
    },
];

const FeaturesSection = () => {
    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <span className="inline-block px-3 py-1 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full">Features</span>
                    <h2 className="text-3xl mt-2 mb-4 font-bold text-gray-900">Simplifica la gestión de tu liga</h2>
                    <p className="text-gray-600">Funcionalidades para diferentes roles: administradores, jugadores y planilleros</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 width-60perc move-to-right-20perc">
                    {features.map(feature => (
                        <div key={feature.id} className="text-center p-4 bg-white rounded-lg width-93perc hover:shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                            <Image src={feature.icon} alt={feature.title} className="mx-auto mb-4 h-13 w-11" width={100} height={100}/>
                            <h3 className="text-xl font-semibold mb-2 text-blue-600">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;