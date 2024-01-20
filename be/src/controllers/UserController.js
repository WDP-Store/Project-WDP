import asyncHandler from "../util/asyncHandler.js";
import UserRepository from "../repositories/user.js";
export default {
    getAll: asyncHandler(async (req, res) => {
        await UserRepository.getAll(req, res);
    })
}
