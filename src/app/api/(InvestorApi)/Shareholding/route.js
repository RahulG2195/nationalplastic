import { query } from '@/lib/db';

export async function POST(request) {
    try {
        let {type} = await request.json();
        let results = '';
        if(type == 'shareholdings'){
            results = await query({query: `SELECT 
                years,
                MAX(CASE WHEN quarter = 'Q1' THEN JSON_OBJECT('title', title, 'file_name', file_name) END) as Q1,
                MAX(CASE WHEN quarter = 'Q2' THEN JSON_OBJECT('title', title, 'file_name', file_name) END) as Q2,
                MAX(CASE WHEN quarter = 'Q3' THEN JSON_OBJECT('title', title, 'file_name', file_name) END) as Q3,
                MAX(CASE WHEN quarter = 'Q4' THEN JSON_OBJECT('title', title, 'file_name', file_name) END) as Q4
            FROM 
                shareholding
            WHERE 
                status = 1
            GROUP BY 
                years
            ORDER BY 
                years DESC;`})
        }
       
        return new Response(
            JSON.stringify({
                results: results
            }, { status: 200 })
        )
    } catch (e) {
        return new Response(
            JSON.stringify({ success: false, message: e.message }),
            { status: 500 }
        );
    }
}