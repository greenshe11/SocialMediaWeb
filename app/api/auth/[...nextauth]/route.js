import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs';
import connectMongoDB from "@/app/libs/mongodb";
import Account from "@/app/models/accounts";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},
            async authorize(credentials){
                const {email, password} = credentials;
                try{
                    await connectMongoDB();
                    const user = await Account.findOne({email});
                    if (!user){
                        return null;
                    }
                    
                    const passwordsMatch = await bcrypt.compare(password, user.password);
                    console.log(user);
                    if(!passwordsMatch){
                        return null;
                    }
                    return user;
                } catch(error){
                    console.log("Error",error);
                }
              
            },
        })
    ],
    session: {
        strategy: "jwt", //json web token , yabi, session
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user._id.toString();
                token.email = user.email;
                token.username = user.username;
                token.address = user.address;
                token.birthDate = user.birthdate
                token.profileImg = user.profileImg
                // Add any other fields you want to include in the token here
            }
            return token;
        },
        async session({ session, token }) {
            session.id = token.id;
            session.email = token.email;
            session.user.username = token.username;
            session.user.address = token.address;
            session.user.birthDate = token.birthDate;
            session.user.profileImg = token.profileImg;
            
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/"
    },
}

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};