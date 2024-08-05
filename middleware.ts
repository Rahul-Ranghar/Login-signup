import { NextRequest, NextResponse } from "next/server";
export function middleware(req:NextRequest){
    const path=req.nextUrl.pathname;
    const token=req.cookies.get("token")?.value || "";
    const isPathPublic = path =="/login" || path=="/signup";
    if(isPathPublic && token){
        return NextResponse.redirect(new URL('/',req.nextUrl));
    }
    if(!isPathPublic && !token){
        return NextResponse.redirect(new URL("/login", req.nextUrl))
    }
    }
    export const config={
        matcher:[
            "/",
            "/login",
            "/signup"
        ]
    }