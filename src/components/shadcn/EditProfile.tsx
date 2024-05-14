"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { FcGoogle } from "react-icons/fc"
import axios from "axios"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import formSchema from "@/Schema/SignupSchema"
import FileUploader from "@/components/ui/file-uploader"
import EditProfile from "@/app/(home)/EditProfile/page"
import editProfileSchema from "@/Schema/EditprofileSchema"
import { useRouter } from "next/navigation"

type Props = {
    data: {
        id:string,
        username:string,
        email:string,
        avatar:string,
    }

}

export default function Edit({data}:Props) {
    const router = useRouter()
    const form = useForm({
        resolver: zodResolver(editProfileSchema),
        defaultValues: {
            avatar: data.avatar,
            username: data.username,
            email: data.email,
            },
            values:data
    })
    async function submit(values: z.infer<typeof editProfileSchema>) {
            try {
                await axios.put(`/api/Signup?id=${data.id}`, values)
                router.push(`/${values.username}`)
            } catch (error) {
                console.error(error)
            }
        }

  return (
    <Form {...form}>
      <div className="w-screen h-screen flex justify-center mt-7">
      <form onSubmit={form.handleSubmit(submit)} className="w-[400px] h-auto px-10 py-10 bg-gray-200/40 shadow-xl shadow-black/25 rounded-md space-y-2 flex flex-col">
    <FormField
            control={form.control}
            name="avatar"
            render={({ field }) => (
                <FormItem className="flex justify-center items-center">
                    <FormControl>
                        <FileUploader fieldChange={field.onChange} img={field.value} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="h-[100px]">
              <FormLabel className="font-bold text-[16px]">Username</FormLabel>
              <FormControl>
                <Input className="border-gray-300 shadow-xl outline-none focus:border-b-blue-500 focus:border-2
                font-semibold text-gray-700 text-base placeholder:text-gray-500" placeholder="UserName" {...field} />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
                <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="h-[100px]">
              <FormLabel className="font-bold text-[16px]">EmailId</FormLabel>
              <FormControl>
                <Input className="border-gray-300 shadow-xl outline-none focus:border-b-blue-500 focus:border-2
                placeholder:text-gray-500 text-gary-700 text-base font-semibold" type="email" placeholder="xyz@gmail.com" {...field} />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-blue-700 text-white active:scale-95 active:bg-blue-600 hover:bg-blue-600">Update</Button>
      </form>
      </div>
    </Form>
  )
}
