import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";

const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;
    const docData = await doctorModel.findById(docId);
    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available,
    });
    res.json({ success: true, message: "Availibility Changed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(["-password", "-email"]);
    res.json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//api for doctor login
const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await doctorModel.findOne({ email });

    if (!doctor) {
      return res.json({ success: false, message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, doctor.password);
    if (isMatch) {
      const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//api to get doc appointment

const appointmentDoctor = async (req, res) => {
  try {
    const docId = req.docId; // ✅ Comes from middleware
    const appointments = await appointmentModel.find({ docId });
    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//api to mark appointment done or not for doctor panel
const appointmentComplete = async (req, res) => {
  try {
    const docId = req.docId; // ✅ from authDoctor middleware
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);
    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        isCompleted: true,
      });
      return res.json({
        success: true,
        message: "Appointment completed successfully",
      });
    } else {
      return res.json({ success: false, message: "Mark failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//api to cancel appointment done or not for doctor panel
const appointmentCancel = async (req, res) => {
  try {
    const docId = req.docId; // ✅ from authDoctor middleware
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);
    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        cancelled: true,
      });
      return res.json({ success: true, message: "Appointment Cancelled" });
    } else {
      return res.json({ success: false, message: "Cancellation failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//api for dashboard function for doctor panell
const doctorDashboard = async (req, res) => {
  try {
    const docId = req.docId;

    const appointments = await appointmentModel.find({ docId });

    let earnings = 0;
    let patientsSet = new Set();

    appointments.forEach((item) => {
      if (item.isCompleted || item.completed) {
        earnings += item.amount;
      }
      patientsSet.add(item.userId.toString());
    });

    const dashData = {
      earnings,
      appointments: appointments.length,
      patients: patientsSet.size,
      latestAppointments: [...appointments].reverse().slice(0, 5),
    };

    res.json({ success: true, dashData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//api to get doctor profile for doctor panel

const doctorProfile = async (req, res) => {
  try {
    const docId = req.docId;
    const profileData=await doctorModel.findById(docId).select('-password')
    res.json({success:true,profileData})
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//api to update doc data from doc panel

const updateDoctorProfile=async(req,res)=>{
    try {
        const docId=req.docId;
        const {fees,address,available}=req.body

        await doctorModel.findByIdAndUpdate(docId,{fees,address,available})

        res.json({success:true,message:'Profile Updated'})
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

export {
  changeAvailability,
  doctorList,
  loginDoctor,
  appointmentDoctor,
  appointmentComplete,
  appointmentCancel,
  doctorDashboard,
  doctorProfile,
  updateDoctorProfile
};
