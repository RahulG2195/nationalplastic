import { query } from '@/lib/db';


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

async function create_blog(data) {
    try {
        const {
            title, short_description, content, featured_image,
            author, published_at, category, meta_title,
            meta_description, meta_keywords, is_popular,
            status, reading_time, is_featured
        } = data;

        const result = await query({
            query: `
                INSERT INTO blogs 
                (title, short_description, content, featured_image, 
                author, published_at, category, meta_title, 
                meta_description, meta_keywords, is_popular, 
                status, reading_time, is_featured) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `,
            values: [
                title, short_description, content, featured_image,
                author, published_at, category, meta_title,
                meta_description, meta_keywords, is_popular || 0,
                status || 1, reading_time || 5, is_featured || 0
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
        return new Response(
            JSON.stringify({
                status: 500,
                message: 'Internal Server Error',
                error: e.message,
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


async function update_blog(data) {
    try {
        const {
            id,
            title,
            short_description,
            content,
            featured_image,
            author,
            category,
            meta_title,
            meta_description,
            meta_keywords,
            is_popular,
            status,
            reading_time,
            is_featured
        } = data;

        // Mapping fields to update
        const fieldsToUpdate = {
            title,
            short_description,
            content,
            featured_image,
            author,
            category,
            meta_title,
            meta_description,
            meta_keywords,
            is_popular,
            status,
            reading_time,
            is_featured,
        };

        const updateFields = [];
        const values = [];

        // Constructing query dynamically
        for (const [key, value] of Object.entries(fieldsToUpdate)) {
            if (value !== undefined) {
                updateFields.push(`${key} = ?`);
                values.push(value);
            }
        }

        // Ensure id is provided and append it to values for the WHERE clause
        if (!id) {
            return new Response(
                JSON.stringify({
                    status: 400,
                    message: 'Blog ID is required',
                })
            );
        }
        values.push(id);

        if (updateFields.length === 0) {
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
                SET ${updateFields.join(', ')} 
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
        return new Response(
            JSON.stringify({
                status: 500,
                message: 'Internal Server Error',
                error: error.message,
            })
        );
    }
}
