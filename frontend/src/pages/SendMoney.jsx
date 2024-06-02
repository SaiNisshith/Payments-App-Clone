import { Heading } from "../components/Heading";

import InputBox from "../components/InputBox";
import Button from "../components/Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { balanceAtom } from "../state/atoms";
import axios from "axios";

export function SendMoney(){

    let [searchParams] = useSearchParams();
    let id = searchParams.get("id");
    let name = searchParams.get("name");
    const [amount,setAmount] = useState(0);
    let navigate = useNavigate();
    let [balance,setBalance] = useRecoilState(balanceAtom);

    return <div className="bg-slate-100 w-full h-screen flex justify-center">
        <div className="w-96 bg-white rounded-lg px-4 self-center h-fit pb-7 items-center">
            <Heading label="Send Money"></Heading>
            <h3>To {name}</h3>
            <InputBox label="Amount (in Rs)" placeholder={"Enter amount"} type={"number"} onChange={(e)=>{
                setAmount(e.target.value);
            }}></InputBox>
            <Button label={"Initiate Transfer"} className="py-1" onClick={async ()=>{
                try {
                    let k = await axios.post("http://localhost:3000/api/v1/account/transfer",{
                        to : id,
                        amount : amount
                    },{
                        headers : {
                            Authorization : "Bearer "+ localStorage.getItem("token")
                        }
                    })
                   setBalance(balance-amount)
                    alert("Successfully transfered");
                    navigate('/dashboard');
                } catch (error) {
                    alert("Something went wrong");
                
                    navigate('/dashboard');
                }
                
            }}></Button>
        </div>
    </div>
}