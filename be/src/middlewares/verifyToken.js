import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const checkLogin = (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];

  if (!token)
    return res.status(401).json({
      code: 401,
      message: "You need to login",
    });
  try {
    // const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = user;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired" });
    }
    // Handle other JWT errors
    return res.status(403).json({ message: "Token is not valid" });
  }
};

const checkAdmin = (req, res, next) => {
  if (req.user && req.user.data.role && req.user.data.role === "admin") {
    next();
  } else {
    return res.status(401).json({
      code: 401,
      message: "Only admin is allowed",
    });
  }
};

export default { checkLogin, checkAdmin };
