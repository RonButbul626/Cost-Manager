import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";
import "./ReportTable.css"; // שמירה על עיצוב הטבלה כמו בטבלה הראשית

const DetailedReport = ({ reportData }) => {
    if (!reportData || reportData.length === 0) {
        return null; // אם אין מידע, לא להציג כלום
    }

    return (
        <TableContainer component={Paper} sx={{ width: "80%", margin: "40px auto", boxShadow: 3 }}>
            <Typography variant="h6" align="center" sx={{ mt: 2, mb: 2 }}>Detailed Report</Typography>
            <Table className="styled-table">
                <TableHead>
                    <TableRow>
                        <TableCell><b>Amount</b></TableCell>
                        <TableCell><b>Category</b></TableCell>
                        <TableCell><b>Description</b></TableCell>
                        <TableCell><b>Date</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {reportData.map((cost, index) => (
                        <TableRow key={index}>
                            <TableCell>{cost.amount ?? "N/A"}</TableCell> {/* ✅ שולף את הערך ישירות בלי `$` */}
                            <TableCell>{cost.category || "Uncategorized"}</TableCell>
                            <TableCell>{cost.description || "No description"}</TableCell>
                            <TableCell>{cost.date}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default DetailedReport;
