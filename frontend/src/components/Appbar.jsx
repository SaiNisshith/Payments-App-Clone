import {Link} from 'react-router-dom';
export default function Appbar({user}){
    return (
        <div className="flex justify-between p-4 border-b-4 border-stone-500">
            <div className="self-baseline font-bold text-lg"><Link to={"/dashboard"}>Payments App</Link></div>
           
            <div className="self-baseline">
                <span className="">{user}</span>
                
                <span className="p-3 ml-3 mr-1 rounded-lg bg-slate-900 text-slate-200">{user[0]}</span>
            </div>
        </div>
    )
}