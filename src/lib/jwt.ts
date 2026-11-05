import { SignJWT, jwtVerify } from "jose";

/** Read on each call, not at import, so a build without the variable still works
 *  and every login simply fails until it is set. There is deliberately no default:
 *  a default in this public repo would let anyone forge an admin token. */
function getSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret || !secret.trim()) {
    throw new Error("JWT_SECRET is not set");
  }
  return new TextEncoder().encode(secret);
}

export function signAdminToken(userId: string, email: string): Promise<string> {
  return Promise.resolve().then(() =>
    new SignJWT({ userId, email })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("7d")
      .sign(getSecret())
  );
}

/** Returns the token's contents, or null if it's invalid or no secret is set. */
export async function verifyAdminToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload as unknown as { userId: string; email: string };
  } catch {
    return null;
  }
}
