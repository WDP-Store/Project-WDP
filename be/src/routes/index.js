import userRouter from "./user.js";
import authRouter from './auth.js';
import productRouter from './product.js';
import feedbackRouter from './feedback.js';
import brandRouter from './brand.js';
import categoryRouter from './category.js';
import wishlistRouter from './wishlist.js';
import orderRouter from './order.js';
import blogRouter from './blog.js';

const route = (app) => {
    app.use("/users", userRouter);
    app.use("/products", productRouter);
    app.use("/feedbacks", feedbackRouter);
    app.use("/auth", authRouter);
    app.use("/brands", brandRouter);
    app.use("/categories", categoryRouter);
    app.use("/blogs", blogRouter);
    app.use("/orders", orderRouter);
    app.use("/wishlists", wishlistRouter);
}

export default route;