"use client";
import { useFetch } from "@/app/services/fetch";
import React from "react";
import { useState } from "react";

export default function Login() {
  const [name, setname] = useState("");
  const [password, setpassword] = useState("");
  const { fetchData, error } = useFetch();

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const response = await fetchData({ name, password }, "/user/login", "POST");
    if (response) {
      localStorage.setItem("Token", response.token);
    }
  };

  return (
    <div className="form">
      {error && <div>"Datos incorrectos"</div>}
      <form onSubmit={handleSubmit}>
        <h2 className="title">Login</h2>

        <label>User name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setname(e.target.value)}
          required
        ></input>

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          required
        ></input>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
