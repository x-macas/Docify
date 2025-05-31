import jwt from "jsonwebtoken";

const authDoctor = async (req, res, next) => {
  try {
    const dtoken = req.headers['dtoken'] || req.headers['dToken'];


    if (!dtoken) {
      return res.status(401).json({ success: false, message: "Not authorized, login first" });
    }

    const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET);

    
    req.docId = token_decode.id;

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ success: false, message: error.message });
  }
};

export default authDoctor;
