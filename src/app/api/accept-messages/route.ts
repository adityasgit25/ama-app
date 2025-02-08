import { getServerSession } from "next-auth";
import { AuthOptions } from "next-auth";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import {User} from 'next-auth';
import { authOptions } from "../auth/[...nextauth]/options";

export async function POST(request: Request) {
    // connect to the database
    await dbConnect();
    
    // through session taking the user's data
    // its kind of thing, that we have to pass authOptions to getServerSession
    const session = await getServerSession(authOptions);
    const user : User = session?.user;
    if (!session || !session.user) {
        return Response.json(
            {success: false, message: 'Not authenticated'},
            {status : 401}
        );
    }
    // taken user id
    const userId = user._id;
    const {acceptMessages} = await request.json();
    try {
        // update the user's message acceptance status
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId, 
            {isAcceptingMessages: acceptMessages},
            {new : true}
        );

        if (!updatedUser) {
            return Response.json(
                {
                    success: false,
                    message: 'Unable to find user to update message acceptance status'
                },
                {status: 404}
            );
        }

        // Successfully updated message acceptance status
        return Response.json(
            {
                success: true,
                message: 'Message acceptance status updated successfully',
                updatedUser,
            }, 
            {status : 200}
        );
    } catch(error) {
        console.error('Error updating message acceptance status: ', error);
        return Response.json(
            {success: false, message: 'Error updating message acceptance status'},
            {status: 500}
        );
    }
}
    export async function GET(request:Request) {
        await dbConnect();

        // get the user session
        const session = await getServerSession(authOptions);
        const user = session?.user;

        // check if the suer is authenticated
        if (!session || !user) {
            return Response.json({success: false, message: 'Not authenticated'}, {status: 401});
        }

        try {
            // Retrieve the user from the database using the ID
            const foundUser = await UserModel.findById(user._id);
            if (!foundUser) {
                // User not found
                return Response.json(
                    {success: false, message: 'User not found'},
                    {status: 404}
                );
            }
            return Response.json(
                {
                    success: false, 
                    isAcceptingMessages: foundUser.isAcceptingMessages,
                },
                {status: 200}
            );
        } catch(error) {
            console.error('Error retrieving message acceptance status:', error);
            return Response.json(
            { 
                success: false, 
                message: 'Error retrieving message acceptance status' },
                { status: 500 }
            );
        }

    }
