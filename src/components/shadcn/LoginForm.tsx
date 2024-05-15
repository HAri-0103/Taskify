"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
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
import LoginSchema from "@/Schema/LoginSchema"
import Link from "next/link"
import { FcGoogle } from "react-icons/fc";
import {signIn} from "next-auth/react"
import { useRouter } from "next/navigation"
import axios from "axios"



export default function SignUpForm() {
  const router = useRouter();
    const form = useForm({
      resolver: zodResolver(LoginSchema),
      defaultValues: {
        email: "",
        password: "",
        },
    })
    async function submit(values: z.infer<typeof LoginSchema>) {
        try {
          await axios.post("/api/Login", values);
          router.push("/");
        } catch (error) {
          console.log(error);
        }
      }
  return (
    <Form {...form}>
      <div className="w-screen h-screen flex justify-center mt-7">
      <form onSubmit={form.handleSubmit(submit)} className="w-[400px] h-[450px] px-10 py-10 bg-gray-200/40 shadow-xl shadow-black/25 rounded-md space-y-2 flex flex-col">
                <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="h-[100px] border">
              <FormLabel className="font-bold text-[16px]">EmailId</FormLabel>
              <FormControl>
                <Input className="border-gray-300 shadow-xl outline-none focus:border-b-blue-500 focus:border-2
                placeholder:text-gray-500 text-gary-700 text-base font-semibold" type="email" placeholder="xyz@gmail.com" {...field} />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
                <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="h-[100px]">
              <FormLabel className="font-bold text-[16px]">Password</FormLabel>
              <FormControl>
                <Input className="border-gray-300 shadow-xl outline-none focus:border-b-blue-500 focus:border-2
                placeholder:text-gray-500 text-gary-700 text-base font-semibold" type="password" placeholder="*********" {...field} />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-blue-700 text-white active:scale-95 active:bg-blue-600 hover:bg-blue-600">Login</Button>
        <FormDescription className="text-center text-gray-500">Not have an Account? <Link href={`/Signup`} className="text-blue-500">Signup</Link></FormDescription>

        <div className="flex items-center gap-5">
            <hr className="w-[150px] border-t-2 border-gray-300"/>
            <p>or</p>
            <hr className="w-[150px] border-t-2 border-gray-300"/>
        </div>
        <Button className="w-full bg-blue-700 text-white active:scale-95 active:bg-blue-600 hover:bg-blue-600 cursor-not-allowed">Login with Google <FcGoogle className="pl-2" size={30} /></Button>
      </form>
      </div>
    </Form>
  )
}
