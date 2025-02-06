import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const DeleteItem = ({ costs, onDelete }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = () => {
        const foundItem = costs.find(
            (cost) => cost.description.toLowerCase().trim() === searchTerm.toLowerCase().trim()
        );

        if (!foundItem) {
            alert("The item does not exist.");
        }
    };

    return (
        <Box sx={{ textAlign: "center", width: "100%" }}>
            <TextField
                label="Enter item name"
                variant="outlined"
                fullWidth
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="contained" color="primary" fullWidth onClick={handleSearch} sx={{ mt: 2 }}>
                Search
            </Button>
        </Box>
    );
};

export default DeleteItem;
