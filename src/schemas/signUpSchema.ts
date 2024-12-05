import {z} from 'zod';
export const usernameValidation = z
.string()
.min(2, "Username must be atleast 2 Characters")
.max(2, "Username must be no more than 20 Characters")
.regex(/^[a-zA-Z0-9_]+$/,"UserName must not contain special character")

export const signUpSchema = z.object({
    username:usernameValidation,
    eamil:z.string().email({message:"invalid Email Address"}),
    password:z.string().min(6,{message:"password must be at least 6 characters"})
})