"use client"

import Taskcard from "@/components/shadcn/TaskCard";
import axios from "axios";
import { set } from "mongoose";
import { useEffect, useState } from "react";


type Task ={
    _id:string,
    taskName:string,
    taskDescription:string,
    taskPriority:string,
    taskDueDate:string,
    taskStatus:string
  }

export default function Completed(){
    const [tasks, setTasks] = useState<Task[]>([]);
    const data =async()=>{
        try {
          const res = await axios.get("/api/CompletedTask");
          setTasks(res.data.tasks)
        } catch (error) {
          console.log(error)
        }
      }
    useEffect(()=>{
        data()
    },[])
    return (
        <div className="absolute top-24 w-full  grid grid-flow-row justify-items-center gap-y-5">
            <div className="absolute w-full grid grid-flow-row justify-center overflow-y-scroll gap-y-4 pb-[195px] pt-5">
                {tasks?(tasks.map((task,index)=><Taskcard key={index} task={task}/>)):"There is No Task"}
        </div>

        </div>
    );
}