import express from "express";
import { feedbackController } from "../controllers/index.js";

const feedbackRouter = express.Router();

feedbackRouter.get("/", feedbackController.findAll);
feedbackRouter.get("/:id", feedbackController.findOne);
feedbackRouter.patch("/:id", feedbackController.update);
feedbackRouter.delete("/:id", feedbackController.deleteFeedback);
feedbackRouter.post("/", feedbackController.create);

export default feedbackRouter;