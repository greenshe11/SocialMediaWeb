import Account from "../../models/accounts";
import connectMongoDB from "../../libs/mongodb";
import {NextResponse} from "next/server";

export async function POST(request){
    const {email, password, username, profileImg, address, birthdate} = await request.json();
    await connectMongoDB();
    await Account.create({email, password, username, profileImg, address, birthdate});
    return NextResponse.json({message: "New Account Created!"},{status: 201})
} 
/*
export async function PUT(request,{params}){
    const {id} = params;
    const {newTitle: title, newDescription: description} = await request.json();
    await connectMongoDB();
    await Topic.findByIdAndUpdate(id, {title, description});
    
    return NextResponse.json({message: "Topic updated"}, {status: 200});
}*/

export async function GET(request){
    await connectMongoDB();

    const content = await Account.find()
    return NextResponse.json({content}, {status:200});
}