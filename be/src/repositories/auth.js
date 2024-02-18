import User from "../model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const login = async (data) => {
    const { email, password } = data;
    const existingUser = await User.findOne({ email }).exec();
    if (existingUser) {
        //compare password
        const isMatchPassword = await bcrypt.compare(password, existingUser.password);
        if (isMatchPassword) {
            //create access token jwt
            const accessToken = jwt.sign({ data: existingUser },"test",{ expiresIn: '10m' } )
            const refreshToken = jwt.sign({ data: existingUser },"test1",{ expiresIn: '1y' } )
            return {
                ...existingUser,
                password: "not show password",
                accessToken: accessToken,
                refreshToken: refreshToken
            }
        } else {
            // fail password
            throw { message: "Invalid password" }
        }
    } else {
        throw { message: "Invalid email or password" }
    }
}


const register = async (data) => {
    try {
        const {name, email, password} = data;
        //check duplicated (exec() hỗ trợ chuyển Query Object -> Promisse)
        const existingUser = await User.findOne({ email }).exec();
        if (existingUser) throw { message: "DUPLICATE", status: 400 };
        //hashed password
        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));
        //insert to db
        const newUser = await User.create({ name, email, password: hashedPassword});
        console.log("new user => ", newUser);
        return newUser;
    } catch (error) {
        throw error;
    }
};


export default {
    login,
    register,
};