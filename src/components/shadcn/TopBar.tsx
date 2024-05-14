'use client'

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Task ={
    _id:string,
    username:string,
    email:string,
    avatar:string,
}

export default function Topbar() {
    const [tasks, setTasks] = useState<Task>({_id:"",username:"",email:"",avatar:""});
    const data =async()=>{
        try {
            const res = await axios.get("/api/Login");
            setTasks(res.data.data)
        } catch (error) {
          console.log(error)
        }
      }
    const logout =async()=>{
        try {
            await axios.delete("/api/Login");
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        data()
    },[])
    return(
        <div className="fixed h-20 w-screen z-40">
            <div className="w-full h-full bg-transparent rounded-lg flex justify-center items-center px-3 backdrop-blur-sm shadow-[10px_20px_30px_4px_rgba(0,0,0,0.20),_10px_10px_30px_4px_rgba(45,78,255,0.15)] z-40">
                <div className="w-full flex justify-between items-center">
                    <h1 className=" text-3xl font-bold">T<span className="text-lg">ASKIFY</span></h1>
                    <div className="w-[130px] flex justify-between items-center gap-2">
                    <Link href={`/${tasks.username}`}>
                        <Image src={tasks.avatar} alt="logo" width={50} height={50} className="w-12 h-12 border rounded-full cursor-pointer"/>
                    </Link>
                        <button onClick={logout} className="bg-zinc-700 text-white px-2 py-1 rounded-lg border">Logout</button>
                    </div>
                </div>
            </div>
        </div>
    )
}