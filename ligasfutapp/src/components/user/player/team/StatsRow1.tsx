import React from 'react';
import Image from 'next/image';

interface StatsProps {
    goalsFor: number;
    goalsAgainst: number;
    victories: number;
}

const StatsRow1: React.FC<StatsProps> = ({ goalsFor, goalsAgainst, victories }) => {
    return (
        <div className="flex flex-col items-center justify-center mt-10 text-4xl">
            <div className="flex flex-col sm480:flex-row justify-between w-full max-w-7xl">
                <div className="flex flex-col items-center mr-4 w-full sm480:w-96 mb-4 sm480:mb-0">
                    <div className="flex items-center">
                        <Image width={100} height={100} src='/images/logos/Icono_Balon.png' className="h-6 sm750:h-10 w-6 sm750:w-10 mr-2 mt-1" alt="Goles a favor" />
                        <span className='text-xl sm750:text-2xl opacity-60'>Goles a favor:</span>
                    </div>
                    <div className="bg-white w-2/3 flex items-center justify-center mt-3 rounded-xl border shadow-lg border-black opacity-60 text-sm sm750:text-2xl">
                        {goalsFor}
                    </div>
                </div>
                <div className="flex flex-col items-center mr-4 w-full sm480:w-96 mb-4 sm480:mb-0">
                    <div className="flex items-center text-center">
                        <Image width={100} height={100} src='/images/logos/Icono_Balon.png' className="h-6 sm750:h-10 w-6 sm750:w-10 mr-2 mt-1 translate-x-[120%] xs248:translate-x-0" alt="Goles en contra" />
                        <span className='text-xl sm750:text-2xl opacity-60'>Goles en contra:</span>
                    </div>
                    <div className="bg-white w-2/3 flex items-center justify-center mt-3 rounded-xl border shadow-lg border-black opacity-60 text-sm sm750:text-2xl">
                        {goalsAgainst}
                    </div>
                </div>
                <div className="flex flex-col items-center w-full sm480:w-96 opacity-60 mr-3 sm480:mr-0">
                    <div className="flex items-center">
                        <Image width={100} height={100} src='/images/logos/Icono_Victoria.png' className="h-6 sm750:h-10 w-6 sm750:w-10 mr-2 mt-1" alt="Victorias" />
                        <span className='text-xl sm750:text-2xl'>Victorias:</span>
                    </div>
                    <div className="bg-white w-2/3 flex items-center justify-center mt-3 rounded-xl border shadow-lg border-black text-sm sm750:text-2xl">
                        {victories}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatsRow1;