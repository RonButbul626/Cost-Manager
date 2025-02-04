import React, { useState, useEffect } from "react";
import AddCost from "./components/AddCost";
import ReportGenerator from "./components/ReportGenerator";
import ReportTable from "./components/ReportTable";
import PieChart from "./components/PieChart";
import { Idb } from "./utils/Idb";

const db = new Idb("ExpenseDB", 1);

const App = () => {
    const [costs, setCosts] = useState([]);
    const [filteredCosts, setFilteredCosts] = useState([]);
    const [categoryTotals, setCategoryTotals] = useState({});

    useEffect(() => {
        const initDB = async () => {
            await db.init([{ name: "costs", options: { keyPath: "id", autoIncrement: true } }]);
        };
        initDB();
    }, []);

    const addCost = async (cost) => {
        try {
            await db.add("costs", cost);
            setCosts((prev) => [...prev, cost]);
        } catch (error) {
            console.error("Error adding cost:", error);
        }
    };

    const generateReport = async (month, year) => {
        try {
            const allCosts = await db.getAll("costs");
            const filtered = allCosts.filter((cost) => {
                const costDate = new Date(cost.date);
                return (
                    costDate.getMonth() + 1 === parseInt(month) &&
                    costDate.getFullYear() === parseInt(year)
                );
            });
            setFilteredCosts(filtered);

            const totals = filtered.reduce((acc, cost) => {
                acc[cost.category] = (acc[cost.category] || 0) + cost.sum;
                return acc;
            }, {});
            setCategoryTotals(totals);
        } catch (error) {
            console.error("Error generating report:", error);
        }
    };

    return (
        <div>
            <h1>Cost Manager</h1>
            {/* AddCost Component */}
            <AddCost onAdd={addCost} />
            {/* ReportGenerator, ReportTable, and PieChart can be added here later */}
        </div>
    );
};

export default App;
