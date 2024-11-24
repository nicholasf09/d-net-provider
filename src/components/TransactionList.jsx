import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [newTransaction, setNewTransaction] = useState({ customer: "", amount: 0 });

  useEffect(() => {
    axios.get("http://localhost:5000/transactions").then((response) => setTransactions(response.data));
  }, []);

  const addTransaction = () => {
    // Validasi: Pastikan `customer` dan `amount` terisi dengan benar
    if (!newTransaction.customer) {
      alert("Customer is required!");
      return;
    }
    if (newTransaction.amount <= 0) {
      alert("Amount should be greater than 0!");
      return;
    }
  
    // Generate ID baru berdasarkan ID terbesar di daftar transaksi
    const newId = transactions.length > 0
      ? (parseInt(Math.max(...transactions.map((t) => parseInt(t.id)))) + 1).toString()
      : "1"; // ID pertama adalah "1"
  
    // Tambahkan transaksi baru dengan ID yang di-generate
    const newTransactionData = { ...newTransaction, id: newId };
  
    // Kirim data transaksi baru ke server
    axios.post("http://localhost:5000/transactions", newTransactionData).then((response) => {
      // Update daftar transaksi setelah berhasil menambahkan
      setTransactions((prev) => [...prev, response.data]);
      // Reset form transaksi
      setNewTransaction({ customer: "", amount: 0 });
    }).catch((error) => {
      // Menangani kesalahan jika request gagal
      console.error("Failed to add transaction:", error);
      alert("Failed to add transaction. Please try again.");
    });
  };
  
  

  const deleteTransaction = (id) => {
    axios.delete(`http://localhost:5000/transactions/${id}`).then(() => {
      setTransactions((prev) => prev.filter((transaction) => transaction.id !== id));
    });
  };

  return (
    <Box>
      <Typography variant="h4" mb={2}>Transaction List</Typography>
      <Box display="flex" mb={2} gap={2}>
        <TextField
          label="Customer Name"
          value={newTransaction.customer}
          onChange={(e) =>
            setNewTransaction((prev) => ({ ...prev, customer: e.target.value }))
          }
        />
        <TextField
          label="Amount"
          type="number"
          value={newTransaction.amount}
          onChange={(e) =>
            setNewTransaction((prev) => ({ ...prev, amount: Number(e.target.value) }))
          }
        />
        <Button variant="contained" onClick={addTransaction}>
          Add Transaction
        </Button>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.id}</TableCell>
              <TableCell>{transaction.customer}</TableCell>
              <TableCell>${transaction.amount}</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => deleteTransaction(transaction.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default TransactionList;