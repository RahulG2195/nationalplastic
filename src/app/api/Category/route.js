import { query } from "@/lib/db";

export async function GET(request) {
    try {
        const Categories = await query({
            query: "SELECT * FROM categories",
            values: [],
        });
        const topPick = await query({
            query: "SELECT * FROM categories where topPick = 1",
            values: [],
        });

        return new Response(JSON.stringify({
            status: 200,
            categories: Categories,
            topPick:topPick
        }));

    } catch (error) {
        return new Response(JSON.stringify({
            status: 500,
            message: "Internal Server Error"
        }));
    }
}

export async function POST(request) {
    try {
        const { category_name } = await request.json();
        const values = [category_name];
        const updateCategories = await query({
            query: "INSERT INTO categories (category_name) VALUES (?)",
            values: [values],
        });
        const result = updateCategories.affectedRows;
        let message = result ? "success" : "error";
        const category = {
            category_name: category_name,
        };
        return new Response(JSON.stringify({
            message: message,
            status: 200,
            category: category
        }));
    } catch (error) {
        return new Response(JSON.stringify({
            status: 500,
            data: error.message
        }));
    }
}

export async function PUT(request) {
    try {
        const { category_id, category_name } = await request.json();
        const updateCategories = await query({
            query: "UPDATE categories SET category_name = ? WHERE id = ?",
            values: [category_name, category_id],
        });
        const result = updateCategories.affectedRows;
        let message = result ? "success" : "error";
        const category = {
            id: id,
            category_name: category_name,
        };
        return new Response(JSON.stringify({
            message: message,
            status: 200,
            category: category
        }));
    } catch (error) {
        return new Response(JSON.stringify({
            status: 500,
            data: error.message
        }));
    }
}

export async function DELETE(request) {
    try {
        const { id } = await request.json();
        const deleteCategories = await query({
            query: "DELETE FROM categories WHERE id = ?",
            values: [id],
        });
        const result = deleteCategories.affectedRows;
        let message = result ? "success" : "error";
        const category = {
            id: id,
        };
        return new Response(JSON.stringify({
            message: message,
            status: 200,
            category: category
        }));
    } catch (error) {
        return new Response(JSON.stringify({
            status: 500,
            data: error.message
        }));
    }
}
