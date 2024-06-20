// utils/auth.js

import jwt from 'jsonwebtoken';

const secret = 'national_plastic'; // Replace with a secure random string

export function generateToken(payload) {
    console.log("Generating token");
  return jwt.sign(payload, secret, { expiresIn: '1h' }); // Token expires in 1 hour
}

export function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {
    return null;
  }
}
