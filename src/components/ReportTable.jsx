import React, { useState } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Checkbox, Box, Button, Paper } from "@mui/material";
import "./ReportTable.css";

const ReportTable = ({ costs, setCosts, setEditingCost, db }) => {
    const [selectedRows, setSelectedRows] = useState([]);

    const toggleRowSelection = (index) => {
        setSelectedRows((prevSelected) =>
            prevSelected.includes(index)
                ? prevSelected.filter((row) => row !== index)
                : [...prevSelected, index]
        );
    };

    const toggleSelectAll = () => {
        setSelectedRows(selectedRows.length === costs.length ? [] : costs.map((_, index) => index));
    };

    const handleDelete = async () => {
        if (selectedRows.length === 0) return;

        // 🎯 הצגת הודעת אישור לפני המחיקה
        const confirmDelete = window.confirm("Are you sure you want to delete?");
        if (!confirmDelete) return; // אם המשתמש לחץ "לא", אין מחיקה

        try {
            const toDelete = selectedRows.map((index) => costs[index]);

            for (const cost of toDelete) {
                await db.delete("costs", cost.id);
            }

            setCosts((prev) => prev.filter((_, index) => !selectedRows.includes(index)));
            setSelectedRows([]);
        } catch (error) {
            console.error("Error deleting items:", error);
        }
    };

    const handleEdit = () => {
        if (setEditingCost && selectedRows.length === 1) {
            const selectedCost = costs[selectedRows[0]];
            console.log("Setting cost for editing:", selectedCost);
            setEditingCost(selectedCost); // ✅ עכשיו הוא ישלח גם את הנתון ל-AddCost
        }
    };


    return (
        <TableContainer component={Paper} sx={{ maxHeight: 500, overflowY: "auto", width: "100%" }}>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell padding="checkbox">
                            <Checkbox
                                indeterminate={selectedRows.length > 0 && selectedRows.length < costs.length}
                                checked={selectedRows.length === costs.length}
                                onChange={toggleSelectAll}
                            />
                        </TableCell>
                        {/* ✅ קביעת רוחב מינימלי רק לעמודות המחיר והתאריך */}
                        <TableCell sx={{ width: "80px", textAlign: "center" }}>Amount</TableCell>
                        <TableCell sx={{ width: "25%", textAlign: "left" }}>Category</TableCell>
                        <TableCell sx={{ textAlign: "left" }}>Description</TableCell>
                        <TableCell sx={{ width: "120px", textAlign: "center" }}>Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {costs.map((cost, index) => (
                        <TableRow key={cost.id} selected={selectedRows.includes(index)}>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    checked={selectedRows.includes(index)}
                                    onChange={() => toggleRowSelection(index)}
                                />
                            </TableCell>
                            {/* ✅ יישור נתונים ויישום הגדרות רוחב */}
                            <TableCell sx={{ width: "80px", textAlign: "center" }}>{cost.sum}</TableCell>
                            <TableCell sx={{ width: "25%", textAlign: "left" }}>{cost.category}</TableCell>
                            <TableCell sx={{ textAlign: "left" }}>{cost.description}</TableCell>
                            <TableCell sx={{ width: "120px", textAlign: "center" }}>{cost.date}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* 🟦 כפתורי מחיקה ועריכה */}
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2, gap: 2 }}>
                <Button variant="contained" color="error" onClick={handleDelete} disabled={selectedRows.length === 0}>
                    Delete Selected
                </Button>
                <Button variant="contained" color="primary" onClick={handleEdit} disabled={selectedRows.length !== 1}>
                    Edit Selected
                </Button>
            </Box>
        </TableContainer>
    );
};

export default ReportTable;
