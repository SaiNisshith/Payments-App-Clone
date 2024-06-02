import axios from 'axios'
import {atom, atomFamily, selector, selectorFamily} from 'recoil'



export let infoAtom = atom({
    key : "infoState",
    default : selector({
        key : "infoSelector",
        get : async ()=>{
            const res = await axios.get('http://localhost:3000/api/v1/user/info',{
                headers : {
                    Authorization : "Bearer " + localStorage.getItem("token")
                }
            });
            return res.data.user;
        }
    })
});

export let balanceAtom = atom({
    key : 'balanceAtom',
    default : selector({
        key : 'balanceSelector',
        get : async ({get})=>{
            let res = await axios.get('http://localhost:3000/api/v1/account/balance',{
                headers : {
                    Authorization : "Bearer " + localStorage.getItem("token")
                }
            });
            return res.data.balance;
        }
    })
})