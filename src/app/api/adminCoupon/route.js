import { query } from '@/lib/db';


export async function GET(req){
    try{
        const coupons = await query({
            query:"select * from coupons",
            values:[],
        })
        return new Response(
            JSON.stringify({
                success:true , coupons: coupons
            })
        )
    }catch(e){
    console.log(e.message);
         return new Response(
            JSON.stringify({success:false, message:e.message}),
            {status:500}
         ); 
    }
}
export async function POST(req) {
    try {
        // Parse the JSON body from the request
        const body = await req.json();

        // Destructure the required fields from the body
        const { 
            code, 
            codeDiscount, 
            codePrefix, 
            codeSpecialChar, 
            discount_value, 
            end_date, 
            start_date,
            is_active
        } = body;

        // Validate that all required fields are present
        if (!code || !codeDiscount || !codePrefix || !codeSpecialChar || !discount_value || !end_date || !start_date) {
            return new Response(
                JSON.stringify({ success: false, message: "Missing required fields" }),
                { status: 400 }
            );
        }

        // Construct the SQL query to insert the new coupon
        const insertQuery = `
            INSERT INTO coupons (code, discount_value, start_date, end_date,is_active)
            VALUES (?, ?, ?, ?,?)
        `;

        // Execute the insert query
        const result = await query({
            query: insertQuery,
            values: [code, discount_value, start_date, end_date,is_active],
        });

        // If the insert was successful, return a success response
        return new Response(
            JSON.stringify({
                success: true,
                message: "Coupon added successfully",
                couponId: result.insertId
            }),
            { status: 201 }
        );
    } catch (e) {
        console.error(e.message);
        return new Response(
            JSON.stringify({ success: false, message: e.message }),
            { status: 500 }
        );
    }
}
export async function PUT(req) {
    try {
        // Parse the JSON body from the request
        const body = await req.json();

        // Destructure the required fields from the body
        const { 
            code, 
            codeDiscount, 
            codePrefix, 
            codeSpecialChar, 
            discount_value, 
            end_date, 
            start_date,
            is_active = 0,
            id  // Assuming you're passing an id to identify which coupon to update
        } = body;

        // Validate that all required fields are present
        if (!code || !codeDiscount || !codePrefix || !codeSpecialChar || !discount_value || !end_date || !start_date || !id) {
            return new Response(
                JSON.stringify({ success: false, message: "Missing required fields" }),
                { status: 400 }
            );
        }

        // Construct the SQL query to update the coupon
        const updateQuery = `
            UPDATE coupons
            SET code = ?,
                discount_value = ?,
                start_date = ?,
                end_date = ?,
                is_active = ?
            WHERE id = ?
        `;

        // Execute the update query
        await query({
            query: updateQuery,
            values: [code, discount_value, start_date, end_date,is_active, id],
        });

        // If the update was successful, return a success response
        return new Response(
            JSON.stringify({
                success: true,
                message: "Coupon updated successfully"
            }),
            { status: 200 }
        );
    } catch (e) {
        console.error(e.message);
        return new Response(
            JSON.stringify({ success: false, message: e.message }),
            { status: 500 }
        );
    }
}

export async function DELETE(req) {
    try {
        // Parse the JSON body from the request
        const body = await req.json();

        // Extract the id from the request body
        const { id } = body;

        // Validate that the id is present
        if (!id) {
            return new Response(
                JSON.stringify({ success: false, message: "Missing coupon ID" }),
                { status: 400 }
            );
        }

        // Construct the SQL query to delete the coupon
        const deleteQuery = "DELETE FROM coupons WHERE id = ?";

        // Execute the delete query
        const result = await query({
            query: deleteQuery,
            values: [id],
        });

        // Check if a coupon was actually deleted
        if (result.affectedRows === 0) {
            return new Response(
                JSON.stringify({ success: false, message: "No coupon found with the given ID" }),
                { status: 404 }
            );
        }

        // If the deletion was successful, return a success response
        return new Response(
            JSON.stringify({
                success: true,
                message: "Coupon deleted successfully"
            }),
            { status: 200 }
        );
    } catch (e) {
        console.error(e.message);
        return new Response(
            JSON.stringify({ success: false, message: e.message }),
            { status: 500 }
        );
    }
}