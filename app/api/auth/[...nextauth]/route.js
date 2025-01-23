import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';
import { connectToDb } from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks: {
        async session ({session}){ // get data about user to keep a running session on
            const sessionUser = await User.findOne({
                email: session.user.email
            })
    
            session.user.id = sessionUser._id.toString();
    
            return session;
        },
    
        async signIn({profile}){
            try {
                // serverless route -> Lambda function hai yeh so we need to connect to db regularly
                await connectToDb()
    
                // check if a user already exists
                const userExists = await User.findOne({email:profile.email})
    
                // if not, create a new user and save to db
                if (!userExists){
                    await User.create({
                        email:profile.email,
                        username: profile.name.replace(" ","").toLowerCase(),
                        image: profile.picture
                    })
                }
                return true;
                
            } catch (error) {
                console.log('error while signing in', error);
            }
        }
    }
    
})

export {handler as GET , handler as POST}