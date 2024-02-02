import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request : NextRequest){
    
    try {
        const reqBody = await request.json();
        const {username, email, password} = reqBody;
        
        // check user if already exist
        const user= await User.findOne({email});
        console.log(user);

        //hasing password
        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password,salt);

        const newUser = new User({
            username,
            email,
            password: hashPassword
        });
        
        const savedUser = await newUser.save();
        console.log((savedUser));

        return NextResponse.json({
            message: "Uer created successfully",
            success: true,
            savedUser
        });
    } catch (error : any) {
        return NextResponse.json({
            error:"error message: "+error.message,
            status:500
        });
    }
}
