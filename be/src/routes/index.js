import userRouter from "./user.js";
import productRouter from "./producta.js";
import authRouter from './auth.js';
import brandRouter from './brand.js';
import categoryRouter from './category.js';

const route = (app) => {
    app.use("/users", userRouter);
    app.use("/products", productRouter);
    app.use("/auth", authRouter);
    app.use("/brands", brandRouter);
    app.use("/categories", categoryRouter);
}
 
export default route;