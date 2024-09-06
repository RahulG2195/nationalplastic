import { query } from "@/lib/db";
import { NextResponse } from "next/server";
import { writeFile } from 'fs/promises';
import fs from 'fs/promises';
import path from 'path';
// Function to handle image upload
const uploadImage = async (file) => {
    try {
        const imageName = file.name
        const imageDir = path.join(
            process.env.NEXT_PUBLIC_EXTERNAL_PATH_DIR,
            process.env.NEXT_PUBLIC_BANNERS_PATH_DIR
        );

        try {
            await fs.access(imageDir);
        } catch {
            await fs.mkdir(imageDir, { recursive: true });
        }

        // Save the new image file
        const imageFilePath = path.join(imageDir, imageName);
        await fs.writeFile(imageFilePath, Buffer.from(await file.arrayBuffer()));

        return true
    } catch (error) {
        throw new Error('Image upload failed: ' + error.message);
    }
};

export async function GET(request) {
    try {
        const results = await query({
            query: "SELECT * FROM youtube_videos",
            values: [],
        })

        return NextResponse.json({
            results,
            status: 200
        })
    } catch (err) {
        return NextResponse.json({
            error: "Failed to fetch data",
            status: 500,
            errorMessage: err.message
        })
    }
}