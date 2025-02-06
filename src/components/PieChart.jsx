import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";
import "./PieChart.css";

const PieChart = ({ data }) => {
    const canvasRef = useRef();
    const chartInstanceRef = useRef(null);

    useEffect(() => {
        const ctx = canvasRef.current.getContext("2d");

        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }
        chartInstanceRef.current = new Chart(ctx, {
            type: "pie",
            data: {
                labels: Object.keys(data),
                datasets: [
                    {
                        data: Object.values(data),
                        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#FB455A"],
                    },
                ],
            },
        });

        // Cleanup on component unmount
        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };
    }, [data]);

    return (
        <div className="pie-chart-container">
            <canvas ref={canvasRef}></canvas>
        </div>
    );
};

export default PieChart;
