// utils/auth.js

import { SignJWT, jwtVerify } from 'jose';
import { signOut } from "next-auth/react";
import axios from "axios";
import { notifyError} from "@/utils/notify";

// import { cookies } from 'next/headers';
const secret = new TextEncoder().encode('national_plastic'); // Replace with a secure random string

export async function generateToken(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1d')
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

export async function logoutUser(user) {
  try{
    notifyError("Session Expired Please Login Again");
    localStorage.clear();
    signOut();
    axios.delete("api/Users")
  }catch(error){
    return error.message;
  }
}