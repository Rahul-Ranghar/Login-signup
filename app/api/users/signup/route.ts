import { connect } from "@/database/dbconnection";
import User from "@/models/usermodel";
import { NextRequest, NextResponse } from "next/server";


connect();

export async function POST(req: NextRequest) {
    try {
        const body = await req.json(); 
        const { username, email, password } = body;
        let user = await User.findOne({email});
        if(user)
            return NextResponse.json({error:"User already exists"}, {status:400});

        user = await User.create({
            username,
            email,
            password,
        });

        return NextResponse.json({message:"User registered successfully!"}, {status:201});
        
    } catch (error:any) {
        return NextResponse.json({error:error.message}, {status:500});
    }
}