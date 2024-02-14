import jwt from "jsonwebtoken";

const verifyAuthToken = async (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];
  console.log("headers =>", req.headers);
  console.log("token => ", token);
  if (!token) return res.status(401).json("You are not authenticated");
  try {
    // const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = jwt.verify(token, "test");
    console.log("user => ", user);
    req.user = user;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token has expired" });
      }
  
      // Handle other JWT errors
      console.error(err);
      return res.status(403).json({ message: "Token is not valid" });
  }
};


export { verifyAuthToken };
