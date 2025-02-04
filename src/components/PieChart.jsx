// src/components/pieChart.jsx
import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";

const pieChart = ({ data }) => {
    const canvasRef = useRef();

    useEffect(() => {
        const ctx = canvasRef.current.getContext("2d");
        new Chart(ctx, {
            type: "pie",
            data: {
                labels: Object.keys(data),
                datasets: [
                    {
                        data: Object.values(data),
                        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
                    },
                ],
            },
        });
    }, [data]);

    return <canvas ref={canvasRef} />;
};

export default pieChart;
