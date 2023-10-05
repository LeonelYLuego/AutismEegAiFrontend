"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Login from "@/pages/login/index";
import SignUp from "@/pages/signup/index";
import { PatientProvider } from "@/utils/patientsContext";

export default function App() {
  const [userExists, setUserExists] = useState(
    localStorage.getItem("userExists") === "true"
  );
  const apiUrl = "http://localhost:3001/api/users";

  useEffect(() => {
    axios
      .get(apiUrl)
      .then((response) => {
        setUserExists(response.data);
        console.log(userExists);
      })
      .catch((error) => {
        setUserExists(false);
      });
  }, []);

  return (
    <PatientProvider>
      <main>{userExists ? <Login /> : <SignUp />}</main>
    </PatientProvider>
  );
}
