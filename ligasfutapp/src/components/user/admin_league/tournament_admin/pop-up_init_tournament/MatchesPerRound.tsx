import { TIPOS_TORNEOS } from '@/constants';
import React, { useState, useEffect, useCallback, useRef } from 'react';

const MatchesPerRound = ({ equiposSeleccionados, onNumeroPartidosCambiado, tipoTorneo, datosTorneo }) => {
    // Para controlar las rondas en los Play-Off
    const [numeroPartidosFinal, setNumeroPartidosFinal] = useState<number>(0);
    const [numeroPartidosSemiFinal, setNumeroPartidosSemiFinal] = useState<number>(0);
    const [numeroPartidosCuartosFinal, setNumeroPartidosCuartosFinal] = useState<number>(0);
    const [numeroPartidosOctavosFinal, setNumeroPartidosOctavosFinal] = useState<number>(0);
    const [numeroPartidosDieciseisavoFinal, setNumeroPartidosDieciseisavosFinal] = useState<number>(0);
    const [numeroPartidosTreintaidosavoFinal, setNumeroPartidosTreintaidosavosFinal] = useState<number>(0);
    const [equiposATomarEnCuenta, setEquiposATomarEnCuenta] = useState([]);

    const onNumeroPartidosCambiadoRef = useRef(onNumeroPartidosCambiado);

    useEffect(() => {
        onNumeroPartidosCambiadoRef.current = onNumeroPartidosCambiado;
    }, [onNumeroPartidosCambiado]);

    const handleCambioNumeroPartidos = useCallback((round: any, value: any) => {
        onNumeroPartidosCambiadoRef.current({ [round]: value });
    }, []);

    useEffect(() => {
        const obtenerEquiposATomarEnCuenta = () => {
            if (tipoTorneo === TIPOS_TORNEOS.LIGA_PLAY_OFF) {
                setEquiposATomarEnCuenta(equiposSeleccionados);

                let contadorNumeroEquipos = 0;
                for (let i = 0; i < datosTorneo.no_grupos; i++) {
                    for (let j = 0; j < datosTorneo.clasificados; j++) {
                        contadorNumeroEquipos++;
                    }
                }

                const equipos = new Array(contadorNumeroEquipos).fill(null);

                setEquiposATomarEnCuenta(equipos);
            } else {
                setEquiposATomarEnCuenta(equiposSeleccionados);
            }
        };

        obtenerEquiposATomarEnCuenta();
    }, [tipoTorneo, datosTorneo, equiposSeleccionados])

    useEffect(() => {
        const tomarEnCuentaLosEquipos = () => {
            if (tipoTorneo === TIPOS_TORNEOS.LIGA_PLAY_OFF) {
            } else {
                setEquiposATomarEnCuenta(equiposSeleccionados);
            }
        };

        tomarEnCuentaLosEquipos();
    }, [equiposSeleccionados, tipoTorneo])

    useEffect(() => {
        if (equiposATomarEnCuenta.length >= 2) {
            setNumeroPartidosFinal(1);
            handleCambioNumeroPartidos('numeroPartidosFinal', 1);
        }

        if (equiposATomarEnCuenta.length >= 3) {
            setNumeroPartidosSemiFinal(1);
            handleCambioNumeroPartidos('numeroPartidosSemiFinal', 1);
        }

        if (equiposATomarEnCuenta.length >= 5) {
            setNumeroPartidosCuartosFinal(1);
            handleCambioNumeroPartidos('numeroPartidosCuartosFinal', 1);
        }

        if (equiposATomarEnCuenta.length >= 9) {
            handleCambioNumeroPartidos('numeroPartidosOctavosFinal', 1);
            setNumeroPartidosOctavosFinal(1);
        }

        if (equiposATomarEnCuenta.length >= 17) {
            handleCambioNumeroPartidos('numeroPartidosDieciseisavosFinal', 1);
            setNumeroPartidosDieciseisavosFinal(1);
        }

        if (equiposATomarEnCuenta.length >= 33) {
            handleCambioNumeroPartidos('numeroPartidosTreintaidosavosFinal', 1);
            setNumeroPartidosTreintaidosavosFinal(1);
        }

    }, [equiposSeleccionados, handleCambioNumeroPartidos, tipoTorneo, equiposATomarEnCuenta]);

    return (
        <>
            {equiposATomarEnCuenta.length >= 2 && (
                <>
                    <div className='flex items-center justify-center text-shadow-lg font-bold text-black'>
                        <label className='text-white text-center text-xl sm750:text-3xl' htmlFor="numeroPartidosPorRonda">Número de partidos por cada fase de Play-Off:</label>
                    </div>
                    <br />
                </>
            )}
            {equiposATomarEnCuenta.length >= 33 && (
                <>
                    <div className='flex flex-col items-center justify-center'>
                        <label className='text-shadow-lg text-3xl font-bold text-white text-xl sm590:text-2xl' htmlFor="numeroPartidosTreintaidosFinal">Treintaidosavos de final:</label>
                        <input
                            type="number"
                            id="numeroPartidosTreintaidosavosFinal"
                            className='w-[80%] border border-gray-300 rounded-md p-2 text-center text-sm sm750:text-2xl'
                            value={numeroPartidosTreintaidosavoFinal}
                            onChange={(e) => {
                                const newValue = parseInt(e.target.value);
                                setNumeroPartidosTreintaidosavosFinal(Math.max(newValue, 1));
                                handleCambioNumeroPartidos('numeroPartidosTreintaidosavosFinal', newValue);
                            }}
                        />
                        <br />
                    </div>
                </>
            )}

            {equiposATomarEnCuenta.length >= 17 && (
                <>
                    <div className='flex flex-col items-center justify-center'>
                        <label className='text-shadow-lg font-bold text-white text-xl sm590:text-2xl' htmlFor="numeroPartidosDieciseisFinal">Dieciseisavos de final:</label>
                        <input
                            type="number"
                            id="numeroPartidosDieciseisFinal"
                            className='w-[80%] border border-gray-300 rounded-md p-2 text-center text-sm sm750:text-2xl'
                            value={numeroPartidosDieciseisavoFinal}
                            onChange={(e) => {
                                const newValue = parseInt(e.target.value);
                                setNumeroPartidosDieciseisavosFinal(Math.max(newValue, 1));
                                handleCambioNumeroPartidos('numeroPartidosDieciseisavosFinal', newValue);
                            }}
                        />
                        <br />
                    </div>
                </>
            )}

            {equiposATomarEnCuenta.length >= 9 && (
                <>
                    <div className='flex flex-col items-center justify-center'>
                        <label className='text-shadow-lg font-bold text-white text-xl sm590:text-2xl' htmlFor="numeroPartidosOctavosFinal">Octavos de final:</label>
                        <input
                            type="number"
                            id="numeroPartidosOctavosFinal"
                            className='w-[80%] border border-gray-300 rounded-md p-2 text-center text-sm sm750:text-2xl'
                            value={numeroPartidosOctavosFinal}
                            onChange={(e) => {
                                const newValue = parseInt(e.target.value);
                                setNumeroPartidosOctavosFinal(Math.max(newValue, 1));
                                handleCambioNumeroPartidos('numeroPartidosOctavosFinal', newValue);
                            }}
                        />
                        <br />
                    </div>
                </>
            )}

            {equiposATomarEnCuenta.length >= 5 && (
                <>
                    <div className='flex flex-col items-center justify-center'>
                        <label className='text-shadow-lg font-bold text-white text-xl sm590:text-2xl' htmlFor="numeroPartidosCuartosFinal">Cuartos de final:</label>
                        <input
                            type="number"
                            id="numeroPartidosCuartosFinal"
                            className='w-[80%] border border-gray-300 rounded-md p-2 text-center text-sm sm750:text-2xl'
                            value={numeroPartidosCuartosFinal}
                            onChange={(e) => {
                                const newValue = parseInt(e.target.value);
                                setNumeroPartidosCuartosFinal(Math.max(newValue, 1));
                                handleCambioNumeroPartidos('numeroPartidosCuartosFinal', newValue);
                            }}
                        />
                        <br />
                    </div>
                </>
            )}

            {equiposATomarEnCuenta.length >= 3 && (
                <>
                    <div className='flex flex-col items-center justify-center'>
                        <label className='text-shadow-lg font-bold text-white text-xl sm590:text-2xl' htmlFor="numeroPartidosSemiFinal">Semi final:</label>
                        <input
                            type="number"
                            id="numeroPartidosSemiFinal"
                            className='w-[80%] border border-gray-300 rounded-md p-2 text-center text-sm sm750:text-2xl'
                            value={numeroPartidosSemiFinal}
                            onChange={(e) => {
                                const newValue = parseInt(e.target.value);
                                setNumeroPartidosSemiFinal(Math.max(newValue, 1));
                                handleCambioNumeroPartidos('numeroPartidosSemiFinal', newValue);
                            }}
                        />
                        <br />
                    </div>
                </>
            )}

            {equiposATomarEnCuenta.length >= 2 && (
                <>
                    <div className='flex flex-col items-center justify-center'>
                        <label className='text-shadow-lg text-xl sm590:text-2xl font-bold text-white' htmlFor="numeroPartidosSemiFinal">Final:</label>
                        <input
                            type="number"
                            id="numeroPartidosFinal"
                            className='w-[80%] border border-gray-300 rounded-md p-2 text-center text-sm sm750:text-2xl'
                            value={numeroPartidosFinal}
                            onChange={(e) => {
                                const newValue = parseInt(e.target.value);
                                setNumeroPartidosFinal(Math.max(newValue, 1));
                                handleCambioNumeroPartidos('numeroPartidosFinal', newValue);
                            }}
                        />
                        <br />
                    </div>
                </>
            )}
        </>
    );
};

export default MatchesPerRound;