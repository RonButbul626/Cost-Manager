// src/components/AddCost.jsx
import React, { useState } from "react";

const AddCost = ({ onAdd }) => {
    const [sum, setSum] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");

    const handleAdd = () => {
        if (!sum || !category || !description) {
            setStatus("Please fill in all fields.");
            return;
        }
        const newCost = {
            sum: parseFloat(sum),
            category,
            description,
            date: new Date().toISOString(),
        };
        onAdd(newCost);
        setStatus("Cost added successfully!");
        setSum("");
        setCategory("");
        setDescription("");
    };

    return (
        <div>
            <h2>Add New Cost</h2>
            <label>Sum:</label>
            <input
                type="number"
                value={sum}
                onChange={(e) => setSum(e.target.value)}
            />
            <label>Category:</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Select Category</option>
                {/* Add all categories here */}
                <option value="Fruits and vegetables">Fruits and vegetables</option>
                <option value="Dairy">Dairy</option>
                {/* Add remaining categories */}
            </select>
            <label>Description:</label>
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button onClick={handleAdd}>Add Cost</button>
            <p>{status}</p>
        </div>
    );
};

export default AddCost;
