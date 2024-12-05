import mongoose, { Schema, Document } from "mongoose";


export interface Message extends Document {
    content: string;
    createdAt: Date;
}
const MessageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now

    }
})


export interface User extends Document {
    username: string;
    email: string;
    password: string;
    verifycode: string;
    verifycodeExpiry: Date;
    isVerified: boolean;
    isAcceptingMessage: boolean;
    messages: Message[]
}
const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, "UserName is Required"],
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Email is Required"],
        trim: true,
        unique: true,
        match: [/.+\@.+\..+/, "Please Use Valid Email Address"],
    },
    password: {
        type: String,
        required: [true, "Password is Required"],
        trim: true,
        unique: true,
    },
    verifycode: {
        type: String,
        required: [true, "verifycode is Required"],
        trim: true,
        unique: true,
    },
    verifycodeExpiry: {
        type: Date,
        required: [true, "verifycodeExpiry is Required"],
        trim: true,
        unique: true,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAcceptingMessage: {
        type: Boolean,
        default: true
    },
    messages: [MessageSchema]
})

const UserModal = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("user", UserSchema)
export default UserModal;