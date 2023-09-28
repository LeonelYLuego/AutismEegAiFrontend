"use client"
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { createStudy } from "@/services/wavesService";

export default function UploadButton(w: any, h: any) {
  const [selectedFile, setSelectedFile] = useState(null);
  let wavesResponse = null;

  const handleUpload = () => {
    if (selectedFile) {
      wavesResponse = createStudy(selectedFile);
      console.log("Uploading file:", selectedFile);
      console.log("Waves Response: ", wavesResponse);
    }
  };
  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const uploadButtonStyle = {
    backgroundColor: "black",
    color: "white",
    with: w,
    height: h,
    margin: "4px",
  };
  const confirmButtonStyle = selectedFile
    ? {
        backgroundColor: "black",
        color: "white",
      }
    : {
        backgroundColor: "darkgray", // Background color when no file is selected
        color: "gray", // Text color when no file is selected
      };
  return (
    <div>
      <input
        type="file"
        accept=".csv"
        style={{ display: "none" }}
        onChange={handleFileChange}
        id="file-input"
      />
      <label htmlFor="file-input">
        <Button
          variant="contained"
          component="span"
          startIcon={<CloudUploadIcon />}
          style={uploadButtonStyle}
        >
          Importar .csv
        </Button>
      </label>
      <Button
        variant="contained"
        onClick={handleUpload}
        disabled={!selectedFile}
        style={confirmButtonStyle}
      >
        Confirmar
      </Button>
    </div>
  );
}
