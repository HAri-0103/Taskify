import { dbConnect } from "@/DbConfig/dbConfig";
import { User } from "@/Models/UserModel";
import jwt,{ JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    dbConnect();
    try {
        const {taskName, taskDescription, taskPriority, taskDueDate} = await req.json();
        const cookie = req.cookies.get("token");
        const verifyToken: JwtPayload | any = jwt.verify(cookie?.value || "", process.env.JWT_SECRET!);
        const user = await User.findOne({ _id: verifyToken.id});
        const newTask ={
            taskName,
            taskDescription,
            taskPriority,
            taskDueDate,
        }
        user.tasks.push(newTask);
        await user.save();
        return NextResponse.json({
            status: 200,
            message: "Task created successfully",
        })
        
    } catch (error:any) {
        return NextResponse.json({
            status: 400,
            message: "Error creating task"+error
        })
    }
}

export async function GET(req:NextRequest){
    dbConnect();
    try {
        const cookie = req.cookies.get("token");
        const verifyToken: JwtPayload | any = jwt.verify(cookie?.value || "", process.env.JWT_SECRET!);
        const user = await User.findOne({ _id: verifyToken.id});
        return NextResponse.json({
            tasks: user.tasks
        })
    } catch (error:any) {
        return NextResponse.json({
            status: 400,
            message: "Error fetching tasks"+error
        })
    }
}