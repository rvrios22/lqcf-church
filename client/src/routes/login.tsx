import { createFileRoute } from "@tanstack/react-router";
import { useWindowDimensions } from "../hooks/useWindowDimensions";
import { useState } from "react";
import customFetch from "../utils/customFetch";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const { height } = useWindowDimensions();
  const [form, setForm] = useState({ username: "", password: "" });
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    };
    try {
      const data = await customFetch("/api/user/login", options);
      sessionStorage.setItem("token", data);
      setForm({ username: "", password: "" });
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div style={{ height: height * 0.8 }}>
      <h1 className="sub-header">Login</h1>
      <form action="post" onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <input type="submit" value="Login" className="button" />
      </form>
    </div>
  );
}
