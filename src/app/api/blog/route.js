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