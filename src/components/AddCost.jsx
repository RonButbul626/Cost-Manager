import React, { useState, useEffect } from "react";
import { TextField, Button, Paper, Grid, MenuItem, Box } from "@mui/material";

const AddCost = ({ db, setCosts, editingCost, setEditingCost }) => {
    const [sum, setSum] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");

    // 🎯 כאשר נבחר ערך לעריכה (editingCost), הטופס יתמלא אוטומטית
    useEffect(() => {
        if (editingCost) {
            setSum(editingCost.sum || "");
            setCategory(editingCost.category || "");
            setDescription(editingCost.description || "");
            setDate(editingCost.date || "");
        }
    }, [editingCost]);

    // 🎯 פונקציה להוספה או עדכון של הוצאה
    const addOrUpdateCosts = async () => {
        const newCost = { sum, category, description, date, id: editingCost?.id || Date.now() };

        await db.addOrUpdate("costs", newCost);

        setCosts((prev) =>
            editingCost ? prev.map(c => (c.id === newCost.id ? newCost : c)) : [...prev, newCost]
        );

        // 🎯 איפוס שדות לאחר שמירה
        setEditingCost(null);
        setSum("");
        setCategory("");
        setDescription("");
        setDate("");
    };

    return (
        <Paper sx={{ padding: 3, maxWidth: 500, margin: "auto", mt: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        label="Amount"
                        fullWidth
                        value={sum}
                        onChange={(e) => setSum(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        select
                        label="Category"
                        fullWidth
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <MenuItem value="Food">Food</MenuItem>
                        <MenuItem value="Transportation">Transportation</MenuItem>
                        <MenuItem value="Entertainment">Entertainment</MenuItem>
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Description"
                        fullWidth
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        type="date"
                        fullWidth
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={addOrUpdateCosts}
                        >
                            {editingCost ? "Update Expense" : "Add Expense"}
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default AddCost;
