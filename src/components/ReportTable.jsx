// src/components/reportTable.jsx
import React from "react";

const reportTable = ({ costs }) => {
    return (
        <div>
            <h2>Monthly Cost Report</h2>
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
                {costs.map((cost, index) => (
                    <tr key={index}>
                        <td>{cost.sum}</td>
                        <td>{cost.category}</td>
                        <td>{cost.description}</td>
                        <td>{new Date(cost.date).toLocaleDateString()}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default reportTable;
