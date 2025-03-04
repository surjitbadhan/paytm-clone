import React, { useCallback, useEffect, useState } from 'react'
import { AppBar } from '../components/AppBar'
import { Balance } from '../components/Balance'
import { Users } from '../components/Users'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Dashboard = () => {
  const [balance,setBalance] = useState("")
  const [users,setUsers] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(!token){
      navigate('/')
    }
    axios.get("http://localhost:3000/api/v1/account/balance", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        res.data.balance;
        setBalance(res.data.balance);
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get("http://localhost:3000/api/v1/user/bulk", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        // res.data.user;
        setUsers(res.data.user);
      });
  }, []);

  return (
    <div>
      {/* <AppBar /> */}
      <div className="m-8">
        <Balance value={Number(balance).toPrecision(5)} />
        <Users users={users} />
      </div>
    </div>
  );
}

export default Dashboard