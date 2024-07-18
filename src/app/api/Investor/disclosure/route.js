import { query } from '@/lib/db';

export async function GET(request){
    try{
        const { searchParams } = new URL(request.url);
        const year = searchParams.get("year");
        const results = await query({
            // query:"select * from navitems",
            query:"SELECT * from disclosure_data where year = ?;",
            values:[year],
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


