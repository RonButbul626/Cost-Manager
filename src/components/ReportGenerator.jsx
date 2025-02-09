import React, { useState } from "react";
import { TextField, Button, Grid, MenuItem, Box, Typography } from "@mui/material";

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const years = Array.from({ length: 26 }, (_, i) => 2000 + i);

const ReportGenerator = ({ db, setReportData, setReportTitle }) => {
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");

    const generateReport = async () => {
        const allCosts = await db.getAll("costs");
        const filtered = allCosts.filter(cost => {
            const costDate = new Date(cost.date);
            return (
                (!month || costDate.getMonth() === months.indexOf(month)) &&
                (!year || costDate.getFullYear() === parseInt(year))
            );
        });

        // ✅ ממיין לפי קטגוריות לפני הצגה
        const sortedData = filtered.sort((a, b) => a.category.localeCompare(b.category));

        setReportData(sortedData);
        setReportTitle(`Filtered Report - ${month} ${year}`); // ✅ מעדכן את כותרת הדוח
    };

    return (
        <Box sx={{ textAlign: "center", maxWidth: 500, margin: "auto" }}>
            <Typography variant="h6" sx={{ mb: 3 }}>Select Month and Year for Report</Typography>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        select
                        label="Month"
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                        fullWidth
                        SelectProps={{
                            MenuProps: {
                                PaperProps: {
                                    style: { maxHeight: 200 }
                                }
                            }
                        }}
                    >
                        {months.map((m, index) => (
                            <MenuItem key={index} value={m}>{m}</MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        select
                        label="Year"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        fullWidth
                        SelectProps={{
                            MenuProps: {
                                PaperProps: {
                                    style: { maxHeight: 200 }
                                }
                            }
                        }}
                    >
                        {years.map((y) => (
                            <MenuItem key={y} value={y}>{y}</MenuItem>
                        ))}
                    </TextField>
                </Grid>
            </Grid>
            <Button variant="contained" color="primary" onClick={generateReport} sx={{ mt: 3 }}>
                Generate Report
            </Button>
        </Box>
    );
};

export default ReportGenerator;
