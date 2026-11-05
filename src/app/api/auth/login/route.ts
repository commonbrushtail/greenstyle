import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import bcrypt from "bcryptjs";
import { createToken } from "@/lib/auth";
import { ADMIN_HINT_COOKIE } from "@/lib/admin-hint";

export async function POST(request: Request) {
  try {
    const sql = getDb();
    const { email, password } = await request.json();

    const rows = await sql`
      SELECT id, email, password_hash FROM admin_users WHERE email = ${email}
    `;

    if (rows.length === 0) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const user = rows[0];
    const valid = await bcrypt.compare(password, user.password_hash as string);

    if (!valid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = await createToken(user.id as string, user.email as string);

    const response = NextResponse.json({ success: true });
    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });
    response.cookies.set(ADMIN_HINT_COOKIE, "1", {
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
