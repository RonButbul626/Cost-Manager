// src/components/AddCost.jsx
import React, { useState } from "react";
import "./AddCost.css"; // Import the CSS file

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
        <div className="add-cost-container">
            <h2>Add New Cost</h2>
            <div className="form-group">
                <label>Sum:</label>
                <input
                    type="number"
                    value={sum}
                    onChange={(e) => setSum(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Category:</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="">Select Category</option>
                    <option value="Fruits and vegetables">Fruits and vegetables</option>
                    <option value="Dairy">Dairy</option>
                    <option value="Transportation">Transportation</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Entertainment">Entertainment</option>
                </select>
            </div>
            <div className="form-group">
                <label>Description:</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <button className="add-button" onClick={handleAdd}>Add Cost</button>
            <p className="status-message">{status}</p>
        </div>
    );
};

export default AddCost;
