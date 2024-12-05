/* eslint-disable @typescript-eslint/no-unused-vars */
import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifycode: string,
): Promise<ApiResponse> {

    try {
        await resend.emails.send({
            from: 'you@example.com',
            to: email,
            subject: 'TK Messsage | Verification Code',
            react:VerificationEmail({username,otp:verifycode}),
        });
        return { success: true, message: "verification email send successfully" }
    }
    catch (emailerror) {
        console.log("Error Sending Verification Email", emailerror);
        return { success: false, message: "falid to send verification email" }
    }

}
