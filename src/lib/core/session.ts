import { headers } from "next/headers";
import { auth } from "../auth";
import { redirect } from "next/navigation";

export interface UserSession {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  role: "explorer" | "publisher" | "admin";
}

export const getUserSession = async (): Promise<UserSession | null> => {
  const reqHeaders = await headers();
  const session = await auth.api.getSession({
    headers: reqHeaders,
  });
  return (session?.user as unknown as UserSession) ?? null;
};

export const requireRole = async (role: "explorer" | "publisher" | "admin"): Promise<void> => {
  const user = await getUserSession();
  if (user?.role !== role) {
    redirect("/unauthorized");
  }
};