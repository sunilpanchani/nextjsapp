"use client";

import React,{useEffect, useState} from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";



export default function LoginPage(){

    const [user, setUser] = useState({
        email:"",
        password:"",
    });

    const router = useRouter();
    const [buttonDisabled, setButtonDisalbed] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(user.email.length > 0 && user.password.length >0 ){
            setButtonDisalbed(true);
        }else{
            setButtonDisalbed(false);
        }
    })

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login",user);
            console.log(response.data);

            if(response.data.success){
                router.push("/profile");
            }else{
                
            }
            
        } catch (error: any) {
            console.log("Login failed", error.mesage);            
        }finally{
            setButtonDisalbed(false);
        }
    }

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2 p-2">
            <h1>{loading ? "Progressing..." : "Login"}</h1>
            <hr />
            

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
                onClick={onLogin}
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none foucs:border-gray-600"
                >
                    {buttonDisabled ? "Login" : "No Login"}
                </button>
                
                <Link href="/signup">Don't have account yet? Signup here</Link>
        </div>
    );

}