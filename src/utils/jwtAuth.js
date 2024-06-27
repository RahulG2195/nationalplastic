// utils/auth.js

import { SignJWT, jwtVerify } from 'jose';
// import { cookies } from 'next/headers';
const secret = new TextEncoder().encode('national_plastic'); // Replace with a secure random string

export async function generateToken(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('5h')
    .sign(secret);
}

export async function verifyToken(token) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    return error.message;
  }
}

