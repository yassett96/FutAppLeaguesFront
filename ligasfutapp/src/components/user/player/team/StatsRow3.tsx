import React from 'react';
import Image from 'next/image';

interface StatsProps {
    yellowCards: number;
    injuries: number;
}

const StatsRow3: React.FC<StatsProps> = ({ yellowCards, injuries }) => {
    return (
        <div className="flex flex-col items-center justify-center mt-10 text-4xl">
            <div className="flex flex-col sm480:flex-row justify-between w-full max-w-4xl">
                <div className="flex flex-col items-center mr-4 w-full sm480:w-96 mb-4 sm480:mb-0">
                    <div className="flex items-center">
                        <Image width={100} height={100} src='/images/logos/Icono_Tarjeta_Amarilla.png' className="h-8 sm750:h-12 w-5 sm750:w-9 mr-2 mt-1 opacity-70" alt="Amarillas" />
                        <span className='text-xl sm750:text-2xl opacity-60'>Amarillas:</span>
                    </div>
                    <div className="bg-white w-2/3 flex items-center justify-center mt-3 rounded-xl border shadow-lg border-black opacity-60 text-sm sm750:text-2xl">
                        {yellowCards}
                    </div>
                </div>
                <div className="flex flex-col items-center w-full sm480:w-96">
                    <div className="flex items-center">
                        <Image width={100} height={100} src='/images/logos/Icono_Lesiones.png' className="h-6 sm750:h-10 w-6 sm750:w-10 mr-2 mt-1 opacity-70" alt="Lesiones" />
                        <span className='text-xl sm750:text-2xl opacity-60'>Lesiones:</span>
                    </div>
                    <div className="bg-white w-2/3 flex items-center justify-center mt-3 rounded-xl border shadow-lg border-black opacity-60 text-sm sm750:text-2xl">
                        {injuries}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatsRow3;
