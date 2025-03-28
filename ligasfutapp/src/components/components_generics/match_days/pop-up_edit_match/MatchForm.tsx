import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import EventsGrid from './EventsGrid';
import { crearEvento, obtenerEventosPorPartido, desactivarEvento } from '@/services/eventoService';
import CustomAlert from '@/components/components_generics/custom_alert/CustomAlert';
import CustomAlertAcceptOrCancel from '@/components/components_generics/custom_alert/CustomAlertAcceptOrCancel';
import CustomButton from '@/components/components_generics/button/CustomButton';
import { RingLoader } from 'react-spinners';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import { EVENT_TYPES } from '@/constants';

const PartidoFormulario = ({
    partido,
    onChange,
    onAddEvent,
    editar,
    actualizarEventos,
    onEliminateEvent
}: {
    partido?: any;
    onChange?: (updatedFormData: any) => void;
    onAddEvent?: (addEvent: boolean) => any;
    editar?: boolean;
    actualizarEventos?: boolean;
    onEliminateEvent?: (event: any) => any;
}) => {
    const [formData, setFormData] = useState({
        equipoLocal: '',
        resultado_local: 0,
        fecha: '',
        equipoVisitante: '',
        resultado_visitante: 0,
        hora: '',
        recinto: '',
        no_cancha: 0,
        estado: ''
    });
    const [datosEventos, setDatosEventos] = useState<any>([]);
    const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
    const [messageCustomAlert, setMessageCustomAlert] = useState<string | ''>('');
    const [showCustomAlert, setShowCustomAlert] = useState<boolean | null>(false);
    const [messageCustomAlertAcceptOrCancel, setMessageCustomAlertAcceptOrCancel] = useState<string | ''>('');
    const [showCustomAlertAcceptOrCancel, setShowCustomAlertAcceptOrCancel] = useState<boolean | null>(false);
    const [isLoading, setIsLoading] = useState<boolean | null>(false);

    const obtenerEventosPartido = useCallback(async () => {
        setFormData({
            equipoLocal: partido.equipo_local || '[Equipo local]',
            resultado_local: partido.resultado_local || 0,
            fecha: partido.fecha || '',
            equipoVisitante: partido.equipo_visitante || '[Equipo visitante]',
            resultado_visitante: partido.resultado_visitante || 0,
            hora: partido.hora || '',
            recinto: partido?.recinto || '',
            no_cancha: partido?.no_cancha || '',
            estado: partido?.estado || '',
        });
        const consultaDatosEventos = await obtenerEventosPorPartido(Number(partido.id_partido));
        setDatosEventos(consultaDatosEventos.data);
    }, [partido]);

    useEffect(() => {
        const fetchData = async () => {
            if (partido) {
                await obtenerEventosPartido();
            }
        };
        fetchData();
    }, [partido, obtenerEventosPartido, actualizarEventos]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const updatedFormData = { ...formData, [name]: value };

        setFormData(updatedFormData);

        // Llama a la función onChange para enviar los datos actualizados
        if (onChange) {
            onChange(updatedFormData);
        }
    };

    const onEliminate = async () => {
        if (selectedEvent !== null) {
            setMessageCustomAlertAcceptOrCancel("¿Estás seguro de que deseas eliminar este evento?");
            setShowCustomAlertAcceptOrCancel(true);
        } else {
            setMessageCustomAlert("¡Se debe de seleccionar un evento para eliminarlo!");
            setShowCustomAlert(true);
        }
    };

    const handleCloseCustomAlert = () => {
        setShowCustomAlert(false);
    };

    const handleAcceptCustomAlertAcceptOrCancel = async () => {
        setShowCustomAlertAcceptOrCancel(false);
        setIsLoading(true);
        onEliminateEvent(selectedEvent);
        setIsLoading(false);
        // const eventEliminado = await desactivarEvento(selectedEvent.id_evento);

        // if (eventEliminado && eventEliminado.success) {
        //     await obtenerEventosPartido();
        //     setIsLoading(false);

        //     setMessageCustomAlert("¡Evento eliminado exitosamente!");
        //     setShowCustomAlert(true);
        //     setSelectedEvent(null);
        // }

        // if (selectedEvent.tipo_evento === EVENT_TYPES.GOL) {

        // }
    };

    const handleCancelCustomAlertAcceptOrCancel = () => {
        setShowCustomAlertAcceptOrCancel(false);
        setSelectedEvent(null);
    };

    return (
        <div className="flex flex-col items-center justify-center p-4 rounded-lg text-shadow-lg">
            <div className="flex flex-col md:grid md:grid-cols-3 items-center w-full gap-4 mb-4">
                {/* Para pantallas menores a md, todo se mostrará en una sola columna */}

                {/* Equipo Local */}
                <div className="flex flex-col items-center w-full">
                    <div className="flex items-center mb-2">
                        <span className="text-white font-bold text-xl mr-2 text-center">{formData.equipoLocal}</span>
                        <Image src="/images/logos/Icono_Escudo_1_Blanco.png" alt="Escudo Local" className="w-10 h-10" width={100} height={100} />
                    </div>
                    <input
                        type="number"
                        name="resultado_local"
                        value={formData.resultado_local}
                        onChange={handleChange}
                        className="w-16 h-16 text-center text-2xl font-semibold border border-gray-300 rounded-lg mb-4"
                        placeholder="0"
                        // disabled={!editar}
                        disabled={true}
                    />
                </div>

                {/* Texto "Vs" */}
                <div className="flex items-center justify-center mb-4 md:mb-0">
                    <span className="text-white font-bold text-3xl">Vs</span>
                </div>

                {/* Equipo Visitante */}
                <div className="flex flex-col items-center w-full">
                    <div className="flex items-center mb-2">
                        <Image src="/images/logos/Icono_Escudo_2_Blanco.png" alt="Escudo Visitante" className="w-10 h-10" width={100} height={100} />
                        <span className="text-white font-bold text-xl ml-2">{formData.equipoVisitante}</span>
                    </div>
                    <input
                        type="number"
                        name="resultado_visitante"
                        value={formData.resultado_visitante}
                        onChange={handleChange}
                        className="w-16 h-16 text-center text-2xl font-semibold border border-gray-300 rounded-lg mb-4"
                        placeholder="0"
                        // disabled={!editar}
                        disabled={true}
                    />
                </div>

                {/* Campos Adicionales */}
                <div className="flex flex-col items-center w-full mb-4">
                    <a className="mb-1 text-xl font-bold text-white">Fecha:</a>
                    <input
                        type="date"
                        name="fecha"
                        value={formData.fecha}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2 text-gray-700 w-full text-center"
                        disabled={!editar}
                    />
                </div>
                <div className="flex flex-col items-center w-full mb-4">
                    <a className="mb-1 text-xl font-bold text-white">Hora:</a>
                    {/* <input
                        type="time"
                        name="hora"
                        value={formData.hora}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2 text-gray-700 w-full text-center"
                        disabled={!editar}
                        step={60}
                        min="00:00"
                        max="23:59"
                        pattern="[0-9]{2}:[0-9]{2}"
                    /> */}

                    <TimePicker
                        onChange={(val: string) => {
                            // Forzamos a TypeScript a creer que es un React.ChangeEvent
                            const syntheticEvent = {
                                target: {
                                    name: 'hora',
                                    value: val,
                                },
                                // Añadir NOOPs para evitar errores de propiedades faltantes
                                currentTarget: {
                                    name: 'hora',
                                    value: val,
                                },
                                preventDefault: () => { },
                                stopPropagation: () => { },
                                // etc...
                            } as unknown as React.ChangeEvent<HTMLInputElement>;
                            handleChange(syntheticEvent);
                        }}
                        value={formData.hora}
                        disableClock
                        format="h:mm a"
                        className={"w-full rounded-md bg-white border-white h-10 text-center"}
                    />

                </div>
                <div className="flex flex-col items-center w-full mb-4">
                    <a className="mb-1 text-xl font-bold text-white">Recinto:</a>
                    <input
                        type="text"
                        name="recinto"
                        value={formData.recinto}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md p-2 text-gray-700 w-full text-center"
                        disabled={!editar}
                    />
                </div>
            </div>
            <div className="flex flex-col items-center w-full md:w-[33%]">
                <a className="mb-1 text-xl font-bold text-white">N° Cancha:</a>
                <input
                    type="number"
                    name="no_cancha"
                    value={formData.no_cancha}
                    onChange={(e) => {
                        const value = parseInt(e.target.value, 10);
                        if (!isNaN(value) && value >= 1) {
                            handleChange(e);
                        } else if (value < 1 || isNaN(value)) {
                            setFormData({ ...formData, no_cancha: 1 });
                        }
                    }}
                    className="border border-gray-300 rounded-md p-2 text-gray-700 w-full text-center"
                    min="1"
                    disabled={!editar}
                />
            </div>

            <br />
            <div className='w-full h-auto'>
                {editar && (
                    <>
                        <div className="flex-col sm750:flex-row w-[95%] mx-2 xs360:mx-4 flex items-center justify-center sm750:space-x-10 h-[150px] xs:h-[80px]">
                            <CustomButton
                                text="Agregar evento"
                                color="#3b82f6"
                                width=""
                                height=""
                                onClick={() => { onAddEvent(true) }}
                                className={`flex-col w-[90%] xs360:w-[70%] sm750:w-[30%] text-center`}
                                icon="/images/logos/Icono_Confirmar_Blanco.png"
                                classNameText="text-xl xs360:text-2xl"
                                classNameIcon="h-6 sm750:h-8 w-6 sm750:w-8"
                            />
                            <CustomButton
                                text="Eliminar evento"
                                color="#ef4444"
                                width=""
                                height=""
                                onClick={onEliminate}
                                className='flex-col w-[90%] xs360:w-[70%] sm750:w-[30%] text-center mt-5'
                                icon='/images/logos/Icono_Confirmar_Blanco.png'
                                classNameText="text-xl xs360:text-2xl"
                                classNameIcon="h-6 sm750:h-8 w-6 sm750:w-8"
                            />
                        </div>
                    </>
                )}

                <br />
                <br />
                <div className="flex-grow w-full">
                    <EventsGrid events={datosEventos} onSelectedRow={setSelectedEvent} />
                </div>
            </div>

            {/**Alertas */}
            <CustomAlert message={messageCustomAlert} onClose={handleCloseCustomAlert} show={showCustomAlert} />
            <CustomAlertAcceptOrCancel message={messageCustomAlertAcceptOrCancel} onAccept={handleAcceptCustomAlertAcceptOrCancel} onCancel={handleCancelCustomAlertAcceptOrCancel} show={showCustomAlertAcceptOrCancel} />

            {/* Animación de carga */}
            {
                isLoading && (
                    <div
                        style={{
                            position: 'fixed',
                            top: '0',
                            left: '0',
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'rgba(0, 0, 0, 0.7)', // Fondo semitransparente
                            zIndex: '100', // Para asegurarse de que se muestre sobre otros elementos
                        }}
                        className="flex items-center justify-center"
                    >
                        <RingLoader color="#007bff" />
                    </div>
                )
            }
        </div >
    );
};

export default PartidoFormulario;