import React from 'react';
import Image from 'next/image';

interface StatsProps {
    año: number;
    liga: string;
}

const StatsRow3: React.FC<StatsProps> = ({ año, liga }) => {
    return (
        <div className="flex flex-col items-center justify-center mt-10 text-2xl sm620:text-4xl text-center">
            <div className="flex justify-between w-full max-w-4xl">
                <div className="flex flex-col items-center -mr-7 w-96">
                    <div className="flex items-center">
                        <Image width={100} height={100} src='/images/logos/Icono_Año.png' className="h-6 sm750:h-10 w-6 sm750:w-10 mr-2 mt-1" alt="Amarillas" />
                        <span className='text-xl sm590:text-2xl'>Año:</span>
                    </div>
                    <div className="bg-white w-2/3 flex items-center justify-center mt-3 rounded-xl border shadow-lg border-black text-sm sm750:text-2xl">
                        {año}
                    </div>
                </div>
                <div className="flex flex-col items-center w-96">
                    <div className="flex items-center">
                        <Image width={100} height={100} src='/images/logos/Icono_Liga.png' className="h-6 sm750:h-10 w-6 sm750:w-10 mr-2 mt-1" alt="Lesiones" />
                        <span className='text-xl sm590:text-2xl'>Liga:</span>
                    </div>
                    <div className="bg-white w-3/4 sm:w-2/3 flex items-center justify-center mt-3 rounded-xl border shadow-lg border-black text-sm sm750:text-2xl">
                        {liga}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatsRow3;