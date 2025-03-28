"use client";
import React, { useEffect, useState } from 'react';
import CustomButton from '@/components/components_generics/button/CustomButton';
import { obtenerTorneoCategoriaEtapas } from '@/services/torneoCategoriaEtapaService';
import { obtenerEtapaInicioCopaPlataSegunFixture } from '@/services/fixtureService';
import { ETAPAS_PLAY_OFF, USER_ROLES, TIPOS_TORNEOS, ESTADOS_PARTIDOS } from '@/constants';

const MatchesGrid = ({ fixtures, onEditar, tipoTorneo, tipoUsuario, onPlanillar = (fixture: any) => { } }) => {
    const [selectedRow, setSelectedRow] = useState(null);
    const [etapasTorneoCategoria, setEtapasTorneoCategoria] = useState(null);
    const [etapaInicioCopaPlata, setEtapaInicioCopaPlata] = useState(null);

    useEffect(() => {
        const fetchDatos = async () => {
            if (tipoTorneo === TIPOS_TORNEOS.PLAY_OFF || tipoTorneo === TIPOS_TORNEOS.LIGA_PLAY_OFF) {
                if (fixtures && fixtures.length > 0) {
                    const etapas = await obtenerTorneoCategoriaEtapas(fixtures[0].id_fixture);
                    setEtapasTorneoCategoria(etapas);

                    const etapaInicioCopaPlata = await obtenerEtapaInicioCopaPlataSegunFixture(fixtures[0].id_fixture);
                    setEtapaInicioCopaPlata(etapaInicioCopaPlata.data);
                }
            } else {

            }
        };

        fetchDatos();
    }, [fixtures, tipoTorneo]);

    if (!fixtures) {
        return <div>Cargando ...</div>
    }

    const obtenerLlave = (fixture: any, index: any) => {
        let llave = '';
        const abreviacionEtapa = obtenerAbreviacionEtapa(fixture.nombre_etapa);
        const numeroLlave = (index + 1);
        const tipoCopa = fixture.tipo_copa;
        const abreviacionTercerLugar = (fixture.tipo_partido === "Normal" ? "" : "(Tl)");

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
                etapaAnterior = obtenerEtapaAnterior(fixture.nombre_etapa);
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
                etapaAnterior = obtenerEtapaAnterior(fixture.nombre_etapa);
                abreviacionEtapa = obtenerAbreviacionEtapa(etapaAnterior);

                if (tipoEquipo === 'Local') {
                    if (fixture.etapa === ETAPAS_PLAY_OFF.FINAL) {
                        if (fixture.tipo_partido === 'Tercer lugar') {
                            tipoOrigen = 'P';
                        } else {
                            indexPorDos = indexPorDos - 1;
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
                        } else {
                            indexPorDos = indexPorDos - 1;
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

    const handleOnPlanillar = (fixture: any) => {
        onPlanillar(fixture);
    };

    // Primero, obtén los nombres de grupo válidos y extrae los únicos
    const gruposUnicos = new Set(fixtures.map(fixture => fixture.nombre_grupo).filter(nombre => nombre !== null && nombre !== ""));

    return (
        <div className="bg-transparent shadow border rounded-xl overflow-hidden overflow-x-auto overflow-y-auto ml-[2%] mr-[2%] h-auto mb-6 ">
            {/* Contenedor con scrollbar horizontal y vertical habilitado */}
            <div className="overflow-x-auto overflow-y-auto max-h-[80vh] custom-scrollbar">
                <table className="w-full table-auto">
                    <thead className="bg-[#1e3a8a] text-white h-[60px] sticky top-0 z-10">
                        <tr className='text-[8px] sm590:text-base sm670:text-xl'>
                            {tipoTorneo === TIPOS_TORNEOS.PLAY_OFF && (
                                <th className="text-center py-3 px-1 sm500:px-10 font-medium tracking-tight">
                                    Llave
                                </th>
                            )}
                            {tipoTorneo === TIPOS_TORNEOS.LIGA_PLAY_OFF && (
                                <>
                                    {(fixtures[0].nombre_grupo !== null && fixtures[0].nombre_grupo !== "") ?
                                        (
                                            <>
                                                {
                                                    gruposUnicos.size > 1 ?
                                                        (
                                                            <th className="text-center py-3 px-1 sm500:px-10 font-medium tracking-tight">
                                                                Grupo
                                                            </th>
                                                        )
                                                        :
                                                        (
                                                            ""
                                                        )
                                                }

                                            </>
                                        )
                                        :
                                        (
                                            <th className="text-center py-3 px-1 sm500:px-10 font-medium tracking-tight">
                                                Llave
                                            </th>
                                        )
                                    }
                                </>
                            )}
                            <th className="text-center py-3 px-1 sm500:px-10 font-medium tracking-tight">Equipo local</th>
                            <th className="text-center py-3 px-1 sm500:px-10 font-medium tracking-tight">Resultado</th>
                            <th className="text-center py-3 px-1 sm500:px-10 font-medium tracking-tight">Equipo visitante</th>
                            <th className="text-center py-3 px-1 sm500:px-10 font-medium tracking-tight">Fecha</th>
                            <th className="text-center py-3 px-1 sm500:px-10 font-medium tracking-tight">Cancha</th>
                            <th className="text-center py-3 px-1 sm500:px-10 font-medium tracking-tight">Estado</th>
                            {!(tipoUsuario === USER_ROLES.DELEGADO || tipoUsuario === USER_ROLES.JUGADOR) && (
                                <th className="text-center py-3 px-1 sm500:px-10 font-medium tracking-tight">Acciones</th>
                            )}
                        </tr>
                    </thead>

                    <tbody className="bg-white">
                        {fixtures && fixtures.length > 0 ? (
                            fixtures.map((fixture, index) => (
                                <tr
                                    key={index}
                                    className={`text-[8px] sm590:text-base sm670:text-xl border-b border-gray-200 cursor-pointer ${selectedRow === index ? 'bg-blue-200' : ''}`}
                                    onClick={() => handleRowClick(index)}
                                >
                                    {/* Para la columna de grupo o Llave */}
                                    {tipoTorneo === TIPOS_TORNEOS.PLAY_OFF && (
                                        <td className="py-4 px-1 sm500:px-10 text-gray-700 text-center text-green-700 underline">{obtenerLlave(fixture, index)}</td>
                                    )}
                                    {tipoTorneo === TIPOS_TORNEOS.LIGA_PLAY_OFF && (
                                        <>
                                            {fixture.nombre_grupo && gruposUnicos.size > 1 && (
                                                <td className="py-4 px-1 sm500:px-10 text-gray-700 text-center text-green-700 underline">
                                                    {fixture.nombre_grupo}
                                                </td>
                                            )}

                                            {(!fixture.nombre_grupo) && (
                                                <td className="py-4 px-1 sm500:px-10 text-gray-700 text-center text-green-700 underline">
                                                    {obtenerLlave(fixture, index)}
                                                </td>
                                            )}
                                        </>
                                    )}

                                    {/* Para la columna de Equipo Local */}
                                    {tipoTorneo === TIPOS_TORNEOS.PLAY_OFF && (
                                        <td className="py-4 px-1 sm500:px-10 text-gray-700 text-center">{fixture.equipo_local ? fixture.equipo_local : obtenerLlaveOrigen(fixture, 'Local', index)}</td>
                                    )}

                                    {tipoTorneo === TIPOS_TORNEOS.LIGA && (
                                        <td className="py-4 px-1 sm500:px-10 text-gray-700 text-center">{fixture.equipo_local ? fixture.equipo_local : obtenerLlaveOrigen(fixture, 'Local', index)}</td>
                                    )}

                                    {tipoTorneo === TIPOS_TORNEOS.LIGA_PLAY_OFF && (
                                        <td className="py-4 px-1 sm500:px-10 text-gray-700 text-center">{fixture.equipo_local ? fixture.equipo_local : "Por definirse"}</td>
                                    )}


                                    <td className="py-4 px-1 sm500:px-10 text-gray-700 text-center">{
                                        (fixture.goles_penales_local_desempate === null
                                            ?
                                            // (fixture.estado === ESTADOS_PARTIDOS.PENDIENTE ? '-' : ((fixture.resultado_local != null && fixture.resultado_local != 0) ? fixture.resultado_local : '-'))
                                            (fixture.resultado_local != null && fixture.resultado_local != 0) ? fixture.resultado_local : '-'
                                            :
                                            fixture.goles_penales_local_desempate)

                                        + " vs " +

                                        (fixture.goles_penales_visitante_desempate === null
                                            ?
                                            // (fixture.estado === ESTADOS_PARTIDOS.PENDIENTE ? '-' : ((fixture.resultado_visitante != null && fixture.resultado_visitante != 0) ? fixture.resultado_visitante : '-'))
                                            (fixture.resultado_visitante != null && fixture.resultado_visitante != 0) ? fixture.resultado_visitante : '-'
                                            :
                                            fixture.goles_penales_visitante_desempate + " (P)")
                                    }</td>

                                    {/* Para la columna Equipo Visitante */}
                                    {tipoTorneo === TIPOS_TORNEOS.PLAY_OFF && (
                                        <td className={`py-4 px-1 sm500:px-10 text-gray-700 text-center`}>{fixture.equipo_visitante ? fixture.equipo_visitante : obtenerLlaveOrigen(fixture, 'Visitante', index)}</td>
                                    )}

                                    {tipoTorneo === TIPOS_TORNEOS.LIGA && (
                                        <td className={`py-4 px-1 sm500:px-10 text-gray-700 text-center`}>{fixture.equipo_visitante ? fixture.equipo_visitante : obtenerLlaveOrigen(fixture, 'Visitante', index)}</td>
                                    )}

                                    {tipoTorneo === TIPOS_TORNEOS.LIGA_PLAY_OFF && (
                                        <td className={`py-4 px-1 sm500:px-10 text-gray-700 text-center`}>{fixture.equipo_visitante ? fixture.equipo_visitante : "Por definirse"}</td>
                                    )}

                                    <td className={`py-4 px-1 sm500:px-10 text-gray-700 text-center ${fixture.fecha ? 'text-black' : 'text-yellow-500'}`}>{fixture.fecha || 'No definido'}</td>
                                    <td className={`py-4 px-1 sm500:px-10 text-gray-700 text-center ${fixture.no_cancha ? 'text-black' : 'text-yellow-500'}`}>{fixture.no_cancha || 'No definido'}</td>
                                    <td className={`py-4 px-1 sm500:px-10 text-center ${fixture.estado === ESTADOS_PARTIDOS.FINALIZADO ? 'text-green-500' : 'text-orange-500'}`}>
                                        {fixture.estado ? fixture.estado : 'No definido'}
                                    </td>
                                    <td className="text-center text-gray-700">
                                        <div className="flex flex-col items-center">
                                            {tipoUsuario === USER_ROLES.PLANILLERO &&
                                                (
                                                    <>
                                                        <CustomButton
                                                            text="Planillar"
                                                            color="#0000FF"
                                                            width=""
                                                            height=""
                                                            onClick={() => handleOnPlanillar(fixture)}
                                                            className={`mt-2 mb-2 flex flex-col sm500:flex-row p-2 sm500:p-auto ${fixture.estado === 'Pendiente' ? 'opacity-100' : 'opacity-50'}`}
                                                            classNameText='text-[8px] sm590:text-xl sm670:text-2xl'
                                                            icon="/images/logos/Icono_Planillar_Blanco.png"
                                                            disabled={fixture.estado != 'Pendiente'}
                                                        />
                                                    </>
                                                )
                                            }

                                            {(tipoUsuario === USER_ROLES.DELEGADO || tipoUsuario === USER_ROLES.JUGADOR) &&
                                                (
                                                    <>
                                                        {/* <CustomButton
                                                            text="Ver"
                                                            color="#6f42c1"
                                                            width=""
                                                            height=""
                                                            onClick={() => onEditar(fixture.id_fixture, false)}
                                                            className="mt-2 mb-2 flex flex-col sm500:flex-row h-[50px] p-5 sm500:p-auto"
                                                            icon="/images/logos/Icono_Observación_Blanco.png"
                                                        /> */}
                                                        {/* <CustomButton
                                                            text="Editar"
                                                            color="#3b82f6"
                                                            width=""
                                                            height=""
                                                            onClick={() => onEditar(fixture.id_fixture, true)}
                                                            className="mt-2 mb-2 flex flex-col sm500:flex-row h-[50px] p-5 sm500:p-auto"
                                                            icon="/images/logos/Icono_Editar_Blanco.png"
                                                        /> */}
                                                    </>
                                                )
                                            }

                                            {tipoUsuario === USER_ROLES.ADMIN_LIGA &&
                                                (
                                                    <>
                                                        <CustomButton
                                                            text="Ver"
                                                            color="#6f42c1"
                                                            width=""
                                                            height=""
                                                            onClick={() => onEditar(fixture.id_fixture, false)}
                                                            className="mt-2 mb-2 flex flex-col sm500:flex-row p-5 sm500:p-auto"
                                                            icon="/images/logos/Icono_Observación_Blanco.png"
                                                        />
                                                        <CustomButton
                                                            text="Editar"
                                                            color="#3b82f6"
                                                            width=""
                                                            height=""
                                                            onClick={() => onEditar(fixture.id_fixture, true)}
                                                            className="mt-2 mb-2 flex flex-col sm500:flex-row p-5 sm500:p-auto"
                                                            icon="/images/logos/Icono_Editar_Blanco.png"
                                                        />
                                                    </>
                                                )
                                            }

                                            {tipoUsuario === USER_ROLES.HINCHA &&
                                                (
                                                    <>
                                                        <CustomButton
                                                            text="Ver"
                                                            color="#6f42c1"
                                                            width=""
                                                            height=""
                                                            onClick={() => onEditar(fixture.id_fixture, false)}
                                                            className="flex flex-col sm500:flex-row m-1"
                                                            icon="/images/logos/Icono_Observación_Blanco.png"
                                                            classNameText='text-xs sm590:text-xl sm670:text-2xl'
                                                            classNameIcon='w-6 sm590:h-8 w-6 sm590:w-8'
                                                        />
                                                    </>
                                                )
                                            }
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={8} className="py-4 px-6 text-gray-700 text-center">
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