import React, { useState, useEffect } from "react";
import AddCost from "./components/AddCost";
import ReportTable from "./components/ReportTable";
import ReportGenerator from "./components/ReportGenerator";
import DetailedReport from "./components/DetailedReport"; // ✅ הוספת הקומפוננטה החדשה
import PieChart from "./components/PieChart";
import { Idb } from "./utils/Idb";
import { Container, Typography, Box, Paper } from "@mui/material";

const db = new Idb("ExpenseDB", 1);

const App = () => {
    const [costs, setCosts] = useState([]);
    const [editingCost, setEditingCost] = useState(null);
    const [filteredCosts, setFilteredCosts] = useState([]);
    const [reportData, setReportData] = useState(null); // ✅ משתנה לניהול הדוח הנפרד

    useEffect(() => {
        const initDB = async () => {
            await db.init([{ name: "costs", options: { keyPath: "id", autoIncrement: true } }]);
            const existingCosts = await db.getAll("costs");
            setCosts(existingCosts);
        };
        initDB();
    }, []);

    // ✅ בדיקה האם הנתונים מתקבלים כמו שצריך
    useEffect(() => {
        console.log("Updated reportData:", reportData);
    }, [reportData]);

    return (
        <Container maxWidth="xl" sx={{ padding: 2, overflowX: "hidden" }}>

            {/* 🟦 כותרת ראשית - מוצמד לחלק העליון */}
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

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 3fr",
                    gridTemplateRows: "auto auto",
                    gap: 2,
                    alignItems: "stretch",
                    mt: 10,
                }}
            >
                {/* 🟩 AddCost בצד שמאל קטן יותר */}
                <Paper sx={{ p: 2, boxShadow: 3, maxWidth: "90%" }}>
                    <AddCost db={db} setCosts={setCosts} editingCost={editingCost} setEditingCost={setEditingCost} />
                </Paper>

                {/* 🟦 ReportTable רחב יותר */}
                <Paper sx={{ p: 2, boxShadow: 3, maxHeight: 500, overflowY: "auto", width: "100%" }}>
                    <ReportTable costs={filteredCosts.length > 0 ? filteredCosts : costs} setCosts={setCosts} setEditingCost={setEditingCost} db={db} />
                </Paper>

                {/* 🟨 GenerateReport - ממורכז לשמאל */}
                <Paper sx={{ p: 2, boxShadow: 3, maxWidth: "90%" }}>
                    <ReportGenerator db={db} setFilteredCosts={setFilteredCosts} setReportData={setReportData} />
                    {/* ✅ מעביר את `setReportData` כדי לעדכן את הדוח הנפרד */}
                </Paper>

                {/* 🔵 PieChart רחב יותר */}
                <Paper sx={{ p: 2, boxShadow: 3, width: "100%", maxHeight: 500 }}>
                    <PieChart costs={filteredCosts.length > 0 ? filteredCosts : costs} />
                </Paper>
            </Box>

            {/* 🟠 הוספת DetailedReport בנפרד למטה */}
            <DetailedReport reportData={reportData} />
        </Container>
    );
};

export default App;
