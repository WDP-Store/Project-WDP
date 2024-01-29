import {userRepository} from "../repositories/index.js";

const getAll = async (req, res) => {
    const users = await userRepository.getAll(req, res);
    console.log("users", users);
};

export default{
    getAll,
}