import React, { useState, useEffect } from "react";
import AddCost from "./components/AddCost";
import ReportTable from "./components/ReportTable";
import ReportGenerator from "./components/ReportGenerator";
import PieChart from "./components/PieChart";
import { Idb } from "./utils/Idb";
import { Container, Typography, Paper } from "@mui/material";

const db = new Idb("ExpenseDB", 1);

const App = () => {
    const [costs, setCosts] = useState([]);
    const [editingCost, setEditingCost] = useState(null);
    const [filteredCosts, setFilteredCosts] = useState([]);

    useEffect(() => {
        const initDB = async () => {
            await db.init([{ name: "costs", options: { keyPath: "id", autoIncrement: true } }]);
            const existingCosts = await db.getAll("costs");
            setCosts(existingCosts);
        };
        initDB();
    }, []);

    return (
        <Container maxWidth="md">
            <Typography variant="h4" component="h1" align="center" gutterBottom>
                Cost Manager
            </Typography>

            {/* 📌 הוספנו רק Paper, בלי Box מסביב */}
            <Paper sx={{ p: 3, mb: 3 }}>
                <AddCost
                    db={db}
                    setCosts={setCosts}
                    editingCost={editingCost}
                    setEditingCost={setEditingCost}
                />
            </Paper>

            <Paper sx={{ p: 3, mb: 3 }}>
                <ReportGenerator
                    db={db}
                    setFilteredCosts={setFilteredCosts}
                />
            </Paper>

            <Paper sx={{ p: 3, mb: 3 }}>
                <ReportTable
                    costs={filteredCosts.length > 0 ? filteredCosts : costs}
                    setCosts={setCosts}
                    setEditingCost={setEditingCost}
                    db={db}
                />
            </Paper>

            <Paper sx={{ p: 3, mb: 3 }}>
                <PieChart costs={filteredCosts.length > 0 ? filteredCosts : costs} />
            </Paper>
        </Container>
    );
};

export default App;
