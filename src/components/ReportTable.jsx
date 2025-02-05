import React from "react";

const ReportTable = ({ costs }) => {
    return (
        <div>

            {costs.length === 0 ? (
                <p>No data available for this report.</p>
            ) : (
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                    <tr style={{ backgroundColor: "#f2f2f2", textAlign: "left" }}>
                        <th style={{ padding: "10px", border: "1px solid #ddd" }}>Sum</th>
                        <th style={{ padding: "10px", border: "1px solid #ddd" }}>Category</th>
                        <th style={{ padding: "10px", border: "1px solid #ddd" }}>Description</th>
                        <th style={{ padding: "10px", border: "1px solid #ddd" }}>Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {costs.map((cost, index) => (
                        <tr key={index} style={{ borderBottom: "1px solid #ddd" }}>
                            <td style={{ padding: "10px", border: "1px solid #ddd" }}>{cost.sum}</td>
                            <td style={{ padding: "10px", border: "1px solid #ddd" }}>{cost.category}</td>
                            <td style={{ padding: "10px", border: "1px solid #ddd" }}>{cost.description}</td>
                            <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                                {new Date(cost.date).toLocaleDateString()}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ReportTable;
