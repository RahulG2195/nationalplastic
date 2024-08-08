import { query } from '@/lib/db';
import formidable from 'formidable';
import fs from 'fs/promises';
import path from 'path';
export const dynamic = 'force-dynamic';
export const bodyParser = false;
export async function GET(request){
    try{
        const { searchParams } = new URL(request.url);
        const report = searchParams.get("report");
        const results = await query({
            // query:"select * from navitems",
            query:"SELECT content from pages where title = ?;",
            values:[report],
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