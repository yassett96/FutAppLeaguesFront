import React from 'react';

const Result = ({ localTeam, localGoals, visitorTeam, visitorGoals }) => {
    return (
        <div className="flex flex-col items-center justify-center mb-6 text-shadow-lg w-[100%] text-white">
            <h2 className="text-4xl font-bold ml-[5%] xs340:ml-[0%] xs360:ml-[0%] xl-1100:ml-[4%]">Resultado</h2>
            <div className="flex flex-row justify-center items-center mt-2 ml-[0%] w-[90%]">
                {/* Contenedor para el equipo local */}
                <div className="flex flex-col items-center justify-end w-full xs360:w-auto text-center sm480:text-left xs360:text-right mr-[5%]">
                    <p className="text-3xl md:text-5xl text-center">{localTeam}</p>
                    <p className="text-3xl md:text-5xl font-bold">{localGoals}</p>
                </div>

                {/* Separador de guion */}
                <div className="mx-4 text-5xl">-</div>
                
                {/* Contenedor para el equipo visitante */}
                <div className="flex flex-col items-center justify-start w-full xs360:w-auto text-center sm480:text-left xs360:text-left ml-[5%]">
                    <p className="text-3xl md:text-5xl text-center">{visitorTeam}</p>
                    <p className="text-3xl md:text-5xl font-bold">{visitorGoals}</p>
                </div>
            </div>
        </div>
    );
};

export default Result;