import React, { useCallback, useEffect, useState } from 'react'
import { AppBar } from '../components/AppBar'
import { Balance } from '../components/Balance'
import { Users } from '../components/Users'
import axios from 'axios'
const Dashboard = () => {
  const [balance,setBalance] = useState("")
  const [users,setUsers] = useState([])
  const apiCallBalance =async ()=>{
     const token = localStorage.getItem("token");
     const res = await axios.get(
       "http://localhost:3000/api/v1/account/balance",
       {
         headers: {
           Authorization: "Bearer " + token,
         },
       }
     );
     setBalance(res.data.balance);

  }
  const apiCallUsers = useCallback(async ()=>{
const token = localStorage.getItem("token");
const res = await axios.get("http://localhost:3000/api/v1/user/bulk", {
  headers: {
    Authorization: "Bearer " + token,
  },
});
setUsers(res.data.user);
  },apiCallUsers)

  useEffect(()=>{
    apiCallUsers();
  },[users])
  useEffect(()=>{
    apiCallBalance()
     },[balance])
  return (
    <div>
      <AppBar />
      <div className='m-8'>
        <Balance value={(Number(balance).toPrecision(5))} />
        <Users users={users}/>
      </div>
    </div>
  );
}

export default Dashboard