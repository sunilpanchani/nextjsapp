import React from "react";
import { NextRequest, NextResponse } from "next/server";
import {connect} from "@/dbConfig/dbConfig";
import bcryptjs from "bcryptjs";
import User from "@/models/userModel";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest){
    try {
        
        const reqBody = await request.json();
        const {email, password} = reqBody;
        console.log(email);

        //check if user exists
        const user = await User.findOne({email});
        console.log(user);
        
        
        if(!user){
            return NextResponse.json({error:"User doesn not exist"},{status:400});
        }

        //check if password is correct
        const validPassword = bcryptjs.compare(password, user.password);

        if(!validPassword){
            return NextResponse.json({error:"Invalid password"},{status:400});
        }

        //create token data
        const tokenData = {
            id:user._id,
            username:user.username,
            email:user.email
        }

        //create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {expiresIn:"1d"});

        const response = NextResponse.json({
            message:"Login successful",
            success:true,
        });

        response.cookies.set("toekn", token,{
            httpOnly:true,

        });

        return response;

    } catch (error : any) {
        return NextResponse.json({
            error:error.message,
            status:500,
        })
    }
}