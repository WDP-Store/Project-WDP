import userRouter from "./user.js";

const route = (app) => {
    app.use("/users", userRouter);
}
 
export default route;