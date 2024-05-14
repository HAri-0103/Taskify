'use client'

import { useEffect, useState } from "react";
import Image from "next/image";
import { useEdgeStore } from '@/lib/edgestore';
import { set } from "mongoose";


type FileUploaderProps = {
    fieldChange: (string:String) => void;
    img?:string
}


export default function FileUploader({fieldChange,img}: FileUploaderProps){
    const [file, setFile] = useState<File>()
    const [preview, setPreview] = useState<string>(img || "");
    const { edgestore } = useEdgeStore();
    useEffect(()=>{
        setPreview(img || "")
    },[img])

  useEffect(() => {
    const uploadFile = async () => {
        const res = await edgestore.publicFiles.upload({
            file: file!,
          });
        fieldChange(res.url)
  }
    if(file){
        uploadFile()
    }
 }, [file]);

    return (
        <div className="flex flex-col w-[150px] h-[150px] rounded-full justify-center items-center">
            
            {preview ? (
                <div className="w-full h-full  border-gray-300 rounded-full p-4 flex flex-col items-center justify-center">
                <label htmlFor="file" className="w-full h-full cursor-pointer">
                <Image src={preview} alt="preview" width={700} height={700} objectFit="cover" className="w-full h-full rounded-full"/>
                    <input type="file" id="file" className="hidden" onChange={(e) => {
                        let  file = e.target.files?.[0]
                        if(file){
                            setFile(file)
                            setPreview(URL.createObjectURL(file))
                        }
                    }}/>
                </label>
                </div>
            ):(
                    <div className="w-full h-full border border-gray-300 rounded-full p-4 flex flex-col items-center justify-center">
                    <label htmlFor="file" className="cursor-pointer">
                        <input type="file" id="file" className="hidden" onChange={(e) => {
                            let  file = e.target.files?.[0]
                            if(file){
                                setFile(file)
                                setPreview(URL.createObjectURL(file))
                            }
                        }}/>
                        <span className="w-full flex text-center text-gray-400">Upload a Image</span>
                    </label>
                    </div>
            )}
        </div>
    )
}