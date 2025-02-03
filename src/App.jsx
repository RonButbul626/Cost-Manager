import React, { useState, useEffect } from "react";
import AddCost from "./components/AddCost";
import ReportGenerator from "./components/ReportGenerator";
import ReportTable from "./components/ReportTable";
import PieChart from "./components/PieChart";
import { IndexedDBWrapper } from "./utils/indexedDBWrapper";

const db = new IndexedDBWrapper("ExpenseDB", 1);

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
        await db.add("costs", cost);
        setCosts((prev) => [...prev, cost]);
    };

    const generateReport = async (month, year) => {
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
    };

    return (
        <div>
            <h1>Expense Tracker</h1>
        </div>
    );
};

export default App;
