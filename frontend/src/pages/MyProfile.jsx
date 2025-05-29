import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append('name', userData.name);
      formData.append('phone', userData.phone);
      formData.append('gender', userData.gender);
      formData.append('dob', userData.dob);
      formData.append('addressLine1', userData.address.line1);
      formData.append('addressLine2', userData.address.line2);
      if (image) {
        formData.append('image', image);
      }

      const res = await fetch(`${backendUrl}/api/user/update-profile`, {
        method: 'POST',
        headers: {
          token,
        },
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        loadUserProfileData();
        setIsEdit(false);
        setImage(null);
        toast.success("Profile updated successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        toast.error(data.message || "Failed to update profile", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating profile. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return userData && (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10 space-y-6">
      <ToastContainer />
      
      <div className="flex flex-col items-center space-y-4">
        {isEdit ? (
          <label htmlFor="image" className="cursor-pointer text-sm text-gray-600">
            <div>
              <img
                src={image ? URL.createObjectURL(image) : userData.image || assets.default_profile}
                alt="Preview"
                className="w-24 h-24 rounded-full object-cover"
              />
              {!image && <img src={assets.upload_icon} alt="Upload" className="w-6 mx-auto mt-2" />}
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="hidden"
              />
            </div>
          </label>
        ) : (
          <img
            src={userData.image || assets.default_profile}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover"
          />
        )}

        {isEdit ? (
          <input
            type="text"
            value={userData.name}
            onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
            className="border p-2 rounded w-full text-center"
          />
        ) : (
          <p className="text-xl font-semibold">{userData.name}</p>
        )}
      </div>

      {/* Rest of your existing JSX remains exactly the same */}
      <hr />

      <div>
        <p className="text-lg font-medium mb-2">Contact Info</p>
        <div className="mb-2">
          <p className="text-gray-600">Email Id:</p>
          <p>{userData.email}</p>
        </div>

        <div className="mb-2">
          <p className="text-gray-600">Phone:</p>
          {isEdit ? (
            <input
              type="text"
              value={userData.phone}
              onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))}
              className="border p-2 rounded w-full"
            />
          ) : (
            <p>{userData.phone}</p>
          )}
        </div>

        <div className="mb-2">
          <p className="text-gray-600">Address:</p>
          {isEdit ? (
            <div className="space-y-2">
              <input
                type="text"
                value={userData.address.line1}
                onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}
                className="border p-2 rounded w-full"
              />
              <input
                type="text"
                value={userData.address.line2}
                onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))}
                className="border p-2 rounded w-full"
              />
            </div>
          ) : (
            <p>{userData.address.line1}<br />{userData.address.line2}</p>
          )}
        </div>
      </div>

      <hr />

      <div>
        <p className="text-lg font-medium mb-2">Basic Information</p>

        <div className="mb-2">
          <p className="text-gray-600">Gender:</p>
          {isEdit ? (
            <select
              onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}
              value={userData.gender}
              className="border p-2 rounded w-full"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          ) : (
            <p>{userData.gender}</p>
          )}
        </div>

        <div className="mb-2">
          <p className="text-gray-600">Birthday:</p>
          {isEdit ? (
            <input
              type="date"
              value={userData.dob}
              onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))}
              className="border p-2 rounded w-full"
            />
          ) : (
            <p>{userData.dob}</p>
          )}
        </div>
      </div>

      <div className="text-center">
        {isEdit ? (
          <button
            onClick={updateUserProfileData}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Save Information
          </button>
        ) : (
          <button
            onClick={() => setIsEdit(true)}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;