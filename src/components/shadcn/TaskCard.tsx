import Link from "next/link";
import AlertBox from "./AlertBox";
import { Delete } from "lucide-react";
import { DeleteButton } from "./DeleteButton";
import { Reorder,useDragControls } from "framer-motion";

interface TaskCardProps {
    task:{
        taskName: string,
        taskDescription: string,
        taskPriority: string,
        taskStatus: string,
        _id: string,
        taskDueDate: string
    }
}


export default function Taskcard({task}:TaskCardProps) {
    
    return(
        <div className="w-72 h-[300px] bg-white rounded-lg shadow-[-10px_-20px_30px_4px_rgba(0,0,0,0.20),_10px_10px_30px_4px_rgba(45,78,255,0.15)] p-4 z-10 space-y-2 active:cursor-grabbing">
            <h1 className="text-2xl font-bold w-full h-[52px] leading-7 ">{task.taskName}</h1>
            <p className="text-base h-28">{task.taskDescription}</p>
            <AlertBox task={task}/>
            <div className="flex justify-between items-center">
                <Link href={{
                    pathname:"/UpdateTask",
                    query:{id:task._id}}} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Edit</Link>
                <DeleteButton task={task}/>
            </div>
        </div>
    )
}