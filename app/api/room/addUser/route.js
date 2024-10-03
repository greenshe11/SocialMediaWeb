
import connectMongoDB from "@/app/libs/mongodb";
import {NextResponse} from "next/server";
import FriendRequest from "@/app/models/friendRequest";
import Room from "@/app/models/room";
import RoomMembers from "@/app/models/roomMembers";

export async function POST(request){
    // creates a reaction to a post
    let members = []

    const {userId, roomId} = await request.json();
    await connectMongoDB();
    if (typeof userId== 'string'){
        members.push(await RoomMembers.create({userId: userId, roomId: roomId}))
    }
    else{
        for (let i=0; i<userId.length; i++){
            members.push(await RoomMembers.create({userId: userId[i], roomId: roomId}))
        }   
    }
    
    return NextResponse.json({content: members},{status: 201})
}