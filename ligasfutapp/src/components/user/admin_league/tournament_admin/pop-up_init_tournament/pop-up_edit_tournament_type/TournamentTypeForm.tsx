import React, { useState } from 'react';
import Image from 'next/image';

interface TournamentTypeFormProps {
    tipoTorneo: string;
    datosTorneo: any;
    onSave: (tipoTorneo: string, datosTorneo: any) => void;
}

const TournamentTypeForm: React.FC<TournamentTypeFormProps> = ({ tipoTorneo, datosTorneo, onSave }) => {
    const [nuevoTipoTorneo, setNuevoTipoTorneo] = useState(tipoTorneo);
    const [nuevoDatosTorneo, setNuevoDatosTorneo] = useState({
        rondas: datosTorneo.rondas || '',
        tercerLugar: datosTorneo.tercerLugar || false,
        copaPlata: datosTorneo.copaPlata || false,
        no_grupos: datosTorneo.no_grupos || '',
        clasificados: datosTorneo.clasificados || '',
        rondasPlayOff: datosTorneo.rondasPlayOff || ''
    });

    return (
        <div className="flex flex-col w-100 mx-auto p-4 rounded-lg text-shadow-lg text-3xl font-bold text-black">
            {/* Tipo Torneo */}
            <div className="flex flex-col sm500:flex-row items-center mb-4">
                <Image src="/images/logos/Icono_Tipo_Blanco.png" alt="Ícono de Tipo Torneo" className="mr-2 w-11 h-11" width={100} height={100} />
                <label htmlFor="tipoTorneo" className="mr-2 text-white">Tipo Torneo:</label>
                <select
                    id="tipoTorneo"
                    name="tipoTorneo"
                    className="flex-grow w-[80%] border border-gray-300 rounded-md p-2"
                    value={nuevoTipoTorneo}
                    onChange={(e) => setNuevoTipoTorneo(e.target.value)}
                >
                    <option value="">Selecciona un tipo</option>
                    <option value="Liga">Liga</option>
                    <option value="Play-Off">Play-Off</option>
                    <option value="Liga/Play-Off">Liga/Play-Off</option>
                </select>
            </div>

            {/* Campos dinámicos según el tipo de torneo */}
            {tipoTorneo === 'Play-Off' && (
                <>
                    <div className="flex flex-col sm500:flex-row items-center mb-4">
                        <Image src="/images/logos/Icono_Rondas_Blanco.png" alt="Ícono de Rondas" className="mr-2 w-11 h-11" width={100} height={100} />
                        <label htmlFor="rondas" className="mr-2 text-white">Rondas:</label>
                        <input
                            type="number"
                            id="rondas"
                            name="rondas"
                            placeholder="Número de rondas"
                            className="w-full border border-gray-300 rounded-md p-2"
                            value={nuevoDatosTorneo.rondas}
                            onChange={(e) => setNuevoDatosTorneo({ ...nuevoDatosTorneo, rondas: e.target.value })}
                        />
                    </div>
                    <div className="flex flex-col items-center mb-4">
                        <Image src="/images/logos/Icono_Tercer_Lugar_Blanco.png" alt="Ícono de Rondas" className="mr-2 w-11 h-11" width={100} height={100} />
                        <label htmlFor="tercerLugar" className="text-white mb-2">Tercer lugar</label>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={nuevoDatosTorneo.tercerLugar}
                                onChange={(e) => setNuevoDatosTorneo({ ...nuevoDatosTorneo, tercerLugar: e.target.checked })}
                            />
                            <div className="w-12 h-6 bg-gray-300 peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:bg-purple-500 peer-checked:shadow-lg transition-all duration-300"></div>
                            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-6"></div>
                        </label>
                    </div>

                    <div className="flex flex-col items-center mb-4">
                        <Image src="/images/logos/Icono_Copa_Plata.png" alt="Ícono de Rondas" className="mr-2 w-11 h-11" width={100} height={100} />
                        <label htmlFor="copaPlata" className="mr-2 text-white">Copa de plata</label>
                        <label className="relative inline-flex items-center cursor-pointer mt-2">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={nuevoDatosTorneo.copaPlata}
                                onChange={(e) => setNuevoDatosTorneo({ ...nuevoDatosTorneo, copaPlata: e.target.checked })}
                            />
                            <div className="w-12 h-6 bg-gray-300 peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:bg-purple-500 peer-checked:shadow-lg transition-all duration-300"></div>
                            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-6"></div>
                        </label>
                    </div>
                </>
            )}

            {tipoTorneo === 'Liga/Play-Off' && (
                <>
                    <div className="flex flex-col sm500:flex-row items-center mb-4">
                        <label htmlFor="clasificados" className="text-white text-center w-full">=== Liga ===</label>
                    </div>
                    <div className="flex flex-col sm500:flex-row items-center mb-4">
                        <Image src="/images/logos/Icono_Grupos_Blanco.png" alt="Ícono de N° Grupos" className="mr-2 w-11 h-11" width={100} height={100} />
                        <label htmlFor="no_grupos" className="mr-2 text-white">Grupos:</label>
                        <input
                            type="number"
                            id="no_grupos"
                            name="no_grupos"
                            placeholder="Número de grupos"
                            className="w-full border border-gray-300 rounded-md p-2"
                            value={nuevoDatosTorneo.no_grupos}
                            onChange={(e) => setNuevoDatosTorneo({ ...nuevoDatosTorneo, no_grupos: e.target.value })}
                        />
                    </div>
                    <div className="flex flex-col sm500:flex-row items-center mb-4">
                        <Image src="/images/logos/Icono_Rondas_Blanco.png" alt="Ícono de Rondas" className="mr-2 w-11 h-11" width={100} height={100} />
                        <label htmlFor="rondasLiga" className="mr-2 text-white">Rondas:</label>
                        <input
                            type="number"
                            id="rondasLiga"
                            name="rondasLiga"
                            placeholder="Rondas en la liga"
                            className="w-full border border-gray-300 rounded-md p-2"
                            value={nuevoDatosTorneo.rondas}
                            onChange={(e) => setNuevoDatosTorneo({ ...nuevoDatosTorneo, rondas: e.target.value })}
                        />
                    </div>
                    <div className="flex flex-col sm500:flex-row items-center mb-4">
                        <Image src="/images/logos/Icono_Clasificado_Blanco.png" alt="Ícono de Rondas" className="mr-2 w-11 h-11" width={100} height={100} />
                        <label htmlFor="clasificados" className="mr-2 text-white">Clasificados:</label>
                        <input
                            type="number"
                            id="clasificados"
                            name="clasificados"
                            placeholder="Número de clasificados"
                            className="w-full border border-gray-300 rounded-md p-2"
                            value={nuevoDatosTorneo.clasificados}
                            onChange={(e) => setNuevoDatosTorneo({ ...nuevoDatosTorneo, clasificados: e.target.value })}
                        />
                    </div>
                    <div className="flex flex-col sm500:flex-row items-center mb-4">
                        <label htmlFor="clasificados" className="text-white text-center w-full">=== Play-Off ===</label>
                    </div>
                    <div className="flex flex-col sm500:flex-row items-center mb-4">
                        <Image src="/images/logos/Icono_Rondas_Blanco.png" alt="Ícono de Rondas" className="mr-2 w-11 h-11" width={100} height={100} />
                        <label htmlFor="rondasPlayOff" className="mr-2 text-white">Rondas:</label>
                        <input
                            type="number"
                            id="rondasPlayOff"
                            name="rondasPlayOff"
                            placeholder="Rondas en Play-Off"
                            className="w-full border border-gray-300 rounded-md p-2"
                            value={nuevoDatosTorneo.rondasPlayOff}
                            onChange={(e) => setNuevoDatosTorneo({ ...nuevoDatosTorneo, rondasPlayOff: e.target.value })}
                        />
                    </div>
                    <div className="flex flex-col items-center mb-4">
                        <Image src="/images/logos/Icono_Tercer_Lugar_Blanco.png" alt="Ícono de Rondas" className="mr-2 w-11 h-11" width={100} height={100} />
                        <label htmlFor="tercerLugar" className="mr-2 text-white">Tercer lugar:</label>
                        <label className="relative inline-flex items-center cursor-pointer mt-2">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={nuevoDatosTorneo.tercerLugar}
                                onChange={(e) => setNuevoDatosTorneo({ ...nuevoDatosTorneo, tercerLugar: e.target.checked })}
                            />
                            <div className="w-12 h-6 bg-gray-300 peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:bg-purple-500 peer-checked:shadow-lg transition-all duration-300"></div>
                            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-6"></div>
                        </label>
                    </div>
                    <div className="flex flex-col items-center mb-4">
                        <Image src="/images/logos/Icono_Copa_Plata.png" alt="Ícono de Rondas" className="mr-2 w-11 h-11" width={100} height={100} />
                        <label htmlFor="copaPlata" className="mr-2 text-white">Copa de plata:</label>
                        <label className="relative inline-flex items-center cursor-pointer mt-2">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={nuevoDatosTorneo.copaPlata}
                                onChange={(e) => setNuevoDatosTorneo({ ...nuevoDatosTorneo, copaPlata: e.target.checked })}
                            />
                            <div className="w-12 h-6 bg-gray-300 peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:bg-purple-500 peer-checked:shadow-lg transition-all duration-300"></div>
                            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-6"></div>
                        </label>
                    </div>
                </>
            )}
        </div>
    );
}

export default TournamentTypeForm;