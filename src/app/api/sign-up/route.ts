/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import dbConnect from "@/lib/dbConnect";
import UserModal from "@/model/User";
import dcrypt from 'bcryptjs';

import { sendVerificationEmail } from "@/helpers/sedVerificationEmail";

export async function POST(request: Request) {
    await dbConnect()
    try {
        const { username, email, password } = await request.json()

        const exitingUSerVerifiedByUsername = await UserModal.findOne({
            username,
            isVerified: true
        })
        if (exitingUSerVerifiedByUsername) {
            return Response.json({
                success: false,
                message: "USername Already Taken"
            },
                { status: 400 }
            )
        }
        const exitingUSerByEmail = await UserModal.findOne({ email })

        const verifycode = Math.floor(10000 + Math.random() * 90000).toString()

        if (exitingUSerByEmail) {
            if (exitingUSerByEmail.isVerified) {
                return Response.json(
                    {
                          success: false,
                        message: "User Already exist with this email"
                    },
                    { status: 400 }
                )
            }
            else{
                const hashedpassword =await dcrypt.hash(password,10)
                exitingUSerByEmail.password=hashedpassword;
                exitingUSerByEmail.verifycode=verifycode;
                exitingUSerByEmail.verifycodeExpiry= new Date(Date.now() + 3600000)
                await exitingUSerByEmail.save();
            }
        }
        else {
            const hashedpassword = await dcrypt.hash(password, 10)
            const expiryDate = new Date()
            expiryDate.setHours(expiryDate.getHours() + 1)
            const newUSer = new UserModal({
                username,
                email,
                password: hashedpassword,
                verifycode,
                verifycodeExpiry: expiryDate,
                isVerified: false,
                isAcceptingMessage: true,
                messages: [],
            })

            await newUSer.save()
        }
        // send verification email

        const emailResponse = await sendVerificationEmail(
            email,
            username,
            verifycode

        )
        if (!emailResponse.success) {
            return Response.json({
                success: false,
                message: emailResponse.message
            },
                { status: 500 }
            )
        }
        return Response.json({
            success: true,
            message: "User Registered Successfuly.please verify your Email"
        },
            { status: 143 }
        )
    }

    catch (error) {
        console.log("Error Registering User", error)
        return Response.json(
            {
                success: false,
                message: "Error Registering User"
            },
            {
                status: 500,
            }
        )
    }
}
