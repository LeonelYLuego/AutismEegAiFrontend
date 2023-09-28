"use client";

import Plots from "@/components/Plots";
import Image from "next/image";
import { TextField } from "@mui/material";

import Graph from "../assets/graph-authism.png";
import Header from "../components/Header";
import UploadButton from "@/components/UploadButton";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export default function Studies() {
  return (
    <div className="min-h-screen">
      <Header />
      <Container sx={{display: 'grid', gridTemplateColumns: 'repeat(3, 2fr)', marginTop: "5vh" }}>
        <Container>
          <Typography variant="h5" mt={5} mb={10}>
            Gráficos de las señales principales
          </Typography>
          <Container>
            <Plots/>
          </Container>
        </Container>

        <Container>
          <Image
              src={Graph}
              width={500}
              height={400}
              alt="Picture of the author"
            />
        </Container>

        <Container>
            <UploadButton w={5} h={5} />
            <TextField
              id="standard-multiline-static"
              multiline
              rows={20}
              placeholder="Comentarios del diagnostico"
              variant="filled"
              fullWidth
              className="mt-4"
            />
          </Container>
      </Container>
      
    </div>
  );
}
