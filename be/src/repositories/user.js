
import users from "../model/User.js";
class UserRepository {
    async getAll(req, res) {
        try {
            const test = await users.find();
            
        } catch (error) {
           console.log("");
        }
    }
    
}

export default new UserRepository();