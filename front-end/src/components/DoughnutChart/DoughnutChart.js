import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      title: {
        text: 'Kategorie',
        display: true,
        position: 'center',
        padding: {
          top: 10,
        },
        font: {
          family: 'Poppins, sans-serif',
          weight: 500,
          size: 14,
        },
      },
    },
    title: {
      display: true,
      text: 'Najchętniej oglądane gatunki',
      fullSize: true,
      align: 'center',
      font: {
        family: 'Poppins, sans-serif',
        weight: 500,
        size: 14,
      },
    },
  },
};

const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const DoughnutChart = () => {
  ChartJS.register(ArcElement, Tooltip, Legend, Title);
  return <Doughnut options={options} data={data} />;
};

export default DoughnutChart;
