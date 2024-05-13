
import LoginForm from "@/components/shadcn/LoginForm"



export default async function Login() {
    return(
        <div className="w-screen h-screen flex flex-col justify-center items-center py-10">
            <div className="flex flex-col justify-center items-center gap-10">
                <h1 className="font-bold text-4xl">Welcome Back To <span className="text-blue-500">Taskify</span></h1>
                <h2 className="font-bold text-xl text-blue-400">Login with your credential</h2>
            </div>
            <LoginForm />   
        </div>
    )
}
