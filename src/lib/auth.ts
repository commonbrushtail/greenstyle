import { cookies } from "next/headers";
import { signAdminToken, verifyAdminToken } from "@/lib/jwt";

export const createToken = signAdminToken;
export const verifyToken = verifyAdminToken;

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  if (!token) return null;
  return verifyToken(token);
}
