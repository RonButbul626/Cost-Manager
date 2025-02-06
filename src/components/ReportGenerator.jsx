import React, { useState } from "react";
import "./ReportGenerator.css";

const ReportGenerator = ({ db, setFilteredCosts }) => {
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [filteredCosts, setLocalFilteredCosts] = useState([]);
    const [reportTitle, setReportTitle] = useState("Filtered Costs");

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

            // Sort the filtered costs by category, then by date
            const sortedFilteredCosts = filtered.sort((a, b) => {
                if (a.category.localeCompare(b.category) === 0) {
                    return new Date(a.date) - new Date(b.date); // Sort by date if categories match
                }
                return a.category.localeCompare(b.category); // Otherwise, sort by category
            });

            // Update filtered costs and title
            setFilteredCosts(sortedFilteredCosts);
            setLocalFilteredCosts(sortedFilteredCosts);
            setReportTitle(`Filtered Costs: ${monthName(month)} ${year}`);
            console.log("Filtered costs:", sortedFilteredCosts);
        } catch (error) {
            console.error("Error generating report:", error);
        }
    };

    // Utility function to get the month name
    const monthName = (monthNumber) => {
        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];
        return months[parseInt(monthNumber, 10) - 1] || "";
    };

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
                <h3 className="table-title">{reportTitle}</h3>
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
