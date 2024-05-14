import { dbConnect } from "@/DbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { User } from "@/Models/UserModel";
import jwt, { JwtPayload } from "jsonwebtoken";



export async function POST(req:Request){
    await dbConnect();
    try {
        const {email,password} = await req.json();
        const user = await User.findOne({email:email});
        if(!email){
            return NextResponse.json({
                message:"Invalid Input"
            },{status:400})
        }
        const passwordMatch = await bcrypt.compare(password,user.password);
        if(!passwordMatch){
            return NextResponse.json({
                message:"Invalid Input"
            },{status:400})
        }
        const tokenData= {
            username:user.username,
            email:user.email,
            id:user._id,
            avatar:user.avatar,
        }
        const token = await jwt.sign(tokenData,process.env.JWT_SECRET!,{expiresIn:"1h"})

        const response = NextResponse.json({message:"Login Successful"},{status:200})
        response.cookies.set("token",token,{httpOnly:true})
        return response;
        return NextResponse.json({message:"Login Successfull"},{status:200})
    } catch (error:any) {
        return NextResponse.json({eror:error},{status:500})
    }
}

export async function GET(req:NextRequest){
    dbConnect();
    try {
        const cookie = req.cookies.get("token");
        const verifyToken: JwtPayload | any = jwt.verify(cookie?.value || "", process.env.JWT_SECRET!);
        const user = await User.findById(verifyToken.id);
        const userData = {
            id:user._id,
            username:user.username,
            email:user.email,
            avatar:user.avatar,
        }
        return NextResponse.json({
            status: 200,
            data: userData
        });
    } catch (error:any) {
        return NextResponse.json({
            status: 400,
            message: "Error fetching tasks"+error
        })
    }
}

export async function DELETE(req:NextRequest){
    dbConnect();
    try {
        const response = NextResponse.json({
            status: 200,
        })
        response.cookies.set("token","",{httpOnly:true,expires: new Date(0)});
        return response;
    } catch (error:any) {
        return NextResponse.json({
            status: 400,
            message: "Error updating tasks"+error
        })
    }
}