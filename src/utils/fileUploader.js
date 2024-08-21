import { writeFile } from 'fs/promises';
const fs = require("fs").promises;
const path = require("path");

// const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const ALLOWED_FILE_TYPES = ['.jpg', '.jpeg', '.png', '.webp', '.mp4', '.pdf'];

// Function to normalize file name and convert extension to lowercase
function normalizeFileNameAndLowercaseExtension(fileName) {
  const ext = path.extname(fileName).toLowerCase();
  const name = path.basename(fileName, path.extname(fileName));
  return `${name}${ext}`;
}

export async function validateFile(file) {
  // if (file.size > MAX_FILE_SIZE) {
  //   throw new Error(`File size exceeds the limit of ${MAX_FILE_SIZE / 1024 / 1024}MB`);
  // }

  const fileExtension = path.extname(file.name).toLowerCase();
  if (!ALLOWED_FILE_TYPES.includes(fileExtension)) {
    throw new Error(`Unsupported file type. Allowed types are: ${ALLOWED_FILE_TYPES.join(', ')}`);
  }

  return fileExtension;
}

export async function uploadFile(file) {
  const fileExtension = await validateFile(file);
  
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const normalizedFileName = normalizeFileNameAndLowercaseExtension(file.name);
  
  const filePath = `${process.env.NEXT_PUBLIC_EXTERNAL_PATH_DIR}${process.env.NEXT_PUBLIC_INVESTORS_PATH_DIR}`;
      
  try {
    await fs.access(filePath);
  } catch {
    await fs.mkdir(filePath, { recursive: true });
  }

  const uploadDir = path.join(filePath, normalizedFileName);
  await fs.writeFile(uploadDir, buffer);

  return normalizedFileName;
}