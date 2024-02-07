import User from "../model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const login = async ({ email, password }) => {
    const existingUser = await User.findOne({ email }).exec();
    if (existingUser) {
        //compare password
        const isMatchPassword = await bcrypt.compare(password, existingUser.password);
        if (isMatchPassword) {
            //create token jwt
            const token = jwt.sign(
                { data: existingUser },
                "this is private key",
                { expiresIn: '60' } // 1m
            )

            return {
                ...existingUser,
                password: "not show password",
                token: token
            }
        } else {
            // fail password
            throw new Error({ message: "Invalid password" })
        }
    } else {
        throw new Error({ message: "Invalid email or password" })
    }
}


const register = async ({ name, email, password, phone, address }) => {
    //check duplicated (exec() hỗ trợ chuyển Query Object -> Promisse)
    const existingUser = await User.findOne({ email }).exec();
    if (existingUser) throw new Error("Duplicated");

    //hashed password
    const hashedCode = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));
    //insert to db
    const newUser = await User.create({ name, email, password: hashedCode, phone, address });

    return {
        ...newUser._doc,
    }
};


export default {
    login,
    register,
};