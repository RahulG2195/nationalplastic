import { query } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req, res) {
    try {
        const results = await query({
            query: "SELECT * FROM faqs ",
            values: [],
        })

        return new Response(
            JSON.stringify({
                faqs: results
            })
        )
    } catch (err) {
        return NextResponse.json({ success: false, error: "Failed  To fetch faq's", message: err.message });
    }
}
const createFaqCategory = async  (question) => {
    try {
        if (!question) {
            return false;
        }

        // Insert new category
        const result = await query({
            query: 'INSERT INTO faqs (question, root_id, answer, status) VALUES (?, NULL, NULL, 1)',
            values: [question]
        });
        return true;
    } catch (error) {
        console.error('Error creating category:', error.message);
        return false;
    }
}

export async function POST(request) {
    try {
        const { question, answer, root_id,category =false } = await request.json();
        

        if(category){
            const response = await createFaqCategory(question);
            if(response){
            return NextResponse.json(
                { success: true },
                { status: 200 }
            );
        }else{
            return NextResponse.json(
                { success: false, message: 'Failed to create category' },
                { status: 500 }
            );
        }
        }
        
        const result = await query({
            query: 'INSERT INTO faqs (question, answer, root_id, status) VALUES (?, ?, ?, 1)',
            values: [question, answer, root_id]
        });
        
        return NextResponse.json({ success: true, id: result.insertId }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}

export async function PUT(request) {
    try {
        const { id, question, answer, status } = await request.json();
        
        const result = await query({
            query: 'UPDATE faqs SET question = ?, answer = ?, status = ? WHERE id = ?',
            values: [question, answer, status, id]
        });
        
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}

export async function DELETE(request) {
    try {
        const { id } = await request.json();
        
        // First delete all child FAQs
        await query({
            query: 'DELETE FROM faqs WHERE root_id = ?',
            values: [id]
        });
        
        // Then delete the parent FAQ
        await query({
            query: 'DELETE FROM faqs WHERE id = ?',
            values: [id]
        });
        
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}


