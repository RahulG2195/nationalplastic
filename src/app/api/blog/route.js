import { query } from '@/lib/db';


export async function GET(request) {
    try {
        const blogs = await query({
            query: 'SELECT * FROM blogs where status = 1',
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


export async function POST(request) {
    try {
        const data = await request.json();
        const { action } = data;

        switch (action) {
            case 'ADD':
            case 'category_wise':
                return await category_wise(data);
            case 'DELETE':
                return await deleteBlogPost(data);
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

async function category_wise(data) {
    const { category } = data;
    if (!category) {
        return new Response(
            JSON.stringify({ status: 400, message: 'Category is required' }),
            { status: 400 }
        );
    }
    try {
        const blogs = await query({
            query: 'select * from blogs where category = ?',
            values: [category],
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