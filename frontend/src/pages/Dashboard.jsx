import { useRecoilState, useRecoilValue } from "recoil"
import Appbar from "../components/Appbar"
import Balance from "../components/Balance"
import Users from "../components/Users"
import { balanceAtom, infoAtom } from "../state/atoms"
import { useEffect, useState } from "react"
import axios from "axios"
export function Dashboard(){
    let [filter,setFilter] = useState("");
    let [users,setUsers] = useState([]);
    let user = useRecoilValue(infoAtom);
    let [balance,setBalance] = useRecoilState(balanceAtom);
    useEffect(()=>{
        axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${filter}`,{
                headers : {
                    Authorization : "Bearer " + localStorage.getItem("token")
                }
            }).then(res=>{
                setUsers(res.data.users);
            })
    },[filter])
    return <div>
        <Appbar user={user.firstName}></Appbar>
        <Balance balance={balance.toFixed(2)}></Balance>
        <Users users={users} onChange={(e)=>{
            setFilter(e.target.value);
        }}></Users>
    </div>
}