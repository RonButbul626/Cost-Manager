import { IndexedDBWrapper } from './utils/indexedDBWrapper.js';
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Chart from "chart.js/auto";



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

// Initialize IndexedDB
const db = new IndexedDBWrapper("ExpenseDB", 1);
await db.init([{ name: "costs", options: { keyPath: "id", autoIncrement: true } }]);

// DOM Elements
const addSum = document.getElementById("addSum");
const addCategory = document.getElementById("addCategory");
const addDescription = document.getElementById("addDescription");
const addButton = document.getElementById("addButton");
const addStatus = document.getElementById("addStatus");

const reportMonth = document.getElementById("reportMonth");
const reportYear = document.getElementById("reportYear");
const generateReportButton = document.getElementById("generateReportButton");
const reportOutput = document.getElementById("reportOutput");

const costPieChart = document.getElementById("costPieChart");

// Add a new cost
addButton.addEventListener("click", async () => {
    const sum = parseFloat(addSum.value);
    const category = addCategory.value.trim();
    const description = addDescription.value.trim();

    if (!sum || !category || !description) {
        addStatus.innerText = "Please fill in all fields.";
        return;
    }

    const newCost = {
        sum,
        category,
        description,
        date: new Date().toISOString(), // Save the current date
    };

    try {
        await db.add("costs", newCost);
        addStatus.innerText = "Cost added successfully!";
        addSum.value = "";
        addCategory.value = "";
        addDescription.value = "";
    } catch (error) {
        addStatus.innerText = `Error adding cost: ${error.message}`;
    }
});

// Generate a detailed monthly report
generateReportButton.addEventListener("click", async () => {
    const month = reportMonth.value;
    const year = reportYear.value;

    if (!month || !year) {
        reportOutput.innerText = "Please select both month and year.";
        return;
    }

    try {
        const allCosts = await db.getAll("costs");
        const filteredCosts = allCosts.filter((cost) => {
            const costDate = new Date(cost.date);
            return (
                costDate.getMonth() + 1 === parseInt(month) && costDate.getFullYear() === parseInt(year)
            );
        });

        //reportOutput.innerText = JSON.stringify(filteredCosts, null, 2);

        // Generate table
        populateTable(filteredCosts);

        // Generate pie chart
        const categoryTotals = filteredCosts.reduce((totals, cost) => {
            totals[cost.category] = (totals[cost.category] || 0) + cost.sum;
            return totals;
        }, {});

        generatePieChart(categoryTotals);
    } catch (error) {
        reportOutput.innerText = `Error generating report: ${error.message}`;
    }
});

// Populate the table
function populateTable(costs) {
    const tableBody = document.getElementById("costTable").querySelector("tbody");
    tableBody.innerHTML = ""; // Clear existing rows

    costs.forEach((cost) => {
        const row = document.createElement("tr");
        row.innerHTML = `
      <td>${cost.sum}</td>
      <td>${cost.category}</td>
      <td>${cost.description}</td>
      <td>${new Date(cost.date).toLocaleDateString()}</td>
    `;
        tableBody.appendChild(row);
    });
}


// Generate the pie chart
function generatePieChart(data) {
    const ctx = costPieChart.getContext("2d");
    const categories = Object.keys(data);
    const totals = Object.values(data);

    new Chart(ctx, {
        type: "pie",
        data: {
            labels: categories,
            datasets: [
                {
                    label: "Costs by Category",
                    data: totals,
                    backgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
                        "#4BC0C0",
                        "#9966FF",
                        "#FF9F40",
                    ],
                },
            ],
        },
    });
}
