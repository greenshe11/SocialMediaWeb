
import connectMongoDB from "@/app/libs/mongodb";
import {NextResponse} from "next/server";
import FriendRequest from "@/app/models/friendRequest";
import Chat from "@/app/models/chat";

export async function POST(request){
    // creates a reaction to a post
  
    const body = await request.json();
    console.log("SENIDNG", body)
    await connectMongoDB();

    const purpose = body.purpose
    const roomId = body.roomId
    let res = null
    if (purpose== 'send'){
        res = await Chat.create({
            userId:body.userId, 
            roomId:roomId, 
            message: body.message})
        console.log("SENDING MESSAGE", res)
    }else if (purpose=='getAll'){
        res = await Chat.find({roomId})
    }else{
        throw new Error('purpose not found')
    }

    return NextResponse.json(res,{status: 201})
}