import { query } from "@/lib/db";
import {isValidReason} from "@/utils/validation";
const fs = require("fs").promises;
const path = require("path");


export async function POST(request) {
    return await handleAction(request);
}

async function handleAction(request) {
    try {
        const formData = await request.formData();
        const action = formData.get('action');
        
        switch (action) {
            case 'postReview':
                return await postReview(formData);
            case 'getProductReviews':
                return await getProductReviews(formData);
            default:
                return new Response(JSON.stringify({ message: 'Invalid action' }), { status: 400 });
        }
    } catch (error) {
        return new Response(JSON.stringify({
            status: 500,
            message: error.message
        }), { status: 500 });
    }
}

async function postReview(formData) {
    const customer_id = formData.get('customer_id');
    const product_id = formData.get('product_id');
    const review_message = formData.get('review_message');
    const review_rate = parseInt(formData.get('review_rate'), 10);
    const userEmail = formData.get('userEmail') || "User";
    const image = formData.get('image') || "";


    // Validate input
    if (!customer_id || !product_id || !review_message || !review_rate) {
        return new Response(JSON.stringify({ message: 'Missing required fields' }), { status: 400 });
    }
    if (!isValidReason(review_message)) {
        return new Response(JSON.stringify({ message: 'Not a valid review' }), { status: 403 });
    }
    if (review_rate < 1 || review_rate > 5) {
        return new Response(JSON.stringify({ message: 'Rating must be between 1 and 5' }), { status: 400 });
    }
    let imageName = '';

    // Handle file upload (similar to add_blog)
    if (image && image.size > 0) {
        const filepath = path.join(
            process.env.NEXT_PUBLIC_EXTERNAL_PATH_DIR,
            process.env.NEXT_PUBLIC_USER_PATH_DIR
        );
        
        try {
            await fs.access(filepath);
        } catch {
            await fs.mkdir(filepath, { recursive: true });
        }

        imageName = image.name;
        const image_url = path.join(filepath, imageName);
        await fs.writeFile(image_url, Buffer.from(await image.arrayBuffer()));
        
    }

    try {
        const result = await query({
            query: `INSERT INTO review (user_id, product_id, review_message, review_rate, username, image)
                    VALUES (?, ?, ?, ?, ?, ?)`,
            values: [customer_id, product_id, review_message, review_rate, userEmail, imageName]
        });

        if (result.affectedRows > 0) {
            return new Response(JSON.stringify({
                result: "Successfully Added Review",
            }), { status: 200 });
        } else {
            return new Response(JSON.stringify({ message: 'Failed to add review' }), { status: 500 });
        }
    } catch (error) {
        console.error('Error adding review:', error);
        return new Response(JSON.stringify({ message: 'Failed to add review' }), { status: 500 });
    }
}

async function getProductReviews(formData) {
    const product_id = formData.get('product_id');
    if (!product_id) {
        return new Response(JSON.stringify({
            status: 400,
            message: "product_id is required"
        }), { status: 400 });
    }

    try {
        const productReview = await query({
            query: "SELECT * FROM review WHERE product_id = ? and review_status = 1",
            values: [product_id],
        });

        const dummyReviews = await query({
            query: "SELECT * FROM review WHERE product_id != ? and review_status = 1",
            values: [product_id],
        });

        return new Response(JSON.stringify({
            review: productReview.length > 0 ? productReview : null,
            dummyReviews: dummyReviews,
        }), { status: 200 });
    } catch (error) {
        console.error('Error fetching reviews:', error);
        return new Response(JSON.stringify({ message: 'Failed to fetch reviews' }), { status: 500 });
    }
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