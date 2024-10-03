
import connectMongoDB from "@/app/libs/mongodb";
import {NextResponse} from "next/server";
import FriendRequest from "@/app/models/friendRequest";
import Room from "@/app/models/room";
import RoomMembers from "@/app/models/roomMembers";

export async function POST(request){
    const filter = await request.json()
    await connectMongoDB();
    const rooms = await RoomMembers.find(filter);
    return NextResponse.json(rooms, {status:200});
}
