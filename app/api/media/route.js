import {NextResponse} from 'next/server';
import {writeFile} from 'fs/promises';
import { join } from 'path';
import connectMongoDB from '@/app/libs/mongodb';
import Media from '@/app/models/media';

export async function POST(request){
    const data = await request.formData();
    const file = data.get('file');
    const postId = data.get('postId')
    const mediaType = data.get('mediaType')
    if (!file){
        return NextResponse.json({success: false});
    }
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await connectMongoDB();
    const media = await Media.create({mediaData: buffer, postId: postId, mediaType: mediaType});
    return NextResponse.json({_id: media._id});
}

export async function GET(){
    await connectMongoDB();
    const uploads = await Media.find();
    return NextResponse.json({uploads});
}