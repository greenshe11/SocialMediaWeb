import { NextResponse } from "next/server";
import connectMongoDB from "../../../libs/mongodb";
import Account from "@/app/models/accounts";
import { getServerSession } from 'next-auth/next';
import { authOptions } from "../../auth/[...nextauth]/route";

export async function PUT(request,{params}){
    const {id} = params;
    const {username, profileImg, address, birthdate} = await request.json();
   
    await connectMongoDB();
    const content= await Account.findByIdAndUpdate(id,  {username, profileImg, address, birthdate});
    console.log(content);
    return NextResponse.json({content}, {status: 200});
}


export async function GET(request, {params}){
    const {id} = params;
    await connectMongoDB();
    // Get session information
    const session = await getServerSession(authOptions);

    // Check if session exists
    if (!session) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Check if the session user ID matches the requested ID
    console.log(session?.id)
    console.log(id)
    if (session?.id !== id) {
        return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    const account = await Account.findOne({_id: id});
    return NextResponse.json({account}, {status:200});
}