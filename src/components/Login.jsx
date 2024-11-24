import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

const Login = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log("Logging in with", credentials);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
      <Typography variant="h4" mb={2}>Login</Typography>
      <TextField
        label="Username"
        name="username"
        value={credentials.username}
        onChange={handleChange}
        sx={{ marginBottom: 2, width: "300px" }}
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        value={credentials.password}
        onChange={handleChange}
        sx={{ marginBottom: 2, width: "300px" }}
      />
      <Button variant="contained" onClick={handleSubmit}>Login</Button>
    </Box>
  );
};

export default Login;