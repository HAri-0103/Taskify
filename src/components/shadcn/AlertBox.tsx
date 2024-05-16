import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
import axios from "axios"

type TaskCardProps = {
    task:{
        taskName: string,
        taskDescription: string,
        taskPriority: string,
        taskStatus: string,
        _id: string,
        taskDueDate: string
    }
}

export default function AlertDialogDemo({task}:TaskCardProps) {
    const change =async()=>{
        try {
            await axios.put(`/api/Task/Update?id=${task._id}`, {...task,taskStatus: task.taskStatus==="Pending"?"Completed":"Pending"});
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild className={`border-none text-white ${task.taskStatus==="Pending"?"bg-red-600 hover:bg-red-500 hover:scale-95":"bg-green-600 hover:bg-green-500 hover:scale-95"}`}>
          <Button variant="outline">{task.taskStatus}</Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="absolute top-28 bg-black text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
                You have to change the status of the task from {task.taskStatus} to {task.taskStatus==="Pending"?"Completed":"Pending"}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-none hover:bg-white hover:text-black">Cancel</AlertDialogCancel>
            <AlertDialogAction className="hover:bg-white hover:text-black" onClick={change}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }