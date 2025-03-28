import React from 'react';

const Result = ({ localTeam, localGoals, visitorTeam, visitorGoals }) => {
    return (
        <div className="flex flex-col items-center justify-center mb-6 text-shadow-lg w-full">
            <h2 className="text-2xl sm750:text-4xl font-bold text-black opacity-50 w-[90%] -translate-x-[3%] text-center">Resultado</h2>
            <div className="flex flex-row justify-center items-center mt-2 text-black opacity-50 w-[90%] -translate-x-[2%]">
                {/* Contenedor para el equipo local */}
                <div className="flex flex-col items-center justify-end w-full xs360:w-auto text-center sm480:text-left xs360:text-right">
                    <p className="text-xl sm750:text-2xl text-center">{localTeam}</p>
                    <p className="text-xl sm750:text-2xl font-bold">{localGoals}</p>
                </div>

                {/* Separador de guion */}
                <div className="mx-4 text-5xl">-</div>
                
                {/* Contenedor para el equipo visitante */}
                <div className="flex flex-col items-center justify-start w-full xs360:w-auto text-center sm480:text-left xs360:text-left">
                    <p className="text-xl sm750:text-2xl text-center">{visitorTeam}</p>
                    <p className="text-xl sm750:text-2xl font-bold">{visitorGoals}</p>
                </div>
            </div>
        </div>
    );
};

export default Result;