import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const AdminContext = createContext(null);

const AdminContextProvider = ({ children }) => {
  const [aToken, setAToken] = useState(null); // Initialize as null
  const [doctors, setDoctors] = useState([]); // Moved before `value`
  const [appointments,setAppointments]=useState([])
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Sync with localStorage on initial load
  useEffect(() => {
    const token = localStorage.getItem("aToken");
    if (token) {
      setAToken(token);
    }
  }, []);

  // Update localStorage whenever aToken changes
  useEffect(() => {
    if (aToken) {
      localStorage.setItem("aToken", aToken);
    } else {
      localStorage.removeItem("aToken");
    }
  }, [aToken]);

  const getAllDoctors = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/all-doctors",
        {},
        { headers: { aToken } }
      );
      if (data.success) {
        setDoctors(data.doctors);
        //console.log(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const changeAvailability  = async(docId)=>{
    try {
      const {data}=await axios.post(backendUrl+'/api/admin/change-availability',{docId},{headers:{aToken}})
      if(data.success){
        toast.success(data.message)
        getAllDoctors()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const getAllAppointments=async()=>{
    try {
      const {data}=await axios.get(backendUrl+'/api/admin/appointments',{headers:{aToken}})
      if(data.success){
        setAppointments(data.appointments)
        console.log(data.appointments)
      }else{
        toast.error(error.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const value = { aToken, setAToken, backendUrl, doctors, getAllDoctors, changeAvailability, appointments,setAppointments,getAllAppointments }; // Now all variables are defined

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export default AdminContextProvider;