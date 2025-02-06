import React, { useState, useEffect } from "react";
import AddCost from "./components/AddCost";
import ReportGenerator from "./components/ReportGenerator";
import ReportTable from "./components/ReportTable";
import PieChart from "./components/PieChart";
import DeleteItem from "./components/deleteItem";
import { IndexedDBWrapper } from "./utils/indexedDBWrapper";
import { Container, Grid, Card, CardContent, Typography } from "@mui/material";

const db = new IndexedDBWrapper("ExpenseDB", 1);

const App = () => {
    const [costs, setCosts] = useState([]);
    const [filteredCosts, setFilteredCosts] = useState([]);
    const [categoryTotals, setCategoryTotals] = useState({});

    const generateReport = (month, year) => {
        const filtered = costs.filter((cost) => {
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
        setCategoryTotals(
            filtered.reduce((acc, cost) => {
                acc[cost.category] = (acc[cost.category] || 0) + cost.sum;
                return acc;
            }, {})
        );
    };

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

    const deleteCost = async (id) => {
        try {
            await db.delete("costs", id);
            setCosts((prev) => prev.filter((cost) => cost.id !== id));
            alert("The item has been successfully deleted.");
        } catch (error) {
            console.error("Error deleting item:", error);
            alert("An error occurred while deleting the item.");
        }
    };

    return (
        <Container>
            <Typography variant="h3" align="center" gutterBottom>
                Expense Tracker
            </Typography>

            <Card sx={{ marginBottom: 3, padding: 2 }}>
                <CardContent>
                    <AddCost onAdd={addCost} existingCosts={costs} />
                </CardContent>
            </Card>


            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Card sx={{ padding: 2, height: "100%" }}> {/* גובה מלא */}
                        <CardContent>
                            <Typography variant="h5" gutterBottom>
                                View Monthly Report
                            </Typography>
                            <ReportGenerator onGenerate={(month, year) => generateReport(month, year)} />
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Card sx={{ padding: 2, height: "100%" }}> {/* גובה מלא */}
                        <CardContent>
                            <Typography variant="h5" gutterBottom>
                                Delete Item
                            </Typography>
                            <DeleteItem costs={costs} onDelete={deleteCost} />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* דוח חודשי */}
            {filteredCosts.length > 0 && (
                <Card sx={{ marginTop: 3, padding: 2 }}>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            Monthly Cost Report
                        </Typography>
                        <ReportTable costs={filteredCosts} />
                    </CardContent>
                </Card>
            )}

            {/* גרף דוחות לפי קטגוריות */}
            {Object.keys(categoryTotals).length > 0 && (
                <Card sx={{ marginTop: 3, padding: 2 }}>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            Category Breakdown
                        </Typography>
                        <PieChart data={categoryTotals} />
                    </CardContent>
                </Card>
            )}
        </Container>
    );
};

export default App;
