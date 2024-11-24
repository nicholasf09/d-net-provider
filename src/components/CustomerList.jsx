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

const CustomerList = () => {
  const [customers, setCustomers] = useState([]); // State untuk menyimpan data pelanggan
  const [newCustomer, setNewCustomer] = useState(""); // State untuk menyimpan input pelanggan baru

  // Fetch data pelanggan dari server saat komponen dimuat
  useEffect(() => {
    axios.get("http://localhost:5000/customers").then((response) => setCustomers(response.data));
  }, []);

  const addCustomer = () => {
    // Check jika nama pelanggan sudah ada di database (case-insensitive)
    const isDuplicate = customers.some(
      (customer) => customer.name.toLowerCase() === newCustomer.toLowerCase()
    );

    if (isDuplicate) {
      alert("Customer with this name already exists!");
      return;
    }

    // Generate ID baru dengan auto increment berdasarkan ID terbesar yang ada
    // Menggunakan String() untuk memastikan ID tetap dalam bentuk string
    const newId = customers.length > 0
      ? (parseInt(Math.max(...customers.map((c) => parseInt(c.id)))) + 1).toString() // Generate ID dalam format string
      : "1"; // ID pertama adalah "1"

    // Tambahkan pelanggan baru ke server
    const newCustomerData = { id: newId, name: newCustomer };
    axios.post("http://localhost:5000/customers", newCustomerData).then((response) => {
      setCustomers((prev) => [...prev, response.data]);
      setNewCustomer(""); // Reset input field
    });
  };

  const deleteCustomer = (id) => {
    // Hapus pelanggan berdasarkan ID
    axios.delete(`http://localhost:5000/customers/${id}`).then(() => {
      setCustomers((prev) => prev.filter((customer) => customer.id !== id));
    });
  };

  return (
    <Box>
      <Typography variant="h4" mb={2}>
        Customer List
      </Typography>
      <Box display="flex" mb={2}>
        <TextField
          label="New Customer"
          value={newCustomer}
          onChange={(e) => setNewCustomer(e.target.value)}
          sx={{ marginRight: 2 }}
        />
        <Button variant="contained" onClick={addCustomer}>
          Add Customer
        </Button>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell>{customer.id}</TableCell>
              <TableCell>{customer.name}</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => deleteCustomer(customer.id)}
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

export default CustomerList;