"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Login from "@/pages/login/index";
import SignUp from "@/pages/signup/index";
import { PatientProvider } from "@/utils/patientsContext";

export default function Page() {
  const [userExists, setUserExists] = useState<boolean | null>(null);

  useEffect(() => {
    const apiUrl = "http://localhost:3001/api/users";

    axios
      .get(apiUrl)
      .then((response) => {
        // Asignar la respuesta de la API a userExists (true/false)
        console.log("Respuesta de la API:", response.data.data);
        setUserExists(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching API:", error);
        // En caso de error, establecer userExists en false
        setUserExists(false);
      });
  }, []);

  return (
    <PatientProvider>
      <main>
        {/* Mostrar Login si userExists es true, SignUp si es false, o nada si es null */}
        {userExists === true && <Login />}
        {userExists === false && <SignUp />}
      </main>
    </PatientProvider>
  );
}
