import { useEffect, useState } from "react"

export const AppBar = () => {
    const [name,setName]= useState("")
    const userName = async ()=>{
        user = await axios.get("http://localhost:3000/api/v1/user/userinfo",{
            headers:{
                "Authorization":"Bearer " + localStorage.getItem('token')
            }
        })
        setName(user)
    }
    useEffect(()=>{
        userName()
    },[name])
    return <div className="shadow h-14 flex justify-between">
        <div className="flex flex-col justify-center h-full ml-4">
            PayTM Clone
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4">
                Hello
            </div>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {name}
                </div>
            </div>
        </div>
    </div>
}