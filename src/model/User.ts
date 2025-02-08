import mongoose, {Schema, Document} from "mongoose";

export interface Message extends Document {
    content: string;
    createdAt: Date;
}

const MessageSchema: Schema<Message> = new mongoose.Schema({
    content: {
        type: String, 
        required: true
    },
    createdAt: {
        type: Date, 
        required: true, 
        default: Date.now
    },
});

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    messages: Message[];
    verifyCode: string;
    isVerified: boolean;
    verifyCodeExpiry: Date;
    isAcceptingMessages: boolean;
}

const UserSchema: Schema<User> = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        // this you can use it in your college website  
        match: [/.+\@.+\..+/, 'Please use a valid email address'],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    verifyCode: {
        type: String,
        required: [true, "Verification code is required"],
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true, "Verification code expiry is required"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAcceptingMessages: {
        type: Boolean,
        default: true,
    },
    messages: [MessageSchema],
});

/* In express and nextjs, this is the difference, like express it the dedicated backend but nextjs is not, toh depend on the backend running this 
code is written and "as mongoose.Model<User>"" is typescript. models because we are checking if there is any existing model with the name User(nextjs thing). Bas type safety ha.
*/
const UserModel = (mongoose.models.User as mongoose.Model<User>) || 
mongoose.model<User>("User", UserSchema);

export default UserModel;
