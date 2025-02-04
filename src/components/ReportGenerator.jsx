import React, { useState, useEffect } from "react";
import "./ReportGenerator.css";

const ReportGenerator = ({ db, setFilteredCosts }) => {
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [filteredCosts, setLocalFilteredCosts] = useState([]); // Local state for filtered costs

    const handleGenerate = async () => {
        if (!month || !year) {
            alert("Please select both month and year.");
            return;
        }

        console.log(`Generating report for: Month=${month}, Year=${year}`);
        try {
            const allCosts = await db.getAll("costs");
            console.log("All costs retrieved:", allCosts);

            const filtered = allCosts.filter((cost) => {
                const costDate = new Date(cost.date);
                return (
                    costDate.getMonth() + 1 === parseInt(month, 10) &&
                    costDate.getFullYear() === parseInt(year, 10)
                );
            });

            setFilteredCosts(filtered); // Update filtered costs in the parent component
            setLocalFilteredCosts(filtered); // Update local state for this component
            console.log("Filtered costs:", filtered);
        } catch (error) {
            console.error("Error generating report:", error);
        }
    };

    // Ensure costs are always updated when filtered costs change
    useEffect(() => {
        console.log("Filtered costs updated:", filteredCosts);
        setFilteredCosts(filteredCosts); // Synchronize filtered costs with parent state
    }, [filteredCosts, setFilteredCosts]);

    return (
        <div className="report-generator-wrapper">
            {/* Report Form */}
            <div className="report-generator-container">
                <h2 className="title">View Report</h2>
                <div className="form-group">
                    <label className="label">Month:</label>
                    <select
                        className="select-input"
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                    >
                        <option value="">Select Month</option>
                        <option value="1">January</option>
                        <option value="2">February</option>
                        <option value="3">March</option>
                        <option value="4">April</option>
                        <option value="5">May</option>
                        <option value="6">June</option>
                        <option value="7">July</option>
                        <option value="8">August</option>
                        <option value="9">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                    </select>
                </div>
                <div className="form-group">
                    <label className="label">Year:</label>
                    <input
                        className="text-input"
                        type="number"
                        placeholder="Enter Year"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                    />
                </div>
                <button className="generate-button" onClick={handleGenerate}>
                    Generate Report
                </button>
            </div>

            {/* Report Table */}
            <div className="report-table-container">
                <h3 className="table-title">Filtered Costs</h3>
                <table className="filtered-table">
                    <thead>
                        <tr>
                            <th>Sum</th>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCosts.length > 0 ? (
                            filteredCosts.map((cost, index) => (
                                <tr key={index}>
                                    <td>{cost.sum}</td>
                                    <td>{cost.category}</td>
                                    <td>{cost.description}</td>
                                    <td>{new Date(cost.date).toLocaleDateString()}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="no-data">
                                    No costs to display.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReportGenerator;
