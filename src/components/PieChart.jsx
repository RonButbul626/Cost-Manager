import React, { useRef, useEffect, useMemo } from "react";
import Chart from "chart.js/auto";
import { Typography, Box } from "@mui/material";

const colors = [
    "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#FB455A",
    "#9966FF", "#FF9F40", "#8E44AD", "#27AE60", "#E74C3C",
    "#F39C12", "#D35400", "#1ABC9C", "#2ECC71", "#3498DB",
    "#9B59B6", "#34495E", "#95A5A6", "#C0392B", "#BDC3C7"
];

const PieChart = ({ costs }) => {
    const canvasRef = useRef();
    const chartInstanceRef = useRef(null);

    // 🎯 שינוי לוגיקה: עכשיו מחשב **מספר מוצרים בכל קטגוריה** במקום סכום
    const data = useMemo(() => {
        if (!costs?.length) return null;
        return costs.reduce((acc, cost) => {
            acc[cost.category] = (acc[cost.category] || 0) + 1; // ✅ סופרים את מספר הפריטים ולא מחברים סכום
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
                        backgroundColor: Object.keys(data).map((_, i) => colors[i % colors.length])
                    },
                ],
            },
            options: {
                plugins: {
                    legend: { display: false } // ✅ השארנו את המקרא כפי שהיה
                }
            }
        });

        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };
    }, [data]);

    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 3 }}>
            {/* ✅ מקרא (Legend) בצד שמאל */}
            {data && (
                <Box sx={{ display: "flex", flexWrap: "wrap", maxWidth: 200, mr: 3 }}>
                    {Object.keys(data).map((category, index) => (
                        <Box key={category} sx={{ display: "flex", alignItems: "center", mb: 1, width: "100%" }}>
                            <Box
                                sx={{
                                    width: 14,
                                    height: 14,
                                    backgroundColor: colors[index % colors.length],
                                    borderRadius: "50%",
                                    display: "inline-block",
                                    mr: 1
                                }}
                            />
                            <Typography variant="body2">{category}</Typography>
                        </Box>
                    ))}
                </Box>
            )}

            {/* ✅ הגרף עצמו */}
            <Box sx={{ textAlign: "center" }}>
                <Typography variant="h6">Expense Breakdown</Typography>
                {data ? (
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                        <canvas ref={canvasRef}></canvas>
                    </Box>
                ) : (
                    <Typography sx={{ mt: 2, color: "gray" }}>No data available</Typography>
                )}
            </Box>
        </Box>
    );
};

export default PieChart;
