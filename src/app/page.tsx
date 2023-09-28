"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Login from "@/pages/login/index";
import SignUp from "@/pages/signup/index";

export default function App() {
  const [userExists, setUserExists] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const apiUrl = "http://localhost:3001/api/users";

  useEffect(() => {
    axios
      .get(apiUrl)
      .then((response) => {
        const hasUsers = response.data.length > 0;
        setUserExists(hasUsers);
      })
      .catch((error) => {
        setUserExists(false);
      })
      .finally(() => {
        setIsLoading(false); // Update loading state when the request is complete
      });

  }, []);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <main>{userExists ? <Login /> : <SignUp />}</main>;
}
