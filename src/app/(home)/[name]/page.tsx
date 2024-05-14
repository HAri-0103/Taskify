'use client'
import { Button } from '@/components/ui/button';
import axios from 'axios';
import Image from 'next/image'
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from 'react';



type Task ={
    _id:string,
    username:string,
    email:string,
    avatar:string,
}
export default function Profile(){
    const [tasks, setTasks] = useState<Task>({_id:"",username:"",email:"",avatar:""});
    const data =async()=>{
        try {
            const res = await axios.get("/api/Login");
            setTasks(res.data.data)
        } catch (error) {
          console.log(error)
        }
      }
      const router  = useRouter();
        const send =()=>{
            router.push("/EditProfile")
        }
    
    useEffect(()=>{
        data()
    },[])
    return(
        <div className="fixed top-24 w-screen flex flex-col justify-center items-center space-y-10">
            <h1 className="text-3xl font-bold">Profile</h1>
            <div className='w-full flex flex-col justify-center items-center gap-y-5'>
                <Image src={tasks.avatar} alt="logo" width={1000} height={1000} className="w-44 h-44 border rounded-full cursor-pointer"/>
                <div className="w-[350px] h-10 border border-black  shadow-lg rounded-xl p-2 flex justify-start items-center gap-10">
                    <h1 className='w-[100px] font-bold text-xl'>UserName:</h1>
                    <span className=''>{tasks.username}</span>
                </div>
                <div className="w-[350px] h-10 border border-black  shadow-lg rounded-xl p-2 flex justify-start items-center gap-10">
                    <h1 className='w-[100px] font-bold text-xl'>Email Id:</h1>
                    <span className=''>{tasks.email}</span>
                </div>
                <Button onClick={send} className="w-1/2 border-2 shadow-lg transition-all bg-black text-white active:bg-white active:text-black hover:bg-white hover:text-black">Edit Profile</Button>
            </div>

        </div>
    )
}