import { Heading } from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import ButtonWarning from "../components/ButtonWarning";
import { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";




export function SignIn(){
    let [username,setUsername] = useState("");
    let [password,setPassword] = useState("");
    let navigate = useNavigate();
    async function handelRequest(){

        try {
            let response = await axios.post("http://localhost:3000/api/v1/user/signin",{
                username,
                password
            });
            localStorage.setItem("token",response.data.token);
            navigate('/dashboard');
        } catch (error) {
            alert("Invalid Credentials");
            
        }
        
        // navigate('/dashboard');
    }

    return (
        <div className="bg-slate-100 w-full h-screen flex justify-center">
            <div className="w-96 bg-white rounded-lg px-4 self-center h-fit pb-7 items-center">
                <Heading label="Sign In"></Heading>
                <SubHeading message={"Enter your information to sign in"}></SubHeading>
                <InputBox label="Email" onChange={(e)=>{
                    setUsername(e.target.value);
                }} placeholder={"sainisshith@gmiail.com"} type={"email"}></InputBox>
                <InputBox label="Password" placeholder={"123456"} type={"password"} onChange={(e)=>{
                    setPassword(e.target.value);
                }}></InputBox>
                <Button label={"Sign In"} className="py-1" onClick={handelRequest}></Button>
                <ButtonWarning content={"Don't have an account? "} label={"Sign Up"} shift={"/signup"} ></ButtonWarning>
            </div>
        </div>
    )
}