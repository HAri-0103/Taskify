import  {dbConnect} from "@/DbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import {User} from "@/Models/UserModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dbConnect();
export async function POST(req: Request){
    try{
        const {avatar, username, email, password} = await req.json();
        if(!avatar || !username || !email || !password){
            return NextResponse.json({message: "Please fill all fields"}, {status: 400});
        }
        const userExist = await User.findOne({$or: [{email: email}, {username: username}]});
        if(userExist){
            return NextResponse.json({message: "User already exist"}, {status: 400});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser: User = new User({
            avatar,
            username,
            email,
            password: hashedPassword,
        });
        const data = {
            id: newUser._id,
            email: newUser.email,
            username: newUser.username,
            avatar: newUser.avatar
        }

        const token = await jwt.sign(data, process.env.JWT_SECRET!, {expiresIn: "1d"});
        await newUser.save();
        const response = NextResponse.json({message: "User created", success:true});
        response.cookies.set("token", token, {httpOnly:true});
        return response;
    }
    catch(error: any){
        return NextResponse.json({error: error.message}, {status: 500});
    }
}

export async function PUT(req:NextRequest){
    dbConnect();
    const url = new URL(req.nextUrl);
    try {
        const id = url.searchParams.get("id");
        console.log(id);
        const {avatar, username, email} = await req.json();
        const user = await User.findByIdAndUpdate(id, {avatar, username, email});
        const data = {
            id: user.id,
            email: user.email,
            username: user.username,
            avatar: user.avatar
        }

        const token = await jwt.sign(data, process.env.JWT_SECRET!, {expiresIn: "1d"});
        const response = NextResponse.json({message: "User created", success:true});
        response.cookies.set("token", token, {httpOnly:true});
        return response;
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}