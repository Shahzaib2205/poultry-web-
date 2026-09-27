// src/app/login/page.jsx
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
    // TODO: Call backend login API
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background text-foreground px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center">Welcome Back</h1>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2 text-sm">
              <input type="checkbox" className="accent-primary" />
              <span>Remember me</span>
            </label>
            <a href="#" className="text-sm text-primary hover:underline">
              Forgot password?
            </a>
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
        <p className="text-center text-sm text-muted-foreground">
          Don’t have an account?{" "}
          <a href="#" className="text-primary hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
