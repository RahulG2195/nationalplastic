import { NextResponse } from "next/server";
import { query } from "@/lib/db";

const validateDate =(start_date,end_date) =>{
    const currentDate = new Date();
    const start = new Date(start_date);
    const end = new Date(end_date);
    return currentDate >= start && currentDate <= end;
}
export async function POST (req){
    try{
        const { code } = await req.json();
        console.log("code of coupen ",code)
        const isValid = await query({
            query:"select * from coupons where code = ?",
            values:[code]
        })
        if (isValid.length === 0) {
            throw new Error('Invalid Coupon');
        }
        const { discount_value,end_date,is_active,start_date } = isValid[0];
        if(is_active === 0){
            throw new Error("Token is not active");
        }
        const validRange = validateDate(start_date, end_date);
        if(!validRange){
            throw new Error("Token is not Valid anymore");
        }
        console.log("AllValues",discount_value,end_date,is_active,start_date)
        return new Response(
            JSON.stringify({
                status: 200,
                message:discount_value
            }),{
                status:200
            }
        )
    }catch(e){
        return new Response(
            JSON.stringify({
                success:false,
                message:e.message
            }),{
                status:200
            }
        )
    }
}