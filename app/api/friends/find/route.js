
import connectMongoDB from "../../../libs/mongodb";
import {NextResponse} from "next/server";
import FriendRequest from "@/app/models/friendRequest";

export async function POST(request){
    // creates a reaction to a post
    const res = await request.json()
    await connectMongoDB();
    const content = await FriendRequest.find(res)
    return NextResponse.json({content},{status: 201})
}

