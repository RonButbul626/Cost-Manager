import React, { useState, useEffect } from "react";
import AddCost from "./components/AddCost";
import ReportGenerator from "./components/ReportGenerator";
import ReportTable from "./components/ReportTable";
import PieChart from "./components/PieChart";
import DeleteItem from "./components/deleteItem"; // שים לב ל-camelCase
import { IndexedDBWrapper } from "./utils/indexedDBWrapper";

const db = new IndexedDBWrapper("ExpenseDB", 1);

const App = () => {
    const [costs, setCosts] = useState([]);
    const [filteredCosts, setFilteredCosts] = useState([]);
    const [categoryTotals, setCategoryTotals] = useState({});

    useEffect(() => {
        const initDB = async () => {
            await db.init([{ name: "costs", options: { keyPath: "id", autoIncrement: true } }]);
            const allCosts = await db.getAll("costs");
            setCosts(allCosts);
        };
        initDB();
    }, []);

    const addCost = async (cost) => {
        await db.add("costs", cost);
        alert("Cost added successfully!");
        setCosts((prev) => [...prev, cost]); // מעדכן את המערכת
    };


    // ✅ פונקציה להפקת דוח לפי חודש ושנה
    const generateReport = async (month, year) => {
        const allCosts = await db.getAll("costs");

        const filtered = allCosts.filter((cost) => {
            const costDate = new Date(cost.date);
            return (
                costDate.getMonth() + 1 === parseInt(month) &&
                costDate.getFullYear() === parseInt(year)
            );
        });

        if (filtered.length === 0) {
            alert("There are no products for the requested time.");
            return;
        }

        setFilteredCosts(filtered);

        const totals = filtered.reduce((acc, cost) => {
            acc[cost.category] = (acc[cost.category] || 0) + cost.sum;
            return acc;
        }, {});
        setCategoryTotals(totals);
    };

    const deleteCost = async (id) => {
        try {
            await db.delete("costs", id);  // ✅ קריאה לפונקציה החדשה
            setCosts((prev) => prev.filter((cost) => cost.id !== id));
            alert("The item has been successfully deleted.");
        } catch (error) {
            console.error("Error deleting item:", error);
            alert("An error occurred while deleting the item.");
        }
    };

    return (
        <div className="main-container">
            {/* אזור הטפסים בצד שמאל */}
            <div className="left-section">
                <div className="card">
                    <h2>Add New Cost</h2>
                    <AddCost onAdd={addCost} existingCosts={costs} />
                </div>

                {/* 📌 חלוקה לשני טורים - דוח ומחיקה */}
                <div className="report-container">
                    <div className="card report-section">
                        <h2>View Monthly Report</h2>
                        <ReportGenerator onGenerate={generateReport}/>
                    </div>

                    <div className="card delete-section">
                        <h2>Delete Item</h2>
                        <DeleteItem costs={costs} onDelete={deleteCost}/>
                    </div>
                </div>

                {filteredCosts.length > 0 && (
                    <div className="card">
                        <h2>Monthly Cost Report</h2>
                        <ReportTable costs={filteredCosts} />
                    </div>
                )}
            </div>

            {/* אזור הגרף בצד ימין */}
            <div className="right-section">
                {Object.keys(categoryTotals).length > 0 && (
                    <div className="card">
                        <h2>Category Breakdown</h2>
                        <PieChart data={categoryTotals} />
                    </div>
                )}
            </div>
        </div>
    );


};

export default App;
