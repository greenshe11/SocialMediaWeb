

import connectMongoDB from "../../libs/mongodb";
import {NextResponse} from "next/server";
import Room from "@/app/models/room";
import RoomMembers from "@/app/models/roomMembers";

export async function POST(request){
    await connectMongoDB();
    const room = await Room.create({})
    return NextResponse.json(room,{status: 201})
}


