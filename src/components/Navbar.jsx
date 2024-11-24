import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => (
  <AppBar position="static" sx={{ marginBottom: 2 }}>
    <Toolbar>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        D-Net Provider
      </Typography>
      <Box>
        <Button color="inherit" component={Link} to="/login">Login</Button>
        <Button color="inherit" component={Link} to="/customers">Customers</Button>
        <Button color="inherit" component={Link} to="/transactions">Transactions</Button>
      </Box>
    </Toolbar>
  </AppBar>
);

export default Navbar;