'use client'
import { useState,useEffect } from "react";
import Taskcard from "@/components/shadcn/TaskCard";
import axios from "axios";

type Task ={
  _id:string,
  taskName:string,
  taskDescription:string,
  taskPriority:string,
  taskDueDate:string,
  taskStatus:string
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const data =async()=>{
    try {
      const res = await axios.get("/api/Task");
      setTasks(res.data.tasks)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    data()
  },[])
  return (
    <div className="fixed w-screen h-screen flex justify-start">
        <div className="absolute top-24 w-full h-screen grid grid-flow-row justify-center overflow-y-scroll gap-y-4 pb-[195px] pt-5 md:grid-cols-2 md:justify-items-center lg:grid-cols-3">
          {tasks?(tasks.map((task,index)=><Taskcard key={index} task={task}/>))
          :"There is No Task"}
        </div>
    </div>
  );
}