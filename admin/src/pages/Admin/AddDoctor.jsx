import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  const [docImage, setDocImage] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");

  // State for professional information
  const [speciality, setSpeciality] = useState("General Physician");
  const [degree, setDegree] = useState("");

  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const [about, setAbout] = useState("");
  const { backendUrl, aToken } = useContext(AdminContext);
  const onSubmitHandler = async (event) => {
  event.preventDefault();
  
  try {
    if (!docImage) {
      return toast.error('Image not selected');
    }

    const formData = new FormData();
    formData.append('image', docImage);  
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('experience', experience);
    formData.append('fees', Number(fees));
    formData.append('about', about);
    formData.append('speciality', speciality);
    formData.append('degree', degree);
    formData.append('address', JSON.stringify({
      line1: address1,
      line2: address2
    }));

    // Log FormData entries
    // formData.forEach((value, key) => {
    //   console.log(`${key}: ${value}`);
    // });

    const {data}=await axios.post(backendUrl+'/api/admin/add-doctor',formData,{headers:{aToken}})
    if(data.success){
      toast.success(data.message)
      
setDocImage(null);  // Reset to null (or false if you prefer)
setName('');
setEmail('');
setPassword('');
setExperience('1 Year'); // Reset to default
setFees('');
setSpeciality('General Physician'); // Reset to default
setDegree('');
setAddress1('');
setAddress2('');
setAbout('');
    }else{
      toast.error(data.message)
    }

  } catch (error) {
    console.error('Error:', error);
    toast.error('An error occurred');
  }
};
  return (
    <form
      onSubmit={onSubmitHandler}
      className="max-w-4xl mx-auto p-6 bg-blue-50 rounded-lg shadow-md"
    >
      <h1 className="text-3xl font-bold text-blue-800 mb-6 text-center">
        Add Doctor
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Doctor Image Upload */}
        <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm border border-blue-100">
          <label htmlFor="doc-img" className="cursor-pointer">
            <img
              src={
                docImage ? URL.createObjectURL(docImage) : assets.upload_area
              }
              alt="Upload area"
              className="w-32 h-32 object-contain mb-2"
            />
          </label>
          <input
            onChange={(e) => setDocImage(e.target.files[0])}
            type="file"
            id="doc-img"
            className="hidden"
          />
          <p className="text-blue-600 text-center">
            Upload doctors <br /> picture
          </p>
        </div>

        {/* Doctor Details */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <p className="text-blue-700 font-medium mb-1">Doctor name</p>
              <input
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
                type="text"
                placeholder="Name"
                required
                className="w-full p-2 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div>
              <p className="text-blue-700 font-medium mb-1">Doctor Email</p>
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
                type="email"
                placeholder="Email"
                required
                className="w-full p-2 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div>
              <p className="text-blue-700 font-medium mb-1">Doctor password</p>
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
                type="password"
                placeholder="Password"
                required
                className="w-full p-2 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div>
              <p className="text-blue-700 font-medium mb-1">Experience</p>
              <select
                onChange={(e) => {
                  setExperience(e.target.value);
                }}
                value={experience}
                className="w-full p-2 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Year</option>
                <option value="3 Year">3 Year</option>
                <option value="4 Year">4 Year</option>
                <option value="5 Year">5 Year</option>
                <option value="6 Year">6 Year</option>
                <option value="7 Year">7 Year</option>
                <option value="8 Year">8 Year</option>
                <option value="9 Year">9 Year</option>
                <option value="10 Year">10 Year</option>
              </select>
            </div>

            <div>
              <p className="text-blue-700 font-medium mb-1">Fees</p>
              <input
                onChange={(e) => {
                  setFees(e.target.value);
                }}
                value={fees}
                type="number"
                placeholder="Fees"
                required
                className="w-full p-2 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
          </div>
        </div>

        {/* Specialty and Education */}
        <div className="space-y-4">
          <div>
            <p className="text-blue-700 font-medium mb-1">Speciality</p>
            <select
              onChange={(e) => {
                setSpeciality(e.target.value);
              }}
              value={speciality}
              className="w-full p-2 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <option value="General physician">General physician</option>
              <option value="Gynecologist">Gynecologist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Pediatricians">Pediatricians</option>
              <option value="Neurologist">Neurologist</option>
              <option value="Gastroenterologist">Gastroenterologist</option>
            </select>
          </div>

          <div>
            <p className="text-blue-700 font-medium mb-1">Education</p>
            <input
              onChange={(e) => {
                setDegree(e.target.value);
              }}
              value={degree}
              type="text"
              placeholder="Education"
              required
              className="w-full p-2 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
        </div>

        {/* Address */}
        <div className="space-y-4">
          <p className="text-blue-700 font-medium mb-1">Address</p>
          <input
            onChange={(e) => {
              setAddress1(e.target.value);
            }}
            value={address1}
            type="text"
            placeholder="Address line 1"
            required
            className="w-full p-2 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <input
            onChange={(e) => {
              setAddress2(e.target.value);
            }}
            value={address2}
            type="text"
            placeholder="Address line 2"
            required
            className="w-full p-2 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        {/* About Doctor */}
        <div className="md:col-span-2">
          <p className="text-blue-700 font-medium mb-1">About Doctor</p>
          <textarea
            onChange={(e) => {
              setAbout(e.target.value);
            }}
            value={about}
            placeholder="Write about doctor"
            rows={5}
            required
            className="w-full p-2 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-6 text-center">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition duration-200 shadow-md"
        >
          Add Doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
