import React, { useState, useEffect } from "react";
import AddCost from "./components/AddCost";
import ReportTable from "./components/ReportTable";
import ReportGenerator from "./components/ReportGenerator";
import PieChart from "./components/PieChart";
import { Idb } from "./utils/Idb";
import "./App.css";

const db = new Idb("ExpenseDB", 1);

const App = () => {
    const [costs, setCosts] = useState([]); // All costs
    const [editingCost, setEditingCost] = useState(null);
    const [filteredCosts, setFilteredCosts] = useState([]);

    useEffect(() => {
        const initDB = async () => {
            console.log("Initializing DB in App...");
            await db.init([{ name: "costs", options: { keyPath: "id", autoIncrement: true } }]);
            const existingCosts = await db.getAll("costs");
            setCosts(existingCosts);
            console.log("Loaded costs:", existingCosts);
        };
        initDB();
    }, []);

    const pieChartData = filteredCosts.length > 0
        ? filteredCosts.reduce((acc, cost) => {
              acc[cost.category] = (acc[cost.category] || 0) + 1;
              return acc;
          }, {})
        : {};

    return (
        <div className="app-container">
            <h1 className="app-title">Cost Manager</h1>
            <AddCost
                db={db}
                setCosts={setCosts}
                editingCost={editingCost}
                setEditingCost={setEditingCost}
                filteredCosts={filteredCosts}
                setFilteredCosts={setFilteredCosts}
            />
            <ReportTable
                costs={costs}
                setCosts={setCosts}
                setEditingCost={setEditingCost}
                db={db}
            />
            <ReportGenerator
                db={db}
                setFilteredCosts={setFilteredCosts}
                setCosts={setCosts}
            />
            <PieChart data={pieChartData} />
        </div>
    );
};

export default App;
