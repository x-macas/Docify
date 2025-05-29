import React, { useContext } from "react";
import { assets } from "./assets/assets";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Admin/Dashboard";
import AllAppointments from "./pages/Admin/AllAppointments";
import AddDoctor from "./pages/Admin/AddDoctor";
import DoctorList from "./pages/Admin/DoctorList";
import { Routes, Route, Navigate } from "react-router-dom";


const App = () => {
  const { aToken } = useContext(AdminContext);

  // Add loading state (optional)
  // if (aToken === null) {
  //   return <div className="flex justify-center items-center h-screen">Loading...</div>;
  // }

  return aToken ? (
    <div className="flex flex-col h-screen">
      <ToastContainer />
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto p-4 bg-gray-50">
          <Routes>
            <Route path="/admin-dashboard" element={<Dashboard />} />
            <Route path="/all-appointments" element={<AllAppointments />} />
            <Route path="/add-doctor" element={<AddDoctor />} />
            <Route path="/doctor-list" element={<DoctorList />} />
            <Route path="/" element={<Navigate to="/admin-dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  );
};

export default App;