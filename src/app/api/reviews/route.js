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
        query: "SELECT * FROM review WHERE product_id = ? and review_status = 1",
        values: [product_id],
    });
    console.log(productReview);
    const dummyReviews = await query({
        query: "SELECT * FROM review WHERE product_id != ? and review_status = 1",
        values: [product_id],
    });

    return new Response(JSON.stringify({
        review: productReview.length > 0 ? productReview : null,
        dummyReviews: dummyReviews,
    }), { status: 200 });
}

export async function GET(req) {
    try {
        const review = await query({
            query: `
                SELECT * from review
            `,
            values: [],
        });
        
        return new Response(
            JSON.stringify({
                success: true,
                review: review
            })
        );
    } catch (e) {
        return new Response(
            JSON.stringify({ success: false, message: e.message }),
            { status: 500 }
        );
    }
}

export async function PUT(req) {
    try {
        const body = await req.json();
        const { review_id, review_status } = body;

        if (!review_id) {
            return new Response(
                JSON.stringify({ success: false, message: "Review ID is required" }),
                { status: 400 }
            );
        }

        const updateQuery = `
            UPDATE review 
            SET review_status = ?
            WHERE review_id = ?
        `;

        await query({
            query: updateQuery,
            values: [review_status, review_id],
        });

        return new Response(
            JSON.stringify({
                success: true,
                message: "Review status updated successfully"
            })
        );
    } catch (e) {
        return new Response(
            JSON.stringify({ success: false, message: e.message }),
            { status: 500 }
        );
    }
}

export async function DELETE(req) {
    try {
        const body = await req.json();
        const { review_id } = body;

        if (!review_id) {
            return new Response(
                JSON.stringify({ success: false, message: "Review ID is required" }),
                { status: 400 }
            );
        }

        const deleteQuery = "DELETE FROM review WHERE review_id = ?";

        const result = await query({
            query: deleteQuery,
            values: [review_id],
        });

        if (result.affectedRows === 0) {
            return new Response(
                JSON.stringify({ success: false, message: "Review not found" }),
                { status: 404 }
            );
        }

        return new Response(
            JSON.stringify({
                success: true,
                message: "Review deleted successfully"
            })
        );
    } catch (e) {
        return new Response(
            JSON.stringify({ success: false, message: e.message }),
            { status: 500 }
        );
    }
}