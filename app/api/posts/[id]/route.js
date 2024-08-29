import { NextResponse } from "next/server";
import connectMongoDB from "../../../libs/mongodb";
import Posts from "@/app/models/posts";
import { getServerSession } from 'next-auth/next';
import { authOptions } from "../../auth/[...nextauth]/route";

export async function PUT(request,{params}){
    const {id} = params;
    const {description} = await request.json();
   
    await connectMongoDB();
    const content= await Posts.findByIdAndUpdate(id,  {description});
    return NextResponse.json({content}, {status: 200});
}

export async function GET(request, {params}){
    const {id} = params;
    console.log(id)
    await connectMongoDB();
    const posts = await Posts.find({userId: id});
    return NextResponse.json({posts}, {status:200});
}