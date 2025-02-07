import React, { useState } from "react";
import { TextField, Button, Grid, Box } from "@mui/material";

const ReportGenerator = ({ db, setFilteredCosts }) => {
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");

    const generateReport = async () => {
        const allCosts = await db.getAll("costs");
        const filtered = allCosts.filter(cost => {
            const costDate = new Date(cost.date);
            return (
                (!month || costDate.getMonth() + 1 === parseInt(month)) &&
                (!year || costDate.getFullYear() === parseInt(year))
            );
        });
        setFilteredCosts(filtered);
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <TextField
                    label="Month"
                    fullWidth
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    label="Year"
                    fullWidth
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                />
            </Grid>
            <Grid item xs={12}>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={generateReport}
                    >
                        Generate Report
                    </Button>
                </Box>
            </Grid>
        </Grid>
    );
};

export default ReportGenerator;
