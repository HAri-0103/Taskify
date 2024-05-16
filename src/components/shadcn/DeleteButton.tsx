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

  export function DeleteButton({task}:TaskCardProps) {
    const remove =async()=>{
        try {
            await axios.delete(`/api/Task/Update?id=${task._id}`);
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <AlertDialog>
                <AlertDialogTrigger asChild className={`border-none bg-red-600 hover:bg-red-500 hover:scale-95 text-white`}>
                <Button variant="outline">Delete</Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="absolute top-28 bg-black text-white">
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Task will be deleted permanently!!
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="border-none hover:bg-white hover:text-black">Cancel</AlertDialogCancel>
                    <AlertDialogAction className="hover:bg-white hover:text-black" onClick={remove}>Continue</AlertDialogAction>
                </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            )
  }
  