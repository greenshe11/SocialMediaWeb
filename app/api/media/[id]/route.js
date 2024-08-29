import { NextResponse } from "next/server";
import connectMongoDB from "../../../libs/mongodb";
import Media from '@/app/models/media';

export async function GET(request, {params}){
    const {id} = params;
    await connectMongoDB();
    const media = await Media.findOne({_id: id});
    return NextResponse.json({media}, {status:200});
}

export async function PUT(request,{params}){
    const {id} = params;
    const data = await request.formData();
    const mediaData = data.get('mediaData');
    const postId = data.get('postId')
    const mediaType = data.get('mediaType')
    if (!mediaData){
        return NextResponse.json({success: false});
    }
    const bytes = await mediaData.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await connectMongoDB();
    await Media.findByIdAndUpdate(id,  {postId: postId, mediaType: mediaType, mediaData:buffer});
    return NextResponse.json({message: "Media updated"}, {status: 200});
}

