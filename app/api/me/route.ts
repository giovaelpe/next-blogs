import { getUserWithToken } from "@/app/services/users"
import { NextRequest, NextResponse } from "next/server";

export const GET = async(req : NextRequest) => {
    const token =  req.headers.get('authorization') as string;
    if(token && token.startsWith("Bearer ")){
        const user = await getUserWithToken(token.substring(7));
        if(!user){
            return NextResponse.json({error: "invalid token"}, {status: 404})
        }
        return NextResponse.json(user);
    }
    return NextResponse.json({error: "unauthorized"}, {status: 401})
}