import mongoose, {Schema, Document} from 'mongoose';

export interface Task extends Document{
    taskName: string,
    taskDescription: string,
    taskStatus: string,
    taskPriority: string,
    taskDueDate: Date,
    taskCreatedDate: Date,
    taskUpdatedDate: Date,
}

const TaskSchema: Schema<Task> = new Schema({
    taskName: {
        type: String,
        required: [true, 'Task name is required'],
    },
    taskDescription: {
        type: String,
        required: false
    },
    taskStatus: {
        type: String, 
        default: "Pending"
    },
    taskPriority: {
        type: String, 
        default: "Low"
    },
    taskDueDate: {
        type: Date,
        required: true,
    },
    taskCreatedDate: {
        type: Date,
        default: Date.now
    },
    taskUpdatedDate: {
        type: Date,
        default: Date.now
    },
})

export interface User extends Document{
    avatar: string,
    username: string,
    email: string,
    password: string,
    tasks: Task[]
}

const UserSchema: Schema<User> = new Schema({
    avatar: {
        type: String,
        required: true,
        default: "https://www.gravatar.com/avatar/",
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    tasks: [TaskSchema],
}, {timestamps: true})

export const User =mongoose.models.User|| mongoose.model<User>('User', UserSchema);