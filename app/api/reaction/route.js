
import connectMongoDB from "../../libs/mongodb";
import {NextResponse} from "next/server";

import Reaction from "@/app/models/reaction";

export async function POST(request){
    // creates a reaction to a post
    const {reactorId, posterId, postId, reaction} = await request.json();
    console.log("CREATING", reactorId, posterId, postId, reaction)
    await connectMongoDB();
    const content = await Reaction.create({reactorId, posterId, postId, reaction});
    return NextResponse.json({content},{status: 201})
}