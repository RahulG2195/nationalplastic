import { query } from '@/lib/db';
import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';

// Function to handle image upload
const uploadImage = async (file) => {
    try {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const path = `public/Assets/uploads/${file.name}`;
        await writeFile(path, buffer);
        return file.name;
    } catch (error) {
        throw new Error('Image upload failed: ' + error.message);
    }
};

// GET request to fetch hero banner data
export async function GET(request) {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    // const id = 1;

    try {
        const bannerData = await query({
            query: 'SELECT * FROM hero_banners WHERE id = ?',
            values: [id],
        });

        return new Response(
            JSON.stringify({
                status: 200,
                bannerData: bannerData[0] || {},
            }),
            { status: 200 }
        );
    } catch (e) {
        return new Response(
            JSON.stringify({
                status: 500,
                message: 'Internal Server Error',
                error: e.message,
            }),
            { status: 500 }
        );
    }
}

// POST request to update hero banner data
export async function POST(request) {
    try {
        const formData = await request.formData();
        const id = formData.get('id');
        // const id = 1;
        const redirection_link = formData.get('redirection_link');
        const file = formData.get('image');

        if (!id) {
            return NextResponse.json(
                { success: false, error: 'ID is required' },
                { status: 400 }
            );
        }

        // Fetch existing data
        const existingData = await query({
            query: 'SELECT * FROM hero_banners WHERE id = ?',
            values: [id],
        });

        const existing = existingData[0] || {};

        // Determine new values or fall back to existing ones
        const newRedirectionLink = redirection_link ? redirection_link.trim() : existing.redirection_link;
        let newImageName = existing.image;

        // Handle new image upload
        if (file && file.size > 0) {
            try {
                newImageName = await uploadImage(file);
            } catch (error) {
                console.error('Error uploading image:', error);
                return NextResponse.json(
                    { success: false, error: 'Failed to upload image' },
                    { status: 500 }
                );
            }
        }

        // Build the query and values dynamically
        const queryParts = [];
        const values = [];

        if (newRedirectionLink !== existing.redirection_link) {
            queryParts.push('redirection_link = ?');
            values.push(newRedirectionLink);
        }
        if (newImageName !== existing.image) {
            queryParts.push('image = ?');
            values.push(newImageName);
        }

        // Only proceed with update if there are changes
        if (queryParts.length > 0) {
            values.push(id); 
            const dynamicQuery = `
              UPDATE hero_banners
              SET ${queryParts.join(', ')}
              WHERE id = ?
            `;
            console.log("dynaaamic query...........",dynamicQuery)

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
        console.error('Error updating hero banner:', error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
