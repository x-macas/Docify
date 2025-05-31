import React, { useEffect, useContext, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const DoctorProfile = () => {
  const { dToken, setProfileData, profileData, getProfileData, backendUrl } =
    useContext(DoctorContext);
  const { currency } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available,
      };

      const { data } = await axios.post(
        `${backendUrl}/api/doctor/update-profile`,
        updateData,
        {
          headers: {
            dToken,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  const handleInputChange = (key, value) => {
    setProfileData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleAddressChange = (key, value) => {
    setProfileData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [key]: value,
      },
    }));
  };

  return (
    profileData && (
      <div className="p-6 bg-gray-50 min-h-screen flex justify-center">
        <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-4xl flex gap-6">
          <div className="w-1/3 flex flex-col items-center">
            <img
              src={profileData.image}
              alt="Doctor"
              className="w-32 h-32 rounded-full object-cover border border-gray-300 shadow-md"
            />
          </div>
          <div className="w-2/3 space-y-4">
            {/* Name, degree, experience */}
            <div>
              {isEdit ? (
                <input
                  type="text"
                  className="text-2xl font-bold text-gray-800 w-full border border-gray-300 rounded px-2 py-1"
                  value={profileData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
              ) : (
                <p className="text-2xl font-bold text-gray-800">
                  {profileData.name}
                </p>
              )}

              <div className="flex items-center gap-2 mt-2 text-gray-600">
                {isEdit ? (
                  <>
                    <input
                      type="text"
                      className="border border-gray-300 px-2 py-1 rounded"
                      value={profileData.degree}
                      onChange={(e) =>
                        handleInputChange("degree", e.target.value)
                      }
                      placeholder="Degree"
                    />
                    <input
                      type="text"
                      className="border border-gray-300 px-2 py-1 rounded"
                      value={profileData.speciality}
                      onChange={(e) =>
                        handleInputChange("speciality", e.target.value)
                      }
                      placeholder="Speciality"
                    />
                    <input
                      type="number"
                      className="border border-gray-300 px-2 py-1 rounded w-20"
                      value={profileData.experience}
                      onChange={(e) =>
                        handleInputChange("experience", e.target.value)
                      }
                      placeholder="Exp"
                    />
                  </>
                ) : (
                  <>
                    <p>
                      {profileData.degree} - {profileData.speciality}
                    </p>
                    <button className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full ml-2">
                      {profileData.experience} yrs
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* About */}
            <div>
              <p className="text-lg font-semibold text-gray-700">About:</p>
              {isEdit ? (
                <textarea
                  className="w-full border border-gray-300 rounded px-2 py-1"
                  rows="3"
                  value={profileData.about}
                  onChange={(e) => handleInputChange("about", e.target.value)}
                />
              ) : (
                <p className="text-gray-600">{profileData.about}</p>
              )}
            </div>

            {/* Fees and Address */}
            <div className="space-y-4">
              <p className="text-md font-medium text-gray-800">
                Appointment Fee:
                <span className="text-green-600 font-semibold ml-2">
                  {currency}
                  {isEdit ? (
                    <input
                      type="number"
                      className="ml-2 border border-gray-300 px-2 py-1 rounded w-24"
                      value={profileData.fees}
                      onChange={(e) =>
                        handleInputChange("fees", e.target.value)
                      }
                    />
                  ) : (
                    ` ${profileData.fees}`
                  )}
                </span>
              </p>

              <div>
                <p className="text-md font-semibold text-gray-700">Address:</p>
                {isEdit ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      className="w-full border border-gray-300 px-2 py-1 rounded"
                      placeholder="Line 1"
                      value={profileData.address.line1}
                      onChange={(e) =>
                        handleAddressChange("line1", e.target.value)
                      }
                    />
                    <input
                      type="text"
                      className="w-full border border-gray-300 px-2 py-1 rounded"
                      placeholder="Line 2"
                      value={profileData.address.line2}
                      onChange={(e) =>
                        handleAddressChange("line2", e.target.value)
                      }
                    />
                  </div>
                ) : (
                  <p className="text-gray-600">
                    {profileData.address.line1}
                    <br />
                    {profileData.address.line2}
                  </p>
                )}
              </div>

              {/* Availability */}
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  className="w-4 h-4"
                  checked={profileData.available}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      available: e.target.checked,
                    }))
                  }
                  disabled={!isEdit}
                />
                <label className="text-sm text-gray-700">Available</label>
              </div>

              {/* Edit/Save Button */}
              <div>
                <button
                  onClick={() => {
                    if (isEdit) {
                      updateProfile();
                    } else {
                      setIsEdit(true);
                    }
                  }}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                  {isEdit ? "Save" : "Edit"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;
