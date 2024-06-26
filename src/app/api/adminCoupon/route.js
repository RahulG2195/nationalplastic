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