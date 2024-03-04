import express from "express";
import { contactController } from "../controllers/index.js";

const contactRouter = express.Router();

contactRouter.get("/", contactController.findAllContacts);
contactRouter.get("/:id", contactController.findContactById);
contactRouter.patch("/:id", contactController.updateContact);
contactRouter.delete("/:id", contactController.deleteContact);
contactRouter.post("/", contactController.createContact);

export default contactRouter;
