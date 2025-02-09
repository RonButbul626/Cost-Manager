import React, { useState } from "react";
import { TextField, Button, Grid, MenuItem, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const years = Array.from({ length: 26 }, (_, i) => 2000 + i); //  שנים מ-2000 עד 2025

const ReportGenerator = ({ db, setFilteredCosts }) => {
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [reportData, setReportData] = useState(null);

    const generateReport = async () => {
        const allCosts = await db.getAll("costs");
        const filtered = allCosts.filter(cost => {
            const costDate = new Date(cost.date);
            return (
                (!month || costDate.getMonth() === months.indexOf(month)) &&
                (!year || costDate.getFullYear() === parseInt(year))
            );
        });
        setReportData(filtered);
    };

    return (
        <>
            <Box>
                <Typography variant="h6" align="center" sx={{ mb: 2 }}>Select Month and Year for Report</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            select
                            label="Month"
                            value={month}
                            onChange={(e) => setMonth(e.target.value)}
                            fullWidth
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
                        >
                            {years.map((y) => (
                                <MenuItem key={y} value={y}>{y}</MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                </Grid>
                <Button variant="contained" color="primary" onClick={generateReport} sx={{ mt: 2 }}>
                    Generate Report
                </Button>
            </Box>

            {reportData && (
                <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
                    <TableContainer component={Paper} sx={{ width: "80%" }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell><b>Name</b></TableCell>
                                    <TableCell><b>Amount</b></TableCell>
                                    <TableCell><b>Date</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {reportData.length > 0 ? (
                                    reportData.map((cost, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{cost.name}</TableCell>
                                            <TableCell>${cost.amount}</TableCell>
                                            <TableCell>{cost.date}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={3} align="center">No data found</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            )}
        </>
    );
};

export default ReportGenerator;