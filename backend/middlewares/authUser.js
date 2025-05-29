import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.status(401).json({ success: false, message: "Not authorized, login first" });
    }

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    
    req.userId = token_decode.id;

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ success: false, message: error.message });
  }
};

export default authUser;
