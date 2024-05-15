import TaskForm from "@/components/shadcn/TaskForm";

export default function Add() {
    return (
        <div className="absolute top-24 w-full  grid grid-flow-row justify-items-center gap-y-5 pb-20">
            <h1 className="text-4xl font-bold ">Add Task</h1>
            <TaskForm action="Create"/>
        </div>
    )
}