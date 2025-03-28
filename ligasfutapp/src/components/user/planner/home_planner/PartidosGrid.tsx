"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import CustomButton from '@/components/components_generics/button/CustomButton';

interface PartidosGridProps {
  partidos: Array<{
    id_partido: number;
    fecha: string;
    hora: string;
    equipo_local: string;
    equipo_visitante: string;
    recinto: string;
    no_cancha: string;
  }> | null; // Permitir que partidos sea null
  userRole: string;
}

const PartidosGrid: React.FC<PartidosGridProps> = ({ partidos, userRole }) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  // Verificar que partidos no sea null o undefined antes de usar slice
  const currentRecords = partidos ? partidos.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  ) : [];

  const totalPages = partidos ? Math.ceil(partidos.length / recordsPerPage) : 1;

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePlannerClick = (id_partido: number) => {
    if (process.env.NODE_ENV === 'production') {
      router.push(`/user/planner/match.html?role=` + userRole + `&id_p=${id_partido}`);
    } else {
      router.push(`/user/planner/match/?role=` + userRole + `&id_p=${id_partido}`);
    }
    // router.push(`/user/planner/match/?role=` + userRole + `&id_p=${id_partido}`);
  };

  return (
    <div className="bg-white shadow border rounded-xl overflow-hidden overflow-x-auto w-[95%]">
      <div className="px-6 py-4 bg-gray-50 h-[80px]">
        <h2 className="text-2xl font-semibold text-gray-700 tracking-tight mt-5">Partidos Programados</h2>
      </div>
      <div className='overflow-x-auto'>
        <table className="w-full table-auto bg-gray-700 rounded-b-full">
          <thead className="bg-[#1e3a8a] text-white h-[60px]">
            <tr className=''>
              <th className="py-3 px-1 sm500:px-10 text-center text-sm sm590:text-base sm670:text-xl font-medium tracking-tight text-center">FECHA</th>
              <th className="py-3 px-1 sm500:px-10 text-center text-sm sm590:text-base sm670:text-xl font-medium tracking-tight text-center">HORA</th>
              <th className="py-3 px-1 sm500:px-10 text-center text-sm sm590:text-base sm670:text-xl font-medium tracking-tight md:whitespace-nowrap text-center">EQUIPO LOCAL</th>
              <th className="py-3 px-1 sm500:px-10 text-center text-sm sm590:text-base sm670:text-xl font-medium tracking-tight md:whitespace-nowrap text-center">EQUIPO VISITANTE</th>
              <th className="py-3 px-1 sm500:px-10 text-center text-sm sm590:text-base sm670:text-xl font-medium tracking-tight md:whitespace-nowrap text-center">RECINTO</th>
              <th className="py-3 px-1 sm500:px-10 text-center text-sm sm590:text-base sm670:text-xl font-medium tracking-tight md:whitespace-nowrap text-center">N°_CANCHA</th>
              <th className="py-3 px-1 sm500:px-10 text-center text-sm sm590:text-base sm670:text-xl font-medium tracking-tight md:whitespace-nowrap text-center">ACCIÓN</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {currentRecords.length > 0 ? (
              currentRecords.map((partido, index) => (
                <tr key={index} className="border-b border-gray-200 text-center">
                  <td className="py-4 px-1 sm500:px-10 text-center text-sm sm590:text-base sm670:text-xl text-gray-700">{partido.fecha}</td>
                  <td className="py-4 px-1 sm500:px-10 text-center text-sm sm590:text-base sm670:text-xl text-gray-700">{partido.hora}</td>
                  <td className="py-4 px-1 sm500:px-10 text-center text-sm sm590:text-base sm670:text-xl text-gray-700">{partido.equipo_local}</td>
                  <td className="py-4 px-1 sm500:px-10 text-center text-sm sm590:text-base sm670:text-xl text-gray-700">{partido.equipo_visitante}</td>
                  <td className="py-4 px-1 sm500:px-10 text-center text-sm sm590:text-base sm670:text-xl text-gray-700">{partido.recinto}</td>
                  <td className="py-4 px-1 sm500:px-10 text-center text-sm sm590:text-base sm670:text-xl text-gray-700">{partido.no_cancha}</td>
                  <td className="py-4 px-1 sm500:px-10 text-center text-sm sm590:text-base sm670:text-xl text-gray-700 flex items-center justify-center">
                    <CustomButton text="Planillar" color="#24b364" width="" height="" onClick={() => handlePlannerClick(partido.id_partido)} className='flex-col min-w-[80%] w-[100px]' icon="/images/logos/Icono_Planillar_Blanco.png" />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-4 text-center text-gray-500">No hay partidos programados.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-4 mb-4 flex justify-center">
        {partidos && partidos.length > recordsPerPage && ( // Mostrar solo si hay más de 5 partidos
          <>
            <button
              onClick={handlePreviousPage}
              className={`px-4 py-2 mr-2 ${currentPage === 1 ? 'bg-gray-300' : 'bg-[#1e3a8a] hover:bg-blue-700 text-white'} rounded-full`}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="px-4 py-2 text-black font-bold">{currentPage}</span>
            <button
              onClick={handleNextPage}
              className={`px-4 py-2 ml-2 ${currentPage === totalPages ? 'bg-gray-300' : 'bg-[#1e3a8a] hover:bg-blue-700 text-white'} rounded-full`}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </>
        )}
        {/* <button onClick={handlePreviousPage} className={`px-4 py-2 mr-2 ${currentPage === 1 ? 'bg-gray-300' : 'bg-[#1e3a8a] hover:bg-blue-700 text-white'} rounded-full`} disabled={currentPage === 1}>Previous</button>
        <span className="px-4 py-2 text-black font-bold">{currentPage}</span>
        <button onClick={handleNextPage} className={`px-4 py-2 ml-2 ${currentPage === totalPages ? 'bg-gray-300' : 'bg-[#1e3a8a] hover:bg-blue-700 text-white'} rounded-full`} disabled={currentPage === totalPages}>Next</button> */}
      </div>
    </div>
  );
};

export default PartidosGrid;
