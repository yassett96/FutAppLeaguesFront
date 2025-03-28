import React, { useState } from 'react';

const eventColors = {
    'Gol': '#4CAF50', // verde
    'Asistencia': '#8BC34A', // verde claro
    'Tarjeta Amarilla': '#FFEB3B', // amarillo
    'Tarjeta Roja': '#F44336', // rojo
    'Lesión': '#9E9E9E', // gris
    'Falta': '#FF9800', // naranja
    'Sustitución': '#FF5722', // naranja fuerte
    'Auto-Gol': '#1E88E5',
};

const EventSelector = ({ onSelect }) => {
    const [selectedEvent, setSelectedEvent] = useState(null);

    const handleSelect = (event) => {
        setSelectedEvent(event);
        onSelect(event); // Llama a la función de selección en el padre si es necesario
    };

    return (
        <div className="flex flex-wrap gap-2 p-4 items-center justify-center">
            {Object.keys(eventColors).map((event) => {
                const isSelected = selectedEvent === event;
                const buttonColor = isSelected ? eventColors[event] : `${eventColors[event]}80`; // Más claro si no está seleccionado
                const textColor = isSelected ? 'white' : 'black';

                return (
                    <button
                        key={event}
                        onClick={() => handleSelect(event)}
                        style={{
                            backgroundColor: buttonColor,
                            color: textColor,
                            padding: '10px 20px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: isSelected ? 'bold' : 'normal',
                            border: 'none',
                            transition: 'opacity 0.3s',
                        }}
                        className='text-sm sm590:text-xl'
                        onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
                        onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                    >
                        {event}
                    </button>
                );
            })}
        </div>
    );
};

export default EventSelector;
