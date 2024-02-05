import userRouter from "./user.js";
import authRouter from './auth.js';
import productRouter from './product.js';

const route = (app) => {
    app.use("/users", userRouter);
    app.use("/auth", authRouter);
    app.use("/products", productRouter);
}

export default route;