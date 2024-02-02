"use client";

import React,{useState} from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function SignupPage(){
    const router = useRouter();
    const [user, setUser] = useState({
        email:"",
        password:"",
        username:"",
    });
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false); 

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("signup success", response.data); 
            router.push("/login");
        } catch (error : any) {
            console.log("signup failed");
            console.log(error.message);
            
            
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        if(user.email.length >0 && user.password.length > 0 && user.username.length >0){
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true);
        }
    }, [user]);

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2 p-2">
            <h1>{loading ? "Processing..." : "SignUp"}</h1>
            <hr />
            <label htmlFor="username">Username</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none foucs:border-gray-600" 
                id="username"
                type="text"
                value={user.username}
                onChange={(e) => setUser({
                    ...user,
                    username:e.target.value
                })}
                placeholder="username"
            />

        <label htmlFor="email">Email</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none foucs:border-gray-600" 
                id="email"
                type="text"
                value={user.email}
                onChange={(e) => setUser({
                    ...user,
                    email:e.target.value
                })}
                placeholder="Email"
            />

        <label htmlFor="password">Password</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none foucs:border-gray-600" 
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({
                    ...user,
                    password:e.target.value
                })}
                placeholder="Password"
            />

            <button
            onClick={onSignup}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none foucs:border-gray-600"
            >
                {buttonDisabled ? "No Signup" : "Signup"}
                
            </button>
            
            <Link href="/login">Already Signup? Click to login</Link>
        </div>
    );

}