import  {dbConnect} from "@/DbConfig/dbConfig";
import { NextResponse } from "next/server";
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