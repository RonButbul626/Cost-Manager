import React, { useState, useEffect } from "react";
import AddCost from "./components/AddCost";
import ReportTable from "./components/ReportTable";
import ReportGenerator from "./components/ReportGenerator";
import PieChart from "./components/PieChart";
import { Idb } from "./utils/Idb";
import { Container, Typography, Box, Paper } from "@mui/material";

const db = new Idb("ExpenseDB", 1);

const App = () => {
    const [costs, setCosts] = useState([]);
    const [editingCost, setEditingCost] = useState(null);
    const [reportData, setReportData] = useState(null);
    const [reportTitle, setReportTitle] = useState("Filtered Report");

    useEffect(() => {
        const initDB = async () => {
            await db.init([{ name: "costs", options: { keyPath: "id", autoIncrement: true } }]);
            const existingCosts = await db.getAll("costs");
            setCosts(existingCosts);
        };
        initDB();
    }, []);

    return (
        <Container maxWidth="xl" sx={{ padding: 2, overflowX: "hidden" }}>

            <Box
                sx={{
                    backgroundColor: "#1976d2",
                    color: "white",
                    textAlign: "left",
                    padding: "16px 0",
                    paddingLeft: "20px",
                    borderRadius: "0",
                    boxShadow: 3,
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    zIndex: 1000,
                }}
            >
                <Typography variant="h4">Cost Manager</Typography>
            </Box>

            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 3fr", gridTemplateRows: "auto auto", gap: 4, alignItems: "stretch", mt: 14 }}>
                <Paper sx={{ p: 3, boxShadow: 3, maxWidth: "90%" }}>
                    <AddCost db={db} setCosts={setCosts} editingCost={editingCost} setEditingCost={setEditingCost} />
                </Paper>
                <Paper sx={{ p: 3, boxShadow: 3, maxHeight: 500, overflowY: "auto", width: "100%" }}>
                    <ReportTable costs={costs} setCosts={setCosts} setEditingCost={setEditingCost} db={db} />
                </Paper>
                <Paper sx={{ p: 3, boxShadow: 3, maxWidth: "90%" }}>
                    <ReportGenerator db={db} setReportData={setReportData} setReportTitle={setReportTitle} />
                </Paper>
                <Paper sx={{ p: 3, boxShadow: 3, width: "100%", maxHeight: 500 }}>
                    <PieChart costs={reportData || costs} />
                </Paper>
            </Box>

            <Box sx={{ display: "grid", gridTemplateColumns: "1fr", gap: 4, mt: 4 }}>
                <Paper sx={{ p: 3, boxShadow: 3, maxWidth: "90%", margin: "auto" }}>
                    <Typography variant="h6" align="center" sx={{ mb: 2 }}>{reportTitle}</Typography>
                    {reportData && reportData.length > 0 ? (
                        <ReportTable costs={reportData} setCosts={setCosts} setEditingCost={setEditingCost} db={db} />
                    ) : (
                        <Typography align="center">No report generated yet</Typography>
                    )}
                </Paper>
            </Box>

        </Container>
    );
};

export default App;
