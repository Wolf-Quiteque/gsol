import { hash, compare } from "bcryptjs";
import { getSession } from "next-auth/react";
export async function hashPassword(password) {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
}

export async function verifyPassword(password, hashedPassword) {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}

export async function auth(req, res) {
  const session = await getSession({ req });

  if (session) {
    res.json({
      content: "ok",
    });
  } else {
    res.json({
      error: "error",
    });
  }
}
