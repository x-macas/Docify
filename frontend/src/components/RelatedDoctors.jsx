import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const RelatedDoctors = ({ speciality, docId }) => {
  const { doctors } = useContext(AppContext);
  const [relDoc, setRelDoc] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (doctors.length && speciality) {
      const doctorsData = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId
      );
      setRelDoc(doctorsData);
    }
  }, [doctors, speciality, docId]);

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-medium">Top Doctors to Book</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted Doctors!
      </p>
      <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {relDoc.slice(0, 5).map((item, index) => {
          const isAvailable = item.available === true;

          return (
            <div
              onClick={() => {
                navigate(`/appointment/${item._id}`);
                window.scrollTo(0, 0);
              }}
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
              key={index}
            >
              <img
                className="w-full h-48 object-cover bg-blue-50"
                src={item.image}
                alt=""
              />
              <div className="p-4">
                <p
                  className={isAvailable ? "text-green-500" : "text-red-500"}
                >
                  {isAvailable ? "Available" : "Unavailable"}
                </p>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">{item.speciality}</p>
              </div>
            </div>
          );
        })}
      </div>
      <button
        onClick={() => {
          navigate("/doctors");
          window.scrollTo(0, 0);
        }}
        className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        View More
      </button>
    </div>
  );
};

export default RelatedDoctors;
