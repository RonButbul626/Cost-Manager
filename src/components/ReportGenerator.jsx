// src/components/ReportGenerator.jsx
import React, { useState } from "react";

const ReportGenerator = ({ onGenerate }) => {
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");

    const handleGenerate = () => {
        onGenerate(month, year);
    };

    return (
        <div>
            <h2>View Monthly Report</h2>
            <label>Month:</label>
            <select value={month} onChange={(e) => setMonth(e.target.value)}>
                <option value="">Select Month</option>
                <option value="01">January</option>
                <option value="02">February</option>
                {/* Add remaining months */}
            </select>
            <label>Year:</label>
            <input
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
            />
            <button onClick={handleGenerate}>Generate Report</button>
        </div>
    );
};

export default ReportGenerator;
