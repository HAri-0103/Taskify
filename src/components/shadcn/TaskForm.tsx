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
import TaskSchema from "@/Schema/TaskSchema"
import Selection from "@/components/shadcn/Selection"
import { Textarea } from "../ui/textarea"
import axios from "axios"
import { useRouter } from "next/navigation"

type TaskFormProps = {
  post?:{
    _id:string,
    taskName:string,
    taskDescription:string,
    taskPriority:string,
    taskDueDate:string,
    taskStatus:string
  }
  action:"Create"|"Update"
}
export default function TaskForm({post,action}: TaskFormProps) {
  let date = new Date(post?.taskDueDate as string)
  const dateMDY = `${date.getFullYear()}-0${date.getMonth() + 1}-${date.getDate()}`;
  const router = useRouter();
    const form = useForm<z.infer<typeof TaskSchema>>({
      resolver: zodResolver(TaskSchema),
      defaultValues: {
        taskName: "",
        taskDescription: "",
        taskPriority: "",
        taskDueDate: "",
      },
      values: { ...post, taskDueDate: dateMDY } as z.infer<typeof TaskSchema>,
    });
      const onSubmit = async(data: z.infer<typeof TaskSchema>) => {
        try {
          if(action ==="Create"){
            await axios.post("/api/Task", data);
          form.reset()
          router.push('/')
          }
          else{
            await axios.put(`/api/Task/Update?id=${post?._id}`, data);
            router.push('/')
          }
        } catch (error) {
          console.log(error)
        }
      }
        const reset = () => {
            form.reset()
        }
    return (
        <div className="w-screen flex justify-center items-center px-5">
            <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full px-5 space-y-8 py-5">
        <FormField
          control={form.control}
          name="taskName"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel className="text-lg font-bold">Task Name</FormLabel>
              <FormControl>
                <Input placeholder="Task Name" {...field} value={field.value||""} />
              </FormControl>
              <FormMessage className="text-red-500 font-bold" />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="taskDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-bold">Task Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Task Description" {...field} value={field.value||""}/>
              </FormControl>
              <FormMessage className="text-red-500 font-bold" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="taskPriority"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-bold">Task Priority</FormLabel>
              <FormControl>
                <Selection fieldChange={field.onChange} prior={field.value||""} />
              </FormControl>
              <FormMessage className="text-red-500 font-bold" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="taskDueDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg font-bold" >Task Description</FormLabel>
              <FormControl>
                <Input type="date" {...field} value={field.value||""}/>
              </FormControl>
              <FormMessage className="text-red-500 font-bold" />
            </FormItem>
          )}
        />
        <div className="flex justify-between items-center">
            <Button type="reset" onClick={reset} className="border-2 shadow-lg transition-all bg-black text-white active:bg-white active:text-black hover:bg-white hover:text-black">Reset</Button>
            <Button type="submit" className=" border-2 shadow-lg transition-all bg-black text-white active:bg-white active:text-black hover:bg-white hover:text-black">Submit</Button>
        </div>
      </form>
    </Form>
        </div>
    );
}