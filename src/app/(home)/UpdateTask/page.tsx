'use client'
import TaskForm from "@/components/shadcn/TaskForm";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import axios from "axios";

type Task ={
    _id:string,
    taskName:string,
    taskDescription:string,
    taskPriority:string,
    taskDueDate:string,
    taskStatus:string
}

export default function Update() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <UpdateTask />
        </Suspense>
    );
}

function UpdateTask() {
    const search  = useSearchParams();
    const [task, setTask] = useState<Task>()

    const updateTask = async() => {
        try {
            const res = await axios.get(`/api/Task/Update?id=${search.get("id")}`);
            setTask(res.data.task);
        } catch (error:any) {
            console.log(error);
        }
    };

    useEffect(() => {
        updateTask();
    }, []);

    return (
        <div className="absolute top-24 w-full  grid grid-flow-row justify-items-center gap-y-5">
            <h1 className="text-4xl font-bold ">Update Task</h1>
            <TaskForm post={task} action="Update"/>
        </div>
    );
}
