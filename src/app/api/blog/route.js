import { query } from '@/lib/db';
const fs = require("fs").promises;
const path = require("path");


export async function GET(request) {
    try {
        const blogs = await query({
            query: 'SELECT * FROM blogs WHERE status = 1',
            values: [],
        });

        const categories = await query({
            query: 'SELECT DISTINCT category FROM blogs',
            values: [],
        });

        const categoryList = categories.map((item) => item.category);

        return new Response(
            JSON.stringify({
                status: 200,
                blogs: blogs,
                categories: categoryList,
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
        const data = await request.json();
        const { action } = data;

        switch (action) {
            case 'get_blog':
                return await get_blog(data);
            case 'update_blog':
                return await update_blog(data);
            case 'get_blogs':
                return await get_blogs(data);
            case 'create_blog':
                return await create_blog(data);
            case 'delete_blog':
                return await delete_blog(data);
            default:
                return new Response(
                    JSON.stringify({ status: 405, message: 'Method not allowed' }),
                    { status: 405 }
                );
        }
    } catch (error) {
        return new Response(
            JSON.stringify({ status: 400, message: 'Invalid JSON data' }),
            { status: 400 }
        );
    }
}
export async function PUT(request) {
    try {
        const formData = await request.formData(); // Consume the body here
        const action = formData.get('action');

        switch (action) {
            case 'create_blog':
                return await create_blog(formData); // Pass formData instead of request
            case 'update_blog':
                return await update_blog(formData); // Ensure update_blog accepts formData
            default:
                return new Response(
                    JSON.stringify({ status: 405, message: 'Method not allowed' }),
                    { status: 405 }
                );
        }
    } catch (error) {
        console.log("error " + error.message);
        return new Response(
            JSON.stringify({ status: 400, message: 'Invalid JSON data' }),
            { status: 400 }
        );
    }
}

export async function create_blog(formData) { // Accept formData as a parameter
    try {
        // Extracting form fields
        const title = formData.get('title');
        const short_description = formData.get('short_description');
        const content = formData.get('content');
        const featured_image = formData.get('featured_image'); // This will be a File object
        const author = formData.get('author');
        const published_at = formData.get('published_at');
        const category = formData.get('category');
        const is_popular = parseInt(formData.get('is_popular'), 10) || 0;
        const is_featured = parseInt(formData.get('is_featured'), 10) || 0;
        const status = parseInt(formData.get('status'), 10) || 1;
        const reading_time = parseInt(formData.get('reading_time'), 10) || 5;

        let image_url = '';
        let filepath = '';
        let imageName = featured_image.name;

        if (featured_image && featured_image.size > 0) {
            filepath = path.join(
                process.env.NEXT_PUBLIC_EXTERNAL_PATH_DIR,
                process.env.NEXT_PUBLIC_ABOUT_PATH_DIR
            );

            try {
                await fs.access(filepath);
            } catch {
                await fs.mkdir(filepath, { recursive: true });
            }

            image_url = path.join(filepath, imageName);
            await fs.writeFile(image_url, Buffer.from(await featured_image.arrayBuffer()));
        }

        const result = await query({
            query: `
                INSERT INTO blogs 
                (title, short_description, content, featured_image, 
                author, published_at, category, is_popular, 
                status, reading_time, is_featured) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `,
            values: [
                title, short_description, content, imageName,
                author, published_at, category, is_popular,
                status, reading_time, is_featured
            ],
        });

        return new Response(
            JSON.stringify({
                status: 200,
                message: 'Blog created successfully',
                id: result.insertId,
            })
        );
    } catch (e) {
        console.log("error: " + e.message);
        return new Response(
            JSON.stringify({
                status: 500,
                message: 'Internal Server Error',
                error: e.message,
            })
        );
    }
}







async function update_blog(formData) {
    try {
 
        // Extract blog ID
        const id = formData.get('id');
        if (!id) {
            return new Response(
                JSON.stringify({
                    status: 400,
                    message: 'Blog ID is required',
                })
            );
        }

        // Extracting form fields
        const title = formData.get('title');
        const short_description = formData.get('short_description');
        const content = formData.get('content');
        const featured_image = formData.get('featured_image'); // This will be a File object
        const author = formData.get('author');
        const published_at = formData.get('published_at');
        const category = formData.get('category');
        const is_popular = parseInt(formData.get('is_popular'), 10) || 0;
        const is_featured = parseInt(formData.get('is_featured'), 10) || 0;
        const status = parseInt(formData.get('status'), 10) || 1;
        const reading_time = parseInt(formData.get('reading_time'), 10) || 5;

        // Prepare update object
        const updateFields = {};
        let imageName = '';

        // Handle file upload (similar to add_blog)
        if (featured_image && featured_image.size > 0) {
            const filepath = path.join(
                process.env.NEXT_PUBLIC_EXTERNAL_PATH_DIR,
                process.env.NEXT_PUBLIC_ABOUT_PATH_DIR
            );
            
            try {
                await fs.access(filepath);
            } catch {
                await fs.mkdir(filepath, { recursive: true });
            }

            imageName = featured_image.name;
            const image_url = path.join(filepath, imageName);
            await fs.writeFile(image_url, Buffer.from(await featured_image.arrayBuffer()));
            
            // Add image to update fields
            updateFields.featured_image = imageName;
        }

        // Add other fields to update if they exist
        if (title) updateFields.title = title;
        if (short_description) updateFields.short_description = short_description;
        if (content) updateFields.content = content;
        if (author) updateFields.author = author;
        if (published_at) updateFields.published_at = published_at;
        if (category) updateFields.category = category;
        if (!isNaN(is_popular)) updateFields.is_popular = is_popular;
        if (!isNaN(is_featured)) updateFields.is_featured = is_featured;
        if (!isNaN(status)) updateFields.status = status;
        if (!isNaN(reading_time)) updateFields.reading_time = reading_time;

        // Construct update query dynamically
        const updateFieldsArray = Object.keys(updateFields).map(key => `${key} = ?`);
        const values = [...Object.values(updateFields), id];

        if (updateFieldsArray.length === 0) {
            return new Response(
                JSON.stringify({
                    status: 400,
                    message: 'No fields to update',
                })
            );
        }

        // Execute the update query
        await query({
            query: `
                UPDATE blogs
                SET ${updateFieldsArray.join(', ')}
                WHERE id = ?
            `,
            values,
        });

        return new Response(
            JSON.stringify({
                status: 200,
                message: 'Blog updated successfully',
            })
        );
    } catch (error) {
        console.error("Update blog error:", error);
        return new Response(
            JSON.stringify({
                status: 500,
                message: 'Internal Server Error',
                error: error.message,
            })
        );
    }
}



async function delete_blog(data) {
    try {
        const { id } = data;

        await query({
            query: 'DELETE FROM blogs WHERE id = ?',
            values: [id],
        });

        return new Response(
            JSON.stringify({
                status: 200,
                message: 'Blog deleted successfully',
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

async function get_blog(data) {
    const { id } = data;



    try {
        const blog = await query({
            query: 'select * from blogs where id = ?',
            values: [id],
        });


        return new Response(
            JSON.stringify({
                status: 200,
                blog: blog,
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

async function get_blogs() {

    try {
        const blogs = await query({
            query: 'select * from blogs',
            values: [],
        });


        return new Response(
            JSON.stringify({
                status: 200,
                blogs: blogs,
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