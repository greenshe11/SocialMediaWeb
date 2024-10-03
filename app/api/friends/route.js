
import connectMongoDB from "../../libs/mongodb";
import {NextResponse} from "next/server";
import FriendRequest from "@/app/models/friendRequest";
import Room from "@/app/models/room";
import RoomMembers from "@/app/models/roomMembers";

export async function POST(request){
    // creates a reaction to a post
    const {sourceUserId, targetUserId} = await request.json();
    const state = "pending"
    await connectMongoDB();
    const content = await FriendRequest.create({sourceUserId, targetUserId, state});
    
    return NextResponse.json({content},{status: 201})
}

export async function DELETE(request){
    // changes the reaction of the reactor
    const res = await request.json();
    await connectMongoDB();
    const content = await FriendRequest.findOneAndDelete(res)
    return NextResponse.json({content}, {status: 200});
}

export async function PUT(request){
    // changes the reaction of the reactor
    const res = await request.json();
    console.log("FILTER",res.filter)
    console.log("REPLACEMENT", res.replacement)
    await connectMongoDB();
    const content = await FriendRequest.findOneAndUpdate(res.filter, res.replacement)
    return NextResponse.json({content}, {status: 200});
}
