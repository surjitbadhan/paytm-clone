import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

export const AppBar = () => {
  const [uname, setName] = useState("");
  const token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/user/userinfo", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        // console.log(res.data)
        setName(res.data.firstname);
      });
  }, []);
  return (
    <div className="shadow h-14 flex justify-between">
      <div className="flex flex-col justify-center h-full ml-4">
        <Link to={"/"}>PayTM Clone</Link>
      </div>
      {localStorage.getItem('token') && <div className="flex">
        <div className="flex flex-col justify-center h-full mr-4">
          Hello{" "}
          {uname.split()[0].charAt(0).toUpperCase() + uname.split()[0].slice(1)}
        </div>
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl text-black-700">
            {uname.split()[0].slice(0, 1).toUpperCase()}
          </div>
        </div>
      </div>
    //   <div className="flex">
    //     <div className="flex flex-col justify-center h-full mr-4">
    //       Hello{" Guest"}
    //     </div>
    //     <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
    //       <div className="flex flex-col justify-center h-full text-xl text-black-700">
    //       G
    //       </div>
    //     </div>
    //   </div>
    }
    </div>
  );
}