import React, { useState } from "react";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Avatar } from "@mui/material";
import ALogo from "../assets/iautism-logo.png";
import axios from "axios";
import Image from "next/image";


const CreatePatient: React.FC = () => {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleEdadChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAge(event.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
        const response = await axios.post(
            "http://localhost:3001/api/patients",
            {
            name,
            age,
            },
            {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            }
        );

        if (response.data.error) {
            alert("Nombre o edad en formato incorrecto.");
        } else {
            const data = response.data.data;
            console.log(data);
            console.log("Paciente añadido")
        }
        } catch (error) {
        console.error(error);
        alert("Nombre o edad en formato incorrecto.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Container
                sx={{
                    display: "flex", 
                    alignItems: "center",
                    backgroundColor: "#D9D9D9",
                    width: "100%",
                    justifyContent: "space-between"
                }}
            >
            <Container
                maxWidth="xs"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginTop: "5vh",
                    marginBottom: "5vh",
                    backgroundColor: "#E1E1E1",
                    borderRadius: "10px",
                    height: "600px",
                    flex: 1,
                }}
            >
                    <Typography variant="h3"  mt={5} mb={10}>Crear Paciente</Typography>
                    <TextField
                        label="Nombre Completo"
                        variant="outlined"
                        onChange={handleNameChange}
                        sx={{ marginBottom: "20px", width: "100%" }}
                    />
                    <TextField
                        label="Edad"
                        variant="outlined"
                        onChange={handleEdadChange}
                        sx={{ marginBottom: "20vh", width: "100%" }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                    >
                    Crear paciente
                    </Button>
                </Container>
                <Container
                    sx={{
                        width: "50%",
                        display: "flex", 
                        alignItems: "center"
                    }}
                >
                    <Image src={ALogo} alt="Nuestro logo" width={400}/>
                </Container>
            </Container>
        </form>
    );
};

export default CreatePatient;
