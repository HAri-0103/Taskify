
import SignUpForm from "@/components/shadcn/SignupForm"


export default function Login() {
    return(
        <div className="absolute top-20 w-screen h-screen flex flex-col justify-center items-center py-10">
            <div className="flex flex-col justify-center items-center gap-10">
                <h1 className="font-bold text-4xl">Welcome To <span className="text-blue-500">Taskify</span></h1>
                <h2 className="font-bold text-xl text-blue-400">Sign in with your credential</h2>
            </div>
            <SignUpForm/>   
        </div>
    )
}