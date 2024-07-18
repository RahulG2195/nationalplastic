import { query } from '@/lib/db';

export async function GET(request){
    try{
        const results = await query({
            query:"SELECT * from navitems where parentId = 17;",
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
