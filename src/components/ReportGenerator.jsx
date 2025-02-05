import React, { useState } from "react";

const ReportGenerator = ({ onGenerate }) => {
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");

    const handleGenerate = (e) => {
        e.preventDefault();
        onGenerate(month, year);
    };

    return (
        <form onSubmit={handleGenerate}>
            <label>Month:</label>
            <select value={month} onChange={(e) => setMonth(e.target.value)} required>
                <option value="">Select Month</option>
                <option value="01">January</option>
                <option value="02">February</option>
                <option value="03">March</option>
                <option value="04">April</option>
                <option value="05">May</option>
                <option value="06">June</option>
                <option value="07">July</option>
                <option value="08">August</option>
                <option value="09">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
            </select>

            <label>Year:</label>
            <input type="number" value={year} onChange={(e) => setYear(e.target.value)} required />

            <button type="submit">Generate Report</button>
        </form>
    );
};

export default ReportGenerator;
