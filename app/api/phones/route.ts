import { NextResponse } from "next/server";
import { createClient} from "@/BackendClient/supabase";

export const dynamic = 'force-dynamic';

export async function GET() {
    try{
        const supabase = await createClient();
        const {data,error} = await supabase.from('products').select(`*,categories(id,name)`).order('created_at',{ascending:false});

        if (error){
            console.error('Supabase error:',error);
            return NextResponse.json({error:error.message},{status:500});
        }

        return NextResponse.json(data);
    }catch(err){
        console.error('Неизвестная ошибка:',err);
        return NextResponse.json({error:"Внутренняя ошибка сервера"},{status:500});
    }

}