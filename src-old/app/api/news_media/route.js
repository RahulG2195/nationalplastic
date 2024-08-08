import { query } from '@/lib/db';
import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
const fs = require("fs").promises;
const path = require("path");

// Function to handle image upload
const uploadImage = async (file) => {
    try {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const path = "/var/www/uploads/uploads/investors";
        try {
          await fs.access(path);
        } catch {
          await fs.mkdir(path, { recursive: true });
        }
        await writeFile(path, buffer);




        return file.name;
    } catch (error) {
        throw new Error('Image upload failed: ' + error.message);
    }
};

// GET request to fetch news media
export async function GET(request) {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');


    try {
        const newsMedia = await query({
            query: 'SELECT * FROM news_media where id = ?',
            values: [id],
        });

        return new Response(
            JSON.stringify({
                status: 200,
                newsMedia: newsMedia || [],
            })
        );
    } catch (e) {
        return new Response(
            JSON.stringify({
                status: 500,
                message: 'Internal Server Error',
                error: e.message,
            })
        );
    }
}

export async function POST(request) {
    try {
        const formData = await request.formData();
        const id = formData.get('id');
        const heading = formData.get('heading');
        const subheading = formData.get('subheading');

        // Fetch existing data
        const existingData = await query({
            query: 'SELECT * FROM news_media WHERE id = ?',
            values: [id], 
        });

        const existing = existingData[0] || {};

        // Determine new values or fall back to existing ones
        const newHeading = heading ? heading.trim() : existing.heading;
        const newSubheading = subheading ? subheading.trim() : existing.subheading;

        // Extract and handle image files
        const imageFiles = [];
        for (const [key, value] of formData.entries()) {
            if (key.startsWith('images[')) {
                imageFiles.push(value);
            }
        }

        const newImagePaths = [];
        for (const file of imageFiles) {
            if (file.size > 0) { // Check if file is provided and has size greater than 0
                try {
                    const imagePath = await uploadImage(file);
                    newImagePaths.push(imagePath);
                } catch (error) {
                    console.error('Error uploading image:', error);
                    return NextResponse.json(
                        { success: false, error: 'Failed to upload image' },
                        { status: 500 }
                    );
                }
            }
        }

        // Concatenate new images with existing ones
        const existingImages = existing.images ? existing.images.split(',') : [];
        const allImagePaths = [...existingImages, ...newImagePaths];
        const newImageString = allImagePaths.join(',');

        // Build the query and values dynamically
        const queryParts = [];
        const values = [];

        if (newHeading !== existing.heading) {
            queryParts.push('heading = ?');
            values.push(newHeading);
        }
        if (newSubheading !== existing.subheading) {
            queryParts.push('subheading = ?');
            values.push(newSubheading);
        }
        if (newImageString !== existing.images) {
            queryParts.push('images = ?');
            values.push(newImageString);
        }

        // Only proceed with update if there are changes
        if (queryParts.length > 0) {
            values.push(id); 
            const dynamicQuery = `
              UPDATE news_media
              SET ${queryParts.join(', ')}
              WHERE id = ?
            `;

            // Execute the query
            const result = await query({
                query: dynamicQuery,
                values: values,
            });

            return NextResponse.json(
                { success: true, data: result },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                { success: true, message: 'No changes detected' },
                { status: 200 }
            );
        }
    } catch (error) {
        console.error('Error updating news media:', error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}

export async function PUT(request) {
    try {
        // Parse JSON request body
        const { imageName, id } = await request.json();
        if (!imageName) {
            return NextResponse.json(
                { success: false, error: 'Image name is required' },
                { status: 400 }
            );
        }

        // Construct the query text
        // Use `imageName` without a trailing comma unless it's part of the stored format
        const queryText = 'UPDATE news_media SET images = REPLACE(images, ?, "") WHERE id = ?';
        
        // Execute the query
        const result = await query({
            query: queryText,
            values: [imageName, id] 
        });
        
        // Log result for debugging
        
        if (result.affectedRows === 0) {
            return NextResponse.json(
                { success: false, error: 'Failed to update database; image not found' },
                { status: 500 }
            );
        }
        
        return NextResponse.json(
            { success: true },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error deleting image:', error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
