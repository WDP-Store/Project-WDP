import userRouter from "./user.js";
import authRouter from './auth.js';

const route = (app) => {
    app.use("/users", userRouter);
    app.use("/auth", authRouter);
}
 
export default route;