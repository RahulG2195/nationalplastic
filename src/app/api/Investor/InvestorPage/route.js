import { query } from '@/lib/db';

export async function GET(request){
    try{
       
        const results = await query({
            // query:"select * from navitems",
            query:"SELECT * from navitems;",
            values:[],
        })
        return new Response(
            JSON.stringify({
                results: results
            },{status:200})
        )
    }catch(e){
         return new Response(
            JSON.stringify({success:false, message:e.message}),
            {status:500}
         ); 
    }
}

export async function POST(request) {
    try {
        const {
            Id
        } = await request.json();
        const results = await query({
            query: "SELECT * from pages where nav_item_id = ?;",
            values: [Id],
        })
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