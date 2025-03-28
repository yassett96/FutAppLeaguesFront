import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Define las props para el componente
interface EvolutionChartProps {
  labels: string[];
  dataPoints: number[];
}

const EvolutionChart: React.FC<EvolutionChartProps> = ({ labels, dataPoints }) => {
  const data = {
    labels,
    datasets: [
      {
        label: 'Posición',
        data: dataPoints, // Puntos de datos (posiciones) pasados como props
        fill: false,
        borderColor: '#FFA500', // Color de la línea (naranja)
        borderWidth: 4, // Grosor de la línea
        pointBackgroundColor: '#FFA500', // Color de los puntos
        pointBorderColor: '#FFA500', // Borde de los puntos
        pointRadius: 0, // Tamaño de los puntos
        tension: 0, // Suavizar la línea
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Permitir ajuste dinámico
    plugins: {
      legend: {
        display: false, // Ocultar la leyenda
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
          color: '#E0E0E0', // Color de las líneas de la cuadrícula
        },
        ticks: {
          color: '#000000', // Color de los números en el eje X
          font: {
            size: 10, // Tamaño del texto en el eje X
          },
          // maxRotation: 0, // Evitar que las etiquetas roten más de lo necesario
          // minRotation: 0,
        },
        min: -0.5, // Agrega espacio adicional al inicio
        max: labels.length - 0.5, // Agrega espacio adicional al final
      },
      y: {
        grid: {
          display: true,
          color: '#E0E0E0', // Color de las líneas de la cuadrícula
        },
        ticks: {
          color: '#000000', // Color de los números en el eje Y
          font: {
            size: 10, // Tamaño del texto en el eje Y
          },
          stepSize: 1, // Asegura que los ticks sean de 1 en 1                   
          values: [0, 1, 2, 3],
          callback: function (value: any) {
            return Math.floor(value); // Mostrar solo números enteros
          },
        },
        reverse: true, // Invertir el eje Y para que 1 sea la mejor posición
      },
    },
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto p-4 bg-white shadow-md rounded-lg">
      {/* Contenedor principal en formato flex */}
      <div className="flex flex-col items-center">
        {/* Título y descripción */}
        <div className="mb-6 text-center">
          <h2 className="text-xl sm750:text-2xl font-semibold text-gray-800">Posición Vs Fechas</h2>
          <p className="text-sm text-gray-400 font-semibold">
            Gráfica de posición del equipo según los resultados de las fechas jugadas
          </p>
        </div>

        {/* Gráfico */}
        <div className="w-full h-[450px]">
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default EvolutionChart;