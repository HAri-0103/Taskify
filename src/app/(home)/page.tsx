'use client'
import { useState,useEffect } from "react";
import Taskcard from "@/components/shadcn/TaskCard";
import axios from "axios";
import { AnimatePresence, Reorder, useDragControls } from "framer-motion";

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
  const control = useDragControls();
  function startDrag(event:any) {
      control.start(event)
    }
  return (
    <AnimatePresence>
      <div className="fixed w-screen h-screen flex justify-start">
      <Reorder.Group values={tasks} onReorder={setTasks} axis="y">
        <div className="absolute top-24 w-full h-screen grid grid-flow-row justify-center overflow-y-scroll gap-y-4 pb-[195px] pt-5 md:grid-cols-2 md:justify-items-center lg:grid-cols-3">
            {tasks.length>0?(tasks.map((task,index)=><Reorder.Item key={task._id} value={task} drag ><Taskcard key={index} task={task}/></Reorder.Item>))
            :"There is No Task"}
        </div>
        </Reorder.Group>
    </div>
    </AnimatePresence>
  );
}