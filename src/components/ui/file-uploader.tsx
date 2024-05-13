'use client'

import { useEffect, useState } from "react";
import Image from "next/image";
import { useEdgeStore } from '@/lib/edgestore';


type FileUploaderProps = {
    fieldChange: (string:String) => void;
}


export default function FileUploader({fieldChange}: FileUploaderProps){
    const [file, setFile] = useState<File>()
    const [preview, setPreview] = useState<string>()
    const { edgestore } = useEdgeStore();

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
                <Image src={preview!} alt="preview" width={200} height={200} objectFit="cover" className="w-full h-full rounded-full"/>
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