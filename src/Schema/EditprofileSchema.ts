import { z } from "zod";


const editProfileSchema = z.object({
    avatar: z.string().nonempty(),
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
  })

  export default editProfileSchema