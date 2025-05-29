import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";

const Appointment = () => {
  const { docId } = useParams();
  const {
    doctors,
    currencySymbol,
    backendUrl,
    token,
    userData,
    getDoctorsData,
  } = useContext(AppContext);
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [selectedTime, setSelectedTime] = useState(null);
  const navigate = useNavigate();
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  useEffect(() => {
    if (doctors && docId) {
      const doctor = doctors.find((doc) => doc._id === docId);
      setDocInfo(doctor);
    }
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots();
    }
  }, [docInfo]);

  const getAvailableSlots = async () => {
    setDocSlots([]);
    let today = new Date();
    let allSlots = [];

    for (let i = 0; i < 7; i++) {
      let currDate = new Date(today);
      currDate.setDate(today.getDate() + i);

      let endTime = new Date(currDate);
      endTime.setHours(21, 0, 0, 0); // 9 PM

      let startTime = new Date(currDate);

      if (i === 0) {
        if (today.getHours() >= 21) {
          continue;
        }

        startTime = new Date();

        if (startTime.getMinutes() > 30) {
          startTime.setHours(startTime.getHours() + 1);
          startTime.setMinutes(0);
        } else {
          startTime.setMinutes(30);
        }

        if (startTime.getHours() < 10) {
          startTime.setHours(10, 0, 0, 0);
        }
      } else {
        startTime.setHours(10, 0, 0, 0); // 10 AM
      }

      let timeSlots = [];
      let slotTime = new Date(startTime);

      while (slotTime < endTime) {
        let formattedSlotTime = slotTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        let slotDateObj = new Date(slotTime);
        let day = slotDateObj.getDate();
        let month = slotDateObj.getMonth() + 1;
        let year = slotDateObj.getFullYear();

        const slotDate = `${day} ${month} ${year}`;
        const isSlotAvailable =
          docInfo.slots_booked &&
          docInfo.slots_booked[slotDate] &&
          docInfo.slots_booked[slotDate].includes(formattedSlotTime)
            ? false
            : true;

        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(slotTime),
            time: formattedSlotTime,
          });
        }

        slotTime = new Date(slotTime.getTime() + 30 * 60000); // 30 min
      }

      if (timeSlots.length > 22) {
        timeSlots = timeSlots.slice(0, 22);
      }

      allSlots.push(timeSlots);
    }

    setDocSlots(allSlots);
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Login to book appointment");
      return navigate("/login");
    } 

    if (selectedTime === null) {
      toast.warn("Please select a time slot");
      return;
    }
     
    try {
      const date = docSlots[slotIndex][0].datetime;
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const slotDate = day + " " + month + " " + year;
      const slotTime = docSlots[slotIndex][selectedTime].time;

      const { data } = await axios.post(
        backendUrl + "/api/user/book-appointment",
        { userId:userData._id, docId, slotDate, slotTime },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    docInfo && (
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex flex-col md:flex-row gap-0 border border-gray-200 rounded-lg overflow-hidden">
          <div className="w-full md:w-1/3 bg-blue-50 p-4 border-r border-gray-200">
            <div className="w-full h-64 bg-blue-100 rounded-lg overflow-hidden border border-gray-200 flex items-center justify-center">
              <img
                src={docInfo.image}
                alt={docInfo.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="w-full md:w-2/3 bg-white p-6 space-y-4">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-gray-800">
                {docInfo.name}
              </h1>
              <img
                src={assets.verified_icon}
                alt="Verified"
                className="w-5 h-5"
              />
            </div>

            <div className="flex items-center gap-4">
              <p className="text-gray-600">
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                {docInfo.experience}
              </span>
            </div>

            <div className="bg-blue-50 inline-block px-4 py-2 rounded-lg">
              <p className="text-gray-700 font-medium">
                Appointment fee:{" "}
                <span className="text-blue-600">
                  {currencySymbol}
                  {docInfo.fees}
                </span>
              </p>
            </div>

            <div className="mt-6">
              <div className="flex items-center gap-2 mb-3">
                <h2 className="text-lg font-semibold text-gray-800">About</h2>
                <img src={assets.info_icon} alt="Info" className="w-4 h-4" />
              </div>
              <p className="text-gray-600 leading-relaxed">{docInfo.about}</p>
            </div>
          </div>
        </div>

        <div className="sm:ml-72 sm:pl-4 mt-8 font-medium text-gray-700">
          <p className="text-lg font-semibold mb-4">Available Time Slots</p>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {docSlots.length > 0 &&
              docSlots.map((daySlots, index) => {
                const firstSlot = daySlots[0];
                if (!firstSlot?.datetime) return null;

                const slotDate = new Date(firstSlot.datetime);
                if (isNaN(slotDate.getTime())) return null;

                return (
                  <div
                    className={`text-center py-3 px-4 min-w-[70px] rounded-lg cursor-pointer transition-all ${
                      slotIndex === index
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                    key={index}
                    onClick={() => setSlotIndex(index)}
                  >
                    <p className="font-medium text-sm uppercase">
                      {daysOfWeek[slotDate.getDay()]}
                    </p>
                    <p className="text-lg font-bold mt-1">
                      {slotDate.getDate()}
                    </p>
                  </div>
                );
              })}
          </div>

          {docSlots[slotIndex] && (
            <div className="mt-6">
              <p className="text-gray-600 mb-3">Select a time:</p>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {docSlots[slotIndex].map((slot, timeIndex) => {
                  const slotDateTime = new Date(slot.datetime);
                  return (
                    <div
                      className={`py-2 px-3 rounded-md text-center cursor-pointer transition-all ${
                        selectedTime === timeIndex
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                      key={timeIndex}
                      onClick={() => setSelectedTime(timeIndex)}
                    >
                      {slotDateTime.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          <button
            onClick={bookAppointment}
            className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6 "
          >
            Book an Appointment
          </button>
        </div>
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  );
};

export default Appointment;
