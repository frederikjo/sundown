"use client";
import React, { useEffect, useState } from "react";
import { authenticateUser } from "../services/userServices";
import { useUser } from "../UserContext";
import { useRouter } from "next/navigation";
import { Button, TextField } from "@mui/material";

import Image from "next/image";

export const LoginForm: React.FC = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { user, setUser } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await authenticateUser(email, password);
      if (user) {
        setError("");
        setUser(user);
        router.push("/dashboard");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("Login failed. Please try again later.");
    }
  };

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-[248px] m-auto">
      <Image
        src="/logo.svg"
        alt="LOGO"
        width="50"
        height="50"
        className="w-full p-0 m-0"
      />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-full gap-4 mt-4"
      >
        <TextField
          type="email"
          placeholder="Email"
          value={email}
          className="bg-starry bg-gray-200"
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
        />
        <TextField
          type="password"
          placeholder="Password"
          value={password}
          className="bg-starry bg-gray-200"
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
        />
        <Button
          type="submit"
          fullWidth
          variant="outlined"
          color="primary"
        >
          Login
        </Button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default LoginForm;
