import React, { useCallback, useLayoutEffect } from 'react';
import {Chart, registerables} from 'chart.js'
Chart.register(...registerables);
let myChartInUse;

export const GraficoBarrasInUse = ({ data, namesLabels }) => {
    const createGrafica = useCallback(
        () => {
            const ctx = document.getElementById('myChartInUse');
            if (typeof myChartInUse !== "undefined") myChartInUse.destroy();
            myChartInUse = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: namesLabels,
                    datasets: [{
                        label: 'cantidad',
                        data: data,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        },
        [data, namesLabels],
    )
    useLayoutEffect(() => {
        createGrafica();
    }, [data, createGrafica])
    return (
        <canvas id="myChartInUse"  height="150"></canvas>
    )
}
