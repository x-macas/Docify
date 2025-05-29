import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import appointmentModel from "../models/appointmentModel.js";
import doctorModel from '../models/doctorModel.js';
import  razorpay from 'razorpay'
// Register User
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !password || !email) {
      return res.status(400).json({ success: false, message: "Missing Details" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Enter a valid email" });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({ name, email, password: hashedPassword });
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    return res.json({ success: true, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    return res.json({ success: true, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get User Profile
const getProfile = async (req, res) => {
  try {
    const userData = await userModel.findById(req.userId).select("-password");
    res.json({ success: true, userData });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Update User Profile
const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;

    if (!name?.trim() || !phone?.trim() || !dob?.trim() || !gender?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Data Missing",
        missingFields: {
          name: !name?.trim(),
          phone: !phone?.trim(),
          dob: !dob?.trim(),
          gender: !gender?.trim()
        }
      });
    }

    let parsedAddress = null;
    if (address) {
      try {
        parsedAddress = typeof address === 'string' ? JSON.parse(address) : address;
      } catch {
        return res.status(400).json({
          success: false,
          message: "Invalid address format - must be valid JSON",
          receivedAddress: address
        });
      }
    }

    const updateData = {
      name: name.trim(),
      phone: phone.trim(),
      dob: dob.trim(),
      gender: gender.trim(),
      ...(parsedAddress && { address: parsedAddress })
    };

    if (imageFile) {
      try {
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
          resource_type: "image"
        });
        updateData.image = imageUpload.secure_url;
      } catch (uploadError) {
        console.error("Cloudinary upload failed:", uploadError);
      }
    }

    await userModel.findByIdAndUpdate(userId, updateData);
    return res.status(200).json({ success: true, message: "Profile updated successfully" });

  } catch (error) {
    console.error("Update profile error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error"
    });
  }
};

// Book Appointment
const bookAppointment = async (req, res) =>{
  try {
    const {userId,docId,slotDate,slotTime}=req.body;
    const docData=await doctorModel.findById(docId).select('-password')

    if(!docData.available){
      return res.json({success:false,message:' doctor Not available'})
    }

    let slots_booked=docData.slots_booked 
    //check slots aailabilit
    if(slots_booked[slotDate]) {
      if(slots_booked[slotDate].includes(slotTime)){
return res.json({success:false,message:' slot Not available'})
      }else{
        slots_booked[slotDate].push(slotTime)
      }
    }else{
      slots_booked[slotDate]=[]
      slots_booked[slotDate].push(slotTime)
    }

    const userData=await userModel.findById(userId).select('-password')
    delete docData.slots_booked

    const appointmentData={
      userId,
      docId,
      userData,
      docData,
      amount:docData.fees,
      slotTime,
      slotDate,
      date:Date.now()
    }

    const newAppointment=new appointmentModel(appointmentData)

    await newAppointment.save()

    //save newslotdata

    await doctorModel.findByIdAndUpdate(docId,{slots_booked})
    res.json({success:true,message:'appointment booked'})


  } catch (error) {
     res.json({success: false,
      message: error.message || "Internal server error"})
  }
}

const listAppointment = async (req, res) => {
  try {
    // Use req.userId from auth middleware instead of req.body
    const appointments = await appointmentModel.find({ userId: req.userId })
      .sort({ date: -1 }); // Sort by date descending

    res.json({ success: true, appointments });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};
  

export {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment
};
