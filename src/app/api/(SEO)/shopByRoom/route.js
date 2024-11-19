import { query } from "@/lib/db";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    try {
        const [shopbyroom] = await query({
            query: `SELECT tag_seo, meta_description from tags_cat where tag_seo = ?`,
            values: [id],
        });
        return new Response(JSON.stringify({
            status: 200,
            meta_title: shopbyroom.tag_seo,
            meta_description: shopbyroom.meta_description,
            id,
        }));
    } catch (error) {
        return new Response(JSON.stringify({
            status: 500,
            message: error.message,
        }), { status: 500 });
    }
}

