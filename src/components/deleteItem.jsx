import React, { useState } from "react";

const DeleteItem = ({ costs, onDelete }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedItem, setSelectedItem] = useState(null);

    const handleSearch = () => {
        const foundItem = costs.find(
            (cost) => cost.description.toLowerCase() === searchTerm.trim().toLowerCase()
        );

        if (!foundItem) {
            alert("The item does not exist.");
            setSelectedItem(null);
        } else {
            setSelectedItem(foundItem);
        }
    };

    const handleDelete = () => {
        if (!selectedItem) return;

        const confirmDelete = window.confirm(
            `Are you sure you want to delete the item "${selectedItem.description}"?`
        );

        if (confirmDelete) {
            onDelete(selectedItem.id);
            alert("The item has been successfully deleted.");
            setSelectedItem(null);
            setSearchTerm("");
        }
    };

    return (
        <div className="delete-section">
            <input
                type="text"
                placeholder="Enter item name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>

            {selectedItem && (
                <div className="delete-item-details">
                    <table>
                        <thead>
                        <tr>
                            <th>Sum</th>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{selectedItem.sum}</td>
                            <td>{selectedItem.category}</td>
                            <td>{selectedItem.description}</td>
                            <td>{new Date(selectedItem.date).toLocaleDateString()}</td>
                        </tr>
                        </tbody>
                    </table>
                    <button className="delete-button" onClick={handleDelete}>Delete</button>
                </div>
            )}
        </div>
    );
};

export default DeleteItem;
