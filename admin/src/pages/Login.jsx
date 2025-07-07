import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
import { DoctorContext } from "../context/DoctorContext";

const Login = () => {
  const [state, setState] = useState("Admin");

  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')


  const {setAToken,backendUrl}=useContext(AdminContext)
  const {setDToken}=useContext(DoctorContext)
  const onSubmitHandler = async (event) => {
  event.preventDefault();
  try {
    if (state === "Admin") {
      const { data } = await axios.post(backendUrl + "/api/admin/login", {
        email,
        password,
      });

      if (data.success) {
        localStorage.setItem("aToken", data.token);
        setAToken(data.token);
      } else {
        // Optional (in case API returns 200 with success: false)
        toast.error(data.message || "Login failed");
      }
    }else{
      const {data}=await axios.post(backendUrl+'/api/doctor/login',{email,password}, {withCredentials: true} )
      if (data.success) {
        localStorage.setItem("dToken", data.token);
        setDToken(data.token);
        console.log(data.token);
      } else {
        toast.error(data.message || "Login failed");
      }
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      toast.error(error.response.data.message || "Invalid credentials");
    } else {
      toast.error("Something went wrong. Please try again.");
    }
  }
};


  return (
    <form onSubmit={onSubmitHandler} className="max-w-sm mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <div className="space-y-4">
        <p className="text-center text-2xl font-bold text-gray-800">
          <span>{state}</span>
        </p>

        <div>
          <p className="text-sm font-medium text-gray-700">Email</p>
          <input
            type="email"
            required
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          onChange={(e)=>{setEmail(e.target.value)}} value={email}/>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-700">Password</p>
          <input
            type="password"
            required
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          onChange={(e)=>{setPassword(e.target.value)}} value={password}/>
        </div>

        <button className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Login
        </button>

        {state === "Admin" ? (
          <p className="text-sm text-center text-gray-600">
            Doctor Login?{" "}
            <span
              onClick={() => setState("Doctor")}
              className="text-blue-600 hover:underline cursor-pointer font-medium"
            >
              Click here
            </span>
          </p>
        ) : (
          <p className="text-sm text-center text-gray-600">
            Admin Login?{" "}
            <span
              onClick={() => setState("Admin")}
              className="text-blue-600 hover:underline cursor-pointer font-medium"
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
 