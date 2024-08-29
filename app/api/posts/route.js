import Posts from "../../models/posts";
import connectMongoDB from "../../libs/mongodb";
import {NextResponse} from "next/server";

export async function POST(request){
    const {userId, description} = await request.json();
    await connectMongoDB();
    const content = await Posts.create({userId, description});
    return NextResponse.json({content},{status: 201})
} 
