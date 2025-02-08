const db = new VanillaIDB("ExpenseDB", 1);

document.addEventListener("DOMContentLoaded", async () => {
    await db.init([{ name: "costs", options: { keyPath: "id", autoIncrement: true } }]);

    const addForm = document.getElementById("add-cost-form");
    const costsTable = document.getElementById("costs-table").querySelector("tbody");
    const filterForm = document.getElementById("filter-form");
    const filteredCostsTable = document.getElementById("filtered-costs-table")?.querySelector("tbody");
    const pieChartCanvas = document.getElementById("pie-chart");

    let chartInstance = null;
    let editingCostId = null; // Track the cost being edited
    let currentFilteredMonth = null; // Track the currently filtered month
    let currentFilteredYear = null; // Track the currently filtered year

    /**
     * Renders the full costs table.
     */
    const renderCosts = async () => {
        const costs = await db.getAll("costs");
        costsTable.innerHTML = "";
        costs.forEach((cost) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${cost.id}</td>
                <td>${cost.sum}</td>
                <td>${cost.category}</td>
                <td>${cost.description}</td>
                <td>${cost.date}</td>
                <td>
                    <button onclick="deleteCost(${cost.id})">Delete</button>
                    <button onclick="editCost(${cost.id})">Edit</button>
                </td>
            `;
            costsTable.appendChild(row);
        });
    };

    /**
     * Renders the filtered costs table and updates the pie chart.
     */
    const renderFilteredCosts = async () => {
        const costs = await db.getAll("costs");
        const filteredCosts = costs.filter((cost) => {
            if (currentFilteredMonth && currentFilteredYear) {
                const costDate = new Date(cost.date);
                return (
                    costDate.getMonth() + 1 === parseInt(currentFilteredMonth, 10) &&
                    costDate.getFullYear() === parseInt(currentFilteredYear, 10)
                );
            }
            return false;
        });

        filteredCostsTable.innerHTML = "";
        filteredCosts.forEach((cost) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${cost.sum}</td>
                <td>${cost.category}</td>
                <td>${cost.description}</td>
                <td>${cost.date}</td>
            `;
            filteredCostsTable.appendChild(row);
        });

        updatePieChart(filteredCosts);
    };

    /**
     * Updates the pie chart based on the number of entries in each category.
     */
    const updatePieChart = (filteredCosts) => {
        const chartData = filteredCosts.reduce((acc, cost) => {
            acc[cost.category] = (acc[cost.category] || 0) + 1; // Count number of entries per category
            return acc;
        }, {});

        if (chartInstance) {
            chartInstance.destroy(); // Destroy existing chart before creating a new one
        }

        chartInstance = new Chart(pieChartCanvas.getContext("2d"), {
            type: "pie",
            data: {
                labels: Object.keys(chartData),
                datasets: [
                    {
                        data: Object.values(chartData),
                        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
                    },
                ],
            },
        });
    };

    /**
     * Deletes a cost and updates the tables and chart.
     */
    window.deleteCost = async (id) => {
        await db.delete("costs", id);
        renderCosts();
        renderFilteredCosts(); // Also update filtered costs if applicable
    };

    /**
     * Populates the form fields for editing a cost.
     */
    window.editCost = async (id) => {
        const cost = (await db.getAll("costs")).find((item) => item.id === id);
        if (cost) {
            editingCostId = id;
            document.getElementById("sum").value = cost.sum;
            document.getElementById("category").value = cost.category;
            document.getElementById("description").value = cost.description;
            document.getElementById("date").value = cost.date;
        }
    };

    /**
     * Handles form submission for adding or updating a cost.
     */
    addForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const sum = document.getElementById("sum").value;
        const category = document.getElementById("category").value;
        const description = document.getElementById("description").value;
        const date = document.getElementById("date").value;

        if (editingCostId) {
            // Update existing cost
            await db.put("costs", { id: editingCostId, sum: parseFloat(sum), category, description, date });
            editingCostId = null; // Reset editing mode
        } else {
            // Add new cost
            await db.add("costs", { sum: parseFloat(sum), category, description, date });
        }

        addForm.reset();
        await renderCosts();
        await renderFilteredCosts(); // Update filtered costs after addition
    });

    /**
     * Handles filtering costs by month and year.
     */
    filterForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        currentFilteredMonth = document.getElementById("filter-month").value;
        currentFilteredYear = document.getElementById("filter-year").value;

        await renderFilteredCosts();
    });

    // Initial rendering of all costs
    renderCosts();
});
