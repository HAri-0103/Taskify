import { dbConnect } from "@/DbConfig/dbConfig";
import { User } from "@/Models/UserModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    dbConnect();
    const url = new URL(req.nextUrl);
    try {
        const id = url.searchParams.get("id");
        const task = await User.findOne({'tasks._id':id},{tasks:{$elemMatch:{_id:id}}});
        return NextResponse.json({
            status: 200,
            task: task?.tasks[0],
        })
    } catch (error:any) {
        return NextResponse.json({
            status: 400,
            message: "Error fetching tasks"+error
        })
    }
}

export async function PUT(req:NextRequest){
    dbConnect();
    const url = new URL(req.nextUrl);
    try {
        const id = url.searchParams.get("id");
        const {taskName, taskDescription, taskPriority, taskDueDate, taskStatus} = await req.json();
        const task = await User.findOneAndUpdate(
            {'tasks._id': id},
            {
                $set: {
                    'tasks.$.taskName': taskName,
                    'tasks.$.taskDescription': taskDescription,
                    'tasks.$.taskPriority': taskPriority,
                    'tasks.$.taskDueDate': taskDueDate,
                    'tasks.$.taskStatus': taskStatus
                }
            },
            { new: true }
        );
        return NextResponse.json({
            status: 200,
        })
        
    } catch (error:any) {
        return NextResponse.json({
            status: 400,
            message: "Error updating task"+error
        })
    }
}


export async function DELETE(req:NextRequest){
    dbConnect();
    const url = new URL(req.nextUrl);
    try {
        const id = url.searchParams.get("id");
        const task = await User.findOneAndUpdate({},{$pull:{tasks:{_id:id}}},{new:true});
        return NextResponse.json({
            status: 200,
        })
    } catch (error:any) {
        return NextResponse.json({
            status: 400,
            message: "Error deleting task"+error
        })
    }
}