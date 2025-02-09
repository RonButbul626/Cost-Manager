import React, { useState } from "react";
import {TextField, Button, MenuItem, Box, Typography, Grid2, Select} from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
//import Grid from '@mui/material/Unstable_Grid2';

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
                    // all grids under this theme will apply
                    // negative margin on the top and left sides.
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
                    <Grid2 xs={6}> {/* ✅ אין צורך ב-item */}
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
                    </Grid2>
                    <Grid2 xs={6}> {/* ✅ אין צורך ב-item */}
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
                            {years.map((y, index) => (
                                <MenuItem key={index} value={y}>{y}</MenuItem>
                            ))}
                        </TextField>
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
