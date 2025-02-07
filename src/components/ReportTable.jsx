import React, { useState } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper, Checkbox, Button, Box } from "@mui/material";

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

    return (
        <TableContainer component={Paper} sx={{ mt: 3 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell padding="checkbox">
                            <Checkbox
                                indeterminate={selectedRows.length > 0 && selectedRows.length < costs.length}
                                checked={selectedRows.length === costs.length}
                                onChange={toggleSelectAll}
                            />
                        </TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Actions</TableCell>
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
                            <TableCell>{cost.sum}</TableCell>
                            <TableCell>{cost.category}</TableCell>
                            <TableCell>{cost.description}</TableCell>
                            <TableCell>{cost.date}</TableCell>
                            <TableCell>
                                <Button variant="contained" color="primary" size="small" onClick={() => setEditingCost(cost)}>
                                    Edit
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {selectedRows.length > 0 && (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                    <Button variant="contained" color="error" onClick={handleDelete}>
                        Delete Selected
                    </Button>
                </Box>
            )}
        </TableContainer>
    );
};

export default ReportTable;
