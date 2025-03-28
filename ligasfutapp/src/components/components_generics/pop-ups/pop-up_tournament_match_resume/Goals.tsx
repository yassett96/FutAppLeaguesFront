import React from 'react';
import Image from 'next/image';

const Goals = ({ localGoals, visitorGoals }) => {
    return (
        <div className="text-center mb-6 text-shadow-lg w-[100%] xs360:mr-[9%] text-white">
            <div className='flex justify-center'>
                <Image width={100} height={100} alt='' src="/images/logos/Icono_Balon_Blanco.png" className='w-10 h-10' />
            </div>
            <h2 className="text-4xl font-bold">Goles</h2>
            <div className='flex items-center justify-center'>
                <div className="mt-2 ml-[0%] xxxs:ml-[0%] xs360:ml-[5%] flex justify-between w-[100%] xxxs:w-[100%] xs360:w-[80%] sm930:w-[75%]">
                    {/* Div para los goles del equipo local */}
                    <div className=''>
                        {localGoals.map((goal, index) => (
                            <div key={index} className="flex flex-col sm590:flex-row justify-center items-center mb-2">
                                <p className="text-2xl">{goal.player}</p>
                                <p className="text-3xl mx-2 mt-2 sm590:mt-0">
                                    <Image width={100} height={100} alt='' src="/images/logos/Icono_Balon_Blanco.png" className='w-8 h-8' />
                                </p>
                                {goal.count > 1 && <p className="text-xl mt-2 sm590:mt-0">{goal.count} x</p>}
                            </div>
                        ))}
                    </div>
                    {/* Div para los goles del equipo visitante */}
                    <div className='mr-0 sm750:mr-10 sm930:mr-0'>
                        {visitorGoals.map((goal, index) => (
                            <div key={index} className="flex flex-col sm590:flex-row justify-center items-center mb-2">
                                <p className="text-2xl">{goal.player}</p>
                                <p className="text-3xl mx-2 mt-2 sm590:mt-0">
                                    <Image width={100} height={100} alt='' src="/images/logos/Icono_Balon_Blanco.png" className='w-8 h-8' />
                                </p>
                                {goal.count > 1 && <p className="text-xl mt-2 sm590:mt-0">{goal.count} x</p>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>


    );
};

export default Goals;