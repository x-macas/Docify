import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";

const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;

    const imageFile = req.file; // Could be `undefined` if no file uploaded

    // Check for missing required fields (excluding image)
    if (!name || !password || !email || !speciality || !degree || !experience || !about || !fees || !address) {
      return res.status(400).json({
        success: false,
        message: "Missing required details",
      });
    }

    // Validate email
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    // Validate password
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Handle image (if provided)
    let imageUrl = null; // Default to `null` if no image
    if (imageFile) {
      // Validate image type (optional)
      if (!imageFile.mimetype.startsWith("image/")) {
        return res.status(400).json({
          success: false,
          message: "Only image files are allowed",
        });
      }

      // Upload to Cloudinary
      try {
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
          resource_type: "image",
        });
        imageUrl = imageUpload.secure_url;
      } catch (error) {
        console.error("Cloudinary upload error:", error);
        // Option 1: Skip image upload (still proceed with doctor creation)
        // Option 2: Return error (uncomment below if you want to fail on upload error)
        // return res.status(500).json({
        //   success: false,
        //   message: "Failed to upload image",
        // });
      }
    }

    // Parse address (if needed)
    let parsedAddress;
    try {
      parsedAddress = JSON.parse(address);
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "Invalid address format",
      });
    }

    // Save doctor to database (with or without image)
    const doctorData = {
      name,
      email,
      image: imageUrl, // Will be `null` if no image provided
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: parsedAddress,
      date: Date.now(),
    };

    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    res.status(201).json({
      success: true,
      message: "Doctor added successfully",
      data: newDoctor, // Optional: Return the created doctor
    });
  } catch (error) {
    console.error("Error in addDoctor:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//adding api for admin login
 

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate credentials
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      // Generate JWT token (payload should be an object)
      const token = jwt.sign(
        { email }, // Payload
        process.env.JWT_SECRET,
        { expiresIn: "1h" } // Optional: Token expiry
      );

      // Send success response
      res.status(200).json({
        success: true,
        message: "Login successful",
        token,
      });
    } else {
      // Send error response (only once!)
      res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }
  } catch (error) {
    console.error("Error in loginAdmin:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// API to get all doctors list for admin panel
const allDoctors = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select('-password');
        res.json({ success: true, doctors });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};


export { addDoctor, loginAdmin, allDoctors };