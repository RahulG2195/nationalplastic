import { query } from "@/lib/db";
import {isValidReason} from "@/utils/validation";

export async function POST(request) {
    return await handleAction(request);
}

async function handleAction(request) {
    try {
        const body = await request.json();
        const { action } = body;
        switch (action) {
            case 'postReview':
                return await postReview(body);
            case 'getProductReviews':
                return await getProductReviews(body);
            default:
                return Response.json({ message: 'Invalid action' }, { status: 400 });
        }
    } catch (error) {
        return new Response(JSON.stringify({
            status: 500,
            message: error.message
        }));
    }
}

async function postReview(body) {
    const { customer_id, product_id, review_message, review_rate ,userEmail = "User"} = body;

    // Validate input
    if (!customer_id || !product_id || !review_message || !review_rate ) {
        return Response.json({ message: 'Missing required fields' }, { status: 400 });
    }
    if (!isValidReason(review_message)) {
        return Response.json({ message: 'Not a valid review' }, { status: 403 });
      }

    if (review_rate < 1 || review_rate > 5) {
        return Response.json({ message: 'Rating must be between 1 and 5' }, { status: 400 });
    }
    
    try {
        const result = await query({
            query: `INSERT INTO review (user_id, product_id, review_message, review_rate, username)
                    VALUES (?, ?, ?, ?, ?)`,
            values: [customer_id, product_id, review_message, review_rate, userEmail]
        });

        if (result.affectedRows > 0) {
            return new Response(JSON.stringify({
                result: "Successfully Added Review",
            }), { status: 200 });
        } else {
            return Response.json({ message: 'Failed to add review' }, { status: 500 });
        }
    } catch (error) {
        console.error('Error adding review:', error);
        return Response.json({ message: 'Failed to add review' }, { status: 500 });
    }
}



async function getProductReviews(body) {
    const { product_id } = body;
    if (!product_id) {
        return new Response(JSON.stringify({
            status: 400,
            message: "product_id is required"
        }), { status: 400 });
    }

    const productReview = await query({
        query: "SELECT * FROM review WHERE product_id = ?",
        values: [product_id],
    });

    const dummyReviews = await query({
        query: "SELECT * FROM review WHERE product_id != ?",
        values: [product_id],
    });

    return new Response(JSON.stringify({
        review: productReview.length > 0 ? productReview[0] : null,
        dummyReviews: dummyReviews,
    }), { status: 200 });
}