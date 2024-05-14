import { dbConnect } from "@/DbConfig/dbConfig";
import { User } from "@/Models/UserModel";
import jwt,{ JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(req:NextRequest){
    dbConnect();
    try {
        const cookie = req.cookies.get("token");
        const verifyToken: JwtPayload | any = jwt.verify(cookie?.value || "", process.env.JWT_SECRET!);

        const importantTasks = await User.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(verifyToken.id) } },
            { $unwind: "$tasks" },
            { $match:{ "tasks.taskPriority": "Important" } },
            {$replaceRoot: {newRoot: "$tasks"}}
        ]);
        return NextResponse.json({
            status: 200,
            tasks: importantTasks
        })
    } catch (error:any) {
        return NextResponse.json({
            status: 400,
            message: "Error fetching tasks"+error
        })
    }
}