import {z} from 'zod';

const TaskSchema = z.object({
    taskName: z.string().min(5).max(30),
    taskDescription: z.string().min(10).max(100),
    taskPriority: z.string().nonempty({message: "Task priority is required"}),
    taskDueDate: z.string().nonempty({message: "Task due date is required"}),
});

export default TaskSchema;