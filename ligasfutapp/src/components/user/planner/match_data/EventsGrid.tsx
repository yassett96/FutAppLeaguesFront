import React, { useState } from 'react';
import Image from 'next/image';

const EventsGrid = ({ events = [], onSelectedRow }) => {
  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (index) => {
    setSelectedRow(index);
    onSelectedRow(events[index].id_evento);
  };

  return (
    <div className="bg-transparent shadow border rounded-xl overflow-hidden overflow-x-auto xl1800:w-[100%] h-auto max-h-[700px] mb-6">
      <div className="flex items-center px-6 py-4 bg-gray-50 h-[85px]">
        <Image width={100} height={100} src="/images/logos/Icono_Tabla.png" className='shadow-lg h-10 w-10 mt-1 mr-2 opacity-60' alt="Icono Tabla" />
        <h2 className="text-xl sm590:text-2xl sm670:text-3xl font-semibold tracking-tight text-gray-700">Eventos del Partido</h2>
      </div>

      <div className="overflow-x-auto overflow-y-auto custom-scrollbar h-auto max-h-[615px]">
        {events.length > 0 ? (
          <table className="w-full table-auto bg-gray-700 rounded-b-full">
            <thead className="bg-[#1e3a8a] text-white h-[60px] text-[9px] sm590:text-sm sm670:text-xl">
              <tr>
                <th className="py-3 px-1 sm500:px-10 font-medium tracking-tight">Equipo</th>
                <th className="py-3 px-1 sm500:px-10 font-medium tracking-tight">Evento</th>
                <th className="py-3 px-1 sm500:px-10 font-medium tracking-tight">Jugador</th>
                <th className="py-3 px-1 sm500:px-10 font-medium tracking-tight">Tiempo (min)</th>
                <th className="py-3 px-1 sm500:px-10 font-medium tracking-tight">Observaciones</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {events.length > 0 ? (
                events.map((event, index) => (
                  <tr
                    key={index}
                    className={`text-xs sm590:text-xl sm670:text-2xl border-b border-gray-200 cursor-pointer ${selectedRow === index ? 'bg-blue-200' : ''}`}
                    onClick={() => handleRowClick(index)}
                  >
                    <td className="py-4 px-1 sm500:px-10 text-center text-gray-700">
                      {event.nombre_equipo || ""}
                    </td>
                    <td className="py-4 px-1 sm500:px-10 text-center text-gray-700">
                      {event.tipo_evento || ""}
                    </td>
                    <td className="py-4 px-1 sm500:px-10 text-center text-gray-700">
                      {(event.primer_nombre || "") + " " + (event.primer_apellido || "")}
                    </td>
                    <td className="py-4 px-1 sm500:px-10 text-center text-gray-700">
                      {
                        event.minuto === 45
                          ? event.minutos_extra > 0
                            ? `45' + ${event.minutos_extra}'`
                            : `45'`
                          : event.minuto === 90
                            ? event.minutos_extra > 0
                              ? `90' + ${event.minutos_extra}'`
                              : `90'`
                            : `${event.minuto}'`
                      }
                    </td>
                    <td className="py-4 px-1 sm500:px-10 text-center text-gray-700">
                      {event.observacion || ""}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-4 px-1 text-center text-gray-500">
                    No hay eventos registrados
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        ) : (
          <div className="py-4 text-center text-2xl font-semibold text-gray-700">Ingresar eventos en este partido</div>
        )}
      </div>
    </div>
  );
};

export default EventsGrid;