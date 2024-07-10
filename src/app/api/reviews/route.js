import { query } from "@/lib/db";

export async function GET(request) {
    try {
        const reviews = await query({
            query: "SELECT * FROM review",
            values: [],
        });
        return new Response(JSON.stringify({
            review: reviews,
        }), { status: 200 });

    } catch (error) {
        return new Response(JSON.stringify({
            status: 500,
            message: error.message
        }));
    }
}

export async function POST(request) {
    try {
        const { user_id, username, product_id, review_message, review_rate } = await request.json();

        // Validate input
        if (!user_id || !username || !product_id || !review_message || !review_rate) {
            return Response.json({ message: 'Missing required fields' }, { status: 400 });
        }

        if (review_rate < 1 || review_rate > 5) {
            return Response.json({ message: 'Rating must be between 1 and 5' }, { status: 400 });
        }

        const result = await query({
            query: `INSERT INTO review (user_id, username, product_id, review_message, review_status, review_rate)
                    VALUES (?, ?, ?, ?, ?, ?)`,
            values: [user_id, username, product_id, review_message, 0, review_rate]
        });
        return new Response(JSON.stringify({
            result: "Successfully Added Review",
        }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({
            status: 500,
            message: error.message
        }));
    }
}

export async function PUT(request) {
    try {
        const body = await request.json();
        const productId = body.product_id;

        if (!productId) {
            return new Response(JSON.stringify({
                status: 400,
                message: "product_id is required"
            }), { status: 400 });
        }

        const productReview = await query({
            query: "SELECT * FROM review WHERE product_id = ?",
            values: [productId],
        });

        const dummyReviews = await query({
            query: "SELECT * FROM review WHERE product_id != ?",
            values: [productId],
        });

        return new Response(JSON.stringify({
            review: productReview.length > 0 ? productReview[0] : null,
            dummyReviews: dummyReviews,
        }), { status: 200 });

    } catch (error) {
        return new Response(JSON.stringify({
            status: 500,
            message: error.message
        }), { status: 500 });
    }
}