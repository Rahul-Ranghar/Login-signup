import { connect } from "@/database/dbconnection";
import User from "@/models/usermodel";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connect();
export async function POST(req:NextRequest) {
try {
    const body = await req.json();
    const {email,password} =body;
    const user=await User.findOne({email});
    if(!user){
        return NextResponse.json({message:"user does not exist"},{status:400});
        console.log("user not exist");
    }
    if(password!=user.password){
        return NextResponse.json({message:'User does not exist'}, {status:400})
        console.log("Password wrong");
    }
    const tokenData={
        id:user._id,
        username:user.username,
        email:user.email
    }
    const token=await jwt.sign(tokenData, process.env.JWT!,{expiresIn:'1d'});
    const res =NextResponse.json({message: `welcome back ${user.username}`, success:true},{status:200});
    console.log("Login sucessfully");
    res.cookies.set("token",token,{httpOnly:true});
    return res;
} catch (error:any) {
    return NextResponse.json({error:error.message},{status:500});
}
    
}