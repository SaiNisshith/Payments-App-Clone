export default function InputBox({label,placeholder,type,onChange}){
    return (
        <div>
            <div className="text-base font-semibold py-2">
                {label}
            </div>
            <input type={type} placeholder={placeholder} onChange={onChange} className="w-full px-2 py-1 border rounded border-slate-200"/>
        </div>
    )
}