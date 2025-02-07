import React, { useState } from "react";
import { TextField, Button, Grid, MenuItem, Box, Typography } from "@mui/material";

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const years = Array.from({ length: 26 }, (_, i) => 2000 + i); //  שנים מ-2000 עד 2025


const ReportGenerator = ({ db, setFilteredCosts }) => {
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
        setFilteredCosts(filtered);
    };

    return (
        <Box sx={{ maxWidth: 500, margin: "auto", mt: 3 }}>
            <Typography variant="h6" align="center">
                Generate Report
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        select
                        label="Month"
                        fullWidth
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                        SelectProps={{
                            MenuProps: {
                                PaperProps: {
                                    style: { maxHeight: 250 } // ✅ מציג עד 6 ערכים עם גלילה
                                }
                            }
                        }}
                    >
                        {months.map(m => (
                            <MenuItem key={m} value={m}>
                                {m}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>

                <Grid item xs={6}>
                    <TextField
                        select
                        label="Year"
                        fullWidth
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        SelectProps={{
                            MenuProps: {
                                PaperProps: {
                                    style: { maxHeight: 250 } // ✅ מציג עד 6 ערכים עם גלילה
                                }
                            }
                        }}
                    >
                        {years.map(y => (
                            <MenuItem key={y} value={y}>
                                {y}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>

                <Grid item xs={12}>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Button variant="contained" color="primary" onClick={generateReport}>
                            Generate Report
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ReportGenerator;
