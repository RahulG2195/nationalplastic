import { query } from "@/lib/db";


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
            case 'validateOrder':
                return await validateOrder(body);
            case 'alreadyReviewed':
                return await checkAlreadyReviewed(body);
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
    const { user_id, username, product_id, review_message, review_rate } = body;

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
}

async function validateOrder(body) {
    const { customer_id, product_id } = body;
    console.log("customer_id", customer_id, product_id);
    const perOrderStatus = await query({
        query: "SELECT per_order_status FROM order_detail WHERE user_id = ? AND prod_id = ?",
        values: [customer_id, product_id],
    });
    console.log("preOrderStatus: " + JSON.stringify(perOrderStatus))
    console.log("preOrderStatus: " + perOrderStatus[0].per_order_status);
    const status = perOrderStatus[0].per_order_status;
    console.log("status: " + status);

    if (!user_id || !product_id) {
        return Response.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Assuming you have an 'orders' table
    const result = await query({
        query: `SELECT * FROM orders WHERE user_id = ? AND product_id = ? AND status = 'completed'`,
        values: [user_id, product_id]
    });

    if (result.length > 0) {
        return new Response(JSON.stringify({
            result: "Order validated",
            canReview: true
        }), { status: 200 });
    } else {
        return new Response(JSON.stringify({
            result: "No valid order found",
            canReview: false
        }), { status: 200 });
    }
}

async function checkAlreadyReviewed(body) {
    const { user_id, product_id } = body;

    if (!user_id || !product_id) {
        return Response.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const result = await query({
        query: `SELECT * FROM review WHERE user_id = ? AND product_id = ?`,
        values: [user_id, product_id]
    });

    if (result.length > 0) {
        return new Response(JSON.stringify({
            result: "User has already reviewed this product",
            alreadyReviewed: true
        }), { status: 200 });
    } else {
        return new Response(JSON.stringify({
            result: "User has not reviewed this product yet",
            alreadyReviewed: false
        }), { status: 200 });
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