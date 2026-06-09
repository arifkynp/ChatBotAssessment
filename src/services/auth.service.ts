import { api } from "./api";

export async function register(
  email: string,
  password: string
) {
  const response = await api.post(
    "/auth/register",
    {
      email,
      password,
    }
  );

  return response.data;
}

export async function login(
  email: string,
  password: string
) {
  const response = await api.post(
    "/auth/login",
    {
      email,
      password,
    }
  );

  return response.data;
}

export async function validateToken(token: string) {
  const res = await fetch("/auth/verify", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.ok;
}