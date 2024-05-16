
import { dbConnect } from "@/DbConfig/dbConfig"
import { User } from "@/Models/UserModel";
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
})
