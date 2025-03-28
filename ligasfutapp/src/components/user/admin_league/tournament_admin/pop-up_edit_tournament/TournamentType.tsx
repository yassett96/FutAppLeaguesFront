import React from 'react';
import Image from 'next/image';
import CustomButton from '@/components/components_generics/button/CustomButton';

interface PositionProps {
    tipo_torneo: string;
    no_grupo?: number;
    rondas: number;
    clasificados?: number;
    onEditTournament: () => void;
}

const CurrentPosition: React.FC<PositionProps> = ({ tipo_torneo, no_grupo, rondas, clasificados, onEditTournament }) => {
    return (
        <div className="flex flex-col items-center justify-center mt-10 text-2xl">
            <div className="flex items-center">
                <Image width={100} height={100} src='/images/logos/Icono_Tipo_Blanco.png' className="h-10 w-10 mr-2" alt="Icono Posición Actual" />
                <span>Tipo de torneo</span>
            </div>
            <div className="bg-white w-[68%] sm500:w-1/6 flex items-center justify-center mt-3 rounded-xl border shadow-lg border-black text-black">
                {tipo_torneo}
            </div>
            <br />
            {/* Contenedor que cambia de fila a columna en sm500 */}
            <div className="flex flex-col sm500:flex-row justify-between w-full max-w-7xl">
                <div className="flex flex-col items-center mr-4 w-full sm500:w-96">
                    <div className="flex items-center">
                        <Image width={100} height={100} src='/images/logos/Icono_Grupos_Blanco.png' className="h-10 w-10 mr-2 mt-1" alt="Goles a favor" />
                        <span>N° Grupos</span>
                    </div>
                    <div className={`w-2/3 flex items-center text-black justify-center mt-3 rounded-xl border shadow-lg ${no_grupo === undefined ? 'bg-gray-200 text-gray-500' : 'bg-white border-black'}`}>
                        {no_grupo !== undefined ? no_grupo : '-'}
                    </div>
                </div>                
                <div className="flex flex-col items-center mr-4 w-full sm500:w-96">
                    <div className="flex items-center">
                        <Image width={100} height={100} src='/images/logos/Icono_Rondas_Blanco.png' className="h-10 w-10 mr-2 mt-1" alt="Goles en contra" />
                        <span>Rondas</span>
                    </div>
                    <div className="bg-white w-2/3 flex items-center justify-center mt-3 rounded-xl border shadow-lg border-black text-black">
                        {rondas}
                    </div>
                </div>
                <div className="flex flex-col items-center w-full sm500:w-96 mr-3 sm:mr-0">
                    <div className="flex items-center">
                        <Image width={100} height={100} src='/images/logos/Icono_Clasificados_Blanco.png' className="h-10 w-10 mr-2 mt-1" alt="Victorias" />
                        <span>Clasificados</span>
                    </div>
                    <div className={`w-2/3 flex items-center justify-center mt-3 rounded-xl border shadow-lg text-black ${clasificados === undefined ? 'bg-gray-200 text-gray-500' : 'bg-white border-black'}`}>
                        {clasificados !== undefined ? clasificados : '-'}
                    </div>
                </div>
            </div>
            <br />
            <br />
            <div className='flex items-center justify-center w-full'>                
                <CustomButton text="Editar Tipo Torneo" color="#3b82f6" width="" height="" onClick={onEditTournament} className='flex-col w-[90%] xs420:w-[60%] text-center' classNameText='text-2xl xs420:text-3xl w-[70%]' classNameIcon='w-8 h-8' icon='/images/logos/Icono_Editar_Blanco.png' />
            </div>
        </div>
    );
};

export default CurrentPosition;