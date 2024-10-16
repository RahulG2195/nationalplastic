import { query } from '@/lib/db';


export async function GET(req){
    try{
        const results = await query({
            // query:"select * from financialresults",
            query:"SELECT * from investors;",
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