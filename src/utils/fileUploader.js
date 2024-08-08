import { writeFile } from 'fs/promises';
const fs = require("fs").promises;
const path = require("path");

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const ALLOWED_FILE_TYPES = ['.jpg', '.jpeg', '.png', '.webp', '.mp4','.pdf'];
const UPLOAD_DIR = path.join(process.cwd(), 'public', 'Assets', 'uploads','Investors');

export async function validateFile(file) {
  if (file.size > MAX_FILE_SIZE) {
    throw new Error(`File size exceeds the limit of ${MAX_FILE_SIZE / 1024 / 1024}MB`);
  }

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

  const fileName = file.name;
  const filePath = "/var/www/uploads/uploads/investors";
  try {
    await fs.access(filePath);
  } catch {
    await fs.mkdir(filePath, { recursive: true });
  }

  await writeFile(filePath, buffer);

  return fileName;
}