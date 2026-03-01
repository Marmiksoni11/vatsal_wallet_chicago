"use client";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

interface User {
  id: string;
  email: string;
  name?: string;
  role: string;
}

const fetcher = (url: string) => fetch(url).then(r => r.json());

export function useAuth() {
  const router = useRouter();
  const { data, error, isLoading, mutate } = useSWR("/api/auth/me", fetcher);

  const user: User | null = data?.user ?? null;
  const isAdmin = user?.role === "admin";

  const login = useCallback(async (email: string, password: string) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || "Login failed");
    await mutate();
    return json.user;
  }, [mutate]);

  const signup = useCallback(async (email: string, password: string, name: string) => {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || "Signup failed");
    await mutate();
    return json.user;
  }, [mutate]);

  const logout = useCallback(async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    await mutate();
    router.push("/");
  }, [mutate, router]);

  return { user, isAdmin, isLoading, error, login, signup, logout };
}
