import React, { useRef, useEffect, useMemo } from "react";
import Chart from "chart.js/auto";

const PieChart = ({ data }) => {
    const canvasRef = useRef(null);
    const chartRef = useRef(null);

    const chartData = useMemo(() => ({
        labels: Object.keys(data),
        datasets: [
            {
                data: Object.values(data),
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
            },
        ],
    }), [data]);

    useEffect(() => {
        if (!data || Object.keys(data).length === 0) return;

        const ctx = canvasRef.current?.getContext("2d");
        if (!ctx) return;

        if (chartRef.current) {
            chartRef.current.destroy();
        }

        chartRef.current = new Chart(ctx, {
            type: "pie",
            data: chartData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
            },
        });

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
                chartRef.current = null;
            }
        };
    }, [data, chartData]);

    return (
        <div className="chart-container">
            {Object.keys(data).length === 0 ? (
                <p>No data available for this report.</p>
            ) : (
                <canvas ref={canvasRef}></canvas>
            )}
        </div>
    );

};

export default PieChart;
