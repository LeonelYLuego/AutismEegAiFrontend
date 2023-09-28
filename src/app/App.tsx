"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Login from "@/pages/login/index";
import SignUp from "@/pages/signup/index";

export default function App() {
  const [userExists, setUserExists] = useState(false);
  const apiUrl = "http://localhost:3001/api/users";

  useEffect(() => {
    // Make an API request using Axios to check if the user exists
    axios
      .get(apiUrl)
      .then((response) => {
        setUserExists(response.data === true);
        localStorage.setItem("userExists", response.data === true);
      })
      .catch((error) => {
        // If the API request fails or user doesn't exist
        setUserExists(false);
      });
  }, []); // Empty dependency array means this effect will run once when the component mounts

  return <main>{userExists ? <Login /> : <SignUp />}</main>;
}
