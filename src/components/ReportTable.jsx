import React, { useState } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Checkbox, Box, Button } from "@mui/material";
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
            setEditingCost(selectedCost);
        }
    };

    return (
        <TableContainer>
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
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Box sx={{ display: "flex", justifyContent: "center", mt: 2, gap: 2 }}>
                <Button
                    variant="contained"
                    color="error"
                    onClick={handleDelete}
                    disabled={selectedRows.length === 0}
                >
                    Delete Selected
                </Button>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleEdit}
                    disabled={selectedRows.length !== 1}
                >
                    Edit Selected
                </Button>
            </Box>
        </TableContainer>
    );
};

export default ReportTable;
