import React, { useRef, useEffect, useMemo } from "react";
import Chart from "chart.js/auto";
import { Typography, Box } from "@mui/material";

const PieChart = ({ costs }) => {
    const canvasRef = useRef();
    const chartInstanceRef = useRef(null);

    // 🎯 חישוב הנתונים רק כאשר `costs` משתנה
    const data = useMemo(() => {
        if (!costs?.length) return null;
        return costs.reduce((acc, cost) => {
            acc[cost.category] = (acc[cost.category] || 0) + Number(cost.sum);
            return acc;
        }, {});
    }, [costs]);

    useEffect(() => {
        if (!data) return; // מניעת רינדור כאשר אין נתונים

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

        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };
    }, [data]);

    return (
        <Box sx={{ maxWidth: 500, margin: "auto", mt: 3, textAlign: "center" }}>
            <Typography variant="h6">
                Expense Breakdown
            </Typography>
            {data ? (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                    <canvas ref={canvasRef}></canvas>
                </Box>
            ) : (
                <Typography sx={{ mt: 2, color: "gray" }}>
                    No data available
                </Typography>
            )}
        </Box>
    );
};

export default PieChart;
