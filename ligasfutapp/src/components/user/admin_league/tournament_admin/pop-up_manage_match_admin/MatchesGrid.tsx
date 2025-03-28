"use client";
import React, { useEffect, useState } from 'react';
import CustomButton from '@/components/components_generics/button/CustomButton';
import { obtenerTorneoCategoriaEtapas } from '@/services/torneoCategoriaEtapaService';
import { obtenerEtapaInicioCopaPlataSegunFixture } from '@/services/fixtureService';
import { ETAPAS_PLAY_OFF } from '@/constants';

const MatchesGrid = ({ fixtures, onEditar }) => {
    const [selectedRow, setSelectedRow] = useState(null);
    const [etapasTorneoCategoria, setEtapasTorneoCategoria] = useState(null);
    const [etapaInicioCopaPlata, setEtapaInicioCopaPlata] = useState(null);

    useEffect(() => {
        const fetchDatos = async () => {
            const etapas = await obtenerTorneoCategoriaEtapas(fixtures[0].id_fixture);
            setEtapasTorneoCategoria(etapas);

            const etapaInicioCopaPlata = await obtenerEtapaInicioCopaPlataSegunFixture(fixtures[0].id_fixture);
            setEtapaInicioCopaPlata(etapaInicioCopaPlata.data);
        };

        fetchDatos();
    }, [fixtures]);

    const obtenerLlave = (fixture: any, index: any) => {
        let llave = '';
        const abreviacionEtapa = obtenerAbreviacionEtapa(fixture.etapa);
        const numeroLlave = (index + 1);
        const tipoCopa = fixture.tipo_copa;
        const abreviacionTercerLugar = (fixture.tipo_partido === "Normal" ? "" : "(Tl)");

        // llave = abreviacionEtapa + ". " + tipoCopa + " " + abreviacionTercerLugar;
        llave = abreviacionEtapa + "." + numeroLlave + " " + tipoCopa + " " + abreviacionTercerLugar;
        return llave;
    };

    const obtenerLlaveOrigen = async (fixture, tipoEquipo, index) => {
        if (etapasTorneoCategoria === null) {
            return;
        }

        const primeraEtapa = etapasTorneoCategoria.data.torneosCategoriasEtapas.reduce((maxElemento, elementoActual) => {
            return elementoActual.id_etapa > maxElemento.id_etapa ? elementoActual : maxElemento;
        }, etapasTorneoCategoria.data.torneosCategoriasEtapas[0]);

        let indexPorDos = index * 2;
        let etapaAnterior = '';
        let llaveOrigen = ''
        let abreviacionEtapa = '';
        let numeroLlaveOrigen = 0;
        let tipoOrigen = 'G';
        let tipoCopa = fixture.tipo_copa;

        if (fixture.tipo_copa === 'Oro') {
            if (primeraEtapa.Etapa.nombre != fixture.etapa) {
                etapaAnterior = obtenerEtapaAnterior(fixture.etapa);
                abreviacionEtapa = obtenerAbreviacionEtapa(etapaAnterior);

                if (tipoEquipo === 'Local') {
                    if (fixture.tipo_partido === 'Tercer lugar') {
                        tipoOrigen = 'P';
                    }

                    if (fixture.etapa === ETAPAS_PLAY_OFF.FINAL) {
                        if (index === 1) {
                            numeroLlaveOrigen = indexPorDos - 1;
                        } else {
                            numeroLlaveOrigen = (indexPorDos + 1);
                        }
                    } else {
                        numeroLlaveOrigen = (indexPorDos + 1);
                    }
                } else if (tipoEquipo === 'Visitante') {
                    if (fixture.tipo_partido === 'Tercer lugar') {
                        tipoOrigen = 'P';
                    }

                    if (fixture.etapa === ETAPAS_PLAY_OFF.FINAL) {
                        if (index === 1) {
                            numeroLlaveOrigen = indexPorDos;
                        } else {
                            numeroLlaveOrigen = (indexPorDos + 1) + 1;
                        }
                    } else {
                        numeroLlaveOrigen = (indexPorDos + 1) + 1;
                    }
                }
                llaveOrigen = tipoOrigen + " " + abreviacionEtapa + "." + numeroLlaveOrigen + " " + tipoCopa;
            } else {
                llaveOrigen = 'E. F.'
            }
        }

        if (fixture.tipo_copa === 'Plata') {

            if (fixture.etapa === etapaInicioCopaPlata[0].Etapa.nombre) {
                indexPorDos = (index - 2) * 2;
                tipoOrigen = 'P';
                tipoCopa = 'Oro';
                abreviacionEtapa = obtenerAbreviacionEtapa(primeraEtapa.Etapa.nombre);

                if (tipoEquipo === 'Local') {
                    if (fixture.tipo_partido === 'Tercer lugar') {
                        tipoOrigen = 'P';
                    }

                    if (fixture.etapa === ETAPAS_PLAY_OFF.FINAL) {
                        if (index === 1) {
                            numeroLlaveOrigen = indexPorDos - 1;
                        } else {
                            numeroLlaveOrigen = (indexPorDos + 1);
                        }
                    } else {
                        numeroLlaveOrigen = (indexPorDos + 1);
                    }

                    // numeroLlaveOrigen = (indexPorDos + 1);
                } else if (tipoEquipo === 'Visitante') {
                    if (fixture.tipo_partido === 'Tercer lugar') {
                        tipoOrigen = 'P';
                    }

                    if (fixture.etapa === ETAPAS_PLAY_OFF.FINAL) {
                        if (index === 1) {
                            numeroLlaveOrigen = indexPorDos;
                        } else {
                            numeroLlaveOrigen = (indexPorDos + 1) + 1;
                        }
                    } else {
                        numeroLlaveOrigen = (indexPorDos + 1) + 1;
                    }

                    // numeroLlaveOrigen = (indexPorDos + 1) + 1;
                }
                llaveOrigen = tipoOrigen + " " + abreviacionEtapa + "." + numeroLlaveOrigen + " " + tipoCopa;
            } else {
                indexPorDos = index;
                tipoOrigen = 'G';
                tipoCopa = 'Plata';
                etapaAnterior = obtenerEtapaAnterior(fixture.etapa);
                abreviacionEtapa = obtenerAbreviacionEtapa(etapaAnterior);

                if (tipoEquipo === 'Local') {                  
                    if (fixture.etapa === ETAPAS_PLAY_OFF.FINAL) {
                        if (fixture.tipo_partido === 'Tercer lugar') {
                            tipoOrigen = 'P';
                        }else{
                            indexPorDos = indexPorDos-1;
                        }

                        if (index === 1) {
                            numeroLlaveOrigen = indexPorDos - 1;
                        } else {
                            numeroLlaveOrigen = (indexPorDos + 1);
                        }
                    } else {
                        numeroLlaveOrigen = (indexPorDos + 1);
                    }
                } else if (tipoEquipo === 'Visitante') {
                    if (fixture.etapa === ETAPAS_PLAY_OFF.FINAL) {
                        if (fixture.tipo_partido === 'Tercer lugar') {
                            tipoOrigen = 'P';
                        }else{
                            indexPorDos = indexPorDos-1;
                        }

                        if (index === 1) {
                            numeroLlaveOrigen = indexPorDos;
                        } else {
                            numeroLlaveOrigen = (indexPorDos + 1) + 1;
                        }
                    } else {
                        numeroLlaveOrigen = (indexPorDos + 1) + 1;
                    }
                }
                llaveOrigen = tipoOrigen + " " + abreviacionEtapa + "." + numeroLlaveOrigen + " " + tipoCopa;
            }
        }

        return llaveOrigen;
    }

    const obtenerEtapaAnterior = (etapa: string) => {
        let Etapa = '';

        switch (etapa) {
            case ETAPAS_PLAY_OFF.TREINTAIDOSAVO_DE_FINAL:
                Etapa = '';
                break;
            case ETAPAS_PLAY_OFF.DIECISEISAVO_DE_FINAL:
                Etapa = ETAPAS_PLAY_OFF.TREINTAIDOSAVO_DE_FINAL;
                break;
            case ETAPAS_PLAY_OFF.OCTAVOS_DE_FINAL:
                Etapa = ETAPAS_PLAY_OFF.DIECISEISAVO_DE_FINAL;
                break;
            case ETAPAS_PLAY_OFF.CUARTOS_DE_FINAL:
                Etapa = ETAPAS_PLAY_OFF.OCTAVOS_DE_FINAL;
                break;
            case ETAPAS_PLAY_OFF.SEMI_FINAL:
                Etapa = ETAPAS_PLAY_OFF.CUARTOS_DE_FINAL;
                break;
            case ETAPAS_PLAY_OFF.FINAL:
                Etapa = ETAPAS_PLAY_OFF.SEMI_FINAL;
                break;
            default:
                break;
        }

        return Etapa;
    };

    const obtenerAbreviacionEtapa = (etapa: string) => {
        let abreviacionEtapa = '';

        switch (etapa) {
            case ETAPAS_PLAY_OFF.TREINTAIDOSAVO_DE_FINAL:
                abreviacionEtapa = 'T';
                break;
            case ETAPAS_PLAY_OFF.DIECISEISAVO_DE_FINAL:
                abreviacionEtapa = 'D';
                break;
            case ETAPAS_PLAY_OFF.OCTAVOS_DE_FINAL:
                abreviacionEtapa = 'O';
                break;
            case ETAPAS_PLAY_OFF.CUARTOS_DE_FINAL:
                abreviacionEtapa = 'C';
                break;
            case ETAPAS_PLAY_OFF.SEMI_FINAL:
                abreviacionEtapa = 'S';
                break;
            case ETAPAS_PLAY_OFF.FINAL:
                abreviacionEtapa = 'F';
                break;
            default:
                break;
        }

        return abreviacionEtapa;
    };

    const handleRowClick = (index) => {
        setSelectedRow(index);
    };

    return (
        <div className="bg-transparent shadow border rounded-xl overflow-hidden overflow-x-auto overflow-y-auto ml-[2%] mr-[2%] h-auto mb-6 ">
            {/* Contenedor con scrollbar horizontal y vertical habilitado */}
            <div className="overflow-x-auto overflow-y-auto max-h-[80vh] custom-scrollbar">
                <table className="w-full table-auto">
                    <thead className="bg-[#1e3a8a] text-white h-[60px] sticky top-0 z-10">
                        <tr>
                            <th className="text-center py-3 px-1 sm500:px-10 text-sm sm590:text-base sm670:text-xl font-medium tracking-tight">Llave</th>
                            <th className="text-center py-3 px-1 sm500:px-10 text-sm sm590:text-base sm670:text-xl font-medium tracking-tight">Equipo local</th>
                            <th className="text-center py-3 px-1 sm500:px-10 text-sm sm590:text-base sm670:text-xl font-medium tracking-tight">Resultado</th>
                            <th className="text-center py-3 px-1 sm500:px-10 text-sm sm590:text-base sm670:text-xl font-medium tracking-tight">Equipo visitante</th>
                            <th className="text-center py-3 px-1 sm500:px-10 text-sm sm590:text-base sm670:text-xl font-medium tracking-tight">Fecha</th>
                            <th className="text-center py-3 px-1 sm500:px-10 text-sm sm590:text-base sm670:text-xl font-medium tracking-tight">Cancha</th>
                            <th className="text-center py-3 px-1 sm500:px-10 text-sm sm590:text-base sm670:text-xl font-medium tracking-tight">Estado</th>
                            <th className="text-center py-3 px-1 sm500:px-10 text-sm sm590:text-base sm670:text-xl font-medium tracking-tight">Acciones</th>
                        </tr>
                    </thead>

                    <tbody className="bg-white">
                        {fixtures.length > 0 ? (
                            fixtures.map((fixture, index) => (
                                <tr
                                    key={index}
                                    className={`border-b border-gray-200 cursor-pointer ${selectedRow === index ? 'bg-blue-200' : ''}`}
                                    onClick={() => handleRowClick(index)}
                                >
                                    <td className="py-4 px-1 sm500:px-10 text-sm sm590:text-base sm670:text-xl text-gray-700 text-center text-green-700 underline">{obtenerLlave(fixture, index)}</td>
                                    <td className="py-4 px-1 sm500:px-10 text-sm sm590:text-base sm670:text-xl text-gray-700 text-center">{fixture.equipo_local ? fixture.equipo_local : obtenerLlaveOrigen(fixture, 'Local', index)}</td>
                                    <td className="py-4 px-1 sm500:px-10 text-sm sm590:text-base sm670:text-xl text-gray-700 text-center">{(fixture.resultado_local ? fixture.resultado_local : '-') + " vs " + (fixture.resultado_visitante ? fixture.resultado_visitante : '-')}</td>
                                    <td className={`py-4 px-1 sm500:px-10 text-sm sm590:text-base sm670:text-xl text-gray-700 text-center`}>{fixture.equipo_visitante ? fixture.equipo_visitante : obtenerLlaveOrigen(fixture, 'Visitante', index)}</td>
                                    <td className={`py-4 px-1 sm500:px-10 text-sm sm590:text-base sm670:text-xl text-gray-700 text-center ${fixture.fecha ? 'text-black' : 'text-yellow-500'}`}>{fixture.fecha || 'No definido'}</td>
                                    <td className={`py-4 px-1 sm500:px-10 text-sm sm590:text-base sm670:text-xl text-gray-700 text-center ${fixture.no_cancha ? 'text-black' : 'text-yellow-500'}`}>{fixture.no_cancha || 'No definido'}</td>
                                    <td className={`py-4 px-1 sm500:px-10 text-sm sm590:text-base sm670:text-xl text-center ${fixture.estado === 'Terminado' ? 'text-green-500' : 'text-orange-500'}`}>{fixture.estado ? fixture.estado : 'No definido'}</td>
                                    <td className="text-center text-sm sm590:text-base sm670:text-xl text-gray-700">
                                        <div className="flex flex-col items-center">
                                            <CustomButton
                                                text="Ver"
                                                color="#6f42c1"
                                                width=""
                                                height=""
                                                onClick={() => onEditar(fixture.id_fixture)}
                                                className="mt-2 mb-2 flex flex-col p-5 sm500:p-auto"
                                                icon="/images/logos/Icono_Observación_Blanco.png"
                                            />
                                            <CustomButton
                                                text="Editar"
                                                color="#3b82f6"
                                                width=""
                                                height=""
                                                onClick={() => onEditar(fixture.id_fixture)}
                                                className="mt-2 mb-2 flex flex-col p-5 sm500:p-auto"
                                                icon="/images/logos/Icono_Editar_Blanco.png"
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={8} className="py-4 px-6 text-sm sm590:text-base sm670:text-xl text-gray-700 text-center">
                                    No hay partidos registrados.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MatchesGrid;