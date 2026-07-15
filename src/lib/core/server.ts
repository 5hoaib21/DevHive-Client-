"use server";

import { getTokenServer } from "../getTokenServer";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL as string;

export const serverMutation = async <T>(path: string, data: Record<string, unknown>): Promise<T> => {
  const token = await getTokenServer();
  const res = await fetch(`${baseURL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  const result = (await res.json()) as T;
  return result;
};

export const serverDelete = async <T>(path: string): Promise<T> => {
  const token = await getTokenServer();
  const res = await fetch(`${baseURL}${path}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  const result = (await res.json()) as T;
  return result;
};