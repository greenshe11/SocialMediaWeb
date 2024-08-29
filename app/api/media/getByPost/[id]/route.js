import { NextResponse } from "next/server";
import Media from '@/app/models/media';
import connectMongoDB from "@/app/libs/mongodb";

export async function GET(request, {params}){
    const {id} = params;
    await connectMongoDB();
    const media = await Media.findOne({postId: id});
    return NextResponse.json({media}, {status:200});
}