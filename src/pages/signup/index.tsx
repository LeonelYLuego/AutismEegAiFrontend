import React, { useState } from "react";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Avatar } from "@mui/material";
import axios from "axios";

const Signup: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/api/users", {
        name,
        email,
        password,
      });

      // Assuming the token is available in the response or you can save it from the response
      const token = response.data.token;
      console.log("Token:", token);

      // Clear form inputs after successful submission
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Error creating user:", error);
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
            marginBottom: "70px",
            marginTop: "150px",
          }}
        />
        <TextField
          label="Nombre"
          variant="outlined"
          onChange={handleNameChange}
          sx={{ marginBottom: "20px", width: "100%" }}
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

export default Signup;