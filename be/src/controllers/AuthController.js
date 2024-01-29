import {authRepository} from "../repositories/index.js";

const register = async (req, res) => {
    
    const {name, email, password, phone, address} = req.body;
    console.log(name+" "+email+" "+password+" "+phone+" "+address);
    try {
      const user = authRepository.register({name, email, password, phone, address});
      res.status(200).json({
        message: "User registered successfully",
        data: user
      })
    } catch (error) {
      res.status(500).json({
        message: "User registration failed",
        data: user
      });
    }
};

export default{
    register,
}