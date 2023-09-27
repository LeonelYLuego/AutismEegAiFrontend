import React, { useState } from "react";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Avatar } from "@mui/material";
import axios from "axios";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/log-in",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.error) {
        alert("Usuario o contraseña incorrecto.");
      } else {
        const data = response.data.data;
        console.log(data);
        localStorage.setItem("token", JSON.stringify(data.token));
      }
    } catch (error) {
      console.error(error);
      alert("Usuario o contraseña incorrecto.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Container
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "150px",
          backgroundColor: "#E1E1E1",
          borderRadius: "10px",
          height: "600px",
        }}
      >
        <Avatar
          alt="Logo"
          sx={{
            height: "100px",
            width: "100px",
            marginBottom: "150px",
            marginTop: "150px",
          }}
        />
        <TextField
          label="Correo Electrónico"
          variant="outlined"
          onChange={handleEmailChange}
          sx={{ marginBottom: "20px", width: "100%" }}
        />
        <TextField
          label="Contraseña"
          variant="outlined"
          type="password"
          onChange={handlePasswordChange}
          sx={{ marginBottom: "20px", width: "100%" }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Iniciar sesión
        </Button>
      </Container>
    </form>
  );
};

export default Login;
