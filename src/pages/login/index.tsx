import React from "react";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Avatar } from "@mui/material";

const Login: React.FC = () => {
  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "200px",
        backgroundColor: "#E1E1E1",
        padding: "20px",
        borderRadius: "10px",
        height: "600px",
      }}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "200px",
          backgroundColor: "#E1E1E1",
          padding: "20px",
          borderRadius: "10px",
          height: "600px",
        }}
      >
        <Avatar
          alt="Logo"
          sx={{
            height: "100px",
            width: "100px",
            marginBottom: "40px",
          }}
        />
        <TextField
          label="Usuario"
          variant="outlined"
          sx={{ marginBottom: "20px", width: "100%" }}
        />
        <TextField
          label="Contraseña"
          variant="outlined"
          type="password"
          sx={{ marginBottom: "20px", width: "100%" }}
        />
        <Button variant="contained" color="primary">
          Iniciar sesión
        </Button>
      </Container>
    </Container>
  );
};

export default Login;
