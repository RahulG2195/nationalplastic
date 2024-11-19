import { query } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// Function to fetch all jobs
export async function GET(req, res) {
    try {
        const results = await query({
            query: "SELECT * FROM jobs", // Assuming you have a table named 'jobs'
            values: [],
        });

        return new Response(
            JSON.stringify({
                jobs: results,
            })
        );
    } catch (err) {
        return NextResponse.json({ success: false, error: "Failed to fetch jobs", message: err.message });
    }
}

// Function to create a job
const createJob = async (role, type, location) => {
    try {
        if (!role || !type || !location) {
            return false;
        }

        // Insert new job
        const result = await query({
            query: 'INSERT INTO jobs (role, type, location, status) VALUES (?, ?, ?, 1)', // Defaulting status to '1' (active)
            values: [role, type, location],
        });

        return result.insertId; // Returning the inserted job ID
    } catch (error) {
        console.error('Error creating job:', error.message);
        return false;
    }
};

// POST request for creating or adding a new job
export async function POST(request) {
    try {
        const { role, type, location } = await request.json();

        // Create a job
        const jobId = await createJob(role, type, location);
        if (jobId) {
            return NextResponse.json(
                { success: true, id: jobId },
                { status: 201 }
            );
        } else {
            return NextResponse.json(
                { success: false, message: 'Failed to create job' },
                { status: 500 }
            );
        }
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}

// Function to update a job
export async function PUT(request) {
    try {
        const { id, role, type, location, status } = await request.json();
        console.log("id is here ", id)

        const result = await query({
            query: 'UPDATE jobs SET role = ?, type = ?, location = ?, status = ? WHERE id = ?',
            values: [role, type, location, status, id]
        });

        if (result.affectedRows === 0) {
            return NextResponse.json({ success: false, message: 'Job not found or no changes made' }, { status: 404 });
        }

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}

// Function to delete a job
export async function DELETE(request) {
    try {
        const { id } = await request.json();

        // First, delete the job
        const result = await query({
            query: 'DELETE FROM jobs WHERE id = ?',
            values: [id],
        });

        if (result.affectedRows === 0) {
            return NextResponse.json({ success: false, message: 'Job not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
