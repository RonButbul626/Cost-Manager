import React, { useState } from "react";
import "./ReportTable.css";

const ReportTable = ({ costs, setCosts, setEditingCost, db }) => {
    const [selectedRows, setSelectedRows] = useState([]);

    const toggleRowSelection = (index) => {
        setSelectedRows((prevSelected) =>
            prevSelected.includes(index)
                ? prevSelected.filter((row) => row !== index)
                : [...prevSelected, index]
        );
    };

    const toggleSelectAll = () => {
        if (selectedRows.length === costs.length) {
            setSelectedRows([]);
        } else {
            setSelectedRows(costs.map((_, index) => index));
        }
    };

    const handleDelete = async () => {
        try {
            const toDelete = selectedRows.map((index) => costs[index]);
            console.log("Items to delete:", toDelete);

            for (const cost of toDelete) {
                await db.delete("costs", cost.id);
            }

            const updatedCosts = costs.filter((_, index) => !selectedRows.includes(index));
            setCosts(updatedCosts);
            setSelectedRows([]);
            console.log("Items deleted successfully.");
        } catch (error) {
            console.error("Error deleting items:", error);
        }
    };

    const handleEdit = () => {
        const selectedCost = costs[selectedRows[0]];
        console.log("Setting cost for editing:", selectedCost);
        setEditingCost(selectedCost);
    };

    return (
        <div className="report-table-wrapper">
            <h2 className="table-title">Cost Report Table</h2>
            <table>
                <thead>
                    <tr>
                        <th>
                            <input
                                type="checkbox"
                                checked={selectedRows.length === costs.length && costs.length > 0}
                                onChange={toggleSelectAll}
                            />
                        </th>
                        <th>Sum</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {costs.length > 0 ? (
                        costs.map((cost, index) => (
                            <tr
                                key={index}
                                className={selectedRows.includes(index) ? "selected-row" : ""}
                            >
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={selectedRows.includes(index)}
                                        onChange={() => toggleRowSelection(index)}
                                    />
                                </td>
                                <td>{cost.sum}</td>
                                <td>{cost.category}</td>
                                <td>{cost.description}</td>
                                <td>{new Date(cost.date).toLocaleDateString()}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="no-data">
                                No costs to display
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className="button-container">
                <button
                    className="delete-button"
                    onClick={handleDelete}
                    disabled={selectedRows.length === 0}
                >
                    Delete Selected
                </button>
                <button
                    className="edit-button"
                    onClick={handleEdit}
                    disabled={selectedRows.length !== 1}
                >
                    Edit Selected
                </button>
            </div>
        </div>
    );
};

export default ReportTable;
