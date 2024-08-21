import { writeFile } from 'fs/promises';
const fs = require("fs").promises;
const path = require("path");

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const ALLOWED_FILE_TYPES = ['.jpg', '.jpeg', '.png', '.webp', '.mp4', '.pdf'];

// Function to normalize file name and convert extension to lowercase


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

export async function uploadFile(file){
  try {
    const fileExtension = await validateFile(file);

    if(!fileExtension){}

    if (!file || typeof file.arrayBuffer !== "function") {
      console.error("Invalid file object received");
      throw new Error("Invalid file object");
    }
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uploadDir = `${process.env.NEXT_PUBLIC_EXTERNAL_PATH_DIR}${process.env.NEXT_PUBLIC_INVESTORS_PATH_DIR}`;
    try {
      await fs.access(uploadDir);
    } catch {
      await fs.mkdir(uploadDir, { recursive: true });
    }
    const filePath = path.join(uploadDir, file.name);
    await fs.writeFile(filePath, buffer);
    return file.name;
  } catch (error) {
    throw new Error(`PDF upload failed: ${error.message}`);
  }
};