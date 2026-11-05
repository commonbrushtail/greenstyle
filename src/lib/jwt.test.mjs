import test, { afterEach, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { SignJWT } from "jose";
import { signAdminToken, verifyAdminToken } from "./jwt.ts";

const original = process.env.JWT_SECRET;
const payload = { userId: "1", email: "admin@example.test" };

const forge = (secret) =>
  new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(new TextEncoder().encode(secret));

beforeEach(() => {
  process.env.JWT_SECRET = "test-secret-for-unit-tests";
});

afterEach(() => {
  if (original === undefined) delete process.env.JWT_SECRET;
  else process.env.JWT_SECRET = original;
});

// The string below was once a real default in this public repo, so anyone could
// have signed an admin token with it if JWT_SECRET was ever missing.
for (const [name, value] of [
  ["missing", undefined],
  ["empty", ""],
  ["blank", "   "],
]) {
  test(`a token forged with the old default is rejected when JWT_SECRET is ${name}`, async () => {
    if (value === undefined) delete process.env.JWT_SECRET;
    else process.env.JWT_SECRET = value;
    assert.equal(await verifyAdminToken(await forge("fallback-secret")), null);
  });

  test(`no token can be issued when JWT_SECRET is ${name}`, async () => {
    if (value === undefined) delete process.env.JWT_SECRET;
    else process.env.JWT_SECRET = value;
    await assert.rejects(signAdminToken("1", "admin@example.test"), /JWT_SECRET/);
  });
}

test("a token forged with the old default is rejected when a real secret is set", async () => {
  assert.equal(await verifyAdminToken(await forge("fallback-secret")), null);
});

test("a token signed with the configured secret still works", async () => {
  const token = await signAdminToken("1", "admin@example.test");
  const session = await verifyAdminToken(token);
  assert.equal(session?.userId, "1");
  assert.equal(session?.email, "admin@example.test");
});

test("an expired token is rejected", async () => {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("-1s")
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
  assert.equal(await verifyAdminToken(token), null);
});
