import React, { useState } from "react";
import { MenuItem, Box, Typography, Grid2, Select, FormControl, InputLabel, Button } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const months = [
    "Select Month", "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const years = ["Select Year", ...Array.from({ length: 26 }, (_, i) => (2000 + i).toString())];

const ReportGenerator = ({ db, setReportData, setReportTitle }) => {
    const [month, setMonth] = useState("Select Month");
    const [year, setYear] = useState("Select Year");

    const generateReport = async () => {
        if (month === "Select Month" || year === "Select Year") {
            alert("Please select a month and a year");
            return;
        }

        const allCosts = await db.getAll("costs");
        const filtered = allCosts.filter(cost => {
            const costDate = new Date(cost.date);
            return (
                (!month || costDate.getMonth() === months.indexOf(month) - 1) &&
                (!year || costDate.getFullYear() === parseInt(year))
            );
        });

        const sortedData = filtered.sort((a, b) => a.category.localeCompare(b.category));

        setReportData(sortedData);
        setReportTitle(`Filtered Report - ${month} ${year}`);
    };

    const theme = createTheme({
        components: {
            MuiGrid2: {
                defaultProps: {
                    disableEqualOverflow: true,
                },
            },
        },
    });

    return (
        <Box sx={{ textAlign: "center", maxWidth: 500, margin: "auto" }}>
            <Typography variant="h6" sx={{ mb: 3 }}>Select Month and Year for Report</Typography>
            <ThemeProvider theme={theme}>
                <Grid2 container spacing={2}>
                    <Grid2 xs={6}>
                        <FormControl fullWidth>
                            <InputLabel>Month</InputLabel>
                            <Select
                                value={month}
                                onChange={(e) => setMonth(e.target.value)}
                                label="Month"
                                variant="outlined"
                                MenuProps={{
                                    PaperProps: { style: { maxHeight: 200 } },
                                    anchorOrigin: { vertical: "bottom", horizontal: "left" },
                                    transformOrigin: { vertical: "top", horizontal: "left" },
                                }}
                            >
                                {months.map((m, index) => (
                                    <MenuItem key={index} value={m}>{m}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid2>
                    <Grid2 xs={6}>
                        <FormControl fullWidth>
                            <InputLabel>Year</InputLabel>
                            <Select
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                label="Year"
                                variant="outlined"
                                MenuProps={{
                                    PaperProps: { style: { maxHeight: 200 } },
                                    anchorOrigin: { vertical: "bottom", horizontal: "left" },
                                    transformOrigin: { vertical: "top", horizontal: "left" },
                                }}
                            >
                                {years.map((y, index) => (
                                    <MenuItem key={index} value={y}>{y}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid2>
                </Grid2>
            </ThemeProvider>
            <Button variant="contained" color="primary" onClick={generateReport} sx={{ mt: 3 }}>
                Generate Report
            </Button>
        </Box>
    );
};

export default ReportGenerator;
