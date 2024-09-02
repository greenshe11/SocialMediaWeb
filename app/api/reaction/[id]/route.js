import { NextResponse } from "next/server";
import connectMongoDB from "../../../libs/mongodb";
import Reaction from "@/app/models/reaction";

export async function PUT(request,{params}){
    // changes the reaction of the reactor
    const {id} = params;
    const {reaction, postId} = await request.json();
   
    await connectMongoDB();
    const content = await Reaction.findOneAndUpdate({reactorId: id, postId}, {reaction})
    return NextResponse.json({content}, {status: 200});
}

export async function DELETE(request,{params}){
    // changes the reaction of the reactor
    const {id} = params;
    const {postId} = await request.json();
    await connectMongoDB();
    const content = await Reaction.findOneAndDelete({reactorId: id, postId})
    return NextResponse.json({content}, {status: 200});
}

export async function GET(request, {params}){
    // gets the reactions in a post
    const {id} = params;
    await connectMongoDB();
    const content = await Reaction.find({postId: id});
    return NextResponse.json({content}, {status:200});
}

export async function POST(request, {params}){
    // gets the reactions in a post
    const {id} = params;
    const {reactorId} = await request.json();
    await connectMongoDB();
    const content = await Reaction.findOne({postId: id, reactorId});
    return NextResponse.json({content}, {status:200});
}

