import { Heading } from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import ButtonWarning from "../components/ButtonWarning";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';



export function SignUp(){
    let [username,setUsername] = useState("");
    let [firstName, setFirstName] = useState("");
    let [lastName, setLastName] = useState("");
    let [password,setPassword] = useState("");
    let navigate = useNavigate();
    async function handelRequest(){
        try {
            let response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                username,
                firstName,
                lastName,
                password
            });
            console.log(response.status);
            navigate('/signin');
        } catch (error) {
            alert("Invalid Inputs")
            console.error("There was an error signing up!", error);
        }
    }

    return (
        <div className="bg-slate-100 w-full h-screen flex justify-center">
            <div className="w-96 bg-white rounded-lg px-4 self-center h-fit pb-7 items-center">
                <Heading label="Sign Up"></Heading>
                <SubHeading message={"Enter your information to create an account"}></SubHeading>
                <InputBox label="First Name" onChange={(e)=>{
                    setFirstName(e.target.value);
                }} placeholder={"Sai Nisshith"} type={"text"}></InputBox>
                <InputBox label="Last Name" onChange={(e)=>{
                    setLastName(e.target.value);
                }} 
                 placeholder={"Satyaneni"} type={"text"}></InputBox>
                <InputBox label="Email" onChange={(e)=>{
                    setUsername(e.target.value);
                }} placeholder={"sainisshith@gmail.com"} type={"email"}></InputBox>
                <InputBox label="Password" onChange={(e)=>{
                    setPassword(e.target.value);
                }} placeholder={"123456"} type={"password"}></InputBox>
                <Button label={"Sign In"} className="py-1" onClick={handelRequest}></Button>
                <ButtonWarning content={"Already have any account? "} label={"Sign In"} shift={"/signin"} ></ButtonWarning>
            </div>
        </div>
    )
}