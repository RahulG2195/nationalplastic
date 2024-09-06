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
        console.log("error" + err.message)
        return NextResponse.json({
            error: "Failed to fetch data",
            status: 500,
            errorMessage: err.message
        })
    }
}


export async function POST(request) {
    try {
        const formData = await request.formData();
        const title = formData.get('title');
        const short_desc = formData.get('short_desc');
        const url = formData.get('url');
        const image = formData.get('images');

        if (!title || !short_desc || !url) {
            return NextResponse.json({
                error: "Missing required fields",
                status: 400
            });
        }


            let image_name = null;
            if (image && image.name) {
                await uploadImage(image);
                image_name = image.name;
            }
        

        const results = await query({
            query: "INSERT INTO youtube_videos (title, short_desc, url, image) VALUES (?, ?, ?, ?)",
            values: [title, short_desc, url, image_name],
        });

        return NextResponse.json({
            results,
            status: 201
        });
    } catch (err) {
        console.error(err);
        return NextResponse.json({
            error: "Failed to add video",
            status: 500,
            errorMessage: err.message
        });
    }
}
export async function PUT(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        const data = await request.formData();
        // const id = data.get('id');
        const title = data.get('title');
        const short_desc = data.get('short_desc');
        const url = data.get('url');
        const image = data.get('images');

        let image_name = null;
        if (image && image.name) {
            await uploadImage(image);
            image_name = image.name;
        }

        let queryString = "UPDATE youtube_videos SET title = ?, short_desc = ?, url = ?";
        let values = [title, short_desc, url];

        if (image_name) {
            queryString += ", image = ?";
            values.push(image_name);
        }

        queryString += " WHERE id = ?";
        values.push(id);


        console.log("queryString" + JSON.stringify(queryString));
        console.log("values" + JSON.stringify(values));



        const results = await query({
            query: queryString,
            values: values,
        });

        return NextResponse.json({
            results,
            status: 200
        });
    } catch (err) {
        console.error("Error updating video:", err);

        return NextResponse.json({
            error: "Failed to update video",
            status: 500,
            errorMessage: err.message
        });
    }
}


export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        
        const results = await query({
            query: "DELETE FROM youtube_videos WHERE id = ?",
            values: [id],
        });

        return NextResponse.json({
            results,
            status: 200
        });
    } catch (err) {
        return NextResponse.json({
            error: "Failed to delete video",
            status: 500,
            errorMessage: err.message
        });
    }
}