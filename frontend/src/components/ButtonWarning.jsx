import {Link} from 'react-router-dom'
export default function ButtonWarning({content,label, shift}){
    return (
        <div className='font-medium text-center '>
            <span>{content}</span>
            <span className='underline hover:text-sky-800 text-sky-600'>
               <Link to={shift}>{label}</Link>
            </span>
        </div>
    )
}