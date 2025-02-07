import React, { useRef, useEffect, useMemo } from "react";
import Chart from "chart.js/auto";
import { Card, CardContent, Typography, Box } from "@mui/material";

const PieChart = ({ costs }) => {
    const canvasRef = useRef();
    const chartInstanceRef = useRef(null);

    // Use useMemo to compute data only when costs change
    const data = useMemo(() => {
        if (!costs?.length) return null;
        return costs.reduce((acc, cost) => {
            acc[cost.category] = (acc[cost.category] || 0) + Number(cost.sum);
            return acc;
        }, {});
    }, [costs]); // useMemo ensures data is recomputed only when costs change

    useEffect(() => {
        if (!data) return; // Prevent rendering when data is null

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
    }, [data]); // ✅ Now includes 'data' in the dependency array

    return (
        <Card sx={{ maxWidth: 500, margin: "auto", mt: 3 }}>
            <CardContent>
                <Typography variant="h6" align="center">
                    Expense Breakdown
                </Typography>
                {data ? (
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                        <canvas ref={canvasRef}></canvas>
                    </Box>
                ) : (
                    <Typography align="center" sx={{ mt: 2, color: "gray" }}>
                        No data available
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
};

export default PieChart;
