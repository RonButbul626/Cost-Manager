import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, MenuItem, Box, Typography } from "@mui/material";

const categories = [
    "Fruits and vegetables", "Dairy", "Bakery", "Meat and Seafood",
    "Beverages", "Packaged and Canned Goods", "Frozen Foods",
    "Snacks and Confectionery", "Personal Care and Household Items",
    "Health and Wellness", "Baby Products", "Pet Supplies",
    "Cooking and Baking Essentials", "Alcohol and Tobacco Products",
    "Ready-to-Eat and Prepared Foods", "Electronics", "Clothing and Footwear", "Others"
];

const AddCost = ({ db, setCosts, editingCost, setEditingCost, isEditing }) => {
    const [sum, setSum] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");

    useEffect(() => {
        if (editingCost) {
            setSum(editingCost.sum || "");
            setCategory(editingCost.category || "");
            setDescription(editingCost.description || "");
            setDate(editingCost.date || "");
        }
    }, [editingCost]);

    const checkIfProductExists = async (newCost) => {
        const allCosts = await db.getAll("costs");

        // If the product is being edited and the name has not changed
        if (isEditing && editingCost.description === newCost.description) {
            return false;
        }

        // Checking if the product already exists
        const existingProduct = allCosts.find(cost =>
            cost.description.toLowerCase() === newCost.description.toLowerCase()
        );

        if (existingProduct) {
            alert(`The product already exists:\n
                Name: ${existingProduct.description}\n
                Category: ${existingProduct.category}\n
                Price: ${existingProduct.sum}\n
                Date: ${existingProduct.date}`);
            return true;
        }
        return false;
    };

    const addOrUpdateCosts = async () => {
        // Checking if all fields are filled
        if (!sum || !category || !description || !date) {
            alert("All fields must be filled!");
            return;
        }

        if (sum < 1 || sum > 9999) {
            alert("The amount must be between 1 and 9999.");
            return;
        }

        const newCost = { sum, category, description, date, id: editingCost?.id || Date.now() };


        if ((isEditing || !editingCost) && await checkIfProductExists(newCost)) return;

        await db.addOrUpdate("costs", newCost);
        setCosts(prev =>
            editingCost ? prev.map(c => (c.id === newCost.id ? newCost : c)) : [...prev, newCost]
        );

        alert("Product added successfully!");
        setEditingCost(null);
        setSum("");
        setCategory("");
        setDescription("");
        setDate("");
    };

    return (
        <Box sx={{ maxWidth: 500, margin: "auto", mt: 3 }}>
            <Typography variant="h6" align="center">
                {editingCost ? "Edit Expense" : "Add an Expense"}
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        label="Amount"
                        fullWidth
                        type="number"
                        value={sum}
                        onChange={(e) => setSum(e.target.value)}
                        inputProps={{ min: 1, max: 9999, style: { textAlign: "right" } }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        select
                        label="Category"
                        fullWidth
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        SelectProps={{
                            MenuProps: {
                                PaperProps: {
                                    style: { maxHeight: 250 }
                                },
                                anchorOrigin: {
                                    vertical: "bottom",
                                    horizontal: "left"
                                },
                                transformOrigin: {
                                    vertical: "top",
                                    horizontal: "left"
                                }
                            }
                        }}
                    >
                        {categories.map(cat => (
                            <MenuItem key={cat} value={cat}>
                                {cat}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>

                <Grid item xs={12}>
                    <TextField label="Description" fullWidth value={description} onChange={(e) => setDescription(e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                    <TextField type="date" fullWidth value={date} onChange={(e) => setDate(e.target.value)} />
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Button variant="contained" color="primary" onClick={addOrUpdateCosts}>
                            {editingCost ? "Update Expense" : "Add Expense"}
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AddCost;
