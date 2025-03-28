import React from 'react';
import Image from 'next/image';
import { EVENT_TYPES } from '@/constants';

const TimelineEvent = ({
    time,
    team,
    eventType,
    player,
    eventIcon,
    playerOut,
    playerIn,
    nombreEquipoLocal,
    nombreEquipoVisitante,
}) => {
    return (
        <>
            {/* Evento de inicio del partido */}
            {eventType === EVENT_TYPES.INICIO_DEL_PARTIDO && (
                <div className="text-center text-white my-2 mb-8">
                    --- Inicio ---
                </div>
            )}

            {/* Evento de medio tiempo */}
            {eventType === EVENT_TYPES.FIN_DEL_PRIMER_TIEMPO && (
                <div className="text-center text-white my-2 mb-8">
                    --- MT ---
                </div>
            )}

            {/* Evento de fin del partido */}
            {eventType === EVENT_TYPES.FIN_DEL_PARTIDO && (
                <div className="text-center text-white my-2 mb-8">
                    --- Fin ---
                </div>
            )}

            {/* Sustitución: jugador sale */}
            {eventType === EVENT_TYPES.SUSTITUCION_SALE && (
                <div className="flex my-2 w-full mb-8">
                    {/* Jugador que sale */}
                    <div className="flex-1 flex justify-end items-center">
                        {team === nombreEquipoLocal && (
                            <span className="text-white mr-2">
                                {playerOut}
                                {time !== 0 && ` - ${time}’`}
                            </span>
                        )}
                    </div>
                    <div className="w-12 flex justify-center">
                        <Image
                            src="/images/logos/Icono_Jugador_Saliendo.png"
                            width={100}
                            height={100}
                            alt="Salida"
                            className="w-10 h-10"
                        />
                    </div>
                    <div className="flex-1 flex justify-start items-center">
                        {team === nombreEquipoVisitante && (
                            <span className="text-white ml-2">
                                {time !== 0 && `${time}’`} - {playerOut}
                            </span>
                        )}
                    </div>
                </div>
            )}

            {/* Sustitución: jugador entra */}
            {eventType === EVENT_TYPES.SUSTITUCION_ENTRA && (
                <div className="flex my-2 w-full mb-8">
                    {/* Jugador que entra */}
                    <div className="flex-1 flex justify-end items-center">
                        {team === nombreEquipoLocal && (
                            <span className="text-white mr-2">
                                {playerIn} {time !== 0 && ` - ${time}’`}
                            </span>
                        )}
                    </div>
                    <div className="w-12 flex justify-center">
                        <Image
                            src="/images/logos/Icono_Jugador_Entrando.png"
                            width={100}
                            height={100}
                            alt="Entrada"
                            className="w-10 h-10"
                        />
                    </div>
                    <div className="flex-1 flex justify-start items-center">
                        {team === nombreEquipoVisitante && (
                            <span className="text-white ml-2">
                                {time !== 0 && `${time}’`} - {playerIn}
                            </span>
                        )}
                    </div>
                </div>
            )}

            {/* Autogol */}
            {eventType === EVENT_TYPES.AUTO_GOL && (
                <div className="flex my-2 w-full mb-8">
                    <div className="flex-1 flex justify-end items-center">
                        {team === nombreEquipoLocal && (
                            <span className="text-white mr-2">
                                {player} (AG) {time !== 0 && `- ${time}’`}
                            </span>
                        )}
                    </div>
                    <div className="w-12 flex justify-center">
                        <Image
                            src={eventIcon}
                            width={100}
                            height={100}
                            alt="Autogol"
                            className="w-10 h-10"
                        />
                    </div>
                    <div className="flex-1 flex justify-start items-center">
                        {team === nombreEquipoVisitante && (
                            <span className="text-white ml-2">
                                {time !== 0 && `${time}’`} - {player} (AG)
                            </span>
                        )}
                    </div>
                </div>
            )}

            {/* Otros eventos como goles, tarjetas */}
            {eventType !== EVENT_TYPES.FIN_DEL_PRIMER_TIEMPO &&
                eventType !== EVENT_TYPES.SUSTITUCION_SALE &&
                eventType !== EVENT_TYPES.SUSTITUCION_ENTRA &&
                eventType !== EVENT_TYPES.INICIO_DEL_SEGUNDO_TIEMPO &&
                eventType !== EVENT_TYPES.FALTA &&
                eventType !== EVENT_TYPES.FIN_DEL_PARTIDO &&
                eventType !== EVENT_TYPES.INICIO_DEL_PARTIDO && 
                eventType !== EVENT_TYPES.AUTO_GOL && (
                    <div className="flex my-2 w-full mb-8">
                        <div className="flex-1 flex justify-end items-center">
                            {team === nombreEquipoLocal && (
                                <span className="text-white mr-2">
                                    {player}{time !== 0 && ` - ${time}’`}
                                </span>
                            )}
                        </div>
                        <div className="w-12 flex justify-center">
                            <Image
                                src={eventIcon}
                                width={100}
                                height={100}
                                alt={eventType || ''}
                                className="w-10 h-10"
                            />
                        </div>
                        <div className="flex-1 flex justify-start items-center">
                            {team === nombreEquipoVisitante && (
                                <span className="text-white ml-2">
                                    {time !== 0 && `${time}’`} - {player}
                                </span>
                            )}
                        </div>
                    </div>
                )}
                
        </>
    );
};

export default TimelineEvent;
