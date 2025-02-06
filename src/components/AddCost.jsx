import React, { useState, useEffect } from "react";
import "./AddCost.css";

const AddCost = ({ db, setCosts, editingCost, setEditingCost, filteredCosts, setFilteredCosts }) => {
    const [sum, setSum] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");

    useEffect(() => {
        if (editingCost) {
            console.log("Editing cost loaded:", editingCost);
            setSum(editingCost.sum || "");
            setCategory(editingCost.category || "");
            setDescription(editingCost.description || "");
            setDate(editingCost.date || "");
        }
    }, [editingCost]);

    const addOrUpdateCosts = async (newCost) => {
        try {
            if (newCost.id) {
                // Update existing cost
                console.log("Updating cost:", newCost);
                await db.addOrUpdate("costs", newCost);
                setCosts((prev) =>
                    prev.map((cost) => (cost.id === newCost.id ? newCost : cost))
                );
            } else {
                // Add new cost
                console.log("Adding new cost:", newCost);
                const id = await db.addOrUpdate("costs", newCost); // `id` will be automatically handled by IndexedDB
                setCosts((prev) => [...prev, { ...newCost, id }]);
            }

            if (filteredCosts.length > 0) {
                setFilteredCosts((prev) =>
                    prev.map((cost) =>
                        cost.id === newCost.id ? newCost : cost
                    )
                );
            }
        } catch (error) {
            console.error("Error adding/updating cost:", error);
        }
    };

    const handleAddOrEdit = () => {
        if (!sum || !category || !description || !date) {
            alert("Please fill in all fields.");
            return;
        }

        const newCost = {
            id: editingCost ? editingCost.id : undefined,
            sum: parseFloat(sum),
            category,
            description,
            date,
        };

        addOrUpdateCosts(newCost);

        setSum("");
        setCategory("");
        setDescription("");
        setDate("");
        setEditingCost(null);
    };

    return (
        <div className="add-cost-container">
            <h2>{editingCost ? "Edit Cost" : "Add New Cost"}</h2>
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
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
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
            <div className="form-group">
                <label>Date:</label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </div>
            <button className="add-button" onClick={handleAddOrEdit}>
                {editingCost ? "Update Cost" : "Add Cost"}
            </button>
        </div>
    );
};

export default AddCost;
