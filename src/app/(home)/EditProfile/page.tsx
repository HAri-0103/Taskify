'use client'

import Edit from "@/components/shadcn/EditProfile";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Task ={
    id:string,
    username:string,
    email:string,
    avatar:string,
}
export default function EditProfile(){
    const [tasks, setTasks] = useState<Task>({id:"",username:"",email:"",avatar:""});
    const data =async()=>{
        try {
            const res = await axios.get("/api/Login");
            setTasks(res.data.data)
        } catch (error) {
          console.log(error)
        }
      }
        console.log(tasks)
      const router  = useRouter();
        const send =()=>{
            router.push("/EditProfile")
        }
    
    useEffect(()=>{
        data()
    },[])
    return(
        <div className="fixed top-24 w-screen flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold">Edit Profile</h1>
            <Edit data={tasks}/>
        </div>
    )
}