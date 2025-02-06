import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const categories = [
    "Fruits and vegetables", "Dairy", "Bakery", "Meat and Seafood",
    "Beverages", "Packaged and Canned Goods", "Frozen Foods",
    "Snacks and Confectionery", "Personal Care and Household Items",
    "Health and Wellness", "Baby Products", "Pet Supplies",
    "Cooking and Baking Essentials", "Alcohol and Tobacco Products",
    "Ready-to-Eat and Prepared Foods"
];

const AddCost = ({ onAdd }) => {
    const [sum, setSum] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");

    const handleAddCost = () => {
        if (!sum || !category || !description) {
            alert("Please fill in all fields.");
            return;
        }

        const sumValue = parseFloat(sum);
        if (sumValue < 1 || sumValue > 9999) {
            alert("Sum must be between 1 and 9999.");
            return;
        }

        const newCost = {
            sum: sumValue,
            category,
            description,
            date: new Date().toISOString(),
        };

        onAdd(newCost);
        setSum("");
        setCategory("");
        setDescription("");
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h5" align="center" gutterBottom>
                Add New Cost
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField
                    label="Sum"
                    type="number"
                    inputProps={{ min: 1, max: 9999 }}
                    variant="outlined"
                    fullWidth
                    value={sum}
                    onChange={(e) => setSum(e.target.value)}
                />
                <TextField
                    select
                    label="Category"
                    variant="outlined"
                    fullWidth
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    {categories.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    label="Description"
                    variant="outlined"
                    fullWidth
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <Button variant="contained" color="primary" fullWidth onClick={handleAddCost}>
                    Add Cost
                </Button>
            </Box>
        </Box>
    );
}

export default AddCost;
