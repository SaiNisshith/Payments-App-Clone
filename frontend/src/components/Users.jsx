import { useNavigate } from "react-router-dom"

export default function Users({users, onChange}){
    let navigate = useNavigate();
    return <div>
        <h3>Users</h3>
        <div>
            <input type="text" onChange={onChange} placeholder="Serach Users" className="my-2 w-screen px-2 py-1 border rounded border-slate-200"/>
        </div>
        <ul>
            {users.map(user=>{
                return <li key={user._id} className="rounded-md my-1 odd:bg-zinc-200 even:bg-orange-200 p-2">
                    <div className="flex justify-between items-center">
                        <div className="flex self-center">
                            <div className="px-3 py-2 bg-slate-300 self-baseline rounded-full mx-3">{user.firstName[0]}</div>
                            <div className="self-baseline">{user.firstName}</div>
                        </div>
                        <div>
                        <button type="button" onClick={function(){
                            let url = `/send?id=${user._id}&name=${user.firstName}`;
                            navigate(url);
                        }} className="self-center rounded-md text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Send Money</button>
                        </div>
                    </div>
                </li>
            })}
        </ul>
    </div>
}