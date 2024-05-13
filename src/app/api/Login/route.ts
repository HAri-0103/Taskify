import { dbConnect } from "@/DbConfig/dbConfig";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { User } from "@/Models/UserModel";
import jwt from "jsonwebtoken";



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
            email:user.email,
            userId:user._id,
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