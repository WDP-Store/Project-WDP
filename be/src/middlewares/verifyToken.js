import jwt from "jsonwebtoken";

const checkLogin = async (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];

  if (!token) return res.status(401).json("You need login");
  try {
    // const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = jwt.verify(token, "test");
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

const checkAdmin = async (req, res, next) => {
  req.user.data.role == "admin" ? next() : res.json("Only admin is allowed")
};


export { checkLogin, checkAdmin};
