import React, { useState } from "react";
import { TextField, Button, Card, CardContent, Typography, Grid, Box } from "@mui/material";

const ReportGenerator = ({ db, setFilteredCosts }) => {
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");

    const handleGenerate = async () => {
        if (!month || !year) {
            alert("Please select both month and year.");
            return;
        }

        try {
            const allCosts = await db.getAll("costs");

            const filtered = allCosts.filter((cost) => {
                const costDate = new Date(cost.date);
                return (
                    costDate.getMonth() + 1 === parseInt(month, 10) &&
                    costDate.getFullYear() === parseInt(year, 10)
                );
            });

            setFilteredCosts(filtered);
        } catch (error) {
            console.error("Error generating report:", error);
        }
    };

    return (
        <Card sx={{ maxWidth: 500, margin: "auto", mt: 3 }}>
            <CardContent>
                <Typography variant="h6" align="center" gutterBottom>
                    Generate Expense Report
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            label="Month"
                            type="number"
                            fullWidth
                            value={month}
                            onChange={(e) => setMonth(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Year"
                            type="number"
                            fullWidth
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                            <Button variant="contained" color="primary" onClick={handleGenerate}>
                                Generate Report
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default ReportGenerator;
