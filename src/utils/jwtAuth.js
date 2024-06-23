// utils/auth.js

import { SignJWT, jwtVerify } from 'jose';
// import { cookies } from 'next/headers';
const secret = new TextEncoder().encode('national_plastic'); // Replace with a secure random string

export async function generateToken(payload) {
  console.log("Generating token");
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(secret);
}

export async function verifyToken(token) {
  try {
    const { payload } = await jwtVerify(token, secret);
    console.log("Decoded token:", payload);
    return payload;
  } catch (error) {
    return error.message;
  }
}

// export function logout() {
//   cookies().delete('auth');
// }