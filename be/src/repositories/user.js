
import user from "../model/User.js";

const  getAll =async (req, res)=>{
    try {
        const test = await user.find();
        return test;
    } catch (error) {
        console.log("");
    }
}
    

export default {
    getAll,
};