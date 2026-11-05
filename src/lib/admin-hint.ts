/** Readable by browser JavaScript, unlike the httpOnly admin_token. It only says
 *  "check the login status", so it grants nothing; /api/auth/me still verifies
 *  the real token. */
export const ADMIN_HINT_COOKIE = "admin_hint";
