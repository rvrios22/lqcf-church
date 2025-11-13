import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import customFetch from "../utils/customFetch";
import { useUser } from "../hooks/useUser";
import { getUserFromToken } from "../utils/auth";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const { setUser } = useUser();
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
      const data = await customFetch("user/login", options);
      sessionStorage.setItem("token", data);
      setUser(getUserFromToken());
      setForm({ username: "", password: "" });
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div>
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
